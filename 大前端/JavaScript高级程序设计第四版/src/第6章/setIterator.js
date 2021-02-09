const s = new Set(["val1", "val2", "val3"]);

console.log(s.values === s[Symbol.iterator]);   // true
console.log(s.keys === s[Symbol.iterator]);

for (let value of s.values()) {
    console.log(value);
}

for (let value of s[Symbol.iterator]()) {
    console.log(value);
}

for (let value of s.keys()) {
    console.log(value);
}