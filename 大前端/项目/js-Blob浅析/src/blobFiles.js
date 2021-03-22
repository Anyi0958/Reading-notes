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