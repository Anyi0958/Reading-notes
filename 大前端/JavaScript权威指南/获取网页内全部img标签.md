获取网页内全部`img`标签 目录
[TOC]
***

# 前言

- 通过DOM获取文件内的所有标签

# 推荐阅读

- 《JS权威指南》

# 代码实现

```js
for(let key in document.images){
    console.log(key);
}

let context = Array.prototype.map.call(document.images, (event)=>{console.log(event)});
```



# 结果展示

![image-20210310214819725](E:\0.读书笔记\笔记\大前端\JavaScript权威指南\img\0-getImages.png)

