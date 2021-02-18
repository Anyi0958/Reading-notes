const nameKey = 'name';
let uniqueToken = 0;

function getUniqueKey(key) {
    return `${key}_${uniqueToken++}`;
}

let person = {
    [getUniqueKey(nameKey)]: 'matt'
};

console.log(person);    //{ name_0: 'matt' }