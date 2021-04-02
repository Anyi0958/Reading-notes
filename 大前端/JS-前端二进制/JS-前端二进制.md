JS-ǰ�˶����� Ŀ¼
[TOC]
***

# ǰ��

- ǰ�˶��������ݵ�������ܽ�
- ����ǰ����ν���ͼƬ����Ȼ�󴩲���ܶ����ơ�Blob��Blob URL��Base64��Data URL��ArrayBuffer��TypedArray��DataView ��ͼƬѹ����ص�֪ʶ��

# �Ƽ��Ķ�

- [��תǰ�˶�����](https://juejin.cn/post/6846687590783909902)
- ��JS�߼���̡�

# �������

![01](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cbdf36f833?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![02](https://user-gold-cdn.xitu.io/2020/7/5/1731f4ca00cdc946?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# ͼƬԤ��

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

- `readAsDataURL`�������ѱ���ͼƬ��Ӧ��`File`����ת��Ϊ`Data URL`���ٸ���`img`��`src`���Ӷ�ʵ��ͼƬ����Ԥ��
- ���� `FileReader` ������˵������֧�ְ� File/Blob ����ת��Ϊ Data URL ֮�⣬�����ṩ�� `readAsArrayBuffer()` �� `readAsText()` ���������ڰ� File/Blob ����ת��Ϊ���������ݸ�ʽ

- `dataURL`������Ϊ��

```html
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAAIwCAYAAADXrFK...
```

- ��ʽ��`data:[<mediaType>][;base64],<data>`

- `mediatype`��`MIME`�ַ���������`image/png`��Ĭ��ֵΪ`text/plain;charset=US-ASCII`
  - ������ı����ͣ�����ֱ���ı�Ƕ��
  - ����Ƕ��������ݣ����Խ����ݽ���`base64`�����Ƕ��
- ����`MIME`��`.html text/html`��`.png image/png`��`.txt text/plain`

## �����Ż�

- ����`HTTP`��������
- ��Сͼ�꣬��`DataURL`��ʽ��Ƕ��`HTML, CSS`��
- ����Ҫע����ǣ����ͼƬ�ϴ�ͼƬ��ɫ�ʲ�αȽϷḻ�����ʺ�ʹ�����ַ�ʽ����Ϊ��ͼƬ���� base64 �������ַ����ǳ��󣬻��������� HTML ҳ��Ĵ�С���Ӷ�Ӱ������ٶ�

# `Base64`

- ����64���ɴ�ӡ�ַ�����ʾ���������ݵı�ʾ����
- $2^6 = 64$

![03](https://user-gold-cdn.xitu.io/2020/7/5/1731f4ca09794438?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- Base64 �������ڴ����ı����ݵĳ��ϣ���ʾ�����䡢�洢һЩ���������ݣ����� MIME �ĵ����ʼ��� XML ��һЩ��������

![04](https://user-gold-cdn.xitu.io/2020/7/5/1731f4ca37281c2a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## �����`Base64`�ĺ���

- `btoa()`���ú����ܹ����ڶ��������� ���ַ����� ����һ�� base64 ����� ASCII �ַ���
- `atob()`�� �ú����ܹ�����ͨ�� base64 ������ַ�������
- a��ASCII
- b��Blob



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

# ����ͼƬ

- `fetch API`�������ȡͼƬ��Ȼ�����ͼƬԤ��
- ��Ҫ��ͼƬ�������⴦���������ͼƬ����ʱ����Ҫ��`Worker`����`fetch API`��ȡ���ݲ����н��ܲ���

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

- `fetch`����ɹ��󣬰���Ӧ����ת��Ϊ`blob`����
- ����`Object URL`

## `Object URL`

- �ֽ�`Blob URL`
- ����`Blob`����`File`���������������ض������������ӵȵ�`URL`Դ
- ���պ󴴽�Ψһ��`URL`����ʽΪ`blob:<origin>/<uuid>`

```html
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```

- ������ڲ�ͨ��`URL.createObjectURL`���ɵ�`URL`�洢��һ��[`URL`->`Blob`]ӳ��
- ���ɵ�`URL`���ڵ�ǰ�ĵ��򿪵�״̬����Ч��������ʵ�`Blob URL`���ٴ��ڣ��ͻ�`404`

### ȱ��

- `Blob URL`�������ڴ��У�������޷��ͷ�����ӳ�����ĵ�ж��ʱ�Զ��������� Blob ��������ͷš����Ӧ�ó��������ܳ����ǲ���ܿ췢������ˣ�������Ǵ���һ�� Blob URL����ʹ������Ҫ�� Blob����Ҳ������ڴ��С�

- ���������⣬���ǿ��Ե��� `URL.revokeObjectURL(url)` ���������ڲ�ӳ����ɾ�����ã��Ӷ�����ɾ�� Blob�����û���������ã������ͷ��ڴ档

## `Blob API`

- ��ʾ���������͵Ĵ����ͨ�����ļ�
- �� JavaScript �� Blob ���͵Ķ����ʾ���ɱ�������ļ������ԭʼ����

![05](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cad6c0a757?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `Blob`��һ����ѡ���ַ��� `type`��ͨ���� MIME ���ͣ��� `blobParts` ��ɣ�

![img](https://user-gold-cdn.xitu.io/2020/6/30/17302f09a61a9dc4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `Blob`�Ĺ��캯��

```js
var aBlob = new Blob(blobParts, options);
```

��صĲ���˵�����£�

- blobParts������һ���� ArrayBuffer��ArrayBufferView��Blob��DOMString �ȶ��󹹳ɵ����顣DOMStrings �ᱻ����Ϊ UTF-8��
- options��һ����ѡ�Ķ��󣬰��������������ԣ�
  - type ���� Ĭ��ֵΪ `""`���������˽��ᱻ���뵽 blob �е��������ݵ� MIME ���͡�
  - endings ���� Ĭ��ֵΪ `"transparent"`������ָ�������н����� `\n` ���ַ�����α�д�롣 ������������ֵ�е�һ���� `"native"`�������н������ᱻ����Ϊ�ʺ���������ϵͳ�ļ�ϵͳ�Ļ��з������� `"transparent"`������ᱣ�� blob �б���Ľ��������䡣

### **���ַ������� Blob**

```js
let myBlobParts = ['<html><h2>Hello Semlinker</h2></html>']; // an array consisting of a single DOMString
let myBlob = new Blob(myBlobParts, {type : 'text/html', endings: "transparent"}); // the blob

console.log(myBlob.size + " bytes size");
// Output: 37 bytes size
console.log(myBlob.type + " is the type");
// Output: text/html is the type
```

### **�����ͻ�������ַ������� Blob**

```js
let hello = new Uint8Array([72, 101, 108, 108, 111]); // �����Ƹ�ʽ�� "hello"
let blob = new Blob([hello, ' ', 'semlinker'], {type: 'text/plain'});
```

## `Blob`����

- `slice([start[,end[,contentType]]])`������һ���µ�`Blob`����
- `stream`������һ���ܶ�ȡ`Blob`���ݵ�`ReadableStream`
- `text`������һ��`Promise`�����Ұ���`blob`�������ݵ�`UTF-8`��ʽ��`USVString`
- `arrayBuffer`������һ��`promise`�����Ұ���`blob`�������ݵĶ����Ƹ�ʽ��`ArrayBuffer`

- ���� fetch API �� [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) ������˵���ö�������ṩ `blob()` ����֮�⣬���ṩ�� `json()`�� `text()` ��`formData()` �� `arrayBuffer()` �ȷ��������ڰ���Ӧת��Ϊ��ͬ�����ݸ�ʽ

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

- ����Ӧ����ת��Ϊ`ArrayBuffer`����Ȼ��ͨ������`Blob`���캯������`ArrayBuffer`����ת��Ϊ`Blob`����

# `ArrayBuffer`��`TypedArray`

## `ArrayBuffer`

- ͨ�õģ��̶����ȵ�ԭʼ���������ݻ�����
- `ArrayBuffer`����ֱ�Ӳ���������ͨ��������������`DataView`�������������������������ݱ�ʾΪ�ض��ĸ�ʽ����ͨ����Щ��ʽ����д������������

> ArrayBuffer ��˵��һƬ�ڴ棬�����㲻��ֱ����������ͺñ����� C ���棬malloc һƬ�ڴ��������Ҳ�����ת���� unsigned_int32 ���� int16 ��Щ����Ҫ��ʵ�����͵�����/ָ�����á�
>
> ����� JS ��� TypedArray �����ã���Щ Uint32Array Ҳ�ã�Int16Array Ҳ�ã����Ǹ� ArrayBuffer �ṩ��һ�� ��View����MDN �ϵ�ԭ������ ��Multiple views on the same data���������ǽ����±��д�����ն��ᷴӦ�����������ڵ� ArrayBuffer ֮�ϡ�

- �﷨��`new ArrayBuffer(length)`
- `length`Ӧ��С��`Number.MAX_SAFE_INTEGER`

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

- ��ʾһ�� 8 λ�޷����������飬����ʱ���ݱ���ʼ��Ϊ 0
- ������󣬿�����**������ķ�ʽ��ʹ�������±������ķ�ʽ��**���������е�Ԫ��

```js
new Uint8Array(); // ES2017 �����﷨
new Uint8Array(length); // ������ʼ��Ϊ0�ģ�����length��Ԫ�ص��޷�����������
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

# `ArrayBuffer`��`TypedArray`�Ĺ�ϵ

- ArrayBuffer ����ֻ��һ�� 0 �� 1 ��
- Ϊ���ṩ�����ģ�ʵ����Ҫ����ֽ�Ϊ������ӣ�������Ҫ�����װ����ν����ͼ�С�����ʹ���������������Щ������ͼ�����������ʹ����಻ͬ���͵���������
- ���磬�������һ�� Int8 ���͵����飬�������������ֳ� 8-bit ���ֽ�����

![img](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cb11aef068?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2020/7/5/1731f4cb230097a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- ArrayBuffer �����Ͼ���ԭʼ�ڴ�һ������ģ����ʹ�� C ֮������Խ��е�ֱ���ڴ���ʡ�**���������֪��Ϊʲô���ǲ��ó���ֱ�ӷ����ڴ棬������������ֳ���㣬��Ϊֱ�ӷ����ڴ潫����һЩ��ȫ©����**

# Blob vs ArrayBuffer

- ArrayBuffer�������ڱ�ʾͨ�õģ��̶����ȵ�ԭʼ���������ݻ��������㲻��ֱ�Ӳ��� ArrayBuffer �����ݣ�������Ҫ����һ�����ͻ��������� DataView ���󣬸ö������ض���ʽ��ʾ����������ʹ�øö����ȡ��д�뻺���������ݡ�

- Blob���͵Ķ����ʾ���ɱ�������ļ������ԭʼ���ݡ�Blob ��ʾ�Ĳ�һ���� JavaScript ԭ����ʽ�����ݡ�File �ӿڻ��� Blob���̳���Blob ���ܲ�������չΪ֧���û�ϵͳ�ϵ��ļ���

Blob �� ArrayBuffer ����֮���ǿ����໥ת���ģ�

- ʹ�� FileReader �� `readAsArrayBuffer()` ���������԰� Blob ����ת��Ϊ ArrayBuffer ����
- ʹ�� Blob ���캯������ `new Blob([new Uint8Array(data]);`�����԰� ArrayBuffer ����ת��Ϊ Blob ����

## Blob ת��Ϊ ArrayBuffer

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

## ArrayBuffer ת Blob

```js
var array = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
var blob = new Blob([array]);

```

## DataView �� ArrayBuffer

- DataView ��ͼ��һ�����ԴӶ����� ArrayBuffer �����ж�д������ֵ���͵ĵײ�ӿڣ�ʹ����ʱ�����ÿ��ǲ�ͬƽ̨���ֽ�������

> �ֽ�˳���ֳƶ����β��Ӣ�Endianness�����ڼ������ѧ�����У�ָ�洢���л�������ͨ����·�У���ɶ��ֽڵ��ֵ��ֽڵ�����˳��
>
> �ֽڵ����з�ʽ������ͨ�ù������磬һ����λ�����������մ洢��ַ�ӵ͵���������ֽ��У�����������������Ч�ֽڣ������������Чλ���������Ч�ֽڵ�ǰ�棬���С���򣻷�֮��ƴ����������Ӧ���У��ֽ�����һ�����뱻���ǵ����أ���Ϊ��ͬ�������Ϳ��ܲ��ò�ͬ��׼���ֽ������Ծ����������׼ת����
>
> ��������������� `x` ����Ϊ`int`��λ�ڵ�ַ `0x100` ��������ֵΪ `0x01234567`����ַ��ΧΪ `0x100~0x103`�ֽڣ����ڲ�����˳�������ڻ��������͡���˷�����λ��ʼ���ǣ�`0x100: 01, 0x101: 23,..`����С�˷����ǣ�`0x100: 67, 0x101: 45,..`��

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

# ͼƬ�ҶȻ�

## `getImageData`

```js
ctx.getImageData(sx, sy, sw, sh);
```

## `putImageData`

```js
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);

```

## ͼƬ�ҶȻ�

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

# ͼƬѹ��

- `toDataURL`����`quality`

```js
   const compressbtn = document.querySelector("#compressbtn");
   const compressImage = document.querySelector("#compressPrevContainer");
   compressbtn.addEventListener("click", compress);
  
   function compress(quality = 80, mimeType = "image/webp") {
     const imageDataURL = canvas.toDataURL(mimeType, quality / 100);
     compressImage.src = imageDataURL;
   }
```

# ͼƬ�ϴ�

- `express`

```js
const app = require('express')();

app.post('/upload', function(req, res){
    let imgData = req.body.imgData; // ��ȡPOST�����е�base64ͼƬ����
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("abao.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("ͼƬ�ϴ��ɹ���");
        }
    });
});


```

## ת��Ϊ`Blob`

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



## `Ajax`�ϴ�

```js

function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("imgData", blob);
  request.open("POST", url, true);
  request.send(formData);
}
```

# ���ļ���Ƭ�ϴ�

- File �������������͵� Blob���ҿ������������ Blob ���͵��������С�������Դ��ļ�����ĳ��������ǿ���ʹ�� slice �����Դ��ļ������иȻ���Ƭ�����ϴ�������ʾ������

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

## �ļ�����

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Blob �ļ�����ʾ��</title>
  </head>

  <body>
    <button id="downloadBtn">�ļ�����</button>
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
  const myBlob = new Blob(["һ�ĳ������� Blob Web API"], { type: "text/plain" });
  download(fileName, myBlob);
});

```

