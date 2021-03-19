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