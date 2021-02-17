let dest, src, result;

// 简单复制
dest = {};
src = { id: 'src' };

result = Object.assign(dest, src);

// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result);   // true
console.log(dest !== src);      // true
console.log(result);            // {id: src}
console.log(dest);              // {id: src}

// 多个源对象
dest = {};
result = Object.assign(dest, {a: 'foo'}, {b: 'bar'});
console.log(result);            // {a: foo, b: bar}

// 获取函数和设置函数
dest = {
    set a(val){
        console.log('error');
    }
};

src = {
    get a(){
        console.log('get');
        return 'foo';
    }
};

Object.assign(dest, src);
// 调用src的获取方法
// 调用dest的设置方法并传入"foo"
// 这里的设置函数不执行赋值操作
// 实际上没有把值转过来
console.log(dest);      // {set a(val)...}