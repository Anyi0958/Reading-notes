const s1 = new Set(["val1", "val2", "val3"]);

console.log(s1.size);   // 3

// 使用自定义迭代器初始化集合
const s2 = new Set({
    [Symbol.iterator]: function* () {
        yield "val1";
        yield "val2";
        yield "val3";        
    }
});

console.log(s2.size);   // 3