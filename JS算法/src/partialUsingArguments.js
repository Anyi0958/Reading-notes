function fn(arr){
    console.log(`fn: ${arr}`);
}
function test(fn){
    let arr = Array.prototype.slice.call(arguments, 1);
    console.log(`slice(1):${arr}`);
    // fn.bind(null)();
    arr.unshift(null);
    console.log(`argumens: ${arguments}`);
    console.log(`arr.unshift:${arr}`);
    return fn.bind.apply(fn, arr);
}

let t1 = test(fn,1,2,3);
console.log(t1);
t1(4,5,6);