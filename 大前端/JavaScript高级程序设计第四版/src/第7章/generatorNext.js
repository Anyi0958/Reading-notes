function* generatorFn() {
    console.log("foobar");
}

// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn();

generatorObject.next(); // foobar

function* generatorFn2() {}

console.log(generatorFn2);  // f* generatorFn() {}
console.log(generatorFn2()[Symbol.iterator]);   // f [Symbol.iterator]() [native code]
console.log(generatorFn2());    // generatorFn2 {<suspended>}
console.log(generatorFn2()[Symbol.iterator]()); // generatorFn2 {<suspended>}

const g = generatorFn2();
console.log(g === g[Symbol.iterator]());    // true