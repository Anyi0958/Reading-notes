class Bar{};
class Baz extends Bar {
    static [Symbol.hasInstance]() {
        return false;
    }
}

let b = new Baz();
console.log(Bar[Symbol.hasInstance](b));  // true
console.log(b instanceof Bar);  //true
console.log(Baz[Symbol.hasInstance](b));  //false
console.log(b instanceof Baz);  //false
