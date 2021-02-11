const key1 = {id: 1},
    key2 = {id: 2};
const wm = new WeakMap([
    [key1, "val1"],
    [key2, "val2"]
]);

for(const i of wm[Symbol.iterator]()){
    console.log(i);
}
