js-��ƵƬ������gif���� Ŀ¼
[TOC]
***

# ǰ��

- ���Ŀ⣺`gif.js`

# �Ƽ��Ķ�

- [����gif-ԭ����](https://juejin.cn/post/6844903607171547143)
- [gif.js-github](https://github.com/jnordberg/gif.js)
- [core-video-to-gif](https://github.com/JackPu/core-video-to-gif)

# ʵ��ԭ��

```js
var gif = new GIF({  
  workers: 2,
  quality: 10
});

// add an image element
gif.addFrame(imageElement);

// or a canvas element
gif.addFrame(canvasElement, {delay: 200});

// or copy the pixels from a canvas context
gif.addFrame(ctx, {copy: true});

gif.on('finished', function(blob) {  
  window.open(URL.createObjectURL(blob));
});

gif.render();  

```

# `Base64`ת��

```js
 daycaca.base64(this.video, (source, canvas) => {
          // ...
        this._gif.addFrame(canvas, {delay: intvalTime})
      })

```

- ͨ��`setTimeout/setInterval`ʵ��ѭ����ͼ

# ʹ��

## `npm`

```shell
$ npm install core-video-to-gif --save

```

## `CDN`

```js
<script src="./dist/core-video-to-gif.min.js"></script>  

```

```js
const v2g = new CoreVideoToGif({  
    // specify the video element
    el: document.querySelector('video')
})
v2g.shot({  
    // options,
    start: 5, // ms
    end: 8
}, (result) => {
    // ...
    image.src = result
})

```

# `API`

```js
 // get current screenshot
v2g.shot( (result) => {  
    // ...
    image.src = result
})
// get screenshot from 5s - 8s
v2g.shot({  
    // options,
    start: 5, // ms
    end: 8
}, (result) => {
    // ...
    image.src = result
})

```

