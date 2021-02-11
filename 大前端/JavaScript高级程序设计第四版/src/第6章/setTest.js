let tmp = new Set(["a", "b"]);
tmp.add({a:"1", b:"2"});
function set(tmp){
	for (let i of tmp[Symbol.iterator]()){
		console.log(i);
		console.log(i.a);
	}
}
set(tmp);