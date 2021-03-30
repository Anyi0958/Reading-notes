HTML5��WebGL��� Ŀ¼
[TOC]
***

# ǰ��

- �ʼ��ܽ�
- `WebGL`�ǻ���������Ϊ`Gis`����Ϸ
- ���ĵ㣺
  - `3D`��Ⱦ
  - `Three.js`����
  - `3D`����
  - `CSS`�߼�Ч��
  - ����`3D`���̣���ģ
  - `3D`���
  - ����Ӧ��

# �Ƽ��Ķ�

- ��HTML5��WebGL��̡�

# 1. ��������

## 1.1 ����

- `WebGL`֧��Ӳ��`3D`������Ⱦ
- `requestAnimationFrame()`��������ֹ��ͼ��Ӱ

## 1.2 ���񡢶���Ρ�����

- ���񣺶������ι��죬Ϊģ��
- ����Σ���С��λ
- ���㣺����εĶ���

## 1.3 ���ʡ�������Դ

- ���ʣ�������������
- ��Դ�����ʵ�չ�֣�����������
- ���������ʽ��ɫ������

## 1.4 �任�;���

- �任������λ�ñ任
- ����`3D`�任ͨ����һ���任�����ʾ

$$
\left(
\begin{matrix}
a & b \\
c & d
\end{matrix}
\right)
$$



## 1.5 �����͸�ӡ��ӿں�ͶӰ

- ������û��۲��
- ͸�ӣ�������Ĵ�С

![image-20210329162547213](./img/0-perspective.png)

## 1.6 ��ɫ��

- ��ɫ������Ⱦ��һ�����������ͼ����Ҫ׼ȷ���嶥�㡢�任�����ʡ���Դ�������������ò��������յ�ͼ��
- ��ɫ��ʵ���˽��������ص�ͶӰ����Ļ�ϵ��㷨
- ͼ��Ӳ���ܽ������㡢����������ײ㣬�����ܴ�����ʡ���Դ���任���������Ҫ����ɫ��������
- ��ɫ��ʹ����`C`���Ա�д������`shader`��������ɿ��Ա�ͼ�δ���Ԫ`GPU`ִ�еĴ���

- ������ɫ�������Ծ�׼����ÿһ�����غ�ͼ����Ⱦ
- ��`CSS`�Զ����˾���ʹ����`OpneGL ES`��`GLSL ES`

## 2.1 ʵʱ��Ⱦ

- `3D`��`2D`��ͬ����Ҫͨ���������ݺ�`shader`�����л��ƣ�û��`2D`�ķḻ`API`

## 2.2 Ӧ�����������̲���

- `WebGL`���Ǹ���ͼ�⣬����`canvas`

### ִ�в���

1. ����`canvas`
2. ��ȡ`canvas`�Ļ�ͼ������
3. ��ʼ���ӿ�
4. ��������Ⱦ���ݵĻ��壨�������ݣ�
5. �������㻺�嵽��Ļ�ռ�ת������ľ���
6. ʵ�ֻ����㷨����ɫ��
7. ��ʼ����ɫ��
8. ����

## 2.3 ����

```js
let canvas = document.getElementById('canvas');
let gl = initWebGL(canvas);
initViewport(gl, canvas);

// 2. ��ȡ������
function initWebGL(canvas){
    let gl = null,
        msg = `don't support`;
    
    try{
        gl = canvas.getContext('experimental-webgl');
    }catch(err){
        msg += err;
    }

    if(!gl){
        alert(msg);
        throw new Error(msg);
    }

    return gl;
}

// 3. �ӿ�
function initViewport(gl, canvas){
    gl.viewport(0,0,canvas.width,canvas.height);
}

