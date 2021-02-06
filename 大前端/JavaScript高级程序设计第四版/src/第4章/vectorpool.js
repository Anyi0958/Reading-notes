function addVectorRaw(a, b){
    let resultant = new Vector();
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;

    return resultant;
}

function addVector(a, b, resultant){
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;

    return resultant;
}

// 对象池的伪实现
// vectorPool是已有的对象池
let v1 = vectorPool.allocate();
let v2 = vectorPool.allocate();
let v3 = vectorPool.allocate();
let v4 = vectorPool.allocate();

v1.x = 10;
v1.y = 5;

v2.x = -3;
v2.y = -6;

addVector(v1, v2, v3);

console.log([v3.x, v3.y]);

vectorPool.free(v1);
vectorPool.free(v2);
vectorPool.free(v3);

// 如果对象有属性引用了其他对象
// 则这里也需要把这些属性设置伪null
v1 = null;
v2 = null;
v3 = null;