let Person = function(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	
	this.sayName = function() {
		console.log(this.name);
	}
}

let person1 = new Person("fwx", 12, "context");

person1.sayName();