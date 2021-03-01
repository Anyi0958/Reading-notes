SVN常用指令总结 目录
[TOC]
***

# 前言

- 本文仅为记录`SVN`命令合集

# 推荐阅读

- 《SVN权威指南》

# 1. 创建版本库

`svnadmin create [path]`

# 2. 启动服务器

`svnserve -d -r xxx\subversion`

`netstat -ano | findstr 3690`：查看是否启动

# 3. 启动服务

`sc create MySVNService binpath='xxx\svnserve.exe --service -r [path]' start=autodepend=Tcpip`

# 4. 取出仓库

`svn checkout svn://localhost/xx`

# 5. 添加文件

`svn add [filename]`

# 6. 提交修改

`svn commit -m "xxx" [filename]`

# 7. 更新版本

`svn update`

# 8. 服务器部署

## `LINUX`环境

### 1. 下载

`yum -y install subversion`

### 2. 制作仓库目录

1. `mkdir -p /var/svn/repository`
2. `cd /var/svn/repository`
3. `mkdir pro_a`

### 3. 创建`SVN`版本库

`svnadmin create [path]`

### 4. 连接

`svn://ip:3690/pro_oa`

### 5. 查看服务 

`chkconfig | grep svn` 

### 6. 打开 

`chkconfig svnserve on `

### 7. 对应脚本位置 

`/etc/rc.d/init.d/svnserve` 

### 8. 服务配置 

`args="--daemon --root/var/svn/repository --listen-port 3690 --pid-file=${pidfile}$OPTIONS"` 

### 9. 开机运行 

`service svnserve start`

`servei svnserve status` 

`netstat -anp | grep 3690` 

### 10. 添加文件 

`svn add [filename]`

### 11. 添加整个目录 

`svn add` 

### 12. 提交 

附加日志信息：`svn commit -m "message" [filename]` 

### 13. 更改`conf` 

`anon-access = write` 

- 允许匿名提交信息 

### 14. 查看提交的文件信息 

`svn list svn://ip:port/dir` 

### 15. 取出 

`svn checkout svn://ip:port/dir` 

### 16. 更新文件 

`svn update [filename]` 

### 17. 更新全部 

`svn update` 

### 18. 查看文件信息 

`svn info [filename]`

