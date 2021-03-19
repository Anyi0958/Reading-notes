js-EventSource,ajax������,server-sent Event��������� Ŀ¼
[TOC]
***

# ǰ��

- �������������¼���Come����
- ������Ϣ������ģ�`Server Sent Event`
- ����������Э�顣ֻ���Ƿ���������ʲô����ʾʲô
- ����Ӧ�ã�����Ӧ�á���Ʊ���顢��������
- ����ͷ��Ҫ����Ϊ��`Content-Type: text/event-stream`
- ��ѯ���ͻ��˸�һ��ʱ�������������һ������
- ����ѯ���ͻ��˷�һ�����󵽷�����������������������ֱ����������Ҫ�����ٷ��ظ��ͻ��ˣ��ͻ����յ����ٴη�������(HTTP����һֱά����ֱ�����ء�)
- Server Send Event�� ����Э�飬����HTTP,���ķ�ʽ���ݣ����ǳ���ѯ
- Websocket��H5Э�� �����ĳ־����ӣ�����TCP��ȫ˫��ͨ��,����Ҫ�ظ���headerͷ,�������ֵ�ʱ��ʹ��httpЭ�飬�Ժ�����ݾͲ���Ҫ�ˡ�
  - WebSocket���ṩʹ��һ��TCP���ӽ���˫��ͨѶ�Ļ��ƣ���������Э���API����ȡ����ҳ�ͷ���������HTTP��ѯ����˫��ͨѶ�Ļ��ơ�
  - ��������˵��WebSocket�ǲ�����HTTPЭ��ģ����������ִ������HTTP������ʩ���������ˣ������֤�ȵȣ�WebSocket����HTTP��HTTPS�Ķ˿�
  - ����ʹ��HTTP�Ķ˿ڣ����TCP���ӽ������������Ϣ�ǻ���HTTP�ģ��ɷ������ж�����һ��HTTPЭ�飬����WebSocketЭ�顣 WebSocket���ӳ��˽����͹ر�ʱ�����֣����ݴ����HTTPû�����ϵ��

# �Ƽ��Ķ�

- ��JSȨ��ָ�ϡ�

# ����չʾ

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

    // ע������Ϣ��֪ͨ
    let chat = new EventSource("http://127.0.0.1:8080/");
    // ����һ����Ϣ
    chat.onmessage = event => {
        let msg = event.data,
            node = document.createElement(msg),
            div = document.createElement("div");
        div.appendChild(node);
        document.body.insertBefore(div, input);
        input.scrollIntoView();
    };

    // ����������
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
//php��ʽ
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>
```

# ����ʾ��

![image-20210319022636960](.\img\0-eventsource.png)

# `XMLHttpRequest`ģ��`EventSource`

```js
/* �ڲ�֧�� EventSource������������ģ��
��Ҫ��һ��XMLHttpRequest������������д�����ڴ��ڵ�HTTP������ʱ��
����readystatechange�¼�
��APIʵ�ֵĲ�����
��֧��readyState����,close()����,open��error�¼�
��Ϣ�¼�Ҳ��ͨ��onmessage����ע��ģ����˰汾û�ж���add EventListener()
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
                // ���ݿ鵽��ʱ
                case 3: processData();  break;
                // ����ر�ʱ
                case 4: reconnect();    break;
            }
        };

        // ͨ��connect����һ�����ڴ��ڵĳ�����
        connect();

        // ������������رգ��ȴ�1����ٳ�������
        function reconnect() {
            // ����ֹ���Ӻ󲻽�����������
            if(aborted) return;
            if(xhr.status >= 300)   return;
            // �ȴ�retrydelay����������
            setTimeout(connect, retrydelay);
        }

        // ����һ������
        function connect() {
            charsReceived = 0;
            type = null;

            xhr.open("GET", url);
            xhr.setRequestHeader("Cache-control", "no-cache");

            if(lastEventId) xhr.setRequestHeader("Last-Event-ID", lastEventId);
            xhr.send();
        }

        // ÿ�����ݵ����ʱ�򣬻ᴦ������onmessage�������
        // �����������Server-Send EventsЭ���ϸ��
        function processData() {
            // ���û��׼���ã��ȼ����Ӧ����
            if(!type) {
                type = xhr.getResponseHeader('Content-Type');

                if(type !== "text/event-stream"){
                    aborted = true;
                    xhr.abort();
                    return;
                }
            }

            // ��¼���յ�����
            // ��ȡ��Ӧ��δ���������
            let chunk = xhr.responseText.substring(charsReceived);
            charsReceived = xhr.responseText.length;

            // �������ı����ݷֳɶ��в���������
            let lines = chunk.replace(/(\r\n|\r|\n)$/, "").split(/\r\n|\r|\n/);
            for(let i = 0; i < lines.length; i++) {
                let line = lines[i],
                    pos = line.indexOf(":"),
                    name,
                    value = "";
                
                // ����ע��
                if(pos == 0)    continue;
                // �ֶ����ƣ�ֵ
                if(pos > 0) {
                    name = line.substring(0, pos);
                    value = line.substring(pos+1);
                    if(value.charAt(0) == " ")  value = value.substring(1);
                }else {
                    // ֻ���ֶ�����
                    name = line;
                }

                switch(name){
                    case "event":   eventName = value; break;
                    case "data":    data += value + "\n"; break;
                    case "id":  lastEventId = value; break;
                    case "retry": retrydelay = parseInt(value) || 1000; break;
                    default: break;
                }

                // һ��������ζ�ŷ����¼�
                if(line === ""){
                    if(evtsrc.onmessage && data !== ""){
                        // ���ĩβ�����У��Ͳü�����
                        if(data.charAt(data.length-1) == '\n'){
                            data = data.substring(0, data.length - 1);
                        }

                        // α����¼�����
                        evtsrc.onmessage({
                            type: eventName,    // �¼�����
                            data: data,         // �¼�����
                            origin: url         // ����Դ
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

# `Server-Sent Event`���������

```js
/* 
* ��������õ��Ƿ�������Node
* �������ҵ�ʵ�ֱȽϼ򵥣���������ȫ������
* ���µ���Ϣ�� POST ���͵�/chat��ַ, ������GET��ʽ��ͬһ��URL��ȡ��Ϣ���ı�/�¼���
* ����һ��GET����"/"������һ���򵥵�HTML�ļ�
* ����ļ������ͻ�������UI
*/
const http = require('http');
const { request } = require('node:http');

