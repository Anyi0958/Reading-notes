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

***
[01]: ./img/1-instro.png "1-instro"
[02]: ./img/2-geometry.png "2-geometry"
[03]: ./img/3-Sphere.png "3-Sphere"
[04]: ./img/4-structure.png "4-structure"
[05]: ./img/5-process.png "5-process"
[06]: ./img/6-ProcessDetailed.png "6-ProcessDetailed"
[07]: ./img/7-WebGL.png "7-WebGL"
[08]: ./img/08-rotate.gif "08-rotate"