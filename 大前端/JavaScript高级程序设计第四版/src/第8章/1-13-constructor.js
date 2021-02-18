function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;

    this.sayName = () => {
        console.log(this.name);
    };
}

let person1 = new Person("matt", 18, "fw");