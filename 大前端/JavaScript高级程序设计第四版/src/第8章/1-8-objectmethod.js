let person = {
    sayName: name => {
        console.log(`my name is ${name}`);
    }
};

person.sayName('Matt');     // my name is matt

let person2 = {
    sayName(name) {
        console.log(`my name is ${name}`);
    }
};

person2.sayName('matt');    // my name is matt