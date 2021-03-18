js-�Ϸ��ļ�ʶ�� Ŀ¼
[TOC]
***

# ǰ��

- `Chrome`��Ψһ֧���ļ�ϵͳ`API`�������
- ʵ����`Drag Enter`��`Drag Over`�¼��ķ�Ӧ
- ͨ��`FileSystem API`���ļ�ϵͳ������`5 MB`�ռ�

���㣺

- ����`Chrome`ʵ��

# ����չʾ

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

// ��ֹ�������Ĭ�ϴ���
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

