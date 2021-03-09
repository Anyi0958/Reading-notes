WebGL 目录
[TOC]
***
# 前言

- 本文为`WebGl`学习之旅

# 推荐阅读

- [3D简历](https://bruno-simon.com/ "简历")
- [WebGL入门教程](http://www.yanhuangxueyuan.com/WebGL/)

# 入门流程图

![img](http://www.yanhuangxueyuan.com/upload/webgl25a.png)

***

# 绘制点

```html
<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>使用WebGL绘制一个点</title>
 </head>
 <body>
 <!--canvas标签创建一个宽高均为500像素，背景为蓝色的矩形画布-->
 <canvas id="webgl" width="500" height="500" style="background-color: blue"></canvas>
    
 <script>
     //通过getElementById()方法获取canvas画布
     let canvas = document.getElementById('webgl');
     //通过方法getContext()获取WebGL上下文
     var gl = canvas.getContext('webgl');
 
     //顶点着色器源码
     var vertexShaderSource = '' +
         'void main(){' +
         //给内置变量gl_PointSize赋值像素大小
         '   gl_PointSize=10.0;' +
         //顶点位置，位于坐标原点
         '   gl_Position =vec4(0.0,0.0,0.0,1.0);' +
         '}';
 
     //片元着色器源码
     var fragShaderSource = '' +
         'void main(){' +
         //定义片元颜色
         '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
         '}';
 
     //初始化着色器
     var program = initShader(gl,vertexShaderSource,fragShaderSource);
     //开始绘制，显示器显示结果
     gl.drawArrays(gl.POINTS,0,1);
 
     //声明初始化着色器函数
     function initShader(gl,vertexShaderSource,fragmentShaderSource){
         //创建顶点着色器对象
         var vertexShader = gl.createShader(gl.VERTEX_SHADER);
         //创建片元着色器对象
         var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
         //引入顶点、片元着色器源代码
         gl.shaderSource(vertexShader,vertexShaderSource);
         gl.shaderSource(fragmentShader,fragmentShaderSource);
         //编译顶点、片元着色器
         gl.compileShader(vertexShader);
         gl.compileShader(fragmentShader);
 
         //创建程序对象program
         var program = gl.createProgram();
         //附着顶点着色器和片元着色器到program
         gl.attachShader(program,vertexShader);
         gl.attachShader(program,fragmentShader);
         //链接program
         gl.linkProgram(program);
         //使用program
         gl.useProgram(program);
         //返回程序program对象
         return program;
     }
 </script>
 </body>
 </html>
```

## `canvas`

- `canvs.getContext('2d')`：是`2d`方法
- `canvas.getContext('webgl')`：是`3d`方法

```js
//通过方法getContext()获取WebGL上下文
var gl=canvas.getContext('webgl');
...
//调用WebGL API绘制渲染方法drawArrays
gl.drawArrays(gl.POINTS,0,1);
...
```

## 着色器语言`GLSL ES`

`WebGL`种的着色器代码：

- `vertexShaderSource`
- `fragShaderSource`

- 着色器代码通过着色器语言`GLSL ES`编写，需要学一门新的语言`GLSEL ES`
- 着色器语言用于计算机图形编程，运行在GPU中，平时所说的大多数语言编写的程序都是运行在CPU中。 与OpenGL API相配合的是着色器语言GLSL，与OpenGL ES API、WebGL API相互配合的是着色器语言GLSL ES。OpenGL标准应用的是客户端 OpenGL ES应用的是移动端，WebGL标准应用的是浏览器平台。

顶点着色器，定义了顶点的渲染位置和点的渲染像素大小：

```js
//顶点着色器源码
var vertexShaderSource = '' +
    'void main(){' +
    //给内置变量gl_PointSize赋值像素大小
    '   gl_PointSize=20.0;' +
    //顶点位置，位于坐标原点
    '   gl_Position =vec4(0.0,0.0,0.0,1.0);' +
    '}';
```

片元着色器定义了点的渲染结果像素的颜色值:

```js
//片元着色器源码
var fragShaderSource = '' +
    'void main(){' +
    //定义片元颜色
    '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
    '}';
```

- `gl_PointSize、gl_Position、gl_FragColor`都是内置变量
- 都存在`main`入口函数
- `gl_position`的`vec4(x,y,z, m)`：顶点位置坐标，`vec4`代表的是一种数据类型，也可看做是构造函数
- `gl_FragColor`的`vec4(r,g,b, opacity)`：颜色值

## `WebGL API`

- 多数与`GPU`硬件有关，控制相关图形处理单元
- `gl.createShader(), gl.shaderSource()`可以对着着色器代码进行编译，然后在`GPU`的着色器单元上执行
- `GPU`最大特点是并行计算，关注`CUDA`和`OpenCL`
- GPU硬件(渲染管线)、显卡驱动、操作系统、浏览器、WebGL API是逐层抽象的。每一层都会为上一层提供一个接口，这里可以看出WebGL API是 首先通过浏览器的的解析，才能够经过一系列层驱动GPU工作，生成像素缓存，显示器会按照一定的频率扫描像素缓存，最终显示出来

## 初始化着色器函数 - `initShader()`

- 主要是编译着色器源代码

```js
//声明初始化着色器函数
function initShader(gl,vertexShaderSource,fragmentShaderSource){
    //创建顶点着色器对象
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    //创建片元着色器对象
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    //引入顶点、片元着色器源代码
    gl.shaderSource(vertexShader,vertexShaderSource);
    gl.shaderSource(fragmentShader,fragmentShaderSource);
    //编译顶点、片元着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    //创建程序对象program
    var program = gl.createProgram();
    //附着顶点着色器和片元着色器到program
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    //链接program
    gl.linkProgram(program);
    //使用program
    gl.useProgram(program);
    //返回程序program对象
    return program;
}
```

## 绘制方法 - `gl.drawArrays()`

- 主要是通知`GPU`执行着色器代码，然后在`canvas`画布上进行渲染绘制

## 着色器代码放在script标签中

- 通过`.innerHTML`获取元素中的字符串

```js
<!-- 顶点着色器源码 -->
<script id="vertexShader" type="x-shader/x-vertex">
  void main() {
    //给内置变量gl_PointSize赋值像素大小
    gl_PointSize=20.0;
    //顶点位置，位于坐标原点
    gl_Position =vec4(0.0,0.0,0.0,1.0);
  }
</script>
<!-- 片元着色器源码 -->
<script id="fragmentShader" type="x-shader/x-fragment">
  void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
</script>

<script>
//顶点着色器源码
var vertexShaderSource = document.getElementById('vertexShader').innerText;
//片元着色器源码
var fragShaderSource = document.getElementById('fragmentShader').innerText;
//初始化着色器
var program = initShader(gl,vertexShaderSource,fragShaderSource);    
</script>
```

***

# `canvas`画布

```js
//通过方法getContext()获取WebGL上下文
var gl=canvas.getContext('webgl');
...
//调用WebGL API绘制渲染方法drawArrays
gl.drawArrays(gl.POINTS,0,1);
...
```

***

# `WebGL`绘制一个矩形

## 创建顶点数组

```js
//类型数组构造函数Float32Array创建顶点数组
// 矩形四个顶点坐标的数据
var data=new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5]);
```

## `attribute`关键字

- 声明顶点相关数据的时候需要用到
- `attribute vec4 apos`：声明`apos`表示矩形所有顶点的位置坐标

```js
//attribute声明vec4类型变量apos
attribute vec4 apos;
```

- 调用相关的`WebGL API`把类型数组数据传递给顶点着色器中的`apos`

```js
//获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
var aposLocation = gl.getAttribLocation(program,'apos');
...
...
//创建缓冲区对象
var buffer=gl.createBuffer();
//绑定缓冲区对象,激活buffer
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,0,0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);
```

![img](http://www.yanhuangxueyuan.com/upload/webgl91.2.jpg)

## 硬件相关

- 顶点着色器

```js
//attribute声明vec4类型变量apos
attribute vec4 apos;
void main() {
  //顶点坐标apos赋值给内置变量gl_Position
  //逐顶点处理数据
  gl_Position = apos;
}
```

- 片元着色器

```js
void main() {
  // 逐片元处理数据，所有片元(像素)设置为红色
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
```

- GPU中有各种专门的寄存器，比如用来接收顶点坐标数据的寄存器是输入寄存器，从数据类型的角度看属于浮点寄存器，用来临时存储浮点数； 存储输出到显示器像素的帧缓存是输出寄存器，从处理速度的角度看是数据缓冲寄存器，GPU处理数据的速度要比显示器扫描帧缓存中像素数据的速度要快得多
- 显示器像素是显示器可以通过RGB值控制的最小单位，一幅图像是由大量像素点累积显示。着色器中的颜色定义会反映在显示器中
- 显示器的分辨率就是显示器长度方向像素点的个数X显示器宽度方向像素点的个数
- 屏幕相邻的两个像素单元的距离就是点距，点距越小显示效果越好，一般现在显示器0.2mm~0.4mm之间

***

# 坐标系-投影

定义三个顶点：

```js
//9个元素构建三个顶点的xyz坐标值
// 数组里9个元素，每间隔3个为一组，分别代表xyz轴上的坐标值
var data=new Float32Array([
    0.0, 0.0, 1.0,//三角形顶点1坐标
    0.0, 1.0, 0.0,//三角形顶点2坐标
    1.0, 0.0, 0.0//三角形顶点3坐标
]);
```

***

# 平移变换

## 方法一 -  重新定义顶点坐标

```js
var data=new Float32Array([
    0.0, 0.0, 1.0,//三角形顶点1坐标
    0.0, 1.0, 0.0,//三角形顶点2坐标
    1.0, 0.0, 0.0//三角形顶点3坐标
]);

var data=new Float32Array([
    -0.4, 0.0, 1.0,//三角形顶点1坐标
    -0.4, 1.0, 0.0,//三角形顶点2坐标
     0.6, 0.0, 0.0//三角形顶点3坐标
]);
```

## 方法二 - `for`

```js
for(var i = 0;i<9;i += 3 )
{
data[i] += -0.4;
}
```

## 方法三 - GPU处理法 -`vec4(apos.x, apos.y, apos.z, 1)`

```js
// 在顶点着色器中逐顶点沿着x轴平移-0.4
gl_Position =vec4(apos.x-0.4,apos.y,apos.z,1);
```

## 方法四 - 平移矩阵法

- 矩阵的数学变换

- 在原来的顶点着色器代码中，声明一个4x4矩阵`m4`,然后通过矩阵和表示顶点坐标的列向量相乘`m4*apos`,实现对顶点apos的平移变换，和方法三一样把数学计算任务交给GPU处理器，具体说是顶点着色器单元(`Vertex Processor`)，顶点着色器单元能够完成矩阵的乘法运算。

```js
//attribute声明vec4类型变量apos
attribute vec4 apos;
void main() {
  //创建平移矩阵(沿x轴平移-0.4)
  //1   0   0  -0.4
  //0   1   0    0
  //0   0   1    0
  //0   0   0    1
  mat4 m4 = mat4(1,0,0,0,  0,1,0,0,  0,0,1,0,  -0.4,0,0,1);
  //平移矩阵m4左乘顶点坐标(vec4类型数据可以理解为线性代数中的nx1矩阵，即列向量)
  // 逐顶点进行矩阵变换
  gl_Position = m4*apos;
}
```

- `mat4`和`vec4`都是用来声明`WebGL`着色器变量的数据类型
- `vec4`：$4 \times 1$矩阵
- `mat4`：$4 \times 4$矩阵

# 绘制立方体 - 旋转变换

![img](http://www.yanhuangxueyuan.com/upload/webgl12cube.png)

1. 找出所有的顶点
2. 旋转矩阵对所有顶点进行旋转变换
3. 调用`gl.drawArrays`绘制连线

```js
//设置几何体轴旋转角度为30度，并把角度值转化为弧度值
float radian = radians(30.0);

//LINE_LOOP模式绘制前四个点
gl.drawArrays(gl.LINE_LOOP,0,4);
//LINE_LOOP模式从第五个点开始绘制四个点
gl.drawArrays(gl.LINE_LOOP,4,4);
//LINES模式绘制后8个点
gl.drawArrays(gl.LINES,8,8);


```

***

# 顶点索引绘制

- 复用顶点数据，引入`gl.drawElements()`
- 通过一个索引数组访问使用顶点数组中的顶点数据

```js
//   8个顶点坐标数组
var data=new Float32Array([
0.5,  0.5,  0.5,//顶点0
-0.5,  0.5,  0.5,//顶点1
-0.5, -0.5,  0.5,//顶点2
0.5, -0.5,  0.5,//顶点3
0.5,  0.5, -0.5,//顶点4
-0.5,  0.5, -0.5,//顶点5
-0.5, -0.5, -0.5,//顶点6
0.5, -0.5, -0.5,//顶点7
]);

// 顶点索引数组
var indexes = new Uint8Array([
  //前四个点对应索引值
  0, 1, 2, 3,//gl.LINE_LOOP模式四个点绘制一个矩形框
  //后四个顶点对应索引值
  4, 5, 6, 7,//gl.LINE_LOOP模式四个点绘制一个矩形框
  //前后对应点对应索引值  
  0, 4,//两个点绘制一条直线
  1, 5,//两个点绘制一条直线
  2, 6,//两个点绘制一条直线
  3, 7//两个点绘制一条直线
]);

//创建缓冲区对象
var indexesBuffer=gl.createBuffer();
//绑定缓冲区对象
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexesBuffer);
//索引数组indexes数据传入缓冲区
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexes,gl.STATIC_DRAW);

//LINE_LOOP模式绘制前四个点
gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,0);
//LINE_LOOP模式从第五个点开始绘制四个点
gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,4);
//LINES模式绘制后8个点
gl.drawElements(gl.LINES, 8, gl.UNSIGNED_BYTE, 8);
```

## `gl.drawElements()`

参数格式：`drawElements(mode, count, type, offset)`

| 参数   | 含义               | 值                                                           |
| :----- | :----------------- | :----------------------------------------------------------- |
| mode   | 绘制模式           | gl.LINE_LOOP、gl.LINES、gl.TRIANGLES等                       |
| count  | 绘制顶点个数       | 整型数                                                       |
| type   | 数据类型           | gl.UNSIGNED_BYTE对应Uint8Array，gl.UNSIGNED_SHORT对应Uint16Array |
| offset | 从第几个点开始绘制 | 整型数，以字节为单位                                         |

`count`和`offset`组合可以确定绘制众多顶点中的连续一段，通过顶点索引关联顶点数据，`count`和`offset`指的是顶点的索引数组。

***

# `varying`变量和颜色插值

![img](http://www.yanhuangxueyuan.com/upload/webgl14interpolation.png)

## 顶点着色器代码

```js
//attribute声明vec4类型变量apos
attribute vec4 apos;
// attribute声明顶点颜色变量
attribute vec4 a_color;
//varying声明顶点颜色插值后变量
varying vec4 v_color;
void main() {
  // 顶点坐标apos赋值给内置变量gl_Position
  gl_Position = apos;
  //顶点颜色插值计算
  v_color = a_color;
}
```

## 片元着色器代码

```js
// 所有float类型数据的精度是lowp
precision lowp float;
// 接收顶点着色器中v_color数据
varying vec4 v_color;
void main() {
  // 插值后颜色数据赋值给对应的片元
  gl_FragColor = v_color;
}
```

