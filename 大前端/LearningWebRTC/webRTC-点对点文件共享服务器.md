`webRTC`-点对点文件共享服务器 目录
[TOC]
***

# 前言

- 拥有点对点的数据传输能力并且与文件`API`相结合
- 利用`WebRTC`的`Data Channel`以及文件`API`来构造一个简易的文件共享应用
  - 主要在两个用户(peer)间共享数据的应用
  - 该应用的基本要求是实时性，两个用户必须同时在页面上，以共享一个文件

# 推荐阅读

- 《Learning WebRTC》

# 展示

![image-20210324011717704](.\img\0-delivery.png)



![image-20210324011829233](.\img\0-delivery2.png)



# 步骤

1. 用户`A`打开页面，输入一个唯一的`ID`号
2. 用户`B`打开同样的页面，输入与`A`相同的`ID`号
3. 两个用户使用`RTCPeerConnection`实现互联
4. 一旦链接建立，其中一个用户能选择一个本地文件用于共享
5. 另一个用户会在文件共享时收到通知，共享的文件可以通过链接传输到对方的计算机并且能下载

- 从浏览器拾取文件，将文件分块并仅使用`RTCPeerConnection API`来传送给另一个用户

# 使用文件`API`拾取文件

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body{
            background-color: #404040;
            margin-top: 15px;
            font-family: sans-serif;
            color: white;
        }

        .thumb {
            height: 75px;
            border: 1px solid #000;
            margin: 10px 5px 0 0;
        }

        .page{
            position: relative;
            display: block;
            margin: 0 auto;
            width: 500px;
            height: 500px;
        }

        #byte_content {
            margin: 5px 0;
            max-height: 100px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        #byte_range {
            margin-top: 5px;
        }
    </style>
</head>
<body>
<div id="login-page" class="page">
    <h2>Login As</h2>
    <input type="text" id="username">
    <button id="login">Login</button>
</div>

<div id="share-page" class="page">
    <h2>File Sharing</h2>
    <input type="text" id="their-username">
    <button id="connect">Connect</button>
    <div id="ready">Ready!</div>

    <br>
    <br>

    <input type="file" id="files" name="file"> Read bytes:
    <button id="send">Send</button>
</div>
</body>
<script src="client.js"></script>
</html>
```

# 点对点连接和数据管道

```js
let name,
    connectedUser,
    connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

//处理所有消息
connection.onmessage = function (message) {
    console.log("Got message:", message.data);

    let data = JSON.parse(message.data);

    switch (data.type){
        case "login":
            onLogin(data.success);
            break;
        case "offer":
            onOffer(data.offer, data.name);
            break;
        case "answer":
            onAnswer(data.answer);
            break;
        case "candidate":
            onCandidate(data.candidate);
            break;
        case "leave":
            onLeave();
            break;
        default:
            break;
    }
};

//处理错误
connection.onerror = function (err) {
    console.log("Got error:", err);
}

