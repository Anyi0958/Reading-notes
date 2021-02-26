// 事件的定义
// 如果使用触摸屏，当滚动时，将会阻止事件发生
document.addEventListener('touchmove', event => event.preventDefault());

// 获取canvas画板对象，并进行基础设置的赋值
var c = document.getElementsByTagName('canvas')[0],
    x = c.getContext('2d'),
    pr = window.devicePixelRatio || 1,
    w = window.innerWidth,
    h = window.innerHeight,
    f = 90,
    q,
    m = Math,
    r = 0,
    u = m.PI*2,
    v = m.cos,
    z = m.random

// canvas画板的长宽设置
c.width = w*pr
c.height = h*pr

// 对画板里的内容进行放大
x.scale(pr, pr)
// 图像透明度设置
x.globalAlpha = 0.6

// 清理出空间供绘图使用
function i(){
    x.clearRect(0,0,w,h)
    //三角形的起始坐标
    // f为初始值
    q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
    //第二个三角形的横坐标在范围内，就开始绘图
    while(q[1].x<w+f) d(q[0], q[1])
}

function d(i,j){   
    // 开始绘画
    x.beginPath()
    // 连线两顶点
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)

    // 求取第3个顶点
    var k = j.x + (z()*2-0.25)*f,
        n = y(j.y)
    x.lineTo(k, n)
    x.closePath()
    r-=u/-50
    x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
    x.fill()
    q[0] = q[1]
    q[1] = {x:k,y:n}
}

function y(p){
    var t = p + (z()*2-1.1)*f
    return (t>h||t<0) ? y(p) : t
}

document.onclick = i
document.ontouchstart = i
i()
