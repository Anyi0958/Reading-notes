const image = document.querySelector('#test');

fetch("https://user-gold-cdn.xitu.io/2020/7/5/1731f4cab1c3552e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1")
    .then(response => response.blob())
    .then(blob => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        console.log(url);
        image.src = url;
    });