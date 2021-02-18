Three.js Ŀ¼
[TOC]
***
# ǰ��
����Ϊѧϰ`Three.js`�����еıʼǺ͸�����ᣬ������Ҫ�����Ķ�����doc

# �Ƽ��Ķ�
- [Three.js������-������](http://www.webgl3d.cn/ "Three.js������")
- [Three.js����](https://threejs.org/ "Three.js")
- [WebGL](http://www.webgl3d.cn/WebGL/ "WebGL")
- [Three.js - github](https://github.com/mrdoob/three.js "Three.js github")
- ��WebGL���ָ�ϡ�
- ��Three.js����ָ�ϡ�
- Physijs	
Physijs��һ���������棬����Э������ԭ��WebGL��ʹ��three.js����ģ���������󣬱����������䡢������ײ��������
- stats.js
JavaScript���ܼ������ͬ��Ҳ���Բ���webgl����Ⱦ����
- dat.gui	
��������icon���û������ܣ�������������Javascript�ı���������WebGL��һ������ĳߴ硢��ɫ
- tween.js	
����tween.js���ٴ������䶯�������Էǳ�����Ŀ��ƻ�е����Ϸ��ɫ�˶�
- ThreeBSP	
������Ϊthree.js�Ĳ������ɼ���ģ�͵Ĳ�����������ά��ģ����������в����ĸ���
***
��ܣ�
![1-instro][01]
***
# `HTML`����`Three.js`����
```html
<!--http���Ե�ַԶ�̼���-->
<script src="http://www.yanhuangxueyuan.com/3D/example/three.js"></script>
<!-- ѹ���汾 -->
<script src="http://www.yanhuangxueyuan.com/3D/example/three.min.js"></script>
```

# 3D����
## ��������
```html
<!--http���Ե�ַԶ�̼���-->
<script src="http://www.yanhuangxueyuan.com/versions/threejsR92/build/three.js"></script>
```
## ����Դ��

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
        *   ������������Scene
         */
        let scene = new THREE.Scene();
    
        /*
        *   ��������ģ�� 
         */
        // ����һ�������弸�ζ���Geometry
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        // ���ʶ���
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        // ����ģ�Ͷ���Mesh
        let mesh = new THREE.Mesh(geometry, material);
        // ����ģ����ӵ�������
        scene.add(mesh);
        
        /* 
        *   ��Դ����
         */
        // ���Դ
        let point = new THREE.PointLight(0xffffff);
        // ���Դλ��
        point.position.set(400, 200, 300);
        // ���Դ��ӵ�������
        scene.add(point);
        // ������
        let ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene);
        /* 
        *   �������
         */
        // window's width
        let width = window.innerWidth;
        // window's height
        let height = window.innerHeight;
    
        // ���ڿ�߱�
        let k = width / height;
    
        // ��ά������ʾ��Χ����ϵ����ϵ��Խ����ʾ�ķ�ΧԽ��
        let s = 200;
    
        // �������
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // ���������λ��
        camera.position.set(200, 300, 200);
        // �����������ָ��ĳ�������
        camera.lookAt(scene.position);
    
        /* 
        *   ������Ⱦ������
         */
        let renderer = new THREE.WebGLRenderer();
    
        // ������Ⱦ����ߴ�
        renderer.setSize(width, height);
        // ���ñ�����ɫ
        renderer.setClearColor(0xb9d3ff, 1);
        // ��bodyԪ���в���canvas���󣬲�ִ����Ⱦ����
        document.body.appendChild(renderer.domElement);
        // ָ�������������Ϊ����
        renderer.render(scene, camera);
    </script>
</body>

</html>
```
�����
![2-geometry][02]


***
[01]: ./img/1-instro.png "1-instro"
[02]: ./img/2-geometry.png "2-geometry"