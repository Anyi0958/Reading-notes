js-Blobǳ�� Ŀ¼
[TOC]
***

# ǰ��

`Blob`��

- ���Դ洢�����ݿ�
- `postMessage`���͵��������ں�`worker`
- `XMLHttpRequest`��`send`����
- `createObjectURL()`��ȡ�����`blob://URL`

# �Ƽ��Ķ�

- ��JSȨ��ָ�ϡ�

# �ļ���Ϊ`Blob`

- �����`drop`�¼�������ʹ��`dataTransfer.files`

## `index.html` - `input`�ϴ��ļ�

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

# ����`Blob`

- `XHR2` ����`URL`ָ����������`Blob`��ʽ��������

```js
// ��Blob��ʽ��ȡURLָ�������ݣ������䴫�ݸ�ָ���Ļص�����
function getBlob(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    // ��blob����ʽ��ȡ����
    xhr.responseType = "blob";

    xhr.onload = () => {
        callback(xhr.response);
    };

    xhr.send(null);
}
```

# ����`Blob`

- `Blob`��������ʾ�������ļ���`URL`�Լ����ݿ��ⲿ��Դ�Ĵ����ݿ�
- `web`���Լ�����������`Blob`

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

- ����`BlobBuilder`�Ѿ�����

# `Blob URL`

- ����һ��`URL`ָ���`Blob`
- `createObjectURL()`
- ��`URL`��`blob://`��ʼ����`data://URL`��ͬ��
  - `blob://`����������洢���ڴ��л��ߴ����ϵ�`Blob`һ��������
  - ���߻�����ݽ��б���
- `Blob URL`������������Ч��һ���ر��˻����뿪�˰�������`blob`�ű����ĵ��������Ӿͻ�ʧЧ

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
            // �ļ��������
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
        // ES6�У���ͷ������û��argumens��
        img.onload = function() {
            console.log(arguments);
            this.width = 100;
            document.body.appendChild(img);
            // �����ڴ�й¶
            revokeBlobURL(this.src);
        };
    }

    droptarget.classList.remove('active');
    return false;
};
```



# ��ȡ`Blob` - `FileReader`

- `Blob`�ǲ�͸���Ĵ����ݿ飬ֻ����ͨ��`Blob URL`����

## ʹ��`FileReader`��ȡ�ı��ļ�

```js
// ��ȡ�ı��ļ�
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

// ��ȡ�ļ���ǰ4���ֽ�
function typefile(file) {
    let slice = file.slice(0,4);
    let reader = new FileReader();
    reader.readAsArrayBuffer(slice);
    reader.onload = function(e) {
        let buffer = reader.result;

        let view = new DataView(buffer);
        // �Ը�λ�����ֽ�˳��
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



