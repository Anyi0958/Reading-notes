/* 
*   filename: main.cpp
*   content: a base windows program
 */
#include <windows.h>

// declare functions
BOOL InitWindow(HINSTANCE hInstance, int nCmdShow);
LRESULT CALLBACK WinProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM IParam);

// declare variable
// window handle
HWND hwnd;

/* 
*   WinMain()
*   the entry of the program. Create main window, message loop 
*/
int PASCAL WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR IpCmdLine, int nCmdShow){
    MSG msg;
    // create main window
    if(!InitWindow(hInstance, nCmdShow))   return FALSE;

    // enter the message loop
    while(1){
        if(PeekMessage(&msg, NULL, 0, 0, PM_REMOVE)){
            if(msg.message == WM_QUIT)  break;

            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
    }

    return msg.wParam;
}

// InitWindow()

static BOOL InitWindow(HINSTANCE hInstance, int nCmdShow) {
    // window style
    WNDCLASS wc;

    wc.style = NULL;
    wc.lpfnWndProc = (WNDPROC) WinProc;
    wc.cbClsExtra = 0;
    wc.hInstance = hInstance;
    wc.hIcon = NULL;
    wc.hCursor = NULL;
    // wc.hbrBackground = "My_Test";
    RegisterClass(&wc);

    hwnd = CreateWindow("My_Test", "My first program", 
        WS_POPUP | WS_MAXIMIZE,
        0,
        0,
        GetSystemMetrics(SM_CXSCREEN),
        GetSystemMetrics(SM_CYSCREEN),
        NULL,NULL,hInstance,NULL);

        if(!hwnd)   return FALSE;
        ShowWindow(hwnd, nCmdShow);
        UpdateWindow(hwnd);
        return TRUE;
}

// WinProc()
LRESULT CALLBACK WinProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM IParam) {
    switch(message) {
        case WM_KEYDOWN:
        switch(wParam) {
            case VK_ESCAPE:
                MessageBox(hWnd, "Exit", "Keyboard", MB_OK);
                PostQuitMessage(0);
                break;
        }
        break;

        case WM_RBUTTONDOWN:
            MessageBox(hWnd, "mouse right key press", "Mouse", MB_OK);
            break;
        
        case WM_DESTROY:
            PostQuitMessage(0);
            break;
    }

    return DefWindowProc(hWnd, message, wParam, IParam);
}