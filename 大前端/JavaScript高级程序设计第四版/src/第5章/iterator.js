const a = ["foo", "bar", "baz", "qux"];

// 这些方法都返回迭代器
// 可以将他们的内容通过Array.from()直接转换成数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());

console.log(aKeys);
console.log(aValues);
console.log(aEntries);

// ES6解构，拆分键值
const b = ["foo", "bar", "baz", "qux"];

for (const [idx, element] of a.entries()){
    console.log(`idx: ${idx}, element: ${element}`);    
}
