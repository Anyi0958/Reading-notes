let person = {
    name: 'matt',
    age: 18
};

let personame, personbar, personage;

try {
    ({name: personame, 
        foo: personbar, 
        age: personage} = person);
} catch(e) {}

console.log(personame, personbar, personage); //matt undefined 18