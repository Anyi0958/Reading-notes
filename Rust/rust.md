Rust入门教程:目录
[TOC]

***
**本文适合有一定基础的读者。**

# Rust 特点
- 高性能 
	- 速度快
	- 内存利用率极高
	- 没有运行时和垃圾回收，胜任对性能要求特别高的服务
	- 可在嵌入式设备上运行
	- 能轻松和其他语言集成
- 可靠性
	- 丰富的类型系统和所有权模型
	- 保证了内存安全和线程安全
- 生产力
	- 出色的文档
	- 友好的编译器
	- 清晰的错误提示信息
	- 集成了一流的工具 —— 包管理器和构建工具
	- 智能地自动补全
	- 类型检验
	- 自动格式化代码

# Rust应用
- 传统命令行程序 
	- Rust 编译器可以直接生成目标可执行程序，不需要任何解释程序。
- Web 应用 
	- Rust 可以被编译成 WebAssembly
	- WebAssembly 是一种 JavaScript 的高效替代品
- 网络服务器 
	- Rust 用极低的资源消耗做到安全高效
	- 具备很强的大规模并发处理能力
	- 适合开发普通或极端的服务器程序
- 嵌入式设备 
	- Rust 同时具有JavaScript 一般的高效开发语法和 C 语言的执行效率
	- 支持底层平台的开发

sample:
```rust
fn main(){
	println("Hello world!");
}
```

# 环境搭建
- 具体参考菜鸟教程
## 测试结果：
```shell
rustc -V
cargo -V
```
## 项目处理
- `cargo new greeting `创建greeting工程目录
- `cargo build`构建工程
- `cargo run`运行

# Cargo

## 是什么
构建系统和包管理器。

## 常见命令
- cargo clippy: 类似eslint，lint工具检查代码可以优化的地方
- cargo fmt: 类似go fmt，代码格式化
- cargo tree: 查看第三方库的版本和依赖关系
- cargo bench: 运行benchmark(基准测试,性能测试)
- cargo udeps(第三方): 检查项目中未使用的依赖
- cargo build/run --release 使用 release 编译会比默认的 debug 编译性能提升 10 倍以上，但是 release 缺点是编译速度较慢，而且不会显示 panic backtrace 的具体行号


## 工程文件
- `tasks.json`, `launch.json`

## 输出的特别之处
```rust
fn main(){
	int a = 12;
	println("a is {}, {{}}", a);
}
```
- `{{`和`}}`类似于转义字符，输出`{}`


## 基础语法
### 特殊
#### 值的声明
- 声明与js相同，但是声明后不可更改值
	- `let a=123`和`a=123` ->更改值
- 如果要修改成可变(mutable)，增加mut关键字`let mut a = 123;`
- 重新绑定：
	- `let a = 123`->`let a = 234`
- rust有自动判断类型的功能，但最好加上声明类型
	- `let a: u64 = 123`
	- `u64`无符号64位整型变量
	- 默认有符号32位整型
#### 重影
- 非重写或重载
- 重影就是重新绑定
- 重影与可变变量的赋值不是一个概念，重影是指用同一个名字重新代表另一个变量实体，其类型、可变属性和值都可以变化。但可变变量赋值仅能发生值的变化。

## 数据类型
位长度|有符号|无符号
:-:|:-:|:-:
8-bit|i8|u8
16-bit|i16|u16
32-bit|i32|u32
64-bit|i64|u64
128-bit|i128|u128
arch|isize|usize

### 数学运算
注意：
Rust 不支持 ++ 和 --，因为这两个运算符出现在变量的前后会影响代码可读性，减弱了开发者对变量改变的意识能力。

### char
char 类型大小为 4 个字节

### 编码
必须要用utf-8

### 复合类型-数组和元组
- 元组：`()`包裹
- `let tup: (i32, f64, u8) = (500, 6.4, 1);`
	- `let (x, y, z) = tup`
- 数组
	- `let c:[i32;5]`长度5的i32数组
	- `let d = [3; 5]`即为`let d = [3, 3, 3, 3, 3]`

### 注释
- `///`可以作为说明文档的开头
- `cargo doc`可以将说明注释转换成HTML格式的说明文档

## 函数
- 格式与常规不同：`fn <name> (param:type) -> returntype{return}`
- sample: `fn another(x: i32, y: i32){}`

