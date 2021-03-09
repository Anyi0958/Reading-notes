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
- 可以联系绘制函数`drawArrays()`来理解渲染器的渲染操作方法render()。
![7-WebGL][07]

***
# 2. 旋转动画，`requestAnimationFrame`周期性渲染
- 开发游戏，商品展示，室内漫游，都会涉及到动画

## 周期性渲染 - `setInterval`

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

## 渲染频率 - `render()`

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
# 3. 鼠标操作三维场景 - `orbitControls.js`

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

## 场景操作 - `requestAnimationFrame`

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
## 同时绘制多个几何体 - `<embed>`

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

## 辅助三维坐标系`THREE.AxisHelper`

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

# 5. 材质效果

## 半透明效果 - `THREE.MeshLambertMaterial()`

- `THREE.MeshLambertMaterial()`：更改场景中的球体材质对象构造函数
- `opacity`：0-1
- `transparent`：开启透明度效果 - `true, false`
```js
let sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.7,
    transparent: true
});
```
材质常见属性：
- `color`：材质颜色
- `wireframe`：将几何图形渲染为线框
- `opacity`：透明度设定
- `transparent`：开启透明

## 添加高光效果

- `specular`：球体网格模型的高光颜色
- `shininess`：光照强度的系数
- `Three.js`存在漫反射、镜面反射，分别对应`MeshLambertMaterial(), MeshPhongMaterial()`

# 6. 光源

- `AmbientLight`：环境光
- `PointLight`：点光源
- `DirectionalLight`：平行光，如太阳光
- `SpotLight`：聚光源

## 环境光创建 - `THREE.AmbientLight()`

```js
let ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
```

## 点光源创建 - `THREE.PointLight()`

```js
let point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
```

- 在`add`后，渲染时获取光源的信息进行光照计算

## 立体效果

- 只是使用环境光，立体将会失去棱角
- 环境光只是设置整个空间的明暗效果
- 立体效果需要方向性的点光源、平行光源

## 光源光照强度

- 光源构造函数的参数可以设置光源的颜色：`THREE.AmbientLight(0x444444)`

## 光源位置

```js
let point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
```

- 如果光源在立方体里，则无法照射外部表面

## 多点光源

```js
let point2 = new THREE.PointLight(0xffffff);
point2.position.set(-400, -200, -300);
scene.add(point2);
```



# 1. 顶点位置数据解析渲染

## `JavaScript`类型化数组

- 定性数组

## 自定义几何体 - `BoxGeometry, SphereGeometry, THREE.BufferGeometry`

- 立方体：`BoxGeometry`
- 球体：`SphereGeometry`

```js
// 创建一个Buffer类型的几何体对象
let geometry = new THREE.BufferGeometry();
// 类型数组创建顶部数据
let vertices = new Float32Array([
   0, 0, 0,	// 顶点的坐标
    50, 0, 0,
    0, 100, 0,
    0, 0, 10,
    0, 0, 100,
    50, 0, 10
]);

// 创建属性缓冲区对象
let attribute = new THREE.BufferAttribute(vertices, 3);
// 3个为一组，表示一个顶点的xyz坐标
// 设置几何体attribute属性的位置属性
geometry.attributes.position = attribute;
```

- 通过自定义的几何体创建一个网格模型
- 每3个顶点为1组，可以确定一个三角形
- 几何体是6个顶点，需要绘制两个三角形

```js
// 三角形渲染模式
// 材质对象
let material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide
});
// 网格模型
let mesh = new THREE.Mesh(geometry, material);
```

## 点模型`THREE.PointsMaterial()`

- 每个顶点都会渲染出来一个点

```js
//点渲染模式
let material = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 10.0
});

let points = new THREE.Points(geometry, material);
scene.add(points);
```

