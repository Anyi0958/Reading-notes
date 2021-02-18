function createPerson(name, age, job){
    let o = new Object();

    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = () => {
        console.log(this.name);
    };
    return o;
}

let person1 = createPerson("matt", 29, "w1");
let person2 = createPerson("ger", 18, "doctor");

console.log(person1, person2);
// { name: 'matt', age: 29, job: 'w1', sayName: [Function] } 
// { name: 'ger', age: 18, job: 'doctor', sayName: [Function] }