/* 
    1. initial - build a sentry
    2. addNode
    3. searchNode
    4. deleteNode
    5. modifyNode
    6. printNode
*/
#define Element int
typedef struct Node *ListNode;

struct Node {
    Element data;
    ListNode pre, next;
};

// initial
ListNode InitialList();

// Add
void AddNode(ListNode list, Element data);

// Search
ListNode SearchNode(ListNode list, Element data);

// Delete
ListNode DeleteNode(ListNode list, Element data);

// PrintNode
void PrintNode(ListNode list);