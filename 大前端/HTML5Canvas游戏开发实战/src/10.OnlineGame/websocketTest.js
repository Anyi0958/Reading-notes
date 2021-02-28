let websocket = window.WebSocket || window.MozWebSocket;
let socket, msg;

function initial() {
    document.getElementById('closebtn').disabled = true;
    msg = document.getElementById('message');
}

function doOpen() {
    if(document.querySelector('#name').value == ''){
        alert('input your name:');
        return;
    }

    socket = new websocket('ws://localhost:80');
    socket.addEventListener('open', e => {
        let str1 = document.getElementById('name').value;
        socket.send('type=login&name=' + str1);
        console.log('send success.');
    });
    socket.addEventListener('message', e => {
        // console.log('socket链接成功');
        let value = getScript(e.data);
        let text;

        switch(value["result"]) {
            case "error":
                text = `<li>${value['error']}</li> ${msg.innerHTML}`;
                break;
            case "loginok":
                document.getElementById('name').value = value['name'];
                text = `<li>登录成功</li> ${msg.innerHTML}`;
                break;
            case "talk":
                text = `<li>${value['msg']}</li> ${msg.innerHTML}`;
                break;
            case "removeuser":
                removeUser(value['name']);
                break;
            case "setuserlist":
                removeAllUser();
                let list = value['list'].split(',');
                for(let i of list)  addUser(list[i]);
                break;
        }

        if(text)    msg.innerHTML = text;
    });
    socket.addEventListener('error', e => {
        alert('error!');
    });
    socket.addEventListener('close', e => {
        msg.innerHTML = "<li>切断服务器</li>" + msg.innerHTML;

        document.getElementById('name').disabled = false;
        document.getElementById('openbtn').disabled = false;
        document.getElementById('closebtn').disabled = true;
    });

    msg.innerHTML = "<li>连接成功</li>" + msg.innerHTML;

    document.getElementById('name').disabled = true;
    document.getElementById('openbtn').disabled = true;
    document.getElementById('closebtn').disabled = false;

}

function getScript(value){
    let valueArray = value.split('&');
    let arr;

    let scriptObj = {};

    for(let i in valueArray) {
        arr = valueArray[i].split('=');
        scriptObj[arr[0]] = arr[1];
    }

    return scriptObj;
}

function removeAllUser() {
    let list = document.getElementById('to');

    for(let i = 1, l = list.onsecuritypolicyviolation.length; i < l; i++){
        list.options.remove(l);
    }
}

function addUser(username) {
    let list = document.getElementById('to');
    if(!isExitUser(list, username)){
        let item = new Option(username, username);
        list.options.add(item);
    }

}

function isExitUser(username) {
    let list = document.getElementById('to');
    let isExit = false;

    for(let i = 0; i < list.options.length; i++){
        if(list.options[i].value == username){
            isExit = true;
            break;
        }
    }
    return isExit;
}



function doClose() {
    if(socket.readyState = WebSocket.OPEN)  socket.close();
}

function doAction() {
    if(socket.readyState == WebSocket.OPEN){
        let to = document.getElementById('to').value;
        let msg = document.getElementById('message').value;

        socket.send(`type=talk&target=${to}&msg=${msg}`);
        document.getElementById('message').value = '';
    } else {
        alert('connet failed.');
    }

    return false;
}