const target = {
	foo: 'bar',
	txt: 'text'
};

const handler1 = {
	get(trapTarget, property, receiver) {
		return Reflect.get(...arguments);
	}
};

const proxy = new Proxy(target, handler1);

console.log(proxy.foo);
console.log(target.foo);

const handler2 = {
	get: Reflect.get
};

const proxy2 = new Proxy(target, handler2);
console.log(proxy2.foo);
console.log(target.foo);

const proxy3 = new Proxy(target, Reflect);
console.log(proxy3.txt);