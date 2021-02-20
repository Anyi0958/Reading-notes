Three.js 目录
[TOC]
***
# 前言
本文为学习`Three.js`过程中的笔记和个人体会，如有需要，请阅读官网doc

# 推荐阅读
- [Three.js中文网-电子书](http://www.webgl3d.cn/ "Three.js中文网")
- [Three.js官网](https://threejs.org/ "Three.js")
- [WebGL](http://www.webgl3d.cn/WebGL/ "WebGL")
- [Three.js - github](https://github.com/mrdoob/three.js "Three.js github")
- 《WebGL编程指南》
- 《Three.js开发指南》
- Physijs	
Physijs是一款物理引擎，可以协助基于原生WebGL或使用three.js创建模拟物理现象，比如重力下落、物体碰撞等物理现
- stats.js
JavaScript性能监控器，同样也可以测试webgl的渲染性能
- dat.gui	
轻量级的icon形用户界面框架，可以用来控制Javascript的变量，比如WebGL中一个物体的尺寸、颜色
- tween.js	
借助tween.js快速创建补间动画，可以非常方便的控制机械、游戏角色运动
- ThreeBSP	
可以作为three.js的插件，完成几何模型的布尔，各类三维建模软件基本都有布尔的概念
***
框架：
![1-instro][01]
***
# `HTML`引入`Three.js`引擎
```html
<!--http绝对地址远程加载-->
<script src="http://www.yanhuangxueyuan.com/3D/example/three.js"></script>
<!-- 压缩版本 -->
<script src="http://www.yanhuangxueyuan.com/3D/example/three.min.js"></script>
```
***
# 1. $3D$场景

## 引入引擎

```html
<!--http绝对地址远程加载-->
<script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
```
## 案例源码
### 立方体
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 指定场景、相机作为参数
        renderer.render(scene, camera);
    </script>
</body>

</html>
```
结果：
![2-geometry][02]

### 球体
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个球型几何对象Geometry
        let geometry = new THREE.SphereGeometry(60,40,40);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 指定场景、相机作为参数
        renderer.render(scene, camera);
    </script>
</body>

</html>
```
结果：
![3-Sphere][03]

## 代码解释
- 创建场景：`THREE.Scene()`
- 创建相机：`THREE.OrthographicCamera()`
- 创建渲染器：`THREE.WebGLRenderer()`
- 创建一个立方体：`THREE.BoxGeometry(longth,width,height)`
- 创建一个球体：`THREE.SphereGeometry(x,y,r)`
- 创建一个材质对象：`THREE.MeshLambertMaterial({color:0x00ff00})`，对象里包含颜色、透明度等属性
- 创建一个点光源对象：`THREE.PointLight(0x444444)`，参数是光照强度
- 创建一个正射投影相机对象：`THREE.OrthographicCamera()`
	- 前4个参数定义的是拍照窗口大小
	- 定义相机的位置：`camera.position.set(x,y,option)`
	- 定义相机的拍照方向：`camera.lookAt()`
## 程序的结构
![4-structure][04]

### 场景-相机-渲染器
![5-process][05]

## 对象、方法和属性
- 通过框架提供的构造函数可以创建对象，而对象拥有方法和属性
![6-ProcessDetailed][06]

## WebGL封装
- 实际的工作中如果不是开发3D引擎可能不会使用原生WebGL API
- WebGL对three.js的深度开发学习很有好处
- 可以联系绘制函数drawArrays()来理解渲染器的渲染操作方法render()。
![7-WebGL][07]

***
# 2. 旋转动画，`requestAnimationFrame`周期性渲染
- 开发游戏，商品展示，室内漫游，都会涉及到动画

## 周期性渲染
- 每执行一次渲染器对象`WebGLRenderer`的渲染方法`.render()`，浏览器就会渲染出一帧图像
- 浏览器对象`window`对象的方法`setInterval()`，实现定时器功能
```js
// 间隔20ms调用函数
setInterval("render()", 20)
```
- 网格模型绕y轴旋转$0.01$弧度：`mesh.rotateY(0.01)`
实现立方体旋转动画：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 周期执行,20ms=50FPS(1s/20ms),每秒渲染50次
        setInterval(() => {
            
            // 指定场景、相机作为参数
            renderer.render(scene, camera);
            // 每次绕y轴旋转0.01弧度
            mesh.rotateY(0.01);
        }, 20);
    </script>
</body>
</html>
```
结果演示：
![08-rotate][08]

## 渲染频率
- 调用渲染方法`.render()`进行渲染的渲染频率不能太低
- `setInterval(...,200)`相当于每秒渲染5次，存在卡顿，而如果太高的话，计算机硬件资源跟不上
- 正常渲染频率控制在每秒$30~60$次

## 函数`requestAnimationFrame()`
- 实际开发中，为了更好的利用浏览器渲染，可以使用函数`requestAnimationFrame()`代替`setInterval()`
- 也是`window`对象的方法
- `requestAnimationFrame()`函数的参数是将要被调用函数的函数名
	- 调用一个函数不是立即调用，而是向浏览器发起一个执行某函数的请求
	- 一般默认保持$60FPS$的频率
测试例子：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行requestAnimationFrame函数
        function render(){
            renderer.render(scene, camera);
            mesh.rotateY(0.01);
            requestAnimationFrame(render);
        }
        render();
    </script>
</body>
</html>
```
展示结果：
![9-rotate][09]

## 均匀旋转
- 实际情况里，`requestAnimationFrame(render)`请求的函数不一定能按照理想的$60FPS$频率执行，时间间隔也不一定相同
- 为了解决不均匀的问题，需要记录两次执行绘制函数的时间间隔
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行requestAnimationFrame函数
        // 上次时间
        let T0 = new Date();
        function render(){
            let T1 = new Date();
            let t = T1 - T0;

            T0 = T1;

            requestAnimationFrame(render);
            renderer.render(scene, camera);
            // 旋转角速度0.001弧度每毫秒
            mesh.rotateY(0.001 * t);            
        }
        render();
    </script>
</body>
</html>

```
# 3. 鼠标操作三维场景
- 使用鼠标操作三维场景，借助`Three.js`的控件`OrbitControls.js`
- 引入`OrbitControls.js`：`<script src="http://www.yanhuangxueyuan.com/threejs/examples/js/controls/OrbitControls.js"></script>`
## 代码实现
- 创建控件对象：`let controls = new THREE.OrbitControls(camera,renderer.domElement)`
- 监听事件：`controls.addEventListener('change', render)`
```js
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
    <script src="http://www.yanhuangxueyuan.com/threejs/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行渲染
        function render(){
            renderer.render(scene, camera);
        }
        render();
        // 创建控件对象
        let controls = new THREE.OrbitControls(camera, renderer.domElement);
        // 监听事件
        controls.addEventListener('change', render);
    </script>
</body>
</html>
```
结果展示：
![10-OrbitControls][10]

## 场景操作
- 通过`OrbitCOntrols`操作改变相机状态时，没必要通过`addEventListener()`，可以直接通过`requestAnimationFrame()`
- 注意开发中不要同时使用`requestAnimationFrame()`或`controls.addEventListener('change', render)`调用同一个函数，这样会冲突
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
    <script src="http://www.yanhuangxueyuan.com/threejs/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行渲染
        function render(){
            renderer.render(scene, camera);
            mesh.rotateY(0.01);
            requestAnimationFrame(render);
        }
        render();
        // 创建控件对象
        let controls = new THREE.OrbitControls(camera, renderer.domElement);                
    </script>
</body>
</html>

```
结果展示：
![11-rotabeOrbit][11]

# 4. $3D$场景中插入新的几何体
## `SphereGeometry`构造函数
- 使用：`SphereGeometry(radius, widthSegments, heightSegments)`

## 绘制球体网格模型
代码：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
    <script src="http://www.yanhuangxueyuan.com/threejs/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个几何球体对象Geometry
        let geometry = new THREE.SphereGeometry(60, 40, 40);
        // 材质对象
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // 网格模型对象Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // 网格模型添加到场景中
        scene.add(mesh);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行渲染
        function render(){
            renderer.render(scene, camera);
            mesh.rotateY(0.01);
            requestAnimationFrame(render);
        }
        render();
        // 创建控件对象
        let controls = new THREE.OrbitControls(camera, renderer.domElement);                
    </script>
</body>
</html>

```

## 更多几何体
- 常见文档：[API](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/geometries/CylinderGeometry "几何体文档")
常见推荐：
```js
//长方体 参数：长，宽，高
var geometry = new THREE.BoxGeometry(100, 100, 100);
// 球体 参数：半径60  经纬度细分数40,40
var geometry = new THREE.SphereGeometry(60, 40, 40);
// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
var geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );
// 正八面体
var geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
var geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
var geometry = new THREE.IcosahedronGeometry(50);
```
## 同时绘制多个几何体
1. 嵌入页面：`<embed width="770" height="500" src="1.插入多个几何体并偏移.html"/>`
2. 创建一个几何体对象和一个材质对象，然后在绘制的时候，多绘制几个几何体
绘制展示：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry1 = new THREE.BoxGeometry(100, 100, 100);
        // Sphere
        let geometry2 = new THREE.SphereGeometry(60, 40, 40);
        // 圆柱
        let geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
        // 材质对象
        let material1 = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        let material2 = new THREE.MeshLambertMaterial({
            color: 0xff00ff
        });
        let material3 = new THREE.MeshLambertMaterial({
            color: 0xffff00
        });
        // 网格模型对象Mesh
        let mesh1 = new THREE.Mesh(geometry1, material1);
        let mesh2 = new THREE.Mesh(geometry2, material2);
        let mesh3 = new THREE.Mesh(geometry3, material3);
        // 位置选择
        // 球体沿y轴正方向平移120
        mesh2.translateY(120);
        // 圆柱的x,y,z坐标
        mesh3.position.set(120,0,0);

        // 网格模型添加到场景中
        scene.add(mesh1);
        scene.add(mesh2);
        scene.add(mesh3);
        
        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行requestAnimationFrame函数
        function render(){
            renderer.render(scene, camera);
            mesh1.rotateY(0.01);
            requestAnimationFrame(render);
        }
        render();
    </script>
</body>
</html>

```
结果展示：
![12-MultiGeometry][12]

## 辅助三维坐标系`AxisHelper`
- 方便调试预览，提供了一个辅助的三维坐标系
- 可以直接调用`THREE.AxisHelper(250)`，参数表示坐标系大小，通过`scene.add()`插入到场景中即可
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
</head>
<body>
    <script>
        /* 
        *   创建场景对象Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   创建网格模型 
         */
        // 创建一个立方体几何对象Geometry
        let geometry1 = new THREE.BoxGeometry(100, 100, 100);
        // Sphere
        let geometry2 = new THREE.SphereGeometry(60, 40, 40);
        // 圆柱
        let geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
        // 材质对象
        let material1 = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        let material2 = new THREE.MeshLambertMaterial({
            color: 0xff00ff
        });
        let material3 = new THREE.MeshLambertMaterial({
            color: 0xffff00
        });
        // 网格模型对象Mesh
        let mesh1 = new THREE.Mesh(geometry1, material1);
        let mesh2 = new THREE.Mesh(geometry2, material2);
        let mesh3 = new THREE.Mesh(geometry3, material3);
        // 位置选择
        // 球体沿y轴正方向平移120
        mesh2.translateY(120);
        // 圆柱的x,y,z坐标
        mesh3.position.set(120,0,0);

        // 网格模型添加到场景中
        scene.add(mesh1);
        scene.add(mesh2);
        scene.add(mesh3);
        
        let axesHelper = new THREE.AxesHelper(250);
        scene.add(axesHelper);

        /* 
        *   光源设置
         */
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        // 点光源位置
        point.position.set(400, 200, 300);
        // 点光源添加到场景中
        scene.add(point);
        // 环境光
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   相机设置
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // 窗口宽高比
        let k = width / height;
    
        // 三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200;
    
        // 创建相机
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // 设置相机的位置
        camera.position.set(200, 300, 200);
        // 设置相机方向，指向的场景对象
        camera.lookAt(scene.position);
    
        /* 
        *   创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
    
        // 设置渲染区域尺寸
        renderer.setSize(width, height);
        // 设置背景颜色
        renderer.setClearColor(0xb9d3ff, 1);
        // 向body元素中插入canvas对象，并执行渲染操作
        document.body.appendChild(renderer.domElement);
        // 执行requestAnimationFrame函数
        function render(){
            renderer.render(scene, camera);
            mesh1.rotateY(0.01);
            requestAnimationFrame(render);
        }
        render();
    </script>
</body>
</html>
```
结果：
![13-axesHelper][13]

# 设置材质效果


***
[01]: ./img/1-instro.png "1-instro"
[02]: ./img/2-geometry.png "2-geometry"
[03]: ./img/3-Sphere.png "3-Sphere"
[04]: ./img/4-structure.png "4-structure"
[05]: ./img/5-process.png "5-process"
[06]: ./img/6-ProcessDetailed.png "6-ProcessDetailed"
[07]: ./img/7-WebGL.png "7-WebGL"
[08]: ./img/08-rotate.gif "08-rotate"
[09]: ./img/9-rotate.gif "9-rotate.gif"
[10]: ./img/10-OrbitControls.gif "10-OrbitControls"
[11]: ./img/11-rotabeOrbit.gif "11-rotabeOrbit"
[12]: ./img/12-MultiGeometry.gif "12-MultiGeometry"
[13]: ./img/13-axesHelper.png "13-axesHelper"