js-Blob浅析 目录
[TOC]
***

# 前言

`Blob`：

- 可以存储到数据库
- `postMessage`发送到其他窗口和`worker`
- `XMLHttpRequest`的`send`方法
- `createObjectURL()`获取特殊的`blob://URL`

# 推荐阅读

- 《JS权威指南》

# 文件作为`Blob`

- 如果是`drop`事件，可以使用`dataTransfer.files`

## `index.html` - `input`上传文件

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
    <!-- <input type="file" accept="image/*" multiple onchange="fileInfo(this.files)"/> -->
    <input type="file" accept="image/*" multiple/>
    <script src="fileBlob.js"></script>
</body>
</html>
```

## `js`

```js
let input = document.getElementsByTagName('input')[0];

input.addEventListener('change', event => {
    // console.log('a');
    // console.log(files);
    let filesList =input.files;
    console.log(filesList);
    for(let a = 0; a < filesList.length; a++){
        let i = filesList[a];
        console.log(i.name,
                i.size,
                i.type,
                i.lastModifiedDate);
    }
});

// function fileInfo(files) {
//     console.log(files);
//     for(let i = 0; i < files.length; i++){
//         let f = files[i];
//         console.log(f.name);
//     }
// }
```

# 下载`Blob`

- `XHR2` ：将`URL`指定的内容以`Blob`形式下载下来

```js
// 以Blob形式获取URL指定的内容，并将其传递给指定的回调函数
function getBlob(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    // 以blob的形式获取内容
    xhr.responseType = "blob";

    xhr.onload = () => {
        callback(xhr.response);
    };

    xhr.send(null);
}
```

# 构造`Blob`

- `Blob`常用来表示：本地文件、`URL`以及数据库外部资源的大数据快
- `web`用自己的数据做成`Blob`

```js
let blob = new BlobBuilder();

// add one word in Blob, use null as end of the string
blob.append("This blob contains this text and 10 big-endian 32-bit signed ints.");
blob.append("\0"); // NULL

// data store in  ArrayBuffer
let ab = new ArrayBuffer(4*10),
    dv = new DataView(ab);

for(let i = 0; i < 10; i++){
    dv.setInt32(i*4, i);
}

// add ArrayBuffer in Blob
blob.append(ab);
// get blob from builder, assign MIME Type
let result = blob.getBlob("x-optional/mime-type-here");
console.log(result);
```

- 但是`BlobBuilder`已经废弃

# `Blob URL`

- 创建一个`URL`指向该`Blob`
- `createObjectURL()`
- 该`URL`以`blob://`开始，与`data://URL`不同：
  - `blob://`：对浏览器存储在内存中或者磁盘上的`Blob`一个简单引用
  - 后者会对内容进行编码
- `Blob URL`并非是永久有效。一旦关闭了或者离开了包含创建`blob`脚本的文档，该链接就会失效

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
        #droptarget {
            border: solid black 2px;
            width: 200px;
            height: 200px;
        }

        #droptarget.active {
            border: solid red 4px;
        }
    </style>
</head>
<body>
    <div id="droptarget">Drop files here</div>
    <script src="blobFiles.js"></script>
</body>
</html>
```



## `blobFiles.js`

```js
const getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) ||
                    (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) ||
                    window.createObjectURL;

const revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) ||
                    (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) ||
                    window.revokeObjectURL;


let droptarget = document.getElementById('droptarget');

droptarget.ondragenter = event => {
    let types = event.dataTransfer.types;

    if(!types ||
        (types.contains && types.contains("Files")) ||
        (types.indexOf && types.indexOf("Files") != -1)){
            // 文件拖入高亮
            droptarget.classList.add("active");
            return false;
        }
};

droptarget.ondragover = event => false;

droptarget.ondrop = event => {
    let files = event.dataTransfer.files;
    for(let i = 0; i < files.length; i++) {
        let type = files[i].type;
        if(type.substring(0,6) !== "image/"){
            continue;
        }

        let img = document.createElement('img');
        img.src = getBlobURL(files[i]);
        // ES6中，箭头函数是没有argumens的
        img.onload = function() {
            console.log(arguments);
            this.width = 100;
            document.body.appendChild(img);
            // 避免内存泄露
            revokeBlobURL(this.src);
        };
    }

    droptarget.classList.remove('active');
    return false;
};
```



# 读取`Blob` - `FileReader`

- `Blob`是不透明的大数据块，只允许通过`Blob URL`访问

## 使用`FileReader`读取文本文件

```js
// 读取文本文件
function readFile(f) {
    let reader = new FileReader();
    reader.readAsText(f);
    reader.onload = function(event) {
        let text = reader.result;
        console.log(text);
        let out = document.getElementsByTagName('input')[0];
            out.appendChild(document.createTextNode(text));
    }

    reader.onerror = function(e) {
        console.log(`ERR: ${e}`);
    }
}

// 读取文件的前4个字节
function typefile(file) {
    let slice = file.slice(0,4);
    let reader = new FileReader();
    reader.readAsArrayBuffer(slice);
    reader.onload = function(e) {
        let buffer = reader.result;

        let view = new DataView(buffer);
        // 以高位优先字节顺序
        let magic = view.getUint32(0, false);

        switch(magic) {
            case 0x89504E47: file.verified_type = "image/png"; break;
            case 0x47494638: file.verified_type = "image/gif"; break;
            case 0x25504446: file.verified_type = "application/pdf"; break;
            case 0x504b0304: file.verified_type = "application/zip"; break;
        }

        console.log(file.name, file.verified_type);
    }
}
```



