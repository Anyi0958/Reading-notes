const test = `{
    {"id":1, "name":1},
    {"id":2, "name":2},
    {"id":3, "name":3},
}`;
let index = 0,
    arr = Array.from(test);
arr[0] = '[',
arr[arr.length - 1] = ']';

let result = arr.join(" ");
console.log(JSON.stringify(result));
console.log(JSON.parse(result));