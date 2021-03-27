`webRTC`-��Ե��ļ���������� Ŀ¼
[TOC]
***

# ǰ��

- ӵ�е�Ե�����ݴ��������������ļ�`API`����
- ����`WebRTC`��`Data Channel`�Լ��ļ�`API`������һ�����׵��ļ�����Ӧ��
  - ��Ҫ�������û�(peer)�乲�����ݵ�Ӧ��
  - ��Ӧ�õĻ���Ҫ����ʵʱ�ԣ������û�����ͬʱ��ҳ���ϣ��Թ���һ���ļ�

# �Ƽ��Ķ�

- ��Learning WebRTC��

# չʾ

![image-20210324011717704](.\img\0-delivery.png)



![image-20210324011829233](.\img\0-delivery2.png)



# ����

1. �û�`A`��ҳ�棬����һ��Ψһ��`ID`��
2. �û�`B`��ͬ����ҳ�棬������`A`��ͬ��`ID`��
3. �����û�ʹ��`RTCPeerConnection`ʵ�ֻ���
4. һ�����ӽ���������һ���û���ѡ��һ�������ļ����ڹ���
5. ��һ���û������ļ�����ʱ�յ�֪ͨ��������ļ�����ͨ�����Ӵ��䵽�Է��ļ��������������

- �������ʰȡ�ļ������ļ��ֿ鲢��ʹ��`RTCPeerConnection API`�����͸���һ���û�

# ʹ���ļ�`API`ʰȡ�ļ�

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

# ��Ե����Ӻ����ݹܵ�

```js
let name,
    connectedUser,
    connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

//����������Ϣ
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

//�������
connection.onerror = function (err) {
    console.log("Got error:", err);
}

//JSON��ʽ������Ϣ
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

//�û������ť��¼
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
        alert("Login ʧ�ܣ���ʹ�ò�ͬ������");
    }else{
        loginPage.style.display = 'none';
        sharePage.style.display = 'block';

    //    Ϊÿ������������
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
        alert("��֧��webRTC");
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

// ������polyfill
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

//�¼�����
connectButton.addEventListener("click", ()=>{
    let theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

//    ��ʼ�½���������
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

- ͨ�������������Ӧ���������û�������һ��
- ���ӽ���������������ͨ�����ط������������������Ϣ

# ��ȡ���ļ�������

```js
let name,
    connectedUser,
    connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

//����������Ϣ
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

//�������
connection.onerror = function (err) {
    console.log("Got error:", err);
}

//JSON��ʽ������Ϣ
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

//�û������ť��¼
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
        alert("Login ʧ�ܣ���ʹ�ò�ͬ������");
    }else{
        loginPage.style.display = 'none';
        sharePage.style.display = 'block';

    //    Ϊÿ������������
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
        alert("��֧��webRTC");
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

// ������polyfill
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

//�¼�����
connectButton.addEventListener("click", ()=>{
    let theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

//    ��ʼ�½���������
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

- `dataChannelSend, sendFile`��ʱ��д
- ��ʱ���Ի�ȡ�ļ�����Ϣ

# �ļ��ֿ�

- ����ͨ��ͨ��`SCTP`Э����д����ļ�
- ������粻�ѣ��ᵼ���ļ���ʧ
- ����`BitTorrent`ʵ���ļ����з֣�ÿ��ֻ��С��
- ������ʹ������ͨ��ǰʹ����һ��

# �ļ��ֿ�ɶ�

- ��Ϊ`JS`�ײ�Ҫ��ʹ���ַ�����ʽ����Ҫ����`Base64`����
- ���ͣ�ת��Ϊ`Base64`���� -> ���͹�ȥ��һ���û�������õ����

## ����

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

- ����Ϊ`ArrayBuffer`�����ļ�`API`��ȡ�ļ�����ʱ�ķ���ֵ
- `fromCharcode`תΪ�ַ�
- `bota`����

## ����

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

- `charCodeAt`ÿһ���ַ�ת���ɶ���������
- �õ�����������󣬽���ת��Ϊ`Blob`�����`JS`���Զ����ݽ��н�������������Ϊ�ļ�

# �ļ���ȡ�ͷ���

- ���ļ��ж�ȡ���������ݣ����ҷ��͸���һ���û�
- ����ͨ����`Base64`������Ч���

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

- ʵ����`FileReader`����
- ��װ��`JavaScript`��ʹ�ò�ͬ��ʽ��ȡ�ļ��ķ���
- ��`ArrayBuffer`����ʽ��ȡ�������ļ�

# �ļ���ȡ������

1. ȷ��`FileReader`������`DONE`״̬
2. ��ʼ������ȡ�ļ����ݵĻ���������
3. ����һ���ݹ麯����ʵ�ַ����ļ���Ĺ���
4. �ں����У���0��ʼ��ȡһ���ļ�����ֽ�
5. ȷ��û�г����ļ�β������û�����ݿɶ�
6. ������ͨ��`Base64`��ʽ���б��룬���ҽ��з���
7. ��������һ���ļ��飬������һ���û��Ѿ�����ļ�����
8. ����������Ҫ���䣬�ڹ̶���ʱ�������һ���ֿ��ֹ`API`�����鷺
9. `sendChunk`��ʼ�ݹ�

# �ڽ��ն�����ļ���

- ����������ͨ����ʹ����`Ordered`ѡ��û��յ����ļ��ֿ��������
- ���뺯�����ļ����

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
        //������м��ļ��������뱨������
    } catch (e) {
        // Assume this is file content
        currentFile.push(atob(event.data));

        currentFileSize += currentFile[currentFile.length - 1].length;

        var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
        statusText.innerHTML = "Receiving... " + percentage + "%";
    }
};
```

# �ļ��Զ�����

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

- �ļ�����ת���ɼ�����
- �½�`link`����`url`ָ�����ݣ�ģ��������
- `createObjectURL`����αλ��



# ���û�չʾ����

```js
if (end > file.size) {
    end = file.size;
    last = true;
}

var percentage = Math.floor((end / file.size) * 100);
statusText.innerHTML = "Sending... " + percentage + "%";
```

## ���ܶ�

```js
// Assume this is file content
currentFile.push(atob(event.data));

currentFileSize += currentFile[currentFile.length - 1].length;

var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
statusText.innerHTML = "Receiving... " + percentage + "%";
```

# �ܽ�

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

# ���������������

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