```



### ���塢�������顢���ͻ�����

- ͼԪ����ͬ���͵Ļ�������ͼ��
- ����ͼԪ���ƣ������Ρ��㡢��
- �������ǳ��õ�ͼԪ���ͣ���������ʽ�洢��
  - �����μ�
  - �����δ�
- ���壺ͼԪ���������ʽ�洢���ݣ����������������ڶ���

#### ����һ��������

- ����ڰ�������Ļ������ݵ�`JS`���󷵻�
- �������ݣ�
  - ����ṹ�ĳ���
  - �����ƵĶ�������
  - ͼԪ����
- `Float32Array`��ר��Ϊ`WebGL`��������������ͣ���һ�ֻ������飨���ͻ����飩���Զ����Ʒ�ʽ�洢���ٶȸ��죬�ڴ��С�����������ƿ��

```js
// 4. ������������
function createSquare(gl){
    let vertexBuffer;

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    let verts = [
        .5, .5, 0.0,
        -.5, .5, 0.0,
        .5, -.5, 0.0,
        -.5, -.5, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    let square = {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        primtype: gl.TRIANGLE_STRIP
    };

    return square;
}
```

### ����

- ����ǰ��Ҫ����һ�Ծ���
- �������ڶ�����������������λ�ã�������ģ��-��ͼ����
- `4x4`����ʹ��һ������16��Ԫ�ص�`Float32Array`��������ʾ
- �Ƽ�`glMatrix`
- [glMatrix](https://github.com/toji/gl-matrix)
- `glMatrix`����ͳһ��`mat4`���ͱ�ʾ

```js
// 5. ��������
let projectionMatrix, modelViewMatrix;

function initMatrices(canvas){
//    ����һ��ģ��-��ͼ���󣬰���һ��λ��(0,0,-3.333)�����
    modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0,0,-3.333]);

//    ����һ��45�Ƚ���Ұ��ͶӰ����
    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4,
        canvas.width / canvas.height, 1, 10000);
}
```

### `shader`

- ��ɫ��-`GLSL`
- ��ɫ������������ɣ�������ɫ����Ƭ����ɫ��
- vertext shader: �����������ת��Ϊ`2D`��ʾ������
- fragment shader: ��ɫ���
- `GLSL`������Է���`js`�ַ����У�������`AjAX`�����ⲿ�ļ��������Ƿ�������`DOM`��

```js
// 6. shader
let vertexShaderSource = `
    attribute vec3 vertexPos;\n
    uniform mat4 modelViewMatrix;\n
    uniform mat4 projectionMatrix;\n
    void main(void) {\n
        //���ؾ���ͶӰ�ͱ任�Ķ���ֵ\n
        gl_Position = projectionMatrix * modelViewMatrix *\n
            vec4(vertexPos, 1.0);\n
    }\n
`;

let fragmentShaderSource = `
    void main(void) {\n
        //�������ص����ɫ:ʼ�������ɫ\n
        gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n
    }\n
`;
function createShader(gl, str, type) {
    let shader;

    if (type == 'fragment'){
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }else if (type == 'vertex'){
        shader = gl.createShader(gl.VERTEX_SHADER);
    }else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
```

- ��ɫ���ĸ������ֱ�������ɣ���Ҫ����`gl.createProgram(), gl.attachShader(), gl.linkProgram()`���ӵ�ͬһ�γ�����
- ��`gl.getAttribLocation(), gl.getUniformLocation()`��ȡ`GLSL`�ж���ĸ��������ľ��

```js
// 8. ��ɫ����ʼ��
let shaderProgram,
    shaderVertexPositionAttribute,
    shaderProjectionMatrixUniform,
    shaderModelViewMatrixUniform;

function initShader(gl) {
//    ���ز�����Ƭ�κͶ�����ɫ��
    let fragmentShader = createShader(gl, fragmentShaderSource, "fragment");
    let vertexShader = createShader(gl, vertexShaderSource, "vertex");

//  ���������ӵ�һ���³�����
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

//    ��ȡָ����ɫ��������ָ��
    shaderVertexPositionAttribute =
        gl.getAttribLocation(shaderProgram, "vertexPos");

    gl.enableVertexAttribArray(shaderVertexPositionAttribute);

    shaderProjectionMatrixUniform =
        gl.getUniformLocation(shaderProgram, "projectionMatrix");

    shaderModelViewMatrixUniform =
        gl.getUniformLocation(shaderProgram, "modelViewMatrix");

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initiialise shaders");
    }
}
```



### ����ͼԪ

- `draw(R,G,B,Alpha)`
- `gl.cleear()`
- ��ɫ���壺`GPU`�Դ���������Ⱦ��Ļ�����ص������

```js
//9.����
function draw(gl, obj){
//    ��ձ���,ʹ�ú�ɫ���
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

//    ���ô����ƵĶ��㻺��
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);

//    ���ô��õ���ɫ��
    gl.useProgram(shaderProgram);

//    ������ɫ������֮��Ĺ����������ͶӰ/ģ�;���
    gl.vertexAttribPointer(shaderVertexPositionAttribute,
        obj.vertSize, gl.FLOAT, false, 0,0);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false,
        projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false,
        modelViewMatrix);

//    ��������
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
}
```

## 2.4 ����`3D`

### ��ʼ�������塢��ɫ����������Ĵ���

```js

```

