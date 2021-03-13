const target = {
	foo: 'bar'
};

const firstProxy = new Proxy(target, {
	get() {
		console.log('first');
		return Reflect.get(...arguments);
	}
});

const secondProxy = new Proxy(firstProxy, {
	get() {
		console.log('second');
		return Reflect.get(...arguments);
	}
});

console.log(secondProxy.foo);