![point](http://www.webgl3d.cn/upload/threejs16point.jpg)

## 线模型- `THREE.LineBasicMaterial()`

```js
//线条模式
let material = new THREE.LineBasicMaterial({
    color: 0xff0000
});

let line = new THREE.Line(geometry, material);
scene.add(line);
```

![Line](http://www.webgl3d.cn/upload/threejs16line.jpg)

## 几何体本质 - `BoxGeometry, MeshLambertMaterial`

- 立方体网格模型`Mesh`由立方体几何体`geometry`和材质`material`两部分组成
- 三角形封装成图

```js
let geometry = new THREE.BoxGeometry(100,100,100);
let material = new THREE.MeshLambertMaterial({
    color: 0x0000ff
});

let mesh = new THREE.Mesh(geometry, material);
```

![img](http://www.webgl3d.cn/upload/threejs16331.jpg)

# 2. 顶点颜色数据插值计算

![image-20210308010449117](.\img\14-顶点的概念.png)

## 每个顶点设置一种颜色

![img](http://www.webgl3d.cn/upload/threejs17point.jpg)

- `Float32Array()`：存储信息
- `THREE.BufferGeometry()`：缓冲几何体对象
- `THREE.BufferAttribute()`：创建属性缓冲区对象

```js
var geometry = new THREE.BufferGeometry(); //声明一个缓冲几何体对象

//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标

  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，作为一个顶点的xyz坐标
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue;
//类型数组创建顶点颜色color数据
var colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 1, 0, //顶点2颜色
  0, 0, 1, //顶点3颜色

  1, 1, 0, //顶点4颜色
  0, 1, 1, //顶点5颜色
  1, 0, 1, //顶点6颜色
]);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
//材质对象
var material = new THREE.PointsMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  size: 10.0 //点对象像素尺寸
});
// 点渲染模式  点模型对象Points
var points = new THREE.Points(geometry, material); //点模型对象
scene.add(points); //点对象添加到场景
```

## 材质属性 - `.vertexColors`

```js
var material = new THREE.PointsMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  size: 10.0 //点对象像素尺寸
});
```

- 文档推荐：[Material文档](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/Material "Material文档")

## 属性缓冲区对象 - `BufferAttribute`

- 目的为创建各种各样的顶点数据，比如颜色，位置

- 常用作几何体的坐标属性`BufferGeometry.attribute.position`，`BufferGeometry.attribute.color`的值
- 推荐文档：[BufferAttribute](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/BufferAttribute)
- [BufferGeometry](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/BufferGeometry)

## 颜色插值

- 如果把几何体作为网格模型`Mesh`或者模型`Line`的参数，会出现渐变效果

![img](http://www.webgl3d.cn/upload/threejs17mesh.jpg)



```js

let scene = new THREE.Scene();

var geometry = new THREE.BufferGeometry(); //声明一个缓冲几何体对象

//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标

  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，作为一个顶点的xyz坐标
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue;
//类型数组创建顶点颜色color数据
var colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 1, 0, //顶点2颜色
  0, 0, 1, //顶点3颜色

  1, 1, 0, //顶点4颜色
  0, 1, 1, //顶点5颜色
  1, 0, 1, //顶点6颜色
]);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
//材质对象
var material = new THREE.PointsMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  size: 10.0 //点对象像素尺寸
});
// 点渲染模式  点模型对象Points
var points = new THREE.Points(geometry, material); //点模型对象
scene.add(points); //点对象添加到场景


    // 网格模型对象Mesh
    let mesh = new THREE.Mesh(geometry, material);
    // 位置选择
    // 球体沿y轴正方向平移120

    // 网格模型添加到场景中
    scene.add(mesh);
  
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
```



# 3. 顶点法向量数据光照计算

- 漫反射、镜面反射
- 可以给每个顶点定义一个方向向量

![img](http://www.webgl3d.cn/upload/threejs18webgl.png)

![img](http://www.webgl3d.cn/upload/threejs18332.jpg)



## 不设置顶点法向量数据

- 光源不起作用
- 图形暗淡没有棱角

![img](http://www.webgl3d.cn/upload/threejs18%E6%97%A0.jpg)

```js

let scene = new THREE.Scene();
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标

  0, 0, 0, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 0, //顶点6坐标

]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue;

//材质对象
var material = new THREE.PointsMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  size: 10.0 //点对象像素尺寸
});
// 点渲染模式  点模型对象Points
var points = new THREE.Points(geometry, material); //点模型对象
scene.add(points); //点对象添加到场景


    // 网格模型对象Mesh
    let mesh = new THREE.Mesh(geometry, material);
    // 位置选择
    // 球体沿y轴正方向平移120

    // 网格模型添加到场景中
    scene.add(mesh);
  
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
```

## 定义几何体顶点法向量数据

- 光线分明，存在棱角感

```js
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标

  0, 0, 0, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 0, //顶点6坐标

]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue

var normals = new Float32Array([
  0, 0, 1, //顶点1法向量
  0, 0, 1, //顶点2法向量
  0, 0, 1, //顶点3法向量

  0, 1, 0, //顶点4法向量
  0, 1, 0, //顶点5法向量
  0, 1, 0, //顶点6法向量
]);
// 设置几何体attributes属性的位置normal属性
//3个为一组,表示一个顶点的法向量数据
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); 

//类型数组创建顶点颜色color数据
var colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 1, 0, //顶点2颜色
  0, 0, 1, //顶点3颜色

  1, 1, 0, //顶点4颜色
  0, 1, 1, //顶点5颜色
  1, 0, 1, //顶点6颜色
]);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB



//材质对象
var material = new THREE.PointsMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  size: 10.0 //点对象像素尺寸
});


// 点渲染模式  点模型对象Points
var points = new THREE.Points(geometry, material); //点模型对象
scene.add(points); //点对象添加到场景
```

## `API`总结

- `BufferGeometry.attributes.position`：访问几何体顶点位置数据
- `BufferGeometry.attributes.color`：访问几何体顶点颜色数据
- `BufferGeometry.attributes.normal`：访问几何体顶点法向量数据

# 4. 顶点索引复用顶点数据

- `BufferGeometry`的顶点索引属性`BufferGeometry.index`设置顶点索引数据
- 索引数据：重复位置通过索引获取

## 不使用顶点索引

- 6个顶点定义两个三角形

```js
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  80, 0, 0, //顶点2坐标
  80, 80, 0, //顶点3坐标

  0, 0, 0, //顶点4坐标   和顶点1位置相同
  80, 80, 0, //顶点5坐标  和顶点3位置相同
  0, 80, 0, //顶点6坐标
]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue
var normals = new Float32Array([
  0, 0, 1, //顶点1法向量
  0, 0, 1, //顶点2法向量
  0, 0, 1, //顶点3法向量

  0, 0, 1, //顶点4法向量
  0, 0, 1, //顶点5法向量
  0, 0, 1, //顶点6法向量
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
```



## 顶点索引 - `BufferGeometry.index`

```js
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  80, 0, 0, //顶点2坐标
  80, 80, 0, //顶点3坐标
  0, 80, 0, //顶点4坐标
]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue
var normals = new Float32Array([
  0, 0, 1, //顶点1法向量
  0, 0, 1, //顶点2法向量
  0, 0, 1, //顶点3法向量
  0, 0, 1, //顶点4法向量
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标


// Uint16Array类型数组创建顶点索引数据
var indexes = new Uint16Array([
  // 0对应第1个顶点位置数据、第1个顶点法向量数据
  // 1对应第2个顶点位置数据、第2个顶点法向量数据
  // 索引值3个为一组，表示一个三角形的3个顶点
  0, 1, 2,
  0, 2, 3,
])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
```

- 可以根据顶点的数量选择类型数组`Uint8Array`、`Uint16Array`、`Uint32Array`
- 对于顶点索引而言选择整型类型数组，对于非索引的顶点数据，需要使用浮点类型数组`Float32Array`等。

| 类型数组     | 位数 | 字节 | 类型描述           | C语言等价类型 |
| :----------- | :--- | :--- | :----------------- | :------------ |
| Int8Array    | 8    | 1    | 有符号8位整型      | int8_t        |
| Uint8Array   | 8    | 1    | 无符号8位整型      | uint8_t       |
| Int16Array   | 16   | 2    | 有符号16位整型     | int16_t       |
| Uint16Array  | 16   | 2    | 无符号16位整型     | int16_t       |
| Int32Array   | 32   | 4    | 有符号32位整型     | int32_t       |
| Uint32Array  | 32   | 4    | 无符号32位整型     | uint32_t      |
| Float32Array | 32   | 4    | 单精度(32位)浮点数 | float         |
| Float64Array | 64   | 8    | 双精度(64位)浮点数 | double        |

## 总结

![image-20210308114855183](.\img\15-bufferGeometry.png)



# 5. 设置`Geometry`顶点位置、顶点颜色数据

- `Geometry`和`BufferGeometry`表达含义相似，但对象结构不同



## 顶点位置坐标数据 - `Vector3`

- `Vector3`是`threejs`的三维向量对象,可以通过`Vector3`对象表示一个顶点的`xyz`坐标，顶点的法线向量。
- 几何体`Geometry`的顶点位置属性`geometry.vertices`和缓冲类型几何体`BufferGeometry`顶点位置属性`BufferGeometry.attributes.position`是对应的。

```js
var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
var p3 = new THREE.Vector3(80, 70, 0); //顶点3坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3);
```

## 定义顶点颜色数据 - `Color`

- 通过`Color`设定顶点颜色，然后利用数组作为几何体的颜色属性
- 几何体`Geometry`的顶点颜色属性`geometry.colors`和缓冲类型几何体`BufferGeometry`顶点颜色属性`BufferGeometry.attributes.color`是对应的
- 几何体`Geometry`顶点颜色属性`geometry.colors`，对网格模型`Mesh`是无效的，对于点模型`Points`、线模型`Line`是有效果

```js
// Color对象表示顶点颜色数据
var color1 = new THREE.Color(0x00ff00); //顶点1颜色——绿色
var color2 = new THREE.Color(0xff0000); //顶点2颜色——红色
var color3 = new THREE.Color(0x0000ff); //顶点3颜色——蓝色
//顶点颜色数据添加到geometry对象
geometry.colors.push(color1, color2, color3);
```

## 材质属性 `.vertexColors`

- 注意使用顶点颜色数据定义模型颜色的时候，要把材质的属性`vertexColors`设置为`THREE.VertexColors`,这样顶点的颜色数据才能取代材质颜色属性`.color`起作用

```js
//材质对象
var material = new THREE.MeshLambertMaterial({
  // color: 0xffff00,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  side: THREE.DoubleSide, //两面可见
});
```

# 6. `Face3`对象定义`Geometry`的三角形面

- 几何体[Geometry](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Geometry)的三角面属性`geometry.faces`和缓冲类型几何体[BufferGeometry](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/BufferGeometry)顶点索引属性`BufferGeometry.index`类似都是顶点位置数据的索引值,用来组织网格模型三角形的绘制。

![img](http://www.webgl3d.cn/upload/threejs211.jpg)

```js
var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3,p4);

// Face3构造函数创建一个三角面
var face1 = new THREE.Face3(0, 1, 2);
//三角面每个顶点的法向量
var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
// 设置三角面Face3三个顶点的法向量
face1.vertexNormals.push(n1,n2,n3);

// 三角面2
var face2 = new THREE.Face3(0, 2, 3);
// 设置三角面法向量
face2.normal=new THREE.Vector3(0, -1, 0);

//三角面face1、face2添加到几何体中
geometry.faces.push(face1,face2);
```

## 设置顶点 - `.Vector3`

```js
var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3,p4);
```

## `Face3`构建三角形

- 通过数组索引值从`geometry.vertices`数组种获得顶点位置坐标数据

```js
// Face3构造函数创建一个三角面
var face1 = new THREE.Face3(0, 1, 2);
// 三角面2
var face2 = new THREE.Face3(0, 2, 3);
```

## 三角形法线 - `Face3.normal`

- 设置三角形法线方向向量有两种方式，一种是直接定义三角形面的法线方向，另一个是定义三角形三个顶点的法线方向数据来表示三角形面法线方向

```js
// 三角面2
var face2 = new THREE.Face3(0, 2, 3);
// 设置三角面法向量
face2.normal=new THREE.Vector3(0, -1, 0);
```

`Face3.vertexNormals`:

```js
// Face3构造函数创建一个三角面
var face1 = new THREE.Face3(0, 1, 2);
//三角面每个顶点的法向量
var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
// 设置三角面Face3三个顶点的法向量
face1.vertexNormals.push(n1,n2,n3);
```

## 颜色设置 - `THREE.Color()`

```js
// 三角形1颜色
face1.color = new THREE.Color(0xffff00);
// 设置三角面face1三个顶点的颜色
face1.color = new THREE.Color(0xff00ff);

face1.vertexColors = [
  new THREE.Color(0xffff00),
  new THREE.Color(0xff00ff),
  new THREE.Color(0x00ffff),
]
```

# 7. 访问几何体对象的数据

- 实际开发中，需要加载外部模型
- 获取外部模型的几何体顶点数据，需要熟悉`BoxGeometry`和`BufferGeometry`

## 测试 `BoxGeometry`

- 调用`BoxGeometry`创建立方体，然后执行`THREE.BoxGeoetry`自动生成顶点数据

```js
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
console.log(geometry);
console.log('几何体顶点位置数据',geometry.vertices);
console.log('三角行面数据',geometry.faces);
```

![image-20210309124101080](.\img\16-object.png)

## 测试案例

![img](http://www.webgl3d.cn/upload/threejs22ex1.jpg)

```js
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 遍历几何体的face属性
geometry.faces.forEach(face => {
  // 设置三角面face三个顶点的颜色
  face.vertexColors = [
    new THREE.Color(0xffff00),
    new THREE.Color(0xff00ff),
    new THREE.Color(0x00ffff),
  ]
});
var material = new THREE.MeshBasicMaterial({
  // color: 0x0000ff,
  vertexColors: THREE.FaceColors,
  // wireframe:true,//线框模式渲染
}); //材质对象Material
```

## 访问外部模型顶点数据

- 加载外部模型，会解析为`BufferGeometry`

# 8. 几何体旋转、缩放、平移变换

![image-20210309124636252](.\img\17-geometryScale.png)

- 这些变化本质都是改变坐标数据
- 通过`console.log(geometry.vertices)`查看改变

```js
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 几何体xyz三个方向都放大2倍
geometry.scale(2, 2, 2);
// 几何体沿着x轴平移50
geometry.translate(50, 0, 0);
// 几何体绕着x轴旋转45度
geometry.rotateX(Math.PI / 4);
// 居中：偏移的几何体居中
geometry.center();
console.log(geometry.vertices);
```

- [BufferGeometry](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/BufferGeometry)和几何体[Geometry](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Geometry) 一样具有`.scale()`、`.rotateZ()`、`.rotateX()`等几何体变换的方法。

## 注意

- 注意网格模型`Mesh`进行缩放旋转平移变换和几何体`Geometry`可以实现相同的渲染效果
- 但是网格模型`Mesh`进行这些变换不会影响几何体的顶点位置坐标，网格模型缩放旋转平移变换改变的是模型的本地矩阵、世界矩阵

```js
// 几何体xyz方向分别缩放0.5,1.5,2倍
geometry.scale(0.5, 1.5, 2);

// 网格模型xyz方向分别缩放0.5,1.5,2倍
mesh.scale.set(0.5, 1.5, 2)
```

***

# 1. 常用材质介绍

![image-20210309144124750](.\img\18-material.png)

## 点材质 - `PonitsMaterial`

```js
var geometry = new THREE.SphereGeometry(100, 25, 25); //创建一个球体几何对象
// 创建一个点材质对象
var material = new THREE.PointsMaterial({
  color: 0x0000ff, //颜色
  size: 3, //点渲染尺寸
});
//点模型对象  参数：几何体  点材质
var point = new THREE.Points(geometry, material);
scene.add(point); //网格模型添加到场景中
```

## 线材质 - `LineBasicMaterial, LineDashedMaterial`

```js
var geometry = new THREE.SphereGeometry(100, 25, 25);//球体
// 直线基础材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x0000ff
});
var line = new THREE.Line(geometry, material); //线模型对象
scene.add(line); //点模型添加到场景中

// 虚线材质对象：产生虚线效果
var material = new THREE.LineDashedMaterial({
  color: 0x0000ff,
  dashSize: 10,//显示线段的大小。默认为3。
  gapSize: 5,//间隙的大小。默认为1
});
var line = new THREE.Line(geometry, material); //线模型对象
//  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
line.computeLineDistances();
```

## 网格模型 - `MeshBasicMaterial,MeshLambertMaterial, MeshPhongMaterial`

```js
var material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
})

var material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
});

var material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  specular:0x444444,//高光部分的颜色
  shininess:20,//高光部分的亮度，默认30
});
```

# 2. 材质共有属性、私有属性

## `.side`属性

- 属性的默认值是`THREE.FrontSide`，表示前面. 也可以设置为后面`THREE.BackSide` 或 双面`THREE.DoubleSide`.

```js
var material = new THREE.MeshBasicMaterial({
  color: 0xdd00ff,
  // 前面FrontSide  背面：BackSide 双面：DoubleSide
  side:THREE.DoubleSide,
});
```

## 材质透明度 - `opacity`

```js
var material = new THREE.MeshPhongMaterial({
  color: 0x220000,
  // transparent设置为true，开启透明，否则opacity不起作用
  transparent: true,
  // 设置材质透明度
  opacity: 0.4,
});

  // transparent设置为true，开启透明，否则opacity不起作用
material.transparent = true;
  // 设置材质透明度
material.opacity = 0.4;
```

***

# 1. 点、线、网格模型介绍

![image-20210309144744032](.\img\19-model.png)

- `points, line, mesh`都是由`Geometry, Material`构成

## 点

```js
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 点渲染模式
var material = new THREE.PointsMaterial({
  color: 0xff0000,
  size: 5.0 //点对象像素尺寸
}); //材质对象
var points = new THREE.Points(geometry, material); //点模型对象
```

![img](http://112.74.179.151/upload/1577279341491.jpg)

## 线

- 线模型除了[Line](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Line)还有[LineLoop](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/LineLoop)和[LineSegments](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/LineSegments),`LineLoop`和`Line`区别是连线的时候会闭合把第一个顶点和最后一个顶点连接起来，`LineSegments`则是顶点不共享，第1、2点确定一条线，第3、4顶点确定一条直线，第2和3点之间不连接。

```js
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 线条渲染模式
var material=new THREE.LineBasicMaterial({
    color:0xff0000 //线条颜色
});//材质对象
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
var line=new THREE.Line(geometry,material);//线条模型对象
```

![img](http://112.74.179.151/upload/1577279383015.jpg)

## 网格模型

```js
var geometry = new THREE.BoxGeometry(100, 100, 100);
// 三角形面渲染模式  
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff, //三角面颜色
}); //材质对象
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
```

![img](http://112.74.179.151/upload/1577279465519.jpg)

```js
// 1.
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff, //三角面颜色
  wireframe:true,//网格模型以线条的模式渲染
});

// 2.
// 通过访问属性的形式设置
material.wireframe = true;
```

![img](http://112.74.179.151/upload/1577279497254.jpg)

# 2. 模型对象旋转平移变换

![image-20210309145935358](.\img\20-object3d.png)

## 缩放 - `scale`

- 网格模型`Mesh`的属性`.scale`表示模型对象的缩放比例，默认值是`THREE.Vector3(1.0,1.0,1.0)`
- `.scale`的属性值是一个三维向量对象[Vector3](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/math/Vector3)，查看three.js文档你可以知道`Vector3`对象具有属性`.x`、`.y`、`.z`，`Vector3`对象还具有方法`.set()`，`.set`方法有三个表示`xyz`方向缩放比例的参数。

```js
mesh.scale.set(0.5, 1.5, 2)
mesh.scale.x = 2.0;
```

## `.position`

```js
mesh.position.y = 80;

mesh.position.set(80,2,10);
```

## 平移

```js
// 等价于mesh.position = mesh.position + 100;
mesh.translateX(100);//沿着x轴正方向平移距离100

mesh.translateZ(-50);

//向量Vector3对象表示方向
var axis = new THREE.Vector3(1, 1, 1);
axis.normalize(); //向量归一化
//沿着axis轴表示方向平移100
mesh.translateOnAxis(axis, 100);
```

## 旋转

```js
mesh.rotateX(Math.PI/4);//绕x轴旋转π/4

var axis = new THREE.Vector3(0,1,0);//向量axis
mesh.rotateOnAxis(axis,Math.PI/8);//绕axis轴旋转π/8

// 绕着Y轴旋转90度
mesh.rotateY(Math.PI / 2);
//控制台查看：旋转方法，改变了rotation属性
console.log(mesh.rotation);
```

#3. 克隆和复制 - `.clone(), .copy()`

![image-20210309151802136](.\img\21-clone.png)

## `.copy`

```js
var p1 = new THREE.Vector3(1.2,2.6,3.2);
var p2 = new THREE.Vector3(0.0,0.0,0.0);
p2.copy(p1)
// p2向量的xyz变为p1的xyz值
console.log(p2);
```

## `.clone`

```js
var p1 = new THREE.Vector3(1.2,2.6,3.2);
var p2 = p1.clone();
// p2对象和p1对象xyz属性相同
console.log(p2);
```

***

![image-20210309152424690](.\img\22-light.png)

# 1. 常见光源类型

## `AmbientLight`

```js
//环境光:环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);//环境光对象添加到scene场景中
```

## `PointLight`

```js
//点光源
var point = new THREE.PointLight(0xffffff);
//设置点光源位置，改变光源的位置
point.position.set(400, 200, 300);
scene.add(point);
```

## `DirectionalLight`

```js
// 平行光
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
// 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh2;
scene.add(directionalLight);
```

# `SpotLight`

```js
// 聚光光源
var spotLight = new THREE.SpotLight(0xffffff);
// 设置聚光光源位置
spotLight.position.set(200, 200, 200);
// 聚光灯光源指向网格模型mesh2
spotLight.target = mesh2;
// 设置聚光光源发散角度
spotLight.angle = Math.PI / 6
scene.add(spotLight);//光对象添加到scene场景中
```

## 光源辅助对象

| 辅助对象           | 构造函数名                                                   |
| :----------------- | :----------------------------------------------------------- |
| 聚光源辅助对象     | [SpotLightHelper](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/helpers/SpotLightHelper) |
| 点光源辅助对象     | [PointLightHelper](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/helpers/PointLightHelper) |
|                    |                                                              |
| 平行光光源辅助对象 | [DirectionalLightHelper](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/helpers/DirectionalLightHelper) |









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

[14] : ./img/

