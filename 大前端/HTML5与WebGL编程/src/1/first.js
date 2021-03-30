let canvas = document.getElementById('canvas');
let gl = initWebGL(canvas);
initViewport(gl, canvas);
createSquare(gl);

// 2. 获取上下文
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

// 3. 视口
function initViewport(gl, canvas){
    gl.viewport(0,0,canvas.width,canvas.height);
}

// 4. 构建顶点数据
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

// 5. 创建规则
let projectionMatrix, modelViewMatrix;

function initMatrices(canvas){
//    创建一个模型-视图矩阵，包含一个位于(0,0,-3.333)的相机
    modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0,0,-3.333]);

//    创建一个45度角视野的投影矩阵
    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4,
        canvas.width / canvas.height, 1, 10000);
}

// 6. shader
let vertexShaderSource = `
    attribute vec3 vertexPos;\n
    uniform mat4 modelViewMatrix;\n
    uniform mat4 projectionMatrix;\n
    void main(void) {\n
        //返回经过投影和变换的顶点值\n
        gl_Position = projectionMatrix * modelViewMatrix *\n
            vec4(vertexPos, 1.0);\n
    }\n
`;

let fragmentShaderSource = `
    void main(void) {\n
        //返回像素点的颜色:始终输出白色\n
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

let shaderProgram,
    shaderVertexPositionAttribute,
    shaderProjectionMatrixUniform,
    shaderModelViewMatrixUniform;

function initShader(gl) {
//    加载并编译片段和顶点着色器
    let fragmentShader = createShader(gl, fragmentShaderSource, "fragment");
    let vertexShader = createShader(gl, vertexShaderSource, "vertex");

//  将它们链接到一段新程序中
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

//    获取指向着色器参数的指针
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

//9.绘制
function draw(gl, obj){
//    清空背景,使用黑色填充
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

//    设置待绘制的顶点缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);

//    设置待用的着色器
    gl.useProgram(shaderProgram);

//    建立着色器参数之间的关联：顶点和投影/模型矩阵
    gl.vertexAttribPointer(shaderVertexPositionAttribute,
        obj.vertSize, gl.FLOAT, false, 0,0);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false,
        projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false,
        modelViewMatrix);

//    绘制物体
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
}