//JSON形式发送消息
function send(message){
    if (connectedUser){
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    theirUsernameInput = document.querySelector('#their-username'),
    connectButton = document.querySelector('#connect'),
    sharePage = document.querySelector('#share-page'),
    sendButton = document.querySelector('#send'),
    readyText = document.querySelector('#ready'),
    statusText = document.querySelector('#status');

sharePage.style.display = 'none';
readyText.style.display = 'none';

//用户点击按钮登录
loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if (name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if (success === false){
        alert("Login 失败，请使用不同的名字");
    }else{
        loginPage.style.display = 'none';
        sharePage.style.display = 'block';

    //    为每个请求建立连接
        startConnection();
    }
}

let yourConnection,
    dataChannel,
    currentFile,
    currentFileSize,
    currentFileMeta;

function startConnection() {
    if (hasRTCPeerConnection()){
        setupPeerConnection();
    }else {
        alert("不支持webRTC");
    }
}

function setupPeerConnection() {
    let configuration = {
        "iceServers":[{
            "url": "stun:localhost:8888"
        }]
    };

    yourConnection = new RTCPeerConnection(configuration, {optional:[]});

//    set up ice handling
    yourConnection.onicecandidate = function (event){
        if (event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    }
    openDataChannel();
}

function openDataChannel() {
    let dataChannelOptions = {
        ordered: true,
        reliable: true,
        negotiated: true,
        id: "myChannel"
    };

    dataChannel = yourConnection.createDataChannel("myLabel", dataChannelOptions);

    dataChannel.onerror = function (error){
        console.log("Data channel error:", error);
    };

    dataChannel.onmessage = function (event) {

    }

    dataChannel.onopen = function (){
        readyText.style.display = 'inline-block';
    };

    dataChannel.onclose = function (){
        readyText.style.display = "none";
    }
}

// 函数的polyfill
function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection
        || window.webkitRTCPeerConnection
        || window.mozRTCPeerConnection;

    window.RTCSessionDescription = window.RTCSessionDescription
        || window.webkitRTCSessionDescription
        || window.mozRTCSessionDescription;

    window.RTCIceCandidate = window.RTCIceCandidate
        || window.webkitRTCIceCandidate
        || window.mozeRTCIceCandidate;

    return !!window.RTCPeerConnection;
}

function hasFileApi() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

//事件驱动
connectButton.addEventListener("click", ()=>{
    let theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

//    开始新建连接邀请
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });

        yourConnection.setLocalDescription(offer);
    },
    error=>{
        alert("error");
    });
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(answer=>{
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    error =>    alert("error")
    );
}

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate) {
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

function onLeave() {
    connectedUser = null;

    yourConnection.close();
    yourConnection.onicecandidate = null;
    setupPeerConnection();
}
```

- 通过发送邀请和响应，将两个用户连接在一起
- 连接建立，可以在数据通道来回发送任意二进制数据信息

# 获取对文件的引用

```js
let name,
    connectedUser,
    connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

//处理所有消息
connection.onmessage = function (message) {
    console.log("Got message:", message.data);

    let data = JSON.parse(message.data);

    switch (data.type){
        case "login":
            onLogin(data.success);
            break;
        case "offer":
            onOffer(data.offer, data.name);
            break;
        case "answer":
            onAnswer(data.answer);
            break;
        case "candidate":
            onCandidate(data.candidate);
            break;
        case "leave":
            onLeave();
            break;
        default:
            break;
    }
};

//处理错误
connection.onerror = function (err) {
    console.log("Got error:", err);
}

//JSON形式发送消息
function send(message){
    if (connectedUser){
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    theirUsernameInput = document.querySelector('#their-username'),
    connectButton = document.querySelector('#connect'),
    sharePage = document.querySelector('#share-page'),
    sendButton = document.querySelector('#send'),
    readyText = document.querySelector('#ready'),
    statusText = document.querySelector('#status');

sharePage.style.display = 'none';
readyText.style.display = 'none';

//用户点击按钮登录
loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if (name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if (success === false){
        alert("Login 失败，请使用不同的名字");
    }else{
        loginPage.style.display = 'none';
        sharePage.style.display = 'block';

    //    为每个请求建立连接
        startConnection();
    }
}

let yourConnection,
    dataChannel,
    currentFile,
    currentFileSize,
    currentFileMeta;

function startConnection() {
    if (hasRTCPeerConnection()){
        setupPeerConnection();
    }else {
        alert("不支持webRTC");
    }
}

function setupPeerConnection() {
    let configuration = {
        "iceServers":[{
            "url": "stun:localhost:8888"
        }]
    };

    yourConnection = new RTCPeerConnection(configuration, {optional:[]});

//    set up ice handling
    yourConnection.onicecandidate = function (event){
        if (event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    }
    openDataChannel();
}

function openDataChannel() {
    let dataChannelOptions = {
        ordered: true,
        reliable: true,
        negotiated: true,
        id: "myChannel"
    };

    dataChannel = yourConnection.createDataChannel("myLabel", dataChannelOptions);

    dataChannel.onerror = function (error){
        console.log("Data channel error:", error);
    };

    dataChannel.onmessage = function (event) {

    }

    dataChannel.onopen = function (){
        readyText.style.display = 'inline-block';
    };

    dataChannel.onclose = function (){
        readyText.style.display = "none";
    }
}

// 函数的polyfill
function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection
        || window.webkitRTCPeerConnection
        || window.mozRTCPeerConnection;

    window.RTCSessionDescription = window.RTCSessionDescription
        || window.webkitRTCSessionDescription
        || window.mozRTCSessionDescription;

    window.RTCIceCandidate = window.RTCIceCandidate
        || window.webkitRTCIceCandidate
        || window.mozeRTCIceCandidate;

    return !!window.RTCPeerConnection;
}

function hasFileApi() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

//事件驱动
connectButton.addEventListener("click", ()=>{
    let theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

//    开始新建连接邀请
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });

        yourConnection.setLocalDescription(offer);
    },
    error=>{
        alert("error");
    });
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(answer=>{
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    error =>    alert("error")
    );
}

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate) {
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

function onLeave() {
    connectedUser = null;

    yourConnection.close();
    yourConnection.onicecandidate = null;
    setupPeerConnection();
}

sendButton.addEventListener("click", event=>{
    let files = document.querySelector('#files').files;

    if(files.length > 0){
        dataChannelSend({
            type: "start",
            data: files[0]
        });

        sendFile(files[0]);
    }
});
```

- `dataChannelSend, sendFile`暂时不写
- 此时可以获取文件的信息

# 文件分块

- 数据通道通过`SCTP`协议进行传输文件
- 如果网络不佳，会导致文件丢失
- 利用`BitTorrent`实现文件块切分，每次只传小块
- 必须在使用数据通道前使用这一步

# 文件分块可读

- 因为`JS`底层要求使用字符串格式，需要采用`Base64`编码
- 发送，转换为`Base64`编码 -> 传送过去另一个用户，解码得到结果

## 编码

```js
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
}
```

- 参数为`ArrayBuffer`对象，文件`API`读取文件内容时的返回值
- `fromCharcode`转为字符
- `bota`编码

## 解码

```js
function base64ToBlob(b64Data, contentType) {
    contentType = contentType || '';

    var byteArrays = [], byteNumbers, slice;

    for (var i = 0; i < b64Data.length; i++) {
        slice = b64Data[i];

        byteNumbers = new Array(slice.length);
        for (var n = 0; n < slice.length; n++) {
            byteNumbers[n] = slice.charCodeAt(n);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
```

- `charCodeAt`每一个字符转化成二进制数据
- 得到翻译后的数组后，将其转换为`Blob`，因此`JS`可以对数据进行交互，甚至保存为文件

# 文件读取和发送

- 从文件中读取二进制数据，并且发送给另一个用户
- 数据通道和`Base64`编码有效结合

```js
var CHUNK_MAX = 16000;
function sendFile(file) {
    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var buffer = reader.result,
                start = 0,
                end = 0,
                last = false;

            function sendChunk() {
                end = start + CHUNK_MAX;

                if (end > file.size) {
                    end = file.size;
                    last = true;
                }

                var percentage = Math.floor((end / file.size) * 100);
                statusText.innerHTML = "Sending... " + percentage + "%";

                dataChannel.send(arrayBufferToBase64(buffer.slice(start, end)));

                // If this is the last chunk send our end message, otherwise keep sending
                if (last === true) {
                    dataChannelSend({
                        type: "end"
                    });
                } else {
                    start = end;
                    // Throttle the sending to avoid flooding
                    setTimeout(function () {
                        sendChunk();
                    }, 100);
                }
            }

            sendChunk();
        }
    };

    reader.readAsArrayBuffer(file);
}
```

- 实例化`FileReader`对象
- 封装了`JavaScript`中使用不同格式读取文件的方法
- 以`ArrayBuffer`的形式读取二进制文件

# 文件读取的流程

1. 确认`FileReader`对象在`DONE`状态
2. 初始化并获取文件数据的缓冲区引用
3. 建立一个递归函数，实现发送文件块的功能
4. 在函数中，从0开始读取一个文件块的字节
5. 确保没有超过文件尾，否则没有数据可读
6. 将数据通过`Base64`格式进行编码，并且进行发送
7. 如果是最后一个文件块，告诉另一个用户已经完成文件发送
8. 还有数据需要传输，在固定的时间后发送另一个分块防止`API`发生洪泛
9. `sendChunk`开始递归

# 在接收端组合文件块

- 由于在数据通道中使用了`Ordered`选项，用户收到的文件分块是有序的
- 解码函数将文件组合

```js
dataChannel.onmessage = function (event) {
    try {
        var message = JSON.parse(event.data);

        switch (message.type) {
            case "start":
                currentFile = [];
                currentFileSize = 0;
                currentFileMeta = message.data;
                console.log("Receiving file", currentFileMeta);
                break;
            case "end":
                saveFile(currentFileMeta, currentFile);
                break;
        }
        //如果是中间文件，将进入报错处理环节
    } catch (e) {
        // Assume this is file content
        currentFile.push(atob(event.data));

        currentFileSize += currentFile[currentFile.length - 1].length;

        var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
        statusText.innerHTML = "Receiving... " + percentage + "%";
    }
};
```

# 文件自动下载

```js
function saveFile(meta, data) {
    var blob = base64ToBlob(data, meta.type);
    console.log(blob);

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = meta.name;
    link.click();
}
```

- 文件数据转化成几个块
- 新建`link`对象，`url`指向数据，模拟点击下载
- `createObjectURL`创建伪位置



# 向用户展示进度

```js
if (end > file.size) {
    end = file.size;
    last = true;
}

var percentage = Math.floor((end / file.size) * 100);
statusText.innerHTML = "Sending... " + percentage + "%";
```

## 接受端

```js
// Assume this is file content
currentFile.push(atob(event.data));

currentFileSize += currentFile[currentFile.length - 1].length;

var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
statusText.innerHTML = "Receiving... " + percentage + "%";
```

# 总结

```js
var name,
    connectedUser;

var connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

// Handle all messages through this callback
connection.onmessage = function (message) {
    console.log("Got message", message.data);

    var data = JSON.parse(message.data);

    switch(data.type) {
        case "login":
            onLogin(data.success);
            break;
        case "offer":
            onOffer(data.offer, data.name);
            break;
        case "answer":
            onAnswer(data.answer);
            break;
        case "candidate":
            onCandidate(data.candidate);
            break;
        case "leave":
            onLeave();
            break;
        default:
            break;
    }
};

connection.onerror = function (err) {
    console.log("Got error", err);
};

// Alias for sending messages in JSON format
function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
};

var loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    theirUsernameInput = document.querySelector('#their-username'),
    connectButton = document.querySelector('#connect'),
    sharePage = document.querySelector('#share-page'),
    sendButton = document.querySelector('#send'),
    readyText = document.querySelector('#ready'),
    statusText = document.querySelector('#status');

sharePage.style.display = "none";
readyText.style.display = "none";

// Login when the user clicks the button
loginButton.addEventListener("click", function (event) {
    name = usernameInput.value;

    if (name.length > 0) {
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if (success === false) {
        alert("Login unsuccessful, please try a different name.");
    } else {
        loginPage.style.display = "none";
        sharePage.style.display = "block";

        // Get the plumbing ready for a call
        startConnection();
    }
};

var yourConnection, connectedUser, dataChannel, currentFile, currentFileSize, currentFileMeta;

function startConnection() {
    if (hasRTCPeerConnection()) {
        setupPeerConnection();
    } else {
        alert("Sorry, your browser does not support WebRTC.");
    }
}

function setupPeerConnection() {
    var configuration = {
        "iceServers": [{ "url": "stun:127.0.0.1:8888" }]
    };
    yourConnection = new RTCPeerConnection(configuration, {optional: []});

    // Setup ice handling
    yourConnection.onicecandidate = function (event) {
        if (event.candidate) {
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    };

    openDataChannel();
}

function openDataChannel() {
    var dataChannelOptions = {
        ordered: true,
        reliable: true,
        negotiated: true,
        id: 0
    };
    dataChannel = yourConnection.createDataChannel('myLabel', dataChannelOptions);

    dataChannel.onerror = function (error) {
        console.log("Data Channel Error:", error);
    };

    dataChannel.onmessage = function (event) {
        try {
            var message = JSON.parse(event.data);

            switch (message.type) {
                case "start":
                    currentFile = [];
                    currentFileSize = 0;
                    currentFileMeta = message.data;
                    console.log(`message.data: `)
                    console.log(message.data)
                    console.log("Receiving file", currentFileMeta);
                    break;
                case "end":
                    saveFile(currentFileMeta, currentFile);
                    break;
            }
        } catch (e) {
            // Assume this is file content
            currentFile.push(atob(event.data));

            currentFileSize += currentFile[currentFile.length - 1].length;

            var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
            statusText.innerHTML = "Receiving... " + percentage + "%";
        }
    };

    dataChannel.onopen = function () {
        readyText.style.display = "inline-block";
    };

    dataChannel.onclose = function () {
        readyText.style.display = "none";
    };
}

// Alias for sending messages in JSON format
function dataChannelSend(message) {
    dataChannel.send(JSON.stringify(message));
}

function saveFile(meta, data) {
    var blob = base64ToBlob(data, meta.type);
    console.log(blob);

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = meta.name;
    link.click();
}

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;
    window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate;
    return !!window.RTCPeerConnection;
}

function hasFileApi() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

connectButton.addEventListener("click", function () {
    var theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0) {
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

    // Begin the offer
    yourConnection.createOffer(function (offer) {
        send({
            type: "offer",
            offer: offer
        });
        yourConnection.setLocalDescription(offer);
    }, function (error) {
        alert("An error has occurred.");
    });
};

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(function (answer) {
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    }, function (error) {
        alert("An error has occurred");
    });
};

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
};

function onCandidate(candidate) {
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
};

function onLeave() {
    connectedUser = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    setupPeerConnection();
};

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
}

