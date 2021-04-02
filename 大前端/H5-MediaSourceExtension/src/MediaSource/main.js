let video = document.querySelector('video');

let assetURL = 'test.mp4';
// 需要具体说明有关编解码器的问题
let mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

// 统一接口
if('MediaSource' in window && 
    MediaSource.isTypeSupported(mimeCodec)) {
        let mediaSource = new MediaSource();

        // closed
        console.log(mediaSource.readyState);

        video.src = URL.createObjectURL(mediaSource);
        // callback
        mediaSource.addEventListener('sourceopen', sourceOpen);
}else{
    console.error('Unsupported MIME type or codec: ', mimeCodec);
}

// 添加sourceBuffer
function sourceOpen(_){
    console.log(`sourceOpen:${this.readyState}`);

    let mediaSource = this;
    let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

    // 传送数据后，监听数据，并不断更新，将接收数据放入到sourceBuffer中
    fetchAB(assetURL, function(buf){
        sourceBuffer.addEventListener('updateend', function (_) {
            mediaSource.endOfStream();
            video.play();
            console.log(`fetchAB:${mediaSource.readyState}`);
        });

        sourceBuffer.appendBuffer(buf);
    });
}

// Ajax，以get方式，从后端获取`arrayBuffer`类型的数据，并且将返回数据放入回调函数cb中
function fetchAB(url, cb){
    console.log(url);

    let xhr = new XMLHttpRequest;

    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(){
        cb(xhr.response);
    };

    xhr.send();
}