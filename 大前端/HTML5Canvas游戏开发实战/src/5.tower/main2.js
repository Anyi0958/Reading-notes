const config = {
    width: 800,
    height: 500,
    imagePath:'./img/bg.jpg'
};

// variable
let imageHeight, imageWidth, image1, image2, image3;
const STEP = 2;

// 创建canvas标签
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 500;

let ctx = canvas.getContext('2d');
imageElement();
// 获取图像
let maxHeight = 500,
    maxHeight2 = 500;

setInterval(() => {
    maxHeight -= 1;
    maxHeight2 -= 1;
    console.log(maxHeight);
    ctx.save();
    ctx.drawImage(image1, 0, 500 - maxHeight,800, 500 ,0,0,800,maxHeight);
    // ctx.save();
    // ctx.drawImage(image2, 0, 500 - maxHeight2,800, 500 ,0,0,800,1000-maxHeight2);
    ctx.clearRect();
    ctx.restore();
},10);





function imageElement(){    
    image1  = new Image(),
    image2 = new Image(),
    image3 = new Image();

    image1.src = config.imagePath,
    image1.height = 500;
    image2.src = config.imagePath,
    image2.y = image1.height;

    image3.src = config.imagePath;
    image3.y = image1.height * 2;
    
}

function run(image1, image2, image3){

    image1.y -= STEP,
    image2.y -= STEP,
    image3.y -= STEP;

    image1.onload = () => {
        ctx.drawImage(image1, 0,0,image1.width, image1.height,0,0,config.width,config.width);
    };


    if(image1.y <= -image1.height){
        image1.y = image2.y,
        image2.y = image1.y + image1.height;
    }
}