let myConnection = new RTCPeerConnection();
myConnection.onaddstream = stream => console.log(stream);