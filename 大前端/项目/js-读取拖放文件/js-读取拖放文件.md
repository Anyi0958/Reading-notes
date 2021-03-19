js-��ȡ�Ϸ��ļ� Ŀ¼
[TOC]
***

# ǰ��

- `H5`�Ϸ�`API`��`File API`��ϣ������ļ���Ϣ�Ĺ���
- `drop`��`event.dataTransfer.files`

# �Ƽ��Ķ�

- ��JS �߼�������ơ�

# Ч��չʾ

![image-20210319010733082](.\img\0-drag.png)

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

