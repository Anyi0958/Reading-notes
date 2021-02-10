let myConnection = new RTCPeerConnection();
myConnection.addtrack = function(stream) {
    console.log(stream);
};