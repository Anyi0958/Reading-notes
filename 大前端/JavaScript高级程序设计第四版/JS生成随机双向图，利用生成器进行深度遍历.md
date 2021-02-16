目录：
[TOC]
***
# 前言
本文取自《JavaScript高级程序设计》(第4版)第7章
- 内容主体为生成器，因此用生成器递归的迭代器对图进行深度遍历
- 适合深入了解生成器

# 内容讲解
## 1. 用类模拟结构体
由于`JS`中无法像`C`定义结构体，如何实现结构体功能就成了一个问题。
在研究`JS`面向对象的特性后，发现可以用`constructor`的构造器函数进行模拟，并在这个基础上可以封装一个连接方法，用来增加结点的连通性
## 2. 随机的双向图
- 为了体现递归生成器的方便，在图的类声明时，就自动建立好随机双向图
- 添加2个方法，分别用于打印输出图的内容和深度优先遍历，查看图是否连通

# 代码实现
以下为源代码：
```js
class Node {
    constructor(id) {
        this.id = id;
        this.neighbors = new Set();
    }

    connect(node) {
        if(node !== this){
            this.neighbors.add(node);
            node.neighbors.add(this);
        }
    }
}

class RandomGraph {
    constructor(size) {
        this.nodes = new Set();

        // 创建结点
        for(let i = 0; i < size; ++ i)  this.nodes.add(new Node(i));

        // 随机连接结点
        const threshold = 1 / size;
        for(const x of this.nodes) {
            for(const y of this.nodes){
                if(Math.random() < threshold){
                    x.connect(y);
                }
            }
        }
    }

    // 这个方法用于调试
    print() {
        for(const node of this.nodes){
            const ids = [...node.neighbors]
                        .map(n => n.id)
                        .join(',');
        
            console.log(`${node.id}: ${ids}`);
        }
    }

    // 深度优先遍历
    isConnected() {
        const visitedNodes = new Set();

        function* traverse(nodes) {
            for(const node of nodes ) {
                if(!visitedNodes.has(node)){
                    yield node;
                    yield* traverse(node.neighbors);
                }
            }
        }

        // 取得集合中的第一个结点
        const firstNode = this.nodes[Symbol.iterator]().next().value;

        // 使用递归生成器迭代每个结点，并放入Set里
        for (const node of traverse([firstNode])) {
            visitedNodes.add(node);
        }

        return visitedNodes.size === this.nodes.size;
    }
}

const g = new RandomGraph(6);
// 遍历打印
g.print();
// 检查是否连通
console.log(g.isConnected());

// 0: 2,5
// 1: 5,4
// 2: 0
// 3: 5,4
// 4: 1,3,5
// 5: 1,3,0,4
// true
```
结果：
![1-graphic][01]

[01]: ./img/1-graphic.png "1-graphic"