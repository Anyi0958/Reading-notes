#include <iostream>

void QuickSort(int begin, int end);

int a[8] = {3,6,2,1,9,7,6};
void main(void){
    
    return;
}

void QuickSort(int begin, int end){
    int p = begin;
    int q = end;

    int mid = a[p];
    while (p < q)
    {
        while(a[p] < mid)   p++;
        while(a[q] > mid)   q--;

        if(p <= q){
            int temp = a[p];
            a[p] = a[q];
            a[q] = temp;
            p++;
            q--;
        }
    }

    if(p < end) QuickSort(p, end);
    if(q > begin)   QuickSort(begin, q);
    
}