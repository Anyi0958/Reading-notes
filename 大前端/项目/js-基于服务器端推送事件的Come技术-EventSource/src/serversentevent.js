/* 
* 这个例子用的是服务器的Node
* 该聊天室的实现比较简单，而且是完全匿名的
* 将新的消息以 POST 发送到/chat地址, 或者以GET形式从同一个URL获取消息的文本/事件流
* 创建一个GET请求到"/"来返回一个简单的HTML文件
* 这个文件包括客户端聊天UI
*/
const http = require('http');
const { request } = require('node:http');

// 聊天客户端使用的HTML文件
const clientui  = require('fs').readFileSync("chatclient.html");
const emulation = require('fs').readFileSync("EventSourceEmulation.js");

// ServerResponse对象数组，用于接收发送的事件
let clients = [];

// 每20秒发送一条注释到客户端
// 这样他们就不会关闭链接再重连
setInterval(() => {
    clients.forEach(client => client.write(":ping?n"));
},20000);

// 创建一个新服务器
let server = new http.Server();

// 当服务器获取到一个新的请求,运行那个回调函数
server.on("request", (request, response) => {
    // 解析请求的URL
    let url = require("url").parse(request.url);

    // 如果请求是发送到"/", 服务器就发送客户端聊天室UI
    if(url.pathname === '/') {
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write(`<script>${emulation}</script>`);
        response.write(clientui);
        response.end();
        return;
    }else if(url.pathname !== "/chat") {
        // 如果请求是发送到"/chat"之外的地方,则返回404
        response.writeHead(404);
        response.end();
        return;
    }

    // 如果请求类型是post,那么就有一个客户端发送了一条新的消息
    if(request.method === "POST"){
        request.setEncoding("utf8");
        let body = "";
        // 再获取到数据之后,将其添加到请求主体中
        request.on("data", chunk => {
            body += chunk;
        });

        // 当请求完成时,发送一个空响应
        // 并将消息传播到所有处于监听状态的客户端中
        request.on("end", function() {
            // 响应该请求
            response.writeHead(200);
            response.end();

            // 将消息转换成文本/事件流格式
            // 确保每一行的前缀都是"data:"
            // 并以两个换行符结束
            message = 'data:' + body.replace('\n', '\ndata: ') + "\r\n\r\n";

            // 发送信息给所有监听的客户端
            clients.forEach(client => client.write(message));
        });
    }

    // 此外,客户端正在请求信息流
    else {
        // 如果不是POST类型的请求,则客户端正在请求一组消息
        response.writeHead(200, {'Content-Type':"text/event-stream"});
        response.write("data: Connected\n\n");

        // 如果客户端关闭了连接
        // 从活动客户端数组中删除对应的响应对象
        request.connection.on("end", function() {
            clients.splice(clients.indexOf(response), 1);
            response.end();
        });

        // 记下响应对象, 这样就可以向它发送未来的消息
        clients.push(response);
    }

});

// start server
server.listen(8000);