let peerConnection = new RTCPeerConnection();

let dataChannelOptions = {
    reliable: false,
    maxRetransmitTime: 3000
};


//建立对等连接使用信号
let dataChannel = peerConnection.createDataChannel("myLabel",
    dataChannelOptions);

dataChannel.onerror = function (error) {
    console.log("Data channel error:", error);
};

dataChannel.onmessage = function (event) {
    console.log("Data channel message:", event.data);

    let data = event.data;

    if (data instanceof Blob){

    }else if (data instanceof ArrayBuffer) {

    }else if (data instanceof ArrayBufferView){

    }else {
    //    string
    }
}

dataChannel.onopen = function () {
    console.log("Data channel opened, ready to send message!");
    dataChannel.send("Hello World!");
}

dataChannel.onclose = function () {
    console.log("Data channel has been closed");
}