### 特殊赋值
```rust
    let y = {
        let x = 3;
        x + 1
    };
```
- 而且在块中可以使用函数语句，最后一个步骤是表达式，此表达式的结果值是整个表达式块所代表的值。这种表达式块叫做函数体表达式。
- 注意：`x + 1` 之后没有分号，否则它将变成一条语句！
### 特殊的嵌套
```rust
fn main() {
    fn five() -> i32 {
        5
    }
    println!("five() 的值为: {}", five());
}
```

### return
```rust
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```
- 注意：函数体表达式并不能等同于函数体，它不能使用 return 关键字。

## 条件语句
- 无括号`if a < 0`, `else if a < 0`
- 条件表达式必须是bool类型

## 循环语句
### while
- rust没有常规的for用法，只有while，未来可能会有do-while
### for...in
- rust有for，但比较特殊，是`for i in a.iter() {}`，a是数组
sample:
```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    for i in a.iter() {
        println!("值为 : {}", i);
    }
}

fn main() {
let a = [10, 20, 30, 40, 50];
    for i in 0..5 {
        println!("a[{}] = {}", i, a[i]);
    }
}
```
### loop
- loop 循环可以通过 break 关键字类似于 return 一样使整个循环退出并给予外部一个返回值。
```rust
fn main() {
    let s = ['R', 'U', 'N', 'O', 'O', 'B'];
    let mut i = 0;
    loop {
        let ch = s[i];
        if ch == 'O' {
            break;
        }
        println!("\'{}\'", ch);
        i += 1;
    }
}

fn main() {
    let s = ['R', 'U', 'N', 'O', 'O', 'B'];
    let mut i = 0;
    let location = loop {
        let ch = s[i];
        if ch == 'O' {
            break i;
        }
        i += 1;
    };
    println!(" \'O\' 的索引为 {}", location);
}
```

## 所有权

### 定义
- 所有权概念是为了让 Rust 在编译阶段更有效地分析内存资源的有用性以实现内存管理而诞生的概念。
- 为高效使用内存而设计的语法机制。

### 规则
- Rust 中的每个值都有一个变量，称为其所有者。
- 一次只能有一个所有者。
- 当所有者不在程序运行范围时，该值将被删除。
### 变量范围
- 变量范围是变量的一个属性，其代表变量的可行域，默认从声明变量开始有效直到变量所在域结束。

### 变量与数据交互的方式
变量与数据交互方式主要有移动（Move）和克隆（Clone）两种
- 仅在栈中的数据的"移动"方式是直接复制，不会花费更长的时间或更多的存储空间，且不会存储到堆中
#### Move
发生交互的数据在堆中：
```rust
let s1 = String::from("hello");
let s2 = s1;
```
示意图：
![heap][01]

#### Clone
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

####  变量做参数
- 将一个变量当作函数的参数传给其他函数，和移动的效果是一样的

#### 引用和租用
- 引用：变量的间接访问方式，看作指针
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = &s1;
    println!("s1 is {}, s2 is {}", s1, s2);
}
```
- & 运算符可以取变量的"引用"
当一个变量的值被引用时，变量本身不会被认定无效。因为"引用"并没有在栈中复制变量的值：

![heapquote][02]

- 引用只能租借（Borrow）值的所有权
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = &s1;
    let s3 = s1;
    println!("{}", s2);
}

```
这段程序不正确：因为 s2 租借的 s1 已经将所有权移动到 s3，所以 s2 将无法继续租借使用 s1 的所有权。如果需要使用 s2 使用该值，必须重新租借：
```rust
fn main() {
    let s1 = String::from("hello");
    let mut s2 = &s1;
    let s3 = s2;
    s2 = &s3; // 重新从 s3 租借所有权
    println!("{}", s2);
}
```
这段程序是正确的。
- 既然引用不具有所有权，即使它租借了所有权，它也只享有使用权（这跟租房子是一个道理）。
- 尝试利用租借来的权利来修改数据会被阻止

##### 可变引用
```rust
fn main() {
    let mut s1 = String::from("run");
    // s1 是可变的

    let s2 = &mut s1;
    // s2 是可变的引用

    s2.push_str("oob");
    println!("{}", s2);
}
```
##### 多重可变引用的错误
```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{}, {}", r1, r2);
```
这段程序不正确，因为多重可变引用了 s。

