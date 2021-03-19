js-websocket Ŀ¼
[TOC]
***

# ǰ��

- ����`websocket`������`about:config`����`network.websocket.override-security-block`����Ϊ`true`

# �Ƽ��Ķ�

- ��JSȨ��ָ�ϡ�

# ����չʾ

```js
const socket = new WebSocket("ws://ws.example.com:123/resource");

socket.onopen = function(e) {/�׽����Ѿ�����/}
socket.onclose = function(e) {/�׽����Ѿ��ر�/}
socket.onerror = function(e) {/����/}
socket.onmessage = function(e) { let message = e.data /����������һ����Ϣ/}
```

# ����ʵ��

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
<body>
    <input id="input" style="width: 100%;">
<script>
        window.onload = function () {
            let nick = prompt("Enter your name:"),
                input = document.getElementById('input');
                input.focus();
            
            // ��һ��webSocket�����ڷ��ͺͽ���������Ϣ
            // �������ص�http��������Ϊwebsocket����������������ʹ��ͬ�����������Ͷ˿�
            // ֻ��Э���� http:// ��� ws://
            let socket = new WebSocket("wss://localhost:8000/");

            // ���ͨ��websocket�ӷ�������ȡ��Ϣ
            // �յ�һ����Ϣʱ
            socket.onmessage = function(event) {
                let msg = event.data,
                    node = document.createTextNode(msg),
                    div = document.createElement("div");
                div.appendChild(node);
                document.body.insertBefore(div, input);
                input.scrollIntoView();
            }

            // ����չʾ�����ͨ��websocket������Ϣ����������
            input.onchange = function() {
                let msg = nick + ':' + input.value;
                socket.onopen = event => {
                    socket.send(msg);
                }
                input.value = "";
            }
            
            socket.onmessage = function(e) {
                    let message = e.data;
                    console.log(e);
            }
        };
</script>
</body>
</html>
```

## `websocketServer.js`

```js
/*
* ��websocket������������ https://github.com/miksago/node-websocket-server/
* ͨ��websocketЭ����յ�����Ϣ�����㲥�����м���״̬������ 
 */
const http = require('http');
const ws = require('node-websocket-server');

// ��������ȡ����ͻ��˵���Դ�ļ�
const clientui = require('fs').readFileSync('index.html');

// ����һ��http server
const httpserver = new http.Server();

// ��http���������һ��������ʱ�����д˺���
httpserver.on("request", (request, response) => {
    // console.log(request.remoteAddress);
    // �������"/",�򷵻ؿͻ���UI
    if(request.url === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(clientui);
        response.end();
    } else{
        response.writeHead(404);
        response.end();
    }
});

// http�ϰ�װһ��websocket������
const wsserver = ws.createServer({server: httpserver});
// console.log(wsserver);
// �����յ�һ���µ����������ʱ�򣬵��ô˺���
wsserver.on("connection", function(socket) {
    console.log(`${socket}:start`);
    socket.send("welcome to the chat room.");
    socket.on("message", msg => {
        console.log(msg);
        wsserver.broadcast(msg);
    });
});

wsserver.on('text', socket => {
    console.log(socket);
});

wsserver.listen(8000);
```

