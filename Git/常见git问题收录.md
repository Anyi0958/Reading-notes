常见git问题收录 目录
[TOC]
***

# 前言

- 本文用于收录常见`git`与`github`问题

# 推荐阅读

- 《Git权威指南》

***

# 1. 无法打开`github`

1. 打开[网站IP查询](ip.chinaz.com)
2. 输入`www.github.com`

![0-open][01]

3. 打开`C:\Windows\System32\drivers\etc`下的`hosts`文件，在文件末尾增加`52.74.223.119 www.github.com`

![1-hosts][02]

4. 打开`cmd`输入`ipconfig /flushdns`后，`ping www.github.com`获取如下图数据

![2-ping][03]

5. 可以打开[github](www.github.com)

# 2. `github`下载速度过慢

1. 更换国内镜像源

比如，`git clone github.com/xxx`改成`git clone github.com.cnpmjs.org/xxx`

2. 更改`hosts`的`buffer`

`git config --global http.postBuffer 524288000`

3. 修改`hosts`
   1. 打开查询[域名ip](https://www.ipaddress.com/)
   2. 寻找域名对应`ip`
   3. 在`hosts`文件内添加对应

```shell
151.101.72.249 github.global.ssl.fastly.net  
192.30.253.112 github.com
```

`hosts`文件位置：

- `win`：`C:\Windows\System32\drivers\etc\hosts`
- `linux`：`/etc/hosts`

4. 码云作为中转站，中转文件







***

[01]: ./常见问题img/0-open.png "0-open"
[02]: ./常见问题img/1-hosts.png "1-hosts"
[03]: ./常见问题img/2-ping.png "2-ping"