- Rust 对可变引用的这种设计主要出于对并发状态下发生数据访问碰撞的考虑，在编译阶段就避免了这种事情的发生。
- 由于发生数据访问碰撞的必要条件之一是数据被至少一个使用者写且同时被至少一个其他使用者读或写，所以在一个值被可变引用时不允许再次被任何引用。

##### 垂悬引用（Dangling References）
野指针。

## 切片类型
切片（Slice）是对数据值的部分引用。

sample：
```rust
fn main() {
    let s = String::from("broadcast");

    let part1 = &s[0..5];
    let part2 = &s[5..9];

    println!("{}={}+{}", s, part1, part2);
}
```
![rust-slice1][03]

### ..说明
- ..y 等价于 0..y
- x.. 等价于位置 x 到数据结束
- .. 等价于位置 0 到结束
- 切片结果必须是引用类型，但开发者必须自己明示这一点，`let slice = &s[0..3];`

### 将 String 转换成 &str
```rust
let s1 = String::from("hello");
let s2 = &s1[..];
```

## 结构体
- 结构体（Struct）与元组（Tuple）都可以将若干个类型不一定相同的数据捆绑在一起形成整体，但结构体的每个成员和其本身都有一个名字，这样访问它成员的时候就不用记住下标了。
- 元组常用于非定义的多值传递，而结构体用于规范常用的数据结构。
- 结构体的每个成员叫做"字段"。
- Rust 里 struct 语句仅用来定义，不能声明实例，结尾不需要 ; 符号，而且每个字段定义之后用 , 分隔。
sample:
```rust
struct Site {
    domain: String,
    name: String,
    nation: String,
    found: u32
}
```
### 实例化
```rust
let domain = String::from("www.runoob.com");
let name = String::from("RUNOOB");
let runoob = Site {
    domain,  // 等同于 domain : domain,
    name,    // 等同于 name : name,
    nation: String::from("China"),
    traffic: 2013
    ..runoob
};
```

### 元组结构体
- 有一种更简单的定义和使用结构体的方式：元组结构体。
- 元组结构体是一种形式是元组的结构体。
- 与元组的区别是它有名字和固定的类型格式。
- 它存在的意义是为了处理那些需要定义类型（经常使用）又不想太复杂的简单数据：
```rust
struct Color(u8, u8, u8);
struct Point(f64, f64);

let black = Color(0, 0, 0);
let origin = Point(0.0, 0.0);

fn main() {
    struct Color(u8, u8, u8);
    struct Point(f64, f64);

    let black = Color(0, 0, 0);
    let origin = Point(0.0, 0.0);

    println!("black = ({}, {}, {})", black.0, black.1, black.2);
    println!("origin = ({}, {})", origin.0, origin.1);
}
```
### 输出结构体
- 一定要导入调试库 `#[derive(Debug)]` ，之后在 println 和 print 宏中就可以用 `{:?}` 占位符输出一整个结构体
- 如果属性较多的话可以使用另一个占位符 `{:#?}` 
```rust
#[derive(Debug)]

struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!("rect1 is {:?}", rect1);
}


```

### 结构体方法
- 结构体方法的第一个参数必须是 &self，不需声明类型，因为 self 不是一种风格而是关键字。

```rust
struct Rectangle {
    width: u32,
    height: u32,
}
   
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("rect1's area is {}", rect1.area());


struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn wider(&self, rect: &Rectangle) -> bool {
        self.width > rect.width
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 40, height: 20 };

    println!("{}", rect1.wider(&rect2));
}
```

### 结构体关联函数
- 在 impl 块中却没有 &self 参数,这种函数不依赖实例，但是使用它需要声明是在哪个 impl 块中的
```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn create(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect = Rectangle::create(30, 50);
    println!("{:?}", rect);
}
```

### 单元结构体
结构体可以值作为一种象征而无需任何成员`struct UnitStruct;`


## 枚举类
sample:
```rust
#[derive(Debug)]

enum Book {
    Papery, Electronic
}

fn main() {
    let book = Book::Papery;
    println!("{:?}", book);
}
```
### 为枚举类成员添加元组属性描述
```rust
enum Book {
    Papery(u32),
    Electronic(String),
}

let book = Book::Papery(1001);
let ebook = Book::Electronic(String::from("url://..."));
```

