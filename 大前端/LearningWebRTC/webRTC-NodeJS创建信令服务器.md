webRTC-NodeJS创建信令服务器 目录
[TOC]
***

# 前言

- 本文取自《Learning WebRTC》
- 创建完整的`WebRTC`应用，需要抛开客户端的开发，转而为服务端的开发

# 推荐阅读

- 《Learning WebRTC》

# 构建信令服务器

- 将不在同一个电脑中的两个用户连接起来
- 服务器的目的是通过网络传输代替原先的信令机制
- 对多个用户做出回应：
  - 允许一方用户呼叫另一方从而在双方间建立`WebRTC`连接
  - 一旦用户呼叫了另一方，服务器将会在双方间传递请求，应答和`ICE`候选路径

![05](.\img\5-ICE.png)

# 流程

- 服务器建立连接时的信息流
- 登陆服务器开始，登录向服务器端发送一个字符串形式的用户标识，确保没有被使用
- 登录进入，开始呼叫，通过使用对方的标识码发送请求
- 发送离开信息来终止连接
- 此流程主要用来作为互相发送信息的通道

# 注意

- 由于发送信令的实现没有任何规则，可以使用任意协议、技术或者模式

# `WebSockets`

- 建立`WebRTC`连接所需的步骤必须是实时的，最好使用`WebSockets`，不能使用`WebRTC`对等连接实时传递消息

- `Socket`以字符串和二进制码方式双向发送信息
- 完全依赖于`WebSocket`框架：`Meteor JavaScript framework`

- `npm`安装`websocket`：`npm install ws`
- `wscat`：`npm install wscat`

# `server.js`

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        console.log("Got message:", message);
    });

    connection.send("hello world!")
});
```

- 监听服务器端的`connection`事件，当用户与服务器建立`websocket`连接时，会调用此，并有连接方的所有信息

- 安装`wscat`进行测试：`npm install -g ws`, `wscat -c ws://localhost:8888`，或者前端测试

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
    <script>
        let websocket = new WebSocket("ws://localhost:8888");

    </script>
</body>
</html>
```

# 识别用户

- 典型的网络应用中，服务器需要一种方法来识别连接的用户
- 遵循唯一规则，让每一个用户有一个字符串形式的标识，即用户名

仅需一个`id`来标识

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }
    });

    connection.send("hello world!")
});
```

# 完整的信令服务器

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

