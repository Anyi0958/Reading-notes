/* 
    NODE : 6
    lchi- 2, r -8
    0 4  79
 */
#define Element int

typedef Tree* Bstree;
struct Tree {
    Element data;
    tree lchild, rchild;
};

Bstree SearchAncestor(Bstree bst, int data1, int data2){
    Bstree head = bst;

    while(bst){
        if(data1 > data2)   SearchAncestor(bst, data2, data1);
        if(data1 < bst->data && data2 < bst->data)  SearchAncestor(bst->lchild, data1, data2);
        if(data2 > bst->data && data2 > bst->data)  SearchAncestor(bst->rchild, data1, data2);
        
        if(data1 <= bst->data && data2 >= bst->data)  return bst->data;      
    }    
}