### 为属性命名，可以用结构体语法
```rust
enum Book {
    Papery { index: u32 },
    Electronic { url: String },
}
let book = Book::Papery{index: 1001};
```

### Match
- 枚举的目的是对某一类事物的分类，分类的目的是为了对不同的情况进行描述。
- switch的替代就是match
```rust
fn main() {
    enum Book {
        Papery {index: u32},
        Electronic {url: String},
    }
   
    let book = Book::Papery{index: 1001};
    let ebook = Book::Electronic{url: String::from("url...")};
   
    match book {
        Book::Papery { index } => {
            println!("Papery book {}", index);
        },
        Book::Electronic { url } => {
            println!("E-book {}", url);
        }
    }
}

// Papery book 1001
```
对非枚举类进行分支选择时必须注意处理例外情况，即使在例外情况下没有任何要做的事 . 例外情况用下划线 _ 表示：
```rust
fn main() {
    let t = "abc";
    match t {
        "abc" => println!("Yes"),
        _ => {},
    }
}
```
### Option 枚举类
用于填补 Rust 不支持 null 引用的空白.
- 在语言层面彻底不允许空值 null 的存在，但无奈null 可以高效地解决少量的问题，所以 Rust 引入了 Option 枚举类

```rust
enum Option<T> {
    Some(T),
    None,
}

let opt = Option::Some("Hello");

fn main() {
    let opt = Option::Some("Hello");
    match opt {
        Option::Some(something) => {
            println!("{}", something);
        },
        Option::None => {
            println!("opt is nothing");
        }
    }
}

fn main() {
    let opt: Option<&str> = Option::None;
    match opt {
        Option::Some(something) => {
            println!("{}", something);
        },
        Option::None => {
            println!("opt is nothing");
        }
    }
}
```

### if-let
```rust
// prototype
let i = 0;
match i {
    0 => println!("zero"),
    _ => {},
}

// standard
if let 匹配值 = 源变量 {
    语句块
}

//apply
fn main() {
    enum Book {
        Papery(u32),
        Electronic(String)
    }
    let book = Book::Electronic(String::from("url"));
    if let Book::Papery(index) = book {
        println!("Papery {}", index);
    } else {
        println!("Not papery book");
    }
}

```

## rust 组织管理
Rust 中有三和重要的组织概念：箱、包、模块。

### 箱（Crate）
- "箱"是二进制程序文件或者库文件，存在于"包"中。
- "箱"是树状结构的，它的树根是编译器开始运行时编译的源文件所编译的程序。
注意："二进制程序文件"不一定是"二进制可执行文件"，只能确定是是包含目标机器语言的文件，文件格式随编译环境的不同而不同。

### 包（Package）
- 当我们使用 Cargo 执行 new 命令创建 Rust 工程时，工程目录下会建立一个 Cargo.toml 文件。
- 工程的实质就是一个包，包必须由一个 Cargo.toml 文件来管理，该文件描述了包的基本信息以及依赖项。
- 一个包最多包含一个库"箱"，可以包含任意数量的二进制"箱"，但是至少包含一个"箱"（不管是库还是二进制"箱"）。
- 当使用 cargo new 命令创建完包之后，src 目录下会生成一个 main.rs 源文件，Cargo 默认这个文件为二进制箱的根，编译之后的二进制箱将与包名相同。

### 模块（Module）
- 对于一个软件工程来说，我们往往按照所使用的编程语言的组织规范来进行组织，组织模块的主要结构往往是树。Java 组织功能模块的主要单位是类，而 JavaScript 组织模块的主要方式是 function。
- 这些先进的语言的组织单位可以层层包含，就像文件系统的目录结构一样。Rust 中的组织单位是模块（Module）。
```rust
mod nation {
    mod government {
        fn govern() {}
    }
    mod congress {
        fn legislate() {}
    }
    mod court {
        fn judicial() {}
    }
}
```
tree construction:
```rust
nation
 ├── government
 │ └── govern
 ├── congress
 │ └── legislate
 └── court
   └── judicial
```
#### Path
- `::` 分隔
- `crate::nation::government::govern();`

