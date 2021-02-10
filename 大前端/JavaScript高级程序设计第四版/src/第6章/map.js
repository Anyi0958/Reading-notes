const m1 = new Map([
	["key1", "val1"]
]);

for(let i of m1.keys()){
	console.log(m1.get(i));
}