const conf = {
    img: './log-crossing.png'
};

let image = new Image(),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    fadeButton = document.getElementById('fadeButton'),
    originalImageData = null;   // 原始图像数据

// Functions

// 更改图像的透明度
function increaseTransparency(imagedata, steps) {
    let alpha,
        currentAlpha,
        step,
        length = imagedata.data.length;

    for(let i = 3; i < length; i+=4){
        alpha = originalImageData.data[i];

        if(alpha > 0 && imagedata.data[i] > 0){
            currentAlpha = imagedata.data[i];
            step = Math.ceil(alpha / steps);

            if(currentAlpha - step > 0) {
                imagedata.data[i] -= step;
            } else {
                imagedata.data[i] = 0;
            }
        }
    }
}

function fadeOut(context, imagedata, x, y,
                steps, millisecondsPerStep) {
    let frame = 0,
        length = imagedata.data.length;

    setInterval(function() {
        frame++;

        if(frame > steps){
            clearInterval(arguments.callee);
            animationComplete();
        } else {
            increaseTransparency(imagedata, steps);
            context.putImageData(imagedata, x, y);
        }
    }, millisecondsPerStep);
}

// 动画
function animationComplete() {
    setTimeout(() => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }, 1000);
}

fadeButton.onclick = () => {
    fadeOut(context,context.getImageData(0,0,canvas.width,canvas.height),
        0,0,20,1000/60);
};

image.src = conf.img;
image.onload = () => {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    originalImageData = context.getImageData(0,0,canvas.width,canvas.height);
};