### 访问权限
- public, private
- 默认情况下，如果不加修饰符，模块中的成员访问权将是私有的
- 对于私有的模块，只有在与其平级的位置或下级的位置才能访问，不能从其外部访问。
```rust
mod nation {
    pub mod government {
        pub fn govern() {}
    }

    mod congress {
        pub fn legislate() {}
    }
   
    mod court {
        fn judicial() {
            super::congress::legislate();
        }
    }
}

fn main() {
    nation::government::govern();
}
```

## 引入和use关键字
- `mode module;`引入
- `use path as xx`当前作用域与别名
```rust
mod nation {
    pub mod government {
        pub fn govern() {}
    }
    pub use government::govern;
}

fn main() {
    nation::govern();
}

mod nation {
    pub mod government {
        pub fn govern() {}
    }
    pub fn govern() {}
}
   
use crate::nation::government::govern;
use crate::nation::govern as nation_govern;

fn main() {
    nation_govern();
    govern();
}


use std::f64::consts::PI;

fn main() {
    println!("{}", (PI / 2.0).sin());
}
```

## 错误处理
- 程序中一般会出现两种错误：可恢复错误和不可恢复错误。
- Rust 中没有 Exception
- 对于可恢复错误用 Result<T, E> 类来处理，对于不可恢复错误使用 panic! 宏来处理

### 不可恢复错误
- `panic!("error");`不再执行

### 可恢复的错误
```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}

use std::fs::File;

use std::fs::File;

fn main() {
    let f = File::open("hello.txt");
    if let Ok(file) = f {
        println!("File opened successfully.");
    } else {
        println!("Failed to open the file.");
    }
}
```

- 如果想使一个可恢复错误按不可恢复错误处理，Result 类提供了两个办法：unwrap() 和 expect(message: &str) ：
```rust
use std::fs::File;

fn main() {
    let f1 = File::open("hello.txt").unwrap();
    let f2 = File::open("hello.txt").expect("Failed to open.");
}
```

### 可恢复的错误的传递
```rust
fn f(i: i32) -> Result<i32, bool> {
    if i >= 0 { Ok(i) }
    else { Err(false) }
}

fn main() {
    let r = f(10000);
    if let Ok(v) = r {
        println!("Ok: f(-1) = {}", v);
    } else {
        println!("Err");
    }
}
```
### kind 方法
- try 块在独立的函数中实现，将所有的异常都传递出去解决
- 应该注重独立功能的完整性
```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_text_from_file(path: &str) -> Result<String, io::Error> {
    let mut f = File::open(path)?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

fn main() {
    let str_file = read_text_from_file("hello.txt");
    match str_file {
        Ok(s) => println!("{}", s),
        Err(e) => {
            match e.kind() {
                io::ErrorKind::NotFound => {
                    println!("No such file");
                },
                _ => {
                    println!("Cannot read the file");
                }
            }
        }
    }
}
```

## 泛型和特性
- 泛型机制是编程语言用于表达类型抽象的机制，一般用于功能确定、数据类型待定的类，如链表、映射表等

### 在函数中定义泛型
```rust
fn max(array: &[i32]) -> i32 {
    let mut max_index = 0;
    let mut i = 1;
    while i < array.len() {
        if array[i] > array[max_index] {
            max_index = i;
        }
        i += 1;
    }
    array[max_index]
}

fn main() {
    let a = [2, 4, 6, 3, 1];
    println!("max = {}", max(&a));
}
```
这是一个简单的取最大值程序，可以用于处理 i32 数字类型的数据，但无法用于 f64 类型的数据。通过使用泛型我们可以使这个函数可以利用到各个类型中去。但实际上并不是所有的数据类型都可以比大小，所以接下来一段代码并不是用来运行的，而是用来描述一下函数泛型的语法格式：
```rust
fn max<T>(array: &[T]) -> T {
    let mut max_index = 0;
    let mut i = 1;
    while i < array.len() {
        if array[i] > array[max_index] {
            max_index = i;
        }
        i += 1;
    }
    array[max_index]
}
```

### 结构体与枚举类中的泛型
```rust
struct Point<T> {
    x: T,
    y: T
}
//这是一个点坐标结构体，T 表示描述点坐标的数字类型。我们可以这样使用：
let p1 = Point {x: 1, y: 2};
let p2 = Point {x: 1.0, y: 2.0};
```

