#include <iostream>

using namespace std;

void main() {
    unsigned int a, b;
    cin >> a;
    cin >> b;

    unsigned int *c;
    c = &a;

    __asm {
        mov eax, c;
        // 不能直接使用mov eax,[c]
        // 现在 eax存储的是a
        mov eax, [eax];

        mov ebx, b;
        lea eax, [eax+ebx];
        mov a,eax;
    }

    cout << a;
}


