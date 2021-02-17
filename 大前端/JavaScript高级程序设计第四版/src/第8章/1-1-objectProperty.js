let person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "fwx"
});

console.log(person.name);   // "fwx"
person.name = "xwf";
console.log(person.name);   // "fwx"