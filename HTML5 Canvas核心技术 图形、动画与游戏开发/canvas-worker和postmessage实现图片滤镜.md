canvas-worker和postmessage实现图片滤镜 目录
[TOC]
***

# 前言

- `postMessage`：用于跨域的信息传递，此处用于`worker`的信息传递
- `worker`：在`H5`中，允许出现多线程处理，可以缓解网站的性能瓶颈

## 注意

- `worker`必须部署到服务器上`Tomcat, apahce, live-server`，并且启动时才能运行

# 代码展示

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
    <input type="button" id="sunglassButton" value="Sunglasses">
    <canvas id="canvas"></canvas>
    <script src="main.js"></script>
</body>
</html>
```

```js
// main.js
let image = new Image(),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    sunglassButton = document.getElementById('sunglassButton'),
    sunglassesOn = false,
    sunglassFilter = new Worker('sunglassFilter.js');

// Functions
function putSunglassesOn() {
    sunglassFilter.postMessage(
        context.getImageData(0,0,canvas.width,canvas.height)
    );

    sunglassFilter.onmessage = function(e) {
        context.putImageData(e.data,0,0);
    };
}

function drawOriginalImage(){
    context.drawImage(image,0,0,
                    image.width,image.height,0,0,
                    canvas.width,canvas.height);
}

// Event handlers
sunglassButton.onclick = function() {
    if(sunglassesOn){
        sunglassButton.value = 'Sunglasses';
        drawOriginalImage();
        sunglassesOn = false;
    }else {
        sunglassButton.value = 'Original pic';
        putSunglassesOn();
        sunglassesOn = true;
    }
}

// initialization
image.src = '1.jpg';
image.onload = function() {
    drawOriginalImage();
}
```

```js
// worker
// sunglassFilter.js
onmessage = function(event) {
    console.log(event);
    let imagedata = event.data,
        data = imagedata.data,
        length = data.length,
        width = imagedata.width;


    for(let i = 0; i < length; ++i) {
        if((i+1) % 4 != 0 ){
            if((i+4) % (width*4) == 0) {
                data[i] = data[i - 4];
                data[i+1] = data[i - 3];
                data[i+2] = data[i-2];
                data[i+3] = data[i-1];
                i+=4;
            }else {
                data[i] = 2 * data[i] - data[i+4] - 0.5 * data[i+4];
            }
        }
    }

    postMessage(imagedata);
}
```

# 效果展示

## `postMessage`

![image-20210315011100347](.\img\0-postMessage.png)

## `worker`

![image-20210315011437421](.\img\1-postMessage.png)