// ����ͻ���ʹ�õ�HTML�ļ�
const clientui  = require('fs').readFileSync("chatclient.html");
const emulation = require('fs').readFileSync("EventSourceEmulation.js");

// ServerResponse�������飬���ڽ��շ��͵��¼�
let clients = [];

// ÿ20�뷢��һ��ע�͵��ͻ���
// �������ǾͲ���ر�����������
setInterval(() => {
    clients.forEach(client => client.write(":ping?n"));
},20000);

// ����һ���·�����
let server = new http.Server();

// ����������ȡ��һ���µ�����,�����Ǹ��ص�����
server.on("request", (request, response) => {
    // ���������URL
    let url = require("url").parse(request.url);

    // ��������Ƿ��͵�"/", �������ͷ��Ϳͻ���������UI
    if(url.pathname === '/') {
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write(`<script>${emulation}</script>`);
        response.write(clientui);
        response.end();
        return;
    }else if(url.pathname !== "/chat") {
        // ��������Ƿ��͵�"/chat"֮��ĵط�,�򷵻�404
        response.writeHead(404);
        response.end();
        return;
    }

    // �������������post,��ô����һ���ͻ��˷�����һ���µ���Ϣ
    if(request.method === "POST"){
        request.setEncoding("utf8");
        let body = "";
        // �ٻ�ȡ������֮��,������ӵ�����������
        request.on("data", chunk => {
            body += chunk;
        });

        // ���������ʱ,����һ������Ӧ
        // ������Ϣ���������д��ڼ���״̬�Ŀͻ�����
        request.on("end", function() {
            // ��Ӧ������
            response.writeHead(200);
            response.end();

            // ����Ϣת�����ı�/�¼�����ʽ
            // ȷ��ÿһ�е�ǰ׺����"data:"
            // �����������з�����
            message = 'data:' + body.replace('\n', '\ndata: ') + "\r\n\r\n";

            // ������Ϣ�����м����Ŀͻ���
            clients.forEach(client => client.write(message));
        });
    }

    // ����,�ͻ�������������Ϣ��
    else {
        // �������POST���͵�����,��ͻ�����������һ����Ϣ
        response.writeHead(200, {'Content-Type':"text/event-stream"});
        response.write("data: Connected\n\n");

        // ����ͻ��˹ر�������
        // �ӻ�ͻ���������ɾ����Ӧ����Ӧ����
        request.connection.on("end", function() {
            clients.splice(clients.indexOf(response), 1);
            response.end();
        });

        // ������Ӧ����, �����Ϳ�����������δ������Ϣ
        clients.push(response);
    }

});

// start server
server.listen(8000);
```

