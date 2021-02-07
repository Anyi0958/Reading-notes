// 创建array
// 1.new
let colors1 = new Array();

// 2.create value
let colors2 = new Array(20);
let colors3 = new Array("red", "blue");

// 3. decline new
let colors4 = Array(3);

// 4. array literal
let colors5 = ["red", "blue", "green"];

console.log(Array.from("Matt"));    //["M", "a", "t", "t"]
// 可以使用from将集合和映射转换为一个数组
const m = new Map() .set(1, 2)
                    .set(3, 4);
const s = new Set() .add(1)
                    .add(2)
                    .add(3)
                    .add(4);
console.log(Array.from(m));
console.log(Array.from(s));