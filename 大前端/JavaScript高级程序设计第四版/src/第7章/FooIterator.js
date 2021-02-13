// 这个类实现了可迭代接口(Iterable)
// 调用默认的迭代器工厂函数会返回
// 一个实现迭代器接口(Iterator)的迭代器对象
class Foo {
    [Symbol.iterator](){
        return {
            next(){
                return { done: false, value: 'foo' };
            }
        };
    }
}

let f = new Foo();

// 打印出实现了迭代器接口的对象
console.log(f[Symbol.iterator]());  // {next: f() {}}

// Array类型实现了可迭代接口(Iterable)
// 调用Array类型的默认迭代器工厂函数
// 会创建一个ArrayIterator的实例
let a = new Array();

// 打印出ArrayIterator的实例
console.log(a[Symbol.iterator]());  // Array Iterator {}