### 不同的数据类型表示
```rust
struct Point<T1, T2> {
    x: T1,
    y: T2
}


enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### 泛型方法
```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 1, y: 2 };
    println!("p.x = {}", p.x());
}
```
- impl 关键字的后方必须有 `<T>`，因为它后面的 T 是以之为榜样的
```rust
impl Point<f64> {
    fn x(&self) -> f64 {
        self.x
    }
}

// impl 块本身的泛型并没有阻碍其内部方法具有泛型的能力
impl<T, U> Point<T, U> {
    fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}
//方法 mixup 将一个 Point<T, U> 点的 x 与 Point<V, W> 点的 y 融合成一个类型为 Point<T, W> 的新点。

```

### trait
特性（trait）概念接近于 Java 中的接口（Interface），但两者不完全相同。特性与接口相同的地方在于它们都是一种行为规范，可以用于标识哪些类有哪些方法。

```rust
trait Descriptive {
    fn describe(&self) -> String;
}
```
#### 结构体
```rust
struct Person {
    name: String,
    age: u8
}

impl Descriptive for Person {
    fn describe(&self) -> String {
        format!("{} {}", self.name, self.age)
    }
}
```
- `impl <特性名> for <所实现的类型名>`
#### 默认特性
这是特性与接口的不同点：接口只能规范方法而不能定义方法，但特性可以定义方法作为默认方法，因为是"默认"，所以对象既可以重新定义方法，也可以不重新定义方法使用默认的方法：
```rust
trait Descriptive {
    fn describe(&self) -> String {
        String::from("[Object]")
    }
}

struct Person {
    name: String,
    age: u8
}

impl Descriptive for Person {
    fn describe(&self) -> String {
        format!("{} {}", self.name, self.age)
    }
}

fn main() {
    let cali = Person {
        name: String::from("Cali"),
        age: 24
    };
    println!("{}", cali.describe());
}
```

## Rust 生命周期
生命周期机制是与所有权机制同等重要的资源管理机制。
```rust
{
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {}", r);
}
```
![rust-lifetime1.png][04]
- 上图中的绿色范围 'a 表示 r 的生命周期，蓝色范围 'b 表示 x 的生命周期。很显然，'b 比 'a 小得多，引用必须在值的生命周期以内才有效。

### 生命周期注释
- 生命周期注释是描述引用生命周期的办法。
- 虽然这样并不能够改变引用的生命周期，但可以在合适的地方声明两个引用的生命周期一致。
- 生命收起注释用单引号开头，跟着一个小写字母单词：
```rust
&i32        // 常规引用
&'a i32     // 含有生命周期注释的引用
&'a mut i32 // 可变型含有生命周期注释的引用
```

## 文件与IO
在 Rust 中主函数是个无参函数，环境参数需要开发者通过 std::env 模块取出
```rust
fn main() {
    let args = std::env::args();
    println!("{:?}", args);
}
```
### 文件读取 and 写入
```rust
use std::fs;

fn main() {
    let text = fs::read_to_string("D:\\text.txt").unwrap();
    println!("{}", text);
}

use std::fs;

fn main() {
    fs::write("D:\\text.txt", "FROM RUST PROGRAM")
        .unwrap();
}
```

## 并发编程
- 安全高效的处理并发是 Rust 诞生的目的之一，主要解决的是服务器高负载承受能力。
- 并发（concurrent）的概念是只程序不同的部分独立执行，这与并行（parallel）的概念容易混淆，并行强调的是"同时执行"。
- 并发往往会造成并行。
Rust 中通过 std::thread::spawn 函数创建新进程：
```rust
use std::thread;
use std::time::Duration;

fn spawn_function() {
    for i in 0..5 {
        println!("spawned thread print {}", i);
        thread::sleep(Duration::from_millis(1));
    }
}

fn main() {
    thread::spawn(spawn_function);

    for i in 0..3 {
        println!("main thread print {}", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```




[01]: ./img/heap.png "heap""
[02]: ./img/heap2.jpg "heapquote"
[03]: ./img/rust-slice1.png "rust-slice"
[04]: ./img/rust-lifetime1.png "rust-lifetime1"