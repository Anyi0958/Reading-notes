const m1 = new Map([
	["key1", "val1"]
]);
m1.set({a: '1'});
for(let i of m1.keys()){
	console.log(i);
	console.log(m1.get(i));
}