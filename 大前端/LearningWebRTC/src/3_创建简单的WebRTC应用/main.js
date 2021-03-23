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
    return !!window.RTCPeerConnection;
}

function startPeerConnection(stream) {
    let configuration = {
        "iceServers": [
            {"url": "stun:127.0.0.1:9876"}
        ]
    };

    yourConnection = new webkitRTCPeerConnection(configuration);
    theirConnection = new webkitRTCPeerConnection(configuration);

    // 创建ICE处理
    yourConnection.onicecandidate = event => {
        if(event.candidate){
            theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    theirConnection.onicecandidate = event => {
        if(event.candidate){
            yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    // 开始offer
    yourConnection.createOffer(offer => {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);

        theirConnection.createAnswer(offer => {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });

     // 监听流创建
    stream.getTracks().forEach(track => {
        yourConnection.addTrack(track, stream);
        theirConnection.onTrack = event => {
            try{
                theirVideo.src = window.URL.createObjectURL(event.stream);
            }catch(error){
                theirVideo.srcObject = event.stream;
            }

        };
    }); 
    
}

let yourVideo = document.querySelector("#yours");
let theirVideo = document.querySelector("#theirs");
let yourConnection, theirConnection;

if(hasUserMedia()){
    navigator.getUserMedia({
        video: true,
        audio: false
    }, stream => {
        
            try{
                yourVideo.src = window.URL.createObjectURL(stream);
            }catch(error){
                yourVideo.srcObject = stream;
            }


        if(hasRTCPeerConnection()){
            startPeerConnection(stream);
        } else {
            alert("你的浏览器不支持webRTC");
        }
    }, error => {
        alert("你的浏览器不支持WebRtc");
    });
}