let person = {
    name: "matt",
    age: 17
};

function printPerson(foo, {name, age}, bar){
    console.log(arguments);
    console.log(name, age);
}

printPerson('1st', person, '2nd');
// [Arguments] { '0': '1st', '1': { name: 'matt', age: 17 }, '2': '2nd' }
// matt 17