function base64ToBlob(b64Data, contentType) {
    contentType = contentType || '';

    var byteArrays = [], byteNumbers, slice;

    for (var i = 0; i < b64Data.length; i++) {
        slice = b64Data[i];

        byteNumbers = new Array(slice.length);
        for (var n = 0; n < slice.length; n++) {
            byteNumbers[n] = slice.charCodeAt(n);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

var CHUNK_MAX = 16000;
function sendFile(file) {
    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var buffer = reader.result,
                start = 0,
                end = 0,
                last = false;

            function sendChunk() {
                end = start + CHUNK_MAX;

                if (end > file.size) {
                    end = file.size;
                    last = true;
                }

                var percentage = Math.floor((end / file.size) * 100);
                statusText.innerHTML = "Sending... " + percentage + "%";

                dataChannel.send(arrayBufferToBase64(buffer.slice(start, end)));

                // If this is the last chunk send our end message, otherwise keep sending
                if (last === true) {
                    dataChannelSend({
                        type: "end"
                    });
                } else {
                    start = end;
                    // Throttle the sending to avoid flooding
                    setTimeout(function () {
                        sendChunk();
                    }, 100);
                }
            }

            sendChunk();
        }
    };

    reader.readAsArrayBuffer(file);
}

sendButton.addEventListener("click", function (event) {
    var files = document.querySelector('#files').files;

    if (files.length > 0) {
        dataChannelSend({
            type: "start",
            data: files[0],
            name: files[0].name
        });
        console.log(`datachannel start[0]: `)
        console.log(files[0])
        sendFile(files[0]);
    }
});

```

# 完整的信令服务器

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888}),
    users = {};

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data, conn;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }


        switch(data.type) {
            case "login":
                console.log("User logged in as", data.name);
                if(users[data.name]) {
                    sendTo(connection, {
                        type: "login",
                        success: false
                    });
                }else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo(connection, {
                        type: "login",
                        success: true
                    });
                }
                break;
            
            case "offer":
                console.log("sending offer to:", data.name);
                conn = users[data.name];

                if(conn != null){
                    connection.otherName = data.name;
                    sendTo(conn, {
                        type: "offer",
                        offer: data.offer,
                        name: connection.name
                    });
                }
                break;

            case "answer":
                console.log("sending answer to:", data.name);
                conn = users[data.name];

                if(conn != null){
                    connection.otherName = data.name;
                    sendTo(conn, {
                        type: "answer",
                        answer: data.answer
                    })
                }
                break;

            case "candidate":
                console.log("sending to", data.name);
                conn = users[data.name];

                if(conn != null){
                    sendTo(conn, {
                        type: "candidate",
                        candidate: data.candidate
                    });
                }
                break;
            
            case "leave":
                console.log("Disconnected user from ", data.name);
                conn = users[data.name];
                conn.otherName = null;

                if(conn != null){
                    sendTo(conn, {
                        type: "leave"
                    });
                }
                break;
                
            default:
                sendTo(connection, {
                    type: "error",
                    message: "Unrecognized command: " + data.type
                });

                break;
        }
    });

});

wss.on("close", function(){
    if(connection.name){
        delete users[connection.name];

        if(connection.otherName) {
            console.log("Disconnected,",connection.otherName);
            let conn = users[connection.otherName];
            conn.otherName = null;

            if(conn != null){
                sendTo(conn,{
                    type: "leave"
                });
            }
        }
    }
});

wss.on("listening", () => {
    console.log("Server started...");
});

function sendTo(conn, message) {
    conn.send(JSON.stringify(message));
}
```

