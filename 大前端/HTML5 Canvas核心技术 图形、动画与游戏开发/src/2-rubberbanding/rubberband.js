/* 
    功能：
    0. 选框由css设置为标签的框线
    1. 根据鼠标建立选框
    2. 根据选框进行放大
    3. 在原图的基础上进行放大
*/
let canvas =document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    rubberbandDiv = document.getElementById('rubberbandDiv'),
    resetButton = document.getElementById('resetButton'),
    image = new Image(),
    mousedown = {},
    rubberbandRectangle = {},
    dragging = false;

/* 
    Functions
 */
// 弹性框的开始坐标
function rubberbandStart(x, y){
    mousedown.x = x,
    mousedown.y = y;

    rubberbandRectangle.left = mousedown.x,
    rubberbandRectangle.top = mousedown.y;

    moveRubberbandDiv();
    showRubberbandDiv();
    // 标记选框状态
    dragging = true;
}

// 弹性框扩展
function rubberbandStretch(x, y){
    rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
    rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

    rubberbandRectangle.width = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);

    moveRubberbandDiv();
    resizeRubberbandDiv();
}

// 弹性框结束
function rubberbandEnd() {
    let bbox = canvas.getBoundingClientRect();

    try{
        // 在canvas的基础上进行图像的绘制
        context.drawImage(canvas,
                        rubberbandRectangle.left - bbox.left,
                        rubberbandRectangle.top - bbox.top,
                        rubberbandRectangle.width,
                        rubberbandRectangle.height,
                        0, 0, canvas.width, canvas.height);
        
    } catch(error){
        console.log('error');
    }

    // 绘图后重设弹性框设置
    resetRubberbandRectangle();

    // 标签的设置
    rubberbandDiv.style.width = 0,
    rubberbandDiv.style.height = 0;

    // 隐藏标签
    hideRubberbandDiv();

    dragging = false;
}

// 移动弹性框标签的位置
function moveRubberbandDiv() {
    rubberbandDiv.style.top = rubberbandRectangle.top + 'px',
    rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

// 弹性框标签的宽高
function resizeRubberbandDiv() {
    rubberbandDiv.style.width = rubberbandRectangle.width + 'px',
    rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

// 展示弹性框标签
function showRubberbandDiv() {
    rubberbandDiv.style.display = 'inline';
}

// 隐藏弹性框标签
function hideRubberbandDiv() {
    rubberbandDiv.style.display = 'none';
}

// 重设弹性框
function resetRubberbandRectangle() {
    rubberbandRectangle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
}

// Event handlers
// 在canvas按下鼠标时，触发事件
// dom冒泡时取消，防止出现在canvas外时出现问题
canvas.onmousedown = function(e) {
    let x = e.clientX - 5,
        y = e.clientY - 5;

    e.preventDefault();
    rubberbandStart(x, y);
}

// 鼠标移动时，选框开始扩展
window.onmousemove = function(event) {
    let x = event.clientX,
        y = event.clientY;

    event.preventDefault();

    if(dragging){
        rubberbandStretch(x, y);
    }
}

// 放开鼠标
window.onmouseup = function(event) {
    event.preventDefault();

    rubberbandEnd();
}

// 图像加载
image.onload = function() {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

resetButton.onclick = function(event) {
    context.clearRect(0, 0, context.canvas.width,
                            context.canvas.height);


    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Initialization
image.src = 'test.jpg';