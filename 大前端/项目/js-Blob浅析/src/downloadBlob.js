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