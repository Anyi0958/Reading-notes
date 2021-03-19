js-websocket 目录
[TOC]
***

# 前言

- 启用`websocket`：访问`about:config`，将`network.websocket.override-security-block`设置为`true`

# 推荐阅读

- 《JS权威指南》

# 例子展示

```js
const socket = new WebSocket("ws://ws.example.com:123/resource");

socket.onopen = function(e) {/套接字已经链接/}
socket.onclose = function(e) {/套接字已经关闭/}
socket.onerror = function(e) {/出错/}
socket.onmessage = function(e) { let message = e.data /服务器发送一条消息/}
```

# 代码实现

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
            
            // 打开一个webSocket，用于发送和接收聊天信息
            // 假设下载的http服务器作为websocket服务器运作，并且使用同样的主机名和端口
            // 只是协议由 http:// 变成 ws://
            let socket = new WebSocket("wss://localhost:8000/");

            // 如何通过websocket从服务器获取消息
            // 收到一条消息时
            socket.onmessage = function(event) {
                let msg = event.data,
                    node = document.createTextNode(msg),
                    div = document.createElement("div");
                div.appendChild(node);
                document.body.insertBefore(div, input);
                input.scrollIntoView();
            }

            // 下面展示了如何通过websocket发送消息给服务器端
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
* 此websocket服务器来自于 https://github.com/miksago/node-websocket-server/
* 通过websocket协议接收到的消息都仅广播给所有激活状态的链接 
 */
const http = require('http');
const ws = require('node-websocket-server');

// 启动，读取聊天客户端的资源文件
const clientui = require('fs').readFileSync('index.html');

// 创建一个http server
const httpserver = new http.Server();

// 当http服务器获得一个新请求时，运行此函数
httpserver.on("request", (request, response) => {
    // console.log(request.remoteAddress);
    // 如果请求"/",则返回客户端UI
    if(request.url === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(clientui);
        response.end();
    } else{
        response.writeHead(404);
        response.end();
    }
});

// http上包装一个websocket服务器
const wsserver = ws.createServer({server: httpserver});
// console.log(wsserver);
// 当接收到一个新的链接请求的时候，调用此函数
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

