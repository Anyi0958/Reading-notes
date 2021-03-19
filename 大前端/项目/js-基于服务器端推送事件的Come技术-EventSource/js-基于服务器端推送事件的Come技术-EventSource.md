js-EventSource,ajax长连接,server-sent Event聊天服务器 目录
[TOC]
***

# 前言

- 服务器端推送事件的Come技术
- 监听消息，单向的，`Server Sent Event`
- 服务器推送协议。只能是服务器推送什么，显示什么
- 常见应用：聊天应用、股票行情、新闻推送
- 报文头需要设置为：`Content-Type: text/event-stream`
- 轮询：客户端隔一段时间给服务器发送一个请求
- 长轮询：客户端发一个请求到服务器，服务器阻塞掉请求，直到有内容需要返回再返回给客户端，客户端收到后再次发出请求。(HTTP请求一直维持着直到返回。)
- Server Send Event： 轻量协议，基于HTTP,流的方式传递，还是长轮询
- Websocket：H5协议 真正的持久连接，基于TCP，全双工通信,不需要重复发header头,建立握手的时候使用http协议，以后的数据就不需要了。
  - WebSocket则提供使用一个TCP连接进行双向通讯的机制，包括网络协议和API，以取代网页和服务器采用HTTP轮询进行双向通讯的机制。
  - 本质上来说，WebSocket是不限于HTTP协议的，但是由于现存大量的HTTP基础设施，代理，过滤，身份认证等等，WebSocket借用HTTP和HTTPS的端口
  - 由于使用HTTP的端口，因此TCP连接建立后的握手消息是基于HTTP的，由服务器判断这是一个HTTP协议，还是WebSocket协议。 WebSocket连接除了建立和关闭时的握手，数据传输和HTTP没丁点关系了

# 推荐阅读

- 《JS权威指南》

# 代码展示

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
    <script src="main.js"></script>
</body>
</html>
```

## `main.js`

```js
window.onload = function() {
    let nick = prompt("Enter your name:"),
        input = document.getElementById('input');
        input.focus();

    // 注册新消息的通知
    let chat = new EventSource("http://127.0.0.1:8080/");
    // 捕获到一条消息
    chat.onmessage = event => {
        let msg = event.data,
            node = document.createElement(msg),
            div = document.createElement("div");
        div.appendChild(node);
        document.body.insertBefore(div, input);
        input.scrollIntoView();
    };

    // 发给服务器
    input.onchange = () => {
        let msg = nick + ":" + input.nodeValue,
            xhr = new XMLHttpRequest();
        xhr.open('POST', "http://127.0.0.1:8080/");
        xhr.setRequestHeader("COntent-type",
                        "text/plain;charset=UTF-8");
        
        xhr.send(msg);
        input.value = "";
    };
}
```

## `event.php`

```php
//php方式
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>
```

# 错误示范

![image-20210319022636960](.\img\0-eventsource.png)

# `XMLHttpRequest`模拟`EventSource`

```js
/* 在不支持 EventSource的浏览器里进行模拟
需要有一个XMLHttpRequest对象在新数据写到长期存在的HTTP连接中时，
发送readystatechange事件
此API实现的不完整
不支持readyState属性,close()方法,open和error事件
消息事件也是通过onmessage属性注册的，但此版本没有定义add EventListener()
 */
if(window.EventSource === undefined){
    window.EventSource = function(url) {
        let xhr,
            evtsrc = this,
            charsReceived = 0,
            type = null,
            data = "",
            eventName = "message",
            lastEventId = "",
            retrydelay = 1000,
            aborted = false;

        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            switch(xhr.readyState){
                // 数据块到达时
                case 3: processData();  break;
                // 请求关闭时
                case 4: reconnect();    break;
            }
        };

        // 通过connect创建一个长期存在的长连接
        connect();

        // 如果链接正常关闭，等待1秒后，再尝试链接
        function reconnect() {
            // 在终止链接后不进行重连操作
            if(aborted) return;
            if(xhr.status >= 300)   return;
            // 等待retrydelay秒后进行重连
            setTimeout(connect, retrydelay);
        }

        // 建立一个链接
        function connect() {
            charsReceived = 0;
            type = null;

            xhr.open("GET", url);
            xhr.setRequestHeader("Cache-control", "no-cache");

            if(lastEventId) xhr.setRequestHeader("Last-Event-ID", lastEventId);
            xhr.send();
        }

        // 每当数据到达的时候，会处理并触发onmessage处理程序
        // 这个函数处理Server-Send Events协议的细节
        function processData() {
            // 如果没有准备好，先检查响应类型
            if(!type) {
                type = xhr.getResponseHeader('Content-Type');

                if(type !== "text/event-stream"){
                    aborted = true;
                    xhr.abort();
                    return;
                }
            }

            // 记录接收的数据
            // 获取响应中未处理的数据
            let chunk = xhr.responseText.substring(charsReceived);
            charsReceived = xhr.responseText.length;

            // 将大块的文本数据分成多行并遍历他们
            let lines = chunk.replace(/(\r\n|\r|\n)$/, "").split(/\r\n|\r|\n/);
            for(let i = 0; i < lines.length; i++) {
                let line = lines[i],
                    pos = line.indexOf(":"),
                    name,
                    value = "";
                
                // 忽略注释
                if(pos == 0)    continue;
                // 字段名称：值
                if(pos > 0) {
                    name = line.substring(0, pos);
                    value = line.substring(pos+1);
                    if(value.charAt(0) == " ")  value = value.substring(1);
                }else {
                    // 只有字段名称
                    name = line;
                }

                switch(name){
                    case "event":   eventName = value; break;
                    case "data":    data += value + "\n"; break;
                    case "id":  lastEventId = value; break;
                    case "retry": retrydelay = parseInt(value) || 1000; break;
                    default: break;
                }

                // 一个空行意味着发送事件
                if(line === ""){
                    if(evtsrc.onmessage && data !== ""){
                        // 如果末尾有新行，就裁剪新行
                        if(data.charAt(data.length-1) == '\n'){
                            data = data.substring(0, data.length - 1);
                        }

                        // 伪造的事件对象
                        evtsrc.onmessage({
                            type: eventName,    // 事件类型
                            data: data,         // 事件数据
                            origin: url         // 数据源
                        });
                    }

                    data = "";
                    continue;
                }
            }
        }
    }
}
```

# `Server-Sent Event`聊天服务器

```js
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
```

