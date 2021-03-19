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