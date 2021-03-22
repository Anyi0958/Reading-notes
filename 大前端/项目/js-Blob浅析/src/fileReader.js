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