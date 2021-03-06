#include <stdio.h>
#include <malloc.h>
#include "doubleLink.h"

// initial
ListNode InitialList(){
    ListNode list = (ListNode) malloc(sizeof(struct Node));
    list->pre = NULL;
    list->next = NULL;
    list->data = -1;

    return list;
}

// Add
void AddNode(ListNode list, Element data){
    ListNode head = list;
    
    ListNode node = (ListNode) malloc(sizeof(struct Node));
    node->data = data;
    node->pre = NULL;
    node->next = NULL;

/*     while(list){
        if(!list->next){
            list->next = node;
            node->pre = list;
            return;
        }
        list = list->next;
    } */

    while(list){        
        // only 0
        if(!list->next && list->data == -1){
            list->data = data;
            
            free(node);
            return;   
        }
        // only 1
        if(!head->next && head->data < data){
            head->next = node;
            node->pre = head;
            return;
        }else if(!head->next && head->data >= data){
            head->pre = node;
            node->next = head;
            
            return;
        }

        // gtr 2
        if(list->data < data){
            if(list->next->data > data && list->next){
                node->next = list->next;
                node->pre = list;

                list->next = node;
                list->next->pre = node;
                return;
            }else{
                if(!list->next) {
                    list->next = node;
                    node->pre = list;

                    return;
                }
                continue;
            }
        }else {
            printf("data: %d", data);
            list->pre = node;
            node->next = list;
            return;
        }

        list = list->next;
    }
    
    // return;
}

// Search
ListNode SearchNode(ListNode list, Element data){
    ListNode searchResult, head;
    head = list;

    while(list){
        if(list->data == data){
            searchResult = list;

            return searchResult;            
        }

        list = list->next;
    }

    return head;
}

// Delete
ListNode DeleteNode(ListNode list, Element data){
    ListNode head = list;

    while(list){
        if(list->data == data){
            ListNode tmp = (ListNode) malloc(sizeof(struct Node));
            tmp = list;

            list->pre->next = list->next;
            list->next->pre = list->pre;

            list = head;
            free(list);
            return tmp;
        }

        list = list->next;
    }

}


// PrintNode
void PrintNode(ListNode list){
    while(list){
        printf("data: %d\n", list->data);

        list = list->next;
    }
}