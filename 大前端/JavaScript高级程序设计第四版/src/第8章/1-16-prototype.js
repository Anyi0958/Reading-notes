function SuperType(name) {
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
	console.log(this.name);
};

function SubType(name, age){
	SuperType.call(this, name);
	
	this.age = age;
}

SubType.prototype = new SuperType();

function inheritPrototype(subType, superType){
	let prototype = object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}