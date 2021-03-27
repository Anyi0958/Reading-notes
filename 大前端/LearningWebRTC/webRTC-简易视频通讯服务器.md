webRTC-������ƵͨѶ������ Ŀ¼
[TOC]
***

# ǰ��

- ���Ļ���`webSocket`������һ��������ƵͨѶ

# �Ƽ��Ķ�

- ��Learning WebRTC��

# ��������

- �ӿͻ��˻�ȡ��������������
- ʶ��������Ӷ˵��û�
- ����Զ���û�����ͨ��
- ����ͨ��

# չʾЧ��

![image-20210324010137677](.\img\5-show.png)

# ����

- ��������ҳ�棺�����û��������������û�

## ����ҳ��

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body{
        background-color: #3D6DF2;
        margin-top: 15px;
        font-family: sans-serif;
        color: white;
    }

    video {
        background: black;
        border: 1px solid gray;
    }

    .page {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
    }

    #yours{
        width: 150px;
        height: 150px;
        position: absolute;
        top: 15px;
        right: 15px;
    }

    #theirs {
        width: 500px;
        height: 500px;
    }
</style>
<body>
    <div id="login-page" class="page">
        <h2>Login As</h2>
        <input type="text" id="username">
        <button id="login">Login</button>
    </div>

    <div id="call-page" class="page">
        <video id="yours" autoplay></video>
        <video id="theirs" autoplay></video>

        <input type="text" id="their-username">
        <button id="call">Call</button>
        <button id="hang-up">Hang Up</button>
    </div>
</body>
<script src="client.js"></script>
</html>
```

# ��ȡһ������

- �������������������

```js
let name,
    connectedUser;

let connection = new WebSocket('ws://localhost:8888');

connection.onopen = function() {
    console.log("Connected");
};

