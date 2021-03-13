function Person(name){
	this.name = name
}


Person.prototype.sayName = function() {
	console.log(this.name);
}

let person1 = new Person('fwx');
person1.sayName();
console.log(person1.hasOwnProperty('name'));