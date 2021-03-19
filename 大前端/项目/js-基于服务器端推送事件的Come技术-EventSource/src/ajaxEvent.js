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