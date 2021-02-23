JS-lufylegend��Ϸ����-�����˶� Ŀ¼
[TOC]
***

# ǰ��

- ��������Ϸ���������ɲ���

- ����`LAnimation`���ѭ��ʱ�䣬��������ʵ��һ�鶯���Ĳ���

- ׼��һ����Ƭ����������Ķ���

  ![54-animation][54]

***

# �����

- [`lufylegend`����](http://lufylegend.com/lufylegend "lufylegend")
- �������飺`<script src="./lufylegend-1.10.1.min.js">`
- ѧϰ���飺`<script src="./lufylegend-1.10.1.js"></script>`

***

# ʹ������

1. ������
2. ����`<div>`
3. ʹ��`init`������ʼ������

***

# ��������

- `init(speed, divid, width, height, completeFuc, type)`
  - `speed`����Ϸ�ٶ��趨
  - `divid`��`canvas`�����`div`�ڲ�
  - `width,height`����Ϸ���
  - `completeFunc`����Ϸ��ʼ����ɺ󣬵��ô˺���

- `LAnimation(layer,data,list)`
  - `layer`��`LSprite`����
  - `data`��`LBitmapData`����
  - `list`���洢����Ķ�ά����
- ����ͨ��`LGlobal.divideCoordinate(width,height,row,col)`
  - `width,height`������
  - `row,col`������������
  - �˺����Ὣ����Ŀ�߰����������������в�ּ��㣬�Ӷ��õ���ά����
  - ����ͼƬΪ`256x256`����ִ���`LGlobal.divideCoordinate(256,256,4,4)`

```html
 <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 0,0,64,64);
                let list = LGlobal.divideCoordinate(287,287,4,4)
                
                let layer = new LSprite();
                addChild(layer);

                let anime = new LAnimation(layer, bitmapdata, list);
                layer.addEventListener(LEvent.ENTER_FRAME, () => {
                    anime.onframe();
                });
            });
            loader.load("animation.png", "bitmapData");
            
        });
    </script>
```

![55-animation][55]

***

# ���뽲��

- ���ﶯ��������ʵ�ǽ���һ��ͼƬ���ѭ������

- `LAnimation`���`onframe()`���������ŵ�ͼƬ�кż�1����ѭ���¼��в��ţ��ͳ��˶���

- Ҫʵ�����е�ͼƬѭ�����ţ���Ҫ�õ�`setAction`

- `setAction(rowIndex, colIndex)`�����Ըı�ͼƬ���кź��к�
  - `rowIndex`�������к�
  - `colIndex`�������к�

***

# �ƶ��˶�

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 0,0,64,64);
                let list = LGlobal.divideCoordinate(287,287,4,4)
                
                let layer = new LSprite();
                addChild(layer);

                let anime = new LAnimation(layer, bitmapdata, list);
                layer.addEventListener(LEvent.ENTER_FRAME, () => {
                    let action = anime.getAction();
                    switch(action[0]) {
                        case 0:
                            layer.y += 5;
                            if(layer.y >= 200)  anime.setAction(2);
                            break;
                        case 1:
                            layer.x -= 5;
                            if(layer.x <= 0)    anime.setAction(0);
                            break;
                        case 2:
                            layer.x += 5;
                            if(layer.x >= 200)  anime.setAction(3);
                            break;
                        case 3:
                            layer.y -= 5;
                            if(layer.y <= 0)    anime.setAction(1);
                            break;
                    }
                    anime.onframe();
                });
            });
            loader.load("animation.png", "bitmapData");
            
        });
    </script>
```

![56-animation][56]

***

# ���뽲��

- `getAction`ȡ�õ�ǰ���Ŷ������кź��кţ������Ǹ�����
- $[1,2,3,4]$�ֱ������"�£����ң���"4������Ȼ���ƶ������ݵ����λ�øı��ƶ�����
- `layer.y += 5`��������ͼ���ƶ��Ľ���Ͳ���
- `layer.y >= 350 - 287/2`����������ƶ��Ŀռ䣬���ʽ��:

$$
canvas�߶� - \frac{����ͼ�ĸ߶�}{�ֳɵ�����} \times ����ͼ��canvas��ʾ�ĸ߶� \times 2
$$







***

[54]: ./img/animation.png "54-animation"
[55]:./img/55-animation.gif "55-animation"
[56]:./img/56-animation.gif "56-animation"

