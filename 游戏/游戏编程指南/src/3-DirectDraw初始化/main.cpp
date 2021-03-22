#include <ddraw.h>

// DirectDraw对象的指针
LPDIRECTDRAW lpDD;
// DirectDraw主页面的指针
LPDIRECTDRAWSURFACE lpDDSPrimary;
// DirectDraw后台缓存的指针
LPDIRECTDRAWSURFACE lpDDSBuffer;
// 存放背景图的页面的指针
LPDIRECTDRAWSURFACE lpDDSBack;

BOOL InitDDraw(HWND hwnd) {
    // DirectDraw的页面描述
    DDSURFACEDESC ddsd;

    if(DirectDrawCreate(NULL, &lpDD, NULL) != DD_OK)
        return FALSE;   //创建DirectDraw对象
    if(lpDD->SetCooperativeLevel(hwnd, DDSCL_EXCLUSIVE | DDSCL_FULLSCREEN) != DD_OK)
        return FALSE; // 设置DirectDraw控制级
    if(lpDD->SetDisplayMode(640, 480, 32) != DD_OK)
        return FALSE; // 设置显示模式

    // 开始创建主页面，先填充页面描述
    ddsd.dwSize = sizeof(ddsd);
    // 有后台缓存
    ddsd.dwFlags = DDSD_CAPS | DDSD_BACKBUFFERCOUNT;
    ddsd.ddsCaps.dwCaps = DDSCAPS_PRIMARYSURFACE | DDSCAPS_FLIP | DDSCAPS_COMPLEX;
    // 一个后台缓存
    ddsd.dwBackBufferCount = 1;
    // 创建主页面
    if(lpDD->CreateSurface(&ddsd, &lpDDSPrimary, NULL) != DD_OK)
        return FALSE;
    // 后台缓存
    ddsd.ddsCaps.dwCaps = DDSCAPS_BACKBUFFER;

    // 创建后台缓存
    if(DD_OK != lpDDSPrimary->GetAttachedSurface(&ddsd.ddsCaps, &lpDDSBuffer))
        return FALSE;
    
    ddsd.dwSize = sizeof(ddsd);
    ddsd.dwFlags = DDSD_CAPS | DDSD_WIDTH | DDSD_HEIGHT;
    // 这是离屏页面
    ddsd.ddsCaps.dwCaps = DDSCAPS_OFFSCREENPLAIN;
    ddsd.dwHeight = 480;
    ddsd.dwWidth = 640;

    // 创建放背景图的页面
    if(DD_OK != lpDD->CreateSurface(&ddsd, &lpDDSBack, NULL))
        return FALSE;
    // 如还有别的页面，可以在此继续创建
    return TRUE;
}
