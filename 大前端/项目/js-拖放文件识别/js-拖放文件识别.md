js-拖放文件识别 目录
[TOC]
***

# 前言

- `Chrome`是唯一支持文件系统`API`的浏览器
- 实现了`Drag Enter`和`Drag Over`事件的反应
- 通过`FileSystem API`在文件系统上申请`5 MB`空间

不足：

- 仅在`Chrome`实现

# 代码展示

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
    <canvas id="canvas"></canvas>
    <script src="drag.js"></script>
</body>
</html>
```



```js
// main.js
let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// 阻止浏览器的默认处理
canvas.addEventListener('dragenter', event => {
    event.preventDefault();

    event.dataTransfer.effectAllowed = 'copy';
}, false);

canvas.addEventListener('dragover', event => {
    event.preventDefault();    
}, false);

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

canvas.addEventListener('drop', event => {
    let file = event.dataTransfer.files[0];

    window.requestFileSystem(window.TEMPORARY, 5*1024*1024, fs => {
        fs.root.getFile(file.name, { creaye: true },
            fileEntry => {
                fileEntry.createWriter(writer => {
                    writer.write(file);
                });

                alert(`success: ${fileEntry.toURL()}`);
            },
            err => {
                alert(err.code);
            }
            );
    },
        err => alert(err.code)
    );
}, false);
```

