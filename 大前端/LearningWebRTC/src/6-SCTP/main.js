yourConnection = new RTCPeerConnection(),
    received = document.getElementById("received");


function openDataChannel() {
    let dataChannelOptions = {
        reliable: true
    };

    dataChannel = yourConnection.createDataChannel("myLabel", dataChannelOptions);

    dataChannel.onerror = function (error){
        console.log("Data Channel Error: ", error);
    }

    dataChannel.onmessage = function (event) {
        console.log("Got Data Channel Message: ", event.data);

        received.innerHTML += "recv: " + event.data + "<br />";
        received.scrollTop = received.scrollHeight;
    };

    dataChannel.onopen = function () {
        dataChannel.send(name + "has connected.");
    };

    dataChannel.onclose = function (){
        console.log("The data channel is closed");
    };
}

//绑定文本输入框和消息接收区
let sendButton = document.getElementById('send');
sendButton.addEventListener('click', event => {
    let val = messageInput.value;
});