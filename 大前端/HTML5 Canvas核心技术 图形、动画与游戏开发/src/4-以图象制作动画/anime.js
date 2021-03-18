let image = new Image(),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    fadeButton = document.getElementById('fadeButton'),
    originalImageData = null,
    interval = null;

// Functions

function increaseTransparency(imagedata, steps){
    let alpha, 
        currentAlpha, 
        step, 
        length = imagedata.data.length;

    for(let i = 3; i < length; i += 4){
        alpha = originalImageData.data[i]
    }
}