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

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    callPage = document.querySelector('#call-page'),
    theirUsernameInput = document.querySelector('#their-username'),
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

    // 准备好通话的通道
    startConnection();

}

let yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection,
    stream;

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
                alert("不支持webRTC");
            }
        },
        error => {
            console.log(error);
        }
        );
    }else{
        alert("不支持webRTC");
    }
}

function setupPeerConnection(stream) {
    let configuration = {
        "iceServers":[
            {"url":"stun:localhost:8888"}
        ]
    };

    yourConnection = new RTCPeerConnection(configuration);

    // 设置流量监听
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