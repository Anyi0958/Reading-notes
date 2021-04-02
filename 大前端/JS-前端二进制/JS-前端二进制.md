JS-前端二进制 目录
[TOC]
***

# 前言

- 前端二进制数据的整理和总结
- 介绍前端如何进行图片处理，然后穿插介绍二进制、Blob、Blob URL、Base64、Data URL、ArrayBuffer、TypedArray、DataView 和图片压缩相关的知识点

# 推荐阅读

- [玩转前端二进制](https://juejin.cn/post/6846687590783909902)
- 《JS高级编程》

# 整体介绍

![01](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cbdf36f833?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![02](https://user-gold-cdn.xitu.io/2020/7/5/1731f4ca00cdc946?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 图片预览

## 1. `FileReader API`

```js
let loadFile = document.getElementById('upload');

loadFile.addEventListener('change', event => {
    const reader = new FileReader();

    reader.onload = function(){
        const output = document.querySelector('#test');

        output.src = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);
});
```

- `readAsDataURL`方法，把本地图片对应的`File`对象转换为`Data URL`，再赋给`img`的`src`，从而实现图片本地预览
- 对于 `FileReader` 对象来说，除了支持把 File/Blob 对象转换为 Data URL 之外，它还提供了 `readAsArrayBuffer()` 和 `readAsText()` 方法，用于把 File/Blob 对象转换为其它的数据格式

- `dataURL`的内容为：

```html
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAAIwCAYAAADXrFK...
```

- 格式：`data:[<mediaType>][;base64],<data>`

- `mediatype`：`MIME`字符串，比如`image/png`，默认值为`text/plain;charset=US-ASCII`
  - 如果是文本类型，可以直接文本嵌入
  - 如果是二进制数据，可以将数据进行`base64`编码后嵌入
- 常见`MIME`：`.html text/html`，`.png image/png`，`.txt text/plain`

## 常见优化

- 减少`HTTP`请求数量
- 较小图标，将`DataURL`形式内嵌到`HTML, CSS`中
- 但需要注意的是：如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度

# `Base64`

- 基于64个可打印字符来表示二进制数据的表示方法
- $2^6 = 64$

![03](https://user-gold-cdn.xitu.io/2020/7/5/1731f4ca09794438?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- Base64 常用于在处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据

![04](https://user-gold-cdn.xitu.io/2020/7/5/1731f4ca37281c2a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 编解码`Base64`的函数

- `btoa()`：该函数能够基于二进制数据 “字符串” 创建一个 base64 编码的 ASCII 字符串
- `atob()`： 该函数能够解码通过 base64 编码的字符串数据
- a：ASCII
- b：Blob



## `btoa`

```js
const name = 'Semlinker';
const encodedName = btoa(name);
console.log(encodedName); // U2VtbGlua2Vy
```

## `atob`

```js
const encodedName = 'U2VtbGlua2Vy';
const name = atob(encodedName);
console.log(name); // Semlinker
```

# 下载图片

- `fetch API`从网络获取图片，然后进行图片预览
- 需要对图片进行特殊处理，比如解密图片数据时，需要在`Worker`中用`fetch API`获取数据并进行解密操作

## `fetch API`

```js
const image = document.querySelector('#test');

fetch("https://user-gold-cdn.xitu.io/2020/7/5/1731f4cab1c3552e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1")
    .then(response => response.blob())
    .then(blob => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        console.log(url);
        image.src = url;
    });
```

- `fetch`请求成功后，把响应对象转换为`blob`对象
- 创建`Object URL`

## `Object URL`

- 又叫`Blob URL`
- 允许`Blob`或者`File`对象用作对象，下载二进制数据连接等的`URL`源
- 接收后创建唯一的`URL`，形式为`blob:<origin>/<uuid>`

```html
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```

- 浏览器内部通过`URL.createObjectURL`生成的`URL`存储了一个[`URL`->`Blob`]映射
- 生成的`URL`仅在当前文档打开的状态下有效，如果访问的`Blob URL`不再存在，就会`404`

### 缺点

- `Blob URL`留存在内存中，浏览器无法释放它。映射在文档卸载时自动清除，因此 Blob 对象随后被释放。如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。

- 针对这个问题，我们可以调用 `URL.revokeObjectURL(url)` 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。

## `Blob API`

- 表示二进制类型的大对象，通常是文件
- 在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据

![05](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cad6c0a757?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `Blob`由一个可选的字符串 `type`（通常是 MIME 类型）和 `blobParts` 组成：

![img](https://user-gold-cdn.xitu.io/2020/6/30/17302f09a61a9dc4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `Blob`的构造函数

```js
var aBlob = new Blob(blobParts, options);
```

相关的参数说明如下：

- blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。
- options：一个可选的对象，包含以下两个属性：
  - type —— 默认值为 `""`，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
  - endings —— 默认值为 `"transparent"`，用于指定包含行结束符 `\n` 的字符串如何被写入。 它是以下两个值中的一个： `"native"`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 `"transparent"`，代表会保持 blob 中保存的结束符不变。

### **从字符串创建 Blob**

```js
let myBlobParts = ['<html><h2>Hello Semlinker</h2></html>']; // an array consisting of a single DOMString
let myBlob = new Blob(myBlobParts, {type : 'text/html', endings: "transparent"}); // the blob

console.log(myBlob.size + " bytes size");
// Output: 37 bytes size
console.log(myBlob.type + " is the type");
// Output: text/html is the type
```

### **从类型化数组和字符串创建 Blob**

```js
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
let blob = new Blob([hello, ' ', 'semlinker'], {type: 'text/plain'});
```

## `Blob`方法

- `slice([start[,end[,contentType]]])`，返回一个新的`Blob`对象
- `stream`：返回一个能读取`Blob`内容的`ReadableStream`
- `text`：返回一个`Promise`对象且包含`blob`所有内容的`UTF-8`格式的`USVString`
- `arrayBuffer`：返回一个`promise`对象且包含`blob`所有内容的二进制格式的`ArrayBuffer`

- 对于 fetch API 的 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象来说，该对象除了提供 `blob()` 方法之外，还提供了 `json()`、 `text()` 、`formData()` 和 `arrayBuffer()` 等方法，用于把响应转换为不同的数据格式

```js
const image = document.querySelector("#previewContainer");
   fetch("https://avatars3.githubusercontent.com/u/4220799")
     .then((response) => response.arrayBuffer())
     .then((buffer) => {
        const blob = new Blob([buffer]);
        const objectURL = URL.createObjectURL(blob);
        image.src = objectURL;
   });
```

- 把响应对象转换为`ArrayBuffer`对象，然后通过调用`Blob`构造函数，把`ArrayBuffer`对象转换为`Blob`对象

# `ArrayBuffer`和`TypedArray`

## `ArrayBuffer`

- 通用的，固定长度的原始二进制数据缓冲区
- `ArrayBuffer`不能直接操作，而是通过类型数组对象或`DataView`对象来操作，讲缓冲区的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容

> ArrayBuffer 简单说是一片内存，但是你不能直接用它。这就好比你在 C 里面，malloc 一片内存出来，你也会把它转换成 unsigned_int32 或者 int16 这些你需要的实际类型的数组/指针来用。
>
> 这就是 JS 里的 TypedArray 的作用，那些 Uint32Array 也好，Int16Array 也好，都是给 ArrayBuffer 提供了一个 “View”，MDN 上的原话叫做 “Multiple views on the same data”，对它们进行下标读写，最终都会反应到它所建立在的 ArrayBuffer 之上。

- 语法：`new ArrayBuffer(length)`
- `length`应该小于`Number.MAX_SAFE_INTEGER`

```js
let buffer = new ArrayBuffer(8);
let view   = new Int32Array(buffer);

const reader = new FileReader();

reader.onload = function(e) {
  let arrayBuffer = reader.result;
}

reader.readAsArrayBuffer(file);

```

# `Unit8Array`

- 表示一个 8 位无符号整型数组，创建时内容被初始化为 0
- 创建完后，可以以**「对象的方式或使用数组下标索引的方式」**引用数组中的元素

```js
new Uint8Array(); // ES2017 最新语法
new Uint8Array(length); // 创建初始化为0的，包含length个元素的无符号整型数组
new Uint8Array(typedArray);
new Uint8Array(object);
new Uint8Array(buffer [, byteOffset [, length]]);

```

```js
// new Uint8Array(length); 
var uint8 = new Uint8Array(2);
uint8[0] = 42;
console.log(uint8[0]); // 42
console.log(uint8.length); // 2
console.log(uint8.BYTES_PER_ELEMENT); // 1

// new TypedArray(object); 
var arr = new Uint8Array([21,31]);
console.log(arr[1]); // 31

// new Uint8Array(typedArray);
var x = new Uint8Array([21, 31]);
var y = new Uint8Array(x);
console.log(y[0]); // 21

// new Uint8Array(buffer [, byteOffset [, length]]);
var buffer = new ArrayBuffer(8);
var z = new Uint8Array(buffer, 1, 4);

```

# `ArrayBuffer`和`TypedArray`的关系

- ArrayBuffer 本身只是一行 0 和 1 串
- 为了提供上下文，实际上要将其分解为多个盒子，我们需要将其包装在所谓的视图中。可以使用类型数组添加这些数据视图，并且你可以使用许多不同类型的类型数组
- 例如，你可以有一个 Int8 类型的数组，它将把这个数组分成 8-bit 的字节数组

![img](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cb11aef068?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cb230097a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- ArrayBuffer 基本上就像原始内存一样。它模拟了使用 C 之类的语言进行的直接内存访问。**「你可能想知道为什么我们不让程序直接访问内存，而是添加了这种抽象层，因为直接访问内存将导致一些安全漏洞」**

# Blob vs ArrayBuffer

- ArrayBuffer对象用于表示通用的，固定长度的原始二进制数据缓冲区。你不能直接操纵 ArrayBuffer 的内容，而是需要创建一个类型化数组对象或 DataView 对象，该对象以特定格式表示缓冲区，并使用该对象读取和写入缓冲区的内容。

- Blob类型的对象表示不可变的类似文件对象的原始数据。Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了Blob 功能并将其扩展为支持用户系统上的文件。

Blob 与 ArrayBuffer 对象之间是可以相互转化的：

- 使用 FileReader 的 `readAsArrayBuffer()` 方法，可以把 Blob 对象转换为 ArrayBuffer 对象；
- 使用 Blob 构造函数，如 `new Blob([new Uint8Array(data]);`，可以把 ArrayBuffer 对象转换为 Blob 对象。

## Blob 转换为 ArrayBuffer

```js
var blob = new Blob(["\x01\x02\x03\x04"]),
    fileReader = new FileReader(),
    array;

fileReader.onload = function() {
  array = this.result;
  console.log("Array contains", array.byteLength, "bytes.");
};

fileReader.readAsArrayBuffer(blob);

```

## ArrayBuffer 转 Blob

```js
var array = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
var blob = new Blob([array]);

```

## DataView 与 ArrayBuffer

- DataView 视图是一个可以从二进制 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题

> 字节顺序，又称端序或尾序（英语：Endianness），在计算机科学领域中，指存储器中或在数字通信链路中，组成多字节的字的字节的排列顺序。
>
> 字节的排列方式有两个通用规则。例如，一个多位的整数，按照存储地址从低到高排序的字节中，如果该整数的最低有效字节（类似于最低有效位）在最高有效字节的前面，则称小端序；反之则称大端序。在网络应用中，字节序是一个必须被考虑的因素，因为不同机器类型可能采用不同标准的字节序，所以均按照网络标准转化。
>
> 例如假设上述变量 `x` 类型为`int`，位于地址 `0x100` 处，它的值为 `0x01234567`，地址范围为 `0x100~0x103`字节，其内部排列顺序依赖于机器的类型。大端法从首位开始将是：`0x100: 01, 0x101: 23,..`。而小端法将是：`0x100: 67, 0x101: 45,..`。

```js
new DataView(buffer [, byteOffset [, byteLength]])
```

```js
const buffer = new ArrayBuffer(16);

// Create a couple of views
const view1 = new DataView(buffer);
const view2 = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes
view1.setInt8(12, 42); // put 42 in slot 12

console.log(view2.getInt8(0)); // expected output: 42

```

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer, 0);

view.setInt8(1, 68);
view.getInt8(1); // 68

```

![img](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cb33628ceb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 图片灰度化

## `getImageData`

```js
ctx.getImageData(sx, sy, sw, sh);
```

## `putImageData`

```js
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);

```

## 图片灰度化

```js
const image = document.querySelector("#previewContainer");
const canvas = document.querySelector("#canvas");

fetch("https://avatars3.githubusercontent.com/u/4220799")
    .then((response) => response.blob())
    .then((blob) => {
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
    image.onload = () => {
        draw();
    };
});

function draw() {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, 230, 230);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const grayscale = function () {
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };
    const grayscalebtn = document.querySelector("#grayscalebtn");
    grayscalebtn.addEventListener("click", grayscale);
}

```

# 图片压缩

- `toDataURL`设置`quality`

```js
   const compressbtn = document.querySelector("#compressbtn");
   const compressImage = document.querySelector("#compressPrevContainer");
   compressbtn.addEventListener("click", compress);
  
   function compress(quality = 80, mimeType = "image/webp") {
     const imageDataURL = canvas.toDataURL(mimeType, quality / 100);
     compressImage.src = imageDataURL;
   }
```

# 图片上传

- `express`

```js
const app = require('express')();

app.post('/upload', function(req, res){
    let imgData = req.body.imgData; // 获取POST请求中的base64图片数据
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("abao.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("图片上传成功！");
        }
    });
});


```

## 转换为`Blob`

```js
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

```



## `Ajax`上传

```js

function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("imgData", blob);
  request.open("POST", url, true);
  request.send(formData);
}
```

# 大文件分片上传

- File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中。所以针对大文件传输的场景，我们可以使用 slice 方法对大文件进行切割，然后分片进行上传，具体示例如下

```js
const file = new File(["a".repeat(1000000)], "test.txt");

const chunkSize = 40000;
const url = "https://httpbin.org/post";

async function chunkedUpload() {
  for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize + 1);
      const fd = new FormData();
      fd.append("data", chunk);

      await fetch(url, { method: "post", body: fd }).then((res) =>
        res.text()
      );
  }
}

```

## 文件下载

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Blob 文件下载示例</title>
  </head>

  <body>
    <button id="downloadBtn">文件下载</button>
    <script src="index.js"></script>
  </body>
</html>

```

```js
const download = (fileName, blob) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

const downloadBtn = document.querySelector("#downloadBtn");
downloadBtn.addEventListener("click", (event) => {
  const fileName = "blob.txt";
  const myBlob = new Blob(["一文彻底掌握 Blob Web API"], { type: "text/plain" });
  download(fileName, myBlob);
});

```

