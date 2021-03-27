webRTC-NodeJS������������� Ŀ¼
[TOC]
***

# ǰ��

- ����ȡ�ԡ�Learning WebRTC��
- ����������`WebRTC`Ӧ�ã���Ҫ�׿��ͻ��˵Ŀ�����ת��Ϊ����˵Ŀ���

# �Ƽ��Ķ�

- ��Learning WebRTC��

# �������������

- ������ͬһ�������е������û���������
- ��������Ŀ����ͨ�����紫�����ԭ�ȵ��������
- �Զ���û�������Ӧ��
  - ����һ���û�������һ���Ӷ���˫���佨��`WebRTC`����
  - һ���û���������һ����������������˫���䴫������Ӧ���`ICE`��ѡ·��

![05](.\img\5-ICE.png)

# ����

- ��������������ʱ����Ϣ��
- ��½��������ʼ����¼��������˷���һ���ַ�����ʽ���û���ʶ��ȷ��û�б�ʹ��
- ��¼���룬��ʼ���У�ͨ��ʹ�öԷ��ı�ʶ�뷢������
- �����뿪��Ϣ����ֹ����
- ��������Ҫ������Ϊ���෢����Ϣ��ͨ��

# ע��

- ���ڷ��������ʵ��û���κι��򣬿���ʹ������Э�顢��������ģʽ

# `WebSockets`

- ����`WebRTC`��������Ĳ��������ʵʱ�ģ����ʹ��`WebSockets`������ʹ��`WebRTC`�Ե�����ʵʱ������Ϣ

- `Socket`���ַ����Ͷ������뷽ʽ˫������Ϣ
- ��ȫ������`WebSocket`��ܣ�`Meteor JavaScript framework`

- `npm`��װ`websocket`��`npm install ws`
- `wscat`��`npm install wscat`

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

- �����������˵�`connection`�¼������û������������`websocket`����ʱ������ôˣ��������ӷ���������Ϣ

- ��װ`wscat`���в��ԣ�`npm install -g ws`, `wscat -c ws://localhost:8888`������ǰ�˲���

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

# ʶ���û�

- ���͵�����Ӧ���У���������Ҫһ�ַ�����ʶ�����ӵ��û�
- ��ѭΨһ������ÿһ���û���һ���ַ�����ʽ�ı�ʶ�����û���

����һ��`id`����ʶ

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

# ���������������

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

