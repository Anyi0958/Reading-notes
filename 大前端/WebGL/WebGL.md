WebGL Ŀ¼
[TOC]
***
# ǰ��

- ����Ϊ`WebGl`ѧϰ֮��

# �Ƽ��Ķ�

- [3D����](https://bruno-simon.com/ "����")
- [WebGL���Ž̳�](http://www.yanhuangxueyuan.com/WebGL/)

# ��������ͼ

![img](http://www.yanhuangxueyuan.com/upload/webgl25a.png)

***

# ���Ƶ�

```html
<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>ʹ��WebGL����һ����</title>
 </head>
 <body>
 <!--canvas��ǩ����һ����߾�Ϊ500���أ�����Ϊ��ɫ�ľ��λ���-->
 <canvas id="webgl" width="500" height="500" style="background-color: blue"></canvas>
    
 <script>
     //ͨ��getElementById()������ȡcanvas����
     let canvas = document.getElementById('webgl');
     //ͨ������getContext()��ȡWebGL������
     var gl = canvas.getContext('webgl');
 
     //������ɫ��Դ��
     var vertexShaderSource = '' +
         'void main(){' +
         //�����ñ���gl_PointSize��ֵ���ش�С
         '   gl_PointSize=10.0;' +
         //����λ�ã�λ������ԭ��
         '   gl_Position =vec4(0.0,0.0,0.0,1.0);' +
         '}';
 
     //ƬԪ��ɫ��Դ��
     var fragShaderSource = '' +
         'void main(){' +
         //����ƬԪ��ɫ
         '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
         '}';
 
     //��ʼ����ɫ��
     var program = initShader(gl,vertexShaderSource,fragShaderSource);
     //��ʼ���ƣ���ʾ����ʾ���
     gl.drawArrays(gl.POINTS,0,1);
 
     //������ʼ����ɫ������
     function initShader(gl,vertexShaderSource,fragmentShaderSource){
         //����������ɫ������
         var vertexShader = gl.createShader(gl.VERTEX_SHADER);
         //����ƬԪ��ɫ������
         var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
         //���붥�㡢ƬԪ��ɫ��Դ����
         gl.shaderSource(vertexShader,vertexShaderSource);
         gl.shaderSource(fragmentShader,fragmentShaderSource);
         //���붥�㡢ƬԪ��ɫ��
         gl.compileShader(vertexShader);
         gl.compileShader(fragmentShader);
 
         //�����������program
         var program = gl.createProgram();
         //���Ŷ�����ɫ����ƬԪ��ɫ����program
         gl.attachShader(program,vertexShader);
         gl.attachShader(program,fragmentShader);
         //����program
         gl.linkProgram(program);
         //ʹ��program
         gl.useProgram(program);
         //���س���program����
         return program;
     }
 </script>
 </body>
 </html>
```

## `canvas`

- `canvs.getContext('2d')`����`2d`����
- `canvas.getContext('webgl')`����`3d`����

```js
//ͨ������getContext()��ȡWebGL������
var gl=canvas.getContext('webgl');
...
//����WebGL API������Ⱦ����drawArrays
gl.drawArrays(gl.POINTS,0,1);
...
```

## ��ɫ������`GLSL ES`

`WebGL`�ֵ���ɫ�����룺

- `vertexShaderSource`
- `fragShaderSource`

- ��ɫ������ͨ����ɫ������`GLSL ES`��д����Ҫѧһ���µ�����`GLSEL ES`
- ��ɫ���������ڼ����ͼ�α�̣�������GPU�У�ƽʱ��˵�Ĵ�������Ա�д�ĳ�����������CPU�С� ��OpenGL API����ϵ�����ɫ������GLSL����OpenGL ES API��WebGL API�໥��ϵ�����ɫ������GLSL ES��OpenGL��׼Ӧ�õ��ǿͻ��� OpenGL ESӦ�õ����ƶ��ˣ�WebGL��׼Ӧ�õ��������ƽ̨��

������ɫ���������˶������Ⱦλ�ú͵����Ⱦ���ش�С��

```js
//������ɫ��Դ��
var vertexShaderSource = '' +
    'void main(){' +
    //�����ñ���gl_PointSize��ֵ���ش�С
    '   gl_PointSize=20.0;' +
    //����λ�ã�λ������ԭ��
    '   gl_Position =vec4(0.0,0.0,0.0,1.0);' +
    '}';
```

ƬԪ��ɫ�������˵����Ⱦ������ص���ɫֵ:

```js
//ƬԪ��ɫ��Դ��
var fragShaderSource = '' +
    'void main(){' +
    //����ƬԪ��ɫ
    '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
    '}';
```

- `gl_PointSize��gl_Position��gl_FragColor`�������ñ���
- ������`main`��ں���
- `gl_position`��`vec4(x,y,z, m)`������λ�����꣬`vec4`�������һ���������ͣ�Ҳ�ɿ����ǹ��캯��
- `gl_FragColor`��`vec4(r,g,b, opacity)`����ɫֵ

## `WebGL API`

- ������`GPU`Ӳ���йأ��������ͼ�δ���Ԫ
- `gl.createShader(), gl.shaderSource()`���Զ�����ɫ��������б��룬Ȼ����`GPU`����ɫ����Ԫ��ִ��
- `GPU`����ص��ǲ��м��㣬��ע`CUDA`��`OpenCL`
- GPUӲ��(��Ⱦ����)���Կ�����������ϵͳ���������WebGL API��������ġ�ÿһ�㶼��Ϊ��һ���ṩһ���ӿڣ�������Կ���WebGL API�� ����ͨ��������ĵĽ��������ܹ�����һϵ�в�����GPU�������������ػ��棬��ʾ���ᰴ��һ����Ƶ��ɨ�����ػ��棬������ʾ����

## ��ʼ����ɫ������ - `initShader()`

- ��Ҫ�Ǳ�����ɫ��Դ����

```js
//������ʼ����ɫ������
function initShader(gl,vertexShaderSource,fragmentShaderSource){
    //����������ɫ������
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    //����ƬԪ��ɫ������
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    //���붥�㡢ƬԪ��ɫ��Դ����
    gl.shaderSource(vertexShader,vertexShaderSource);
    gl.shaderSource(fragmentShader,fragmentShaderSource);
    //���붥�㡢ƬԪ��ɫ��
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    //�����������program
    var program = gl.createProgram();
    //���Ŷ�����ɫ����ƬԪ��ɫ����program
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    //����program
    gl.linkProgram(program);
    //ʹ��program
    gl.useProgram(program);
    //���س���program����
    return program;
}
```

## ���Ʒ��� - `gl.drawArrays()`

- ��Ҫ��֪ͨ`GPU`ִ����ɫ�����룬Ȼ����`canvas`�����Ͻ�����Ⱦ����

## ��ɫ���������script��ǩ��

- ͨ��`.innerHTML`��ȡԪ���е��ַ���

```js
<!-- ������ɫ��Դ�� -->
<script id="vertexShader" type="x-shader/x-vertex">
  void main() {
    //�����ñ���gl_PointSize��ֵ���ش�С
    gl_PointSize=20.0;
    //����λ�ã�λ������ԭ��
    gl_Position =vec4(0.0,0.0,0.0,1.0);
  }
</script>
<!-- ƬԪ��ɫ��Դ�� -->
<script id="fragmentShader" type="x-shader/x-fragment">
  void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
</script>

<script>
//������ɫ��Դ��
var vertexShaderSource = document.getElementById('vertexShader').innerText;
//ƬԪ��ɫ��Դ��
var fragShaderSource = document.getElementById('fragmentShader').innerText;
//��ʼ����ɫ��
var program = initShader(gl,vertexShaderSource,fragShaderSource);    
</script>
```

***

# `canvas`����

```js
//ͨ������getContext()��ȡWebGL������
var gl=canvas.getContext('webgl');
...
//����WebGL API������Ⱦ����drawArrays
gl.drawArrays(gl.POINTS,0,1);
...
```

***

# `WebGL`����һ������

## ������������

```js
//�������鹹�캯��Float32Array������������
// �����ĸ��������������
var data=new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5]);
```

## `attribute`�ؼ���

- ��������������ݵ�ʱ����Ҫ�õ�
- `attribute vec4 apos`������`apos`��ʾ�������ж����λ������

```js
//attribute����vec4���ͱ���apos
attribute vec4 apos;
```

- ������ص�`WebGL API`�������������ݴ��ݸ�������ɫ���е�`apos`

```js
//��ȡ������ɫ����λ�ñ���apos����aposLocationָ��apos������
var aposLocation = gl.getAttribLocation(program,'apos');
...
...
//��������������
var buffer=gl.createBuffer();
//�󶨻���������,����buffer
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
//��������data���ݴ��뻺����
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
//�������е����ݰ���һ���Ĺ��ɴ��ݸ�λ�ñ���apos
gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,0,0);
//�������ݴ���
gl.enableVertexAttribArray(aposLocation);
```

![img](http://www.yanhuangxueyuan.com/upload/webgl91.2.jpg)

## Ӳ�����

- ������ɫ��

```js
//attribute����vec4���ͱ���apos
attribute vec4 apos;
void main() {
  //��������apos��ֵ�����ñ���gl_Position
  //�𶥵㴦������
  gl_Position = apos;
}
```

- ƬԪ��ɫ��

```js
void main() {
  // ��ƬԪ�������ݣ�����ƬԪ(����)����Ϊ��ɫ
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
```

- GPU���и���ר�ŵļĴ����������������ն����������ݵļĴ���������Ĵ��������������͵ĽǶȿ����ڸ���Ĵ�����������ʱ�洢�������� �洢�������ʾ�����ص�֡����������Ĵ������Ӵ����ٶȵĽǶȿ������ݻ���Ĵ�����GPU�������ݵ��ٶ�Ҫ����ʾ��ɨ��֡�������������ݵ��ٶ�Ҫ��ö�
- ��ʾ����������ʾ������ͨ��RGBֵ���Ƶ���С��λ��һ��ͼ�����ɴ������ص��ۻ���ʾ����ɫ���е���ɫ����ᷴӳ����ʾ����
- ��ʾ���ķֱ��ʾ�����ʾ�����ȷ������ص�ĸ���X��ʾ����ȷ������ص�ĸ���
- ��Ļ���ڵ��������ص�Ԫ�ľ�����ǵ�࣬���ԽС��ʾЧ��Խ�ã�һ��������ʾ��0.2mm~0.4mm֮��

***

# ����ϵ-ͶӰ

�����������㣺

```js
//9��Ԫ�ع������������xyz����ֵ
// ������9��Ԫ�أ�ÿ���3��Ϊһ�飬�ֱ����xyz���ϵ�����ֵ
var data=new Float32Array([
    0.0, 0.0, 1.0,//�����ζ���1����
    0.0, 1.0, 0.0,//�����ζ���2����
    1.0, 0.0, 0.0//�����ζ���3����
]);
```

***

# ƽ�Ʊ任

## ����һ -  ���¶��嶥������

```js
var data=new Float32Array([
    0.0, 0.0, 1.0,//�����ζ���1����
    0.0, 1.0, 0.0,//�����ζ���2����
    1.0, 0.0, 0.0//�����ζ���3����
]);

var data=new Float32Array([
    -0.4, 0.0, 1.0,//�����ζ���1����
    -0.4, 1.0, 0.0,//�����ζ���2����
     0.6, 0.0, 0.0//�����ζ���3����
]);
```

## ������ - `for`

```js
for(var i = 0;i<9;i += 3 )
{
data[i] += -0.4;
}
```

## ������ - GPU���� -`vec4(apos.x, apos.y, apos.z, 1)`

```js
// �ڶ�����ɫ�����𶥵�����x��ƽ��-0.4
gl_Position =vec4(apos.x-0.4,apos.y,apos.z,1);
```

## ������ - ƽ�ƾ���

- �������ѧ�任

- ��ԭ���Ķ�����ɫ�������У�����һ��4x4����`m4`,Ȼ��ͨ������ͱ�ʾ������������������`m4*apos`,ʵ�ֶԶ���apos��ƽ�Ʊ任���ͷ�����һ������ѧ�������񽻸�GPU������������˵�Ƕ�����ɫ����Ԫ(`Vertex Processor`)��������ɫ����Ԫ�ܹ���ɾ���ĳ˷����㡣

```js
//attribute����vec4���ͱ���apos
attribute vec4 apos;
void main() {
  //����ƽ�ƾ���(��x��ƽ��-0.4)
  //1   0   0  -0.4
  //0   1   0    0
  //0   0   1    0
  //0   0   0    1
  mat4 m4 = mat4(1,0,0,0,  0,1,0,0,  0,0,1,0,  -0.4,0,0,1);
  //ƽ�ƾ���m4��˶�������(vec4�������ݿ������Ϊ���Դ����е�nx1���󣬼�������)
  // �𶥵���о���任
  gl_Position = m4*apos;
}
```

- `mat4`��`vec4`������������`WebGL`��ɫ����������������
- `vec4`��$4 \times 1$����
- `mat4`��$4 \times 4$����

# ���������� - ��ת�任

![img](http://www.yanhuangxueyuan.com/upload/webgl12cube.png)

1. �ҳ����еĶ���
2. ��ת��������ж��������ת�任
3. ����`gl.drawArrays`��������

```js
//���ü���������ת�Ƕ�Ϊ30�ȣ����ѽǶ�ֵת��Ϊ����ֵ
float radian = radians(30.0);

//LINE_LOOPģʽ����ǰ�ĸ���
gl.drawArrays(gl.LINE_LOOP,0,4);
//LINE_LOOPģʽ�ӵ�����㿪ʼ�����ĸ���
gl.drawArrays(gl.LINE_LOOP,4,4);
//LINESģʽ���ƺ�8����
gl.drawArrays(gl.LINES,8,8);


```

***

# ������������

- ���ö������ݣ�����`gl.drawElements()`
- ͨ��һ�������������ʹ�ö��������еĶ�������

```js
//   8��������������
var data=new Float32Array([
0.5,  0.5,  0.5,//����0
-0.5,  0.5,  0.5,//����1
-0.5, -0.5,  0.5,//����2
0.5, -0.5,  0.5,//����3
0.5,  0.5, -0.5,//����4
-0.5,  0.5, -0.5,//����5
-0.5, -0.5, -0.5,//����6
0.5, -0.5, -0.5,//����7
]);

// ������������
var indexes = new Uint8Array([
  //ǰ�ĸ����Ӧ����ֵ
  0, 1, 2, 3,//gl.LINE_LOOPģʽ�ĸ������һ�����ο�
  //���ĸ������Ӧ����ֵ
  4, 5, 6, 7,//gl.LINE_LOOPģʽ�ĸ������һ�����ο�
  //ǰ���Ӧ���Ӧ����ֵ  
  0, 4,//���������һ��ֱ��
  1, 5,//���������һ��ֱ��
  2, 6,//���������һ��ֱ��
  3, 7//���������һ��ֱ��
]);

//��������������
var indexesBuffer=gl.createBuffer();
//�󶨻���������
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexesBuffer);
//��������indexes���ݴ��뻺����
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexes,gl.STATIC_DRAW);

//LINE_LOOPģʽ����ǰ�ĸ���
gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,0);
//LINE_LOOPģʽ�ӵ�����㿪ʼ�����ĸ���
gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,4);
//LINESģʽ���ƺ�8����
gl.drawElements(gl.LINES, 8, gl.UNSIGNED_BYTE, 8);
```

## `gl.drawElements()`

������ʽ��`drawElements(mode, count, type, offset)`

| ����   | ����               | ֵ                                                           |
| :----- | :----------------- | :----------------------------------------------------------- |
| mode   | ����ģʽ           | gl.LINE_LOOP��gl.LINES��gl.TRIANGLES��                       |
| count  | ���ƶ������       | ������                                                       |
| type   | ��������           | gl.UNSIGNED_BYTE��ӦUint8Array��gl.UNSIGNED_SHORT��ӦUint16Array |
| offset | �ӵڼ����㿪ʼ���� | �����������ֽ�Ϊ��λ                                         |

`count`��`offset`��Ͽ���ȷ�������ڶඥ���е�����һ�Σ�ͨ���������������������ݣ�`count`��`offset`ָ���Ƕ�����������顣

***

# `varying`��������ɫ��ֵ

![img](http://www.yanhuangxueyuan.com/upload/webgl14interpolation.png)

## ������ɫ������

```js
//attribute����vec4���ͱ���apos
attribute vec4 apos;
// attribute����������ɫ����
attribute vec4 a_color;
//varying����������ɫ��ֵ�����
varying vec4 v_color;
void main() {
  // ��������apos��ֵ�����ñ���gl_Position
  gl_Position = apos;
  //������ɫ��ֵ����
  v_color = a_color;
}
```

## ƬԪ��ɫ������

```js
// ����float�������ݵľ�����lowp
precision lowp float;
// ���ն�����ɫ����v_color����
varying vec4 v_color;
void main() {
  // ��ֵ����ɫ���ݸ�ֵ����Ӧ��ƬԪ
  gl_FragColor = v_color;
}
```

