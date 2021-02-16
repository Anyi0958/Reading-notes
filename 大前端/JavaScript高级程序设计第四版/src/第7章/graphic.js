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