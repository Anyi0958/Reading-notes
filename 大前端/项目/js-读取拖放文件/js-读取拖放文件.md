js-读取拖放文件 目录
[TOC]
***

# 前言

- `H5`拖放`API`和`File API`结合，创建文件信息的功能
- `drop`和`event.dataTransfer.files`

# 推荐阅读

- 《JS 高级程序设计》

# 效果展示

![image-20210319010733082](.\img\0-drag.png)

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
    <style>
        #droptarget{
            background-color: aqua;
            width: 400px;
            height: 400px;
        }
    </style>
</head>
<body>
    <div id="droptarget"></div>
    <div id="output"></div>
    <script src="main.js"></script>
</body>
</html>
```

## `main.js`

```js
let dropTarget = document.getElementById('droptarget');

function handleEvent(event) {
    let info = '',
        output = document.getElementById('output'),
        files,
        i,
        len;
    event.preventDefault();

    if(event.type == 'drop'){
        files = event.dataTransfer.files;
        i = 0;
        len = files.length;

        while(i < len){
            info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br />`;
            i++;
        }
        output.innerHTML = info;
    }
}

dropTarget.addEventListener('dragenter', handleEvent);
dropTarget.addEventListener('dragover', handleEvent);
dropTarget.addEventListener('drop', handleEvent);
```

