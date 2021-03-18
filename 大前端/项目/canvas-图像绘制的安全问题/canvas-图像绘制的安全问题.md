canvas-图像绘制的安全问题 目录
[TOC]
***



# 图像会带来安全问题

- 如果要限制他人随意存取发表在社交网络上的图片，或者对原型图进行加密
- `canvas`允许绘制不属于自己的图像(其他域)，但不能通过`canvas API`保存或修改图像

# 绘图安全机制的原理

- `canvas`有`origin-clean`标志位，默认为`true`
- 如果使用了`drawImage()`绘制了其他域的图像，`origin-clean`会变成`false`
- 如果在`origin-clean: false`的`canvas`上调用`toDataURL(), getImageData()`方法，浏览器将会报错`SECURITY_ERR`

# 绕过安全问题

- `Chrome`命令行中输入：`--allow-file-access-from-files`
- `FireFox`：`netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");`