connection.onmessage = function(message){
    console.log("Got message", message.data);

    let data = JSON.parse(message.data);

    switch(data.type){
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

connection.onerror = function(err) {
    console.log(err);
}

function send(message) {
    if(connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}
```

# ��¼

```js
let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    callPage = document.querySelector('#call-page'),
    theirUsernameInput = document.querySelector('#theirusername'),
    callButton = document.querySelector('#call'),
    hangUpButton = document.querySelector('#hang-up');

callPage.style.display = 'none';

loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if(name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if(success === false){
        alert("Login unsuccessfully, please try a different name.");
    }else {
        loginPage.style.display = 'none';
        callPage.style.display = 'block';
    }

    // ׼����ͨ����ͨ��
    startConnection();

}
```

# ��ʼ�Ե�����

1. ������л�ȡ��Ƶ��
2. ��֤�û���������Ƿ�֧��`WebRTC`
3. ����`RTCPeerConnection`����

```js
let yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection,
    connectedUser,
    stream;

function startConnection() {
    if(hasUserMedia()){
        navigator.getUserMedia({
            video: true,
            audio: true
        },
        myStream => {
            stream = myStream;
            
            try{
                yourVideo.src = window.URL.createObjectURL(stream);
            }catch(e){
                yourVideo.srcObject = stream;
            }

            if(hasRTCPeerConnection()){
                setupPeerConnection(stream);
            }else{
                alert("��֧��webRTC");
            }
        },
        error => {
            console.log(error);
        }
        );
    }else{
        alert("��֧��webRTC");
    }
}

function setupPeerConnection(stream) {
    let configuration = {
        "iceServers":[
            {"url":"stun:localhost:8888"}
        ]
    };

    yourConnection = new RTCPeerConnection(configuration);

    // ������������
    yourConnection.addStream(stream);
    yourConnection.onaddstream = function(e) {
        try{
            theirVideo.src = window.URL.createObjectURL(e.stream);
        }catch(e){
            theirVideo.srcObject = stream;
        }
    };

    yourConnection.onicecandidate = function(event) {
        if(event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    };
}

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
```

# ����ͨ��

- `setLocalDescription()`�����������ӹ����ı�����������˵��ָ�����ӵı��ض˵����ԣ�����ý���ʽ��
- `setRemoteDescription()`����ָ���ĻỰ��������ΪԶ�̶Եȷ��ĵ�ǰ�ṩ��Ӧ������ָ������Զ�˵����ԣ�����ý���ʽ��
- `addIceCandidate()`��ͨ�������ŵ���Զ�̶Եȷ������µ�ICE��ѡ����ͨ�����ý��½��յĺ�ѡ���͵��������ICE����

```js
callButton.addEventListener('click', function(){
    let theirUsername = theirUsernameInput.value;

    if(theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

    // offer
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });
        yourConnection.setLocalDescription(offer);
    },
    err => {
        alert("An error has occurred");
    });
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(function(answer){
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    err =>{
        alert("An error");
    }
    );
}

function onAnswer(answer){
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate){
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
```

# ���ͨ��

- ����ʵʱӦ�������ڣ�����¼�������ͬһʱ�̣�Ҫ��������ĳһʱ�̷�����ʲô����

- `Chrome`��`View`->`Developer`->`Developer Tools`���Կ���`webSocket`��ͨ��״̬

# �Ҷϵ绰

- ֪ͨ�����û��ر�ͨ��
- ���ٱ������ӣ���������µ�ͨ��

## ����

1. ֪ͨ���������Ͽ�����
2. ֪ͨ`RTCPeerConnection`�رգ�ֹͣ�����������������û�
3. �ٴ����ã�����ʵ������Ϊ��״̬���Խ����µ�ͨ��

```js
hangUpButton.addEventListener("click", ()=>{
    send({
        type: "leave"
    });

    onLeave();
});

function onLeave() {
    connectedUser = null;
    theirVideo.srcObject = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    yourConnection.onaddstream = null;
    setupPeerConnection(stream);
}
```

# `webRTC`ȫ�������ܽ�

- ȫ����������

```js
// ��������
let name,
    connectedUser;

let connection = new WebSocket('ws://localhost:8888');

let yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection,
    stream;

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    callPage = document.querySelector('#call-page'),
    theirUsernameInput = document.querySelector('#their-username'),
    callButton = document.querySelector('#call'),
    hangUpButton = document.querySelector('#hang-up');

callPage.style.display = 'none';

// �����ť��¼
loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if(name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

// websocket ����
connection.onopen = function() {
    console.log("Connected");
};

// ����websocket��Ϣ
connection.onmessage = function(message){
    console.log("Got message", message.data);

    let data = JSON.parse(message.data);

    switch(data.type){
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

// websocket������Ϣ
connection.onerror = function(err) {
    console.log(err);
}

// Alia ��JSON��ʽ������Ϣ
function send(message) {
    if(connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}

function onLogin(success) {
    if(success === false){
        alert("Login unsuccessfully, please try a different name.");
    }else {
        loginPage.style.display = 'none';
        callPage.style.display = 'block';
    }

    // ׼����ͨ����ͨ��
    startConnection();
}

// call����
callButton.addEventListener('click', function(){
    let theirUsername = theirUsernameInput.value;

    if(theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

// �Ҷ�
hangUpButton.addEventListener("click", ()=>{
    send({
        type: "leave"
    });

    onLeave();
});

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(function(answer){
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    err =>{
        alert("An error");
    }
    );
}

function onAnswer(answer){
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate){
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}


function onLeave() {
    connectedUser = null;
    theirVideo.srcObject = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    yourConnection.onaddstream = null;
    setupPeerConnection(stream);
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

// ��ʼ����
function startConnection() {
    if(hasUserMedia()){
        navigator.getUserMedia({
            video: true,
            audio: false
        },
        myStream => {
            stream = myStream;
            
            try{
                yourVideo.src = window.URL.createObjectURL(stream);
            }catch(e){
                yourVideo.srcObject = stream;
            }

            if(hasRTCPeerConnection()){
                setupPeerConnection(stream);
            }else{
                alert("��֧��webRTC");
            }
        },
        error => {
            console.log(error);
        }
        );
    }else{
        alert("��֧��webRTC");
    }
}

// 
function setupPeerConnection(stream) {
    let configuration = {
        "iceServers":[
            {"url":"stun:localhost:8888"}
        ]
    };

    yourConnection = new RTCPeerConnection(configuration);

    // ������������
    yourConnection.addStream(stream);
    yourConnection.onaddstream = function(e) {
        try{
            theirVideo.src = window.URL.createObjectURL(e.stream);
        }catch(e){
            theirVideo.srcObject = stream;
        }
    };
    // ����ICE�����¼�
    yourConnection.onicecandidate = function(event) {
        if(event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    };
}

// ��ʼ����offer
function startPeerConnection(user) {
    connectedUser = user;

    // offer
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });
        yourConnection.setLocalDescription(offer);
    },
    err => {
        alert("An error has occurred");
    });
}
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

