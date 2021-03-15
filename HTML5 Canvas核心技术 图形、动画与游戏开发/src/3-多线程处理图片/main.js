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