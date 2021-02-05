class FooSearch {
    static [Symbol.search](target) {
        return target.indexOf('foo');
    }
}

console.log('foobar'.search(FooSearch));    // 0
console.log('barfoo'.search(FooSearch));    // 3
console.log('barbaz'.search(FooSearch));    // -1

class StringSearch {
    constructor(str) {
        this.str = str;
    }

    [Symbol.search](target){
        return target.indexOf(this.str);
    }
}

console.log('foobar'.search(new StringSearch('foo')));  // 0
console.log('barfoo'.search(new StringSearch('foo')));  // 3
console.log('barbaz'.search(new StringSearch('foo')));  // -1