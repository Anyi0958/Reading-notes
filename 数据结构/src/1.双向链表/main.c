#include <stdio.h>
#include <malloc.h>
#include "doubleLink.c"

int main(void){
    ListNode list = InitialList();

    printf("add start\n");
    
    AddNode(list, 2);
    AddNode(list, 3);
    AddNode(list, 1);
    AddNode(list, 0);
    AddNode(list, 5);
    printf("add end\n");

    PrintNode(list);
    printf("search start\n");
    SearchNode(list, 1);
    SearchNode(list, 3);

    DeleteNode(list, 2);
    PrintNode(list);

    return 0;
}