let person = {
    name: 'matt',
    age: 16
};

let personCopy = {};

({
    name: personCopy.name,
    age: personCopy.age
} = person);

console.log(personCopy);    //{ name: 'matt', age: 16 }