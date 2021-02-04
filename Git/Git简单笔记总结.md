Git 目录
[TOC]
***
# 指令总结

## 初始化

`git init` 或者 `.git/`

## 查看签名 

`cat ./.git/config`

## 设置签名 

`git config user.name name`, `git config user.email email`

## 查看签名文件 

`~/.gitconfig`

## 设置例子

`git config --global user.name name`

`git config --global user.email email`

## 查看工作区、暂缓区状态

`git status`

## 添加

`git add filename`

## 提交

`git commit -m "message" filename`

## 查看历史记录

`git log`

## 查看记录关系

`git log --oneline`

`git log --pretty=oneline`

## 对版本进行更改

`git reflog`

## 基于索引值操作

### 局部索引值

`git reset --hard` 

### 重置三种情况（本地库移动/本地+暂存区/本地+暂存区+工作区）

`git reset --soft/mixed/hard`

### 后退重置操作（^--step 1， n~step n）

`git reset --hard HEAD^`

`git reset --hard HEAD~n`

## 比较文件差异

### （工作vs暂存区）

`git diff filename`

### （本地库vs工作区）

`git diff [本地库历史版本] a/c.txt b/c.txt`

### (比较多个)

`git diff a b c d`

## 创建分支

`git branch [name]`

## 查看分支

`git branch -v`

## 切换分支

`git checkout [branchname]`

## 合并分支

`git checkout [merged branchname]`

`git merge [branchname]`

## 保存工作进度-stash

### Stash用法

- 命令可用于临时保存和回复修改，可跨分支,在未add之前才能执行stash
- git pull 拉代码的时候，或者切换分支的时候，防止冲突和不便，会用到git stash，将工作区内容暂存起来

#### 常用于保存工作进度

`git stash save [message]`

#### 查看list

- 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

`git stash list`

#### 恢复工作区内容

##### pop

`git stash pop stash@{num}`

- 恢复，num是可选项，通过git stash list可查看具体值。只能恢复一次

##### apply

`git stash apply stash@{num}`

- 恢复，num是可选项，通过git stash list可查看具体值。可回复多次

#### 删除工作区内容

`git stash drop stash@{num}`

- 删除某个保存，num是可选项，通过git stash list可查看具体值

#### 清空所有保存

`git stash clear`

- 删除所有保存

## 冲突解决

### 1. 保存本地改动，并拉下服务器，手动merge

#### 保留服务器修改

`git stash` 

#### 栈信息打印

`git stash list -git`

`stash@{0}` 刚才保存标记

#### 暂存后pull

`git pull` 

#### 还原暂存内容

`git stash pop stash@{0}` 

### 打开冲突文件，修改冲突内容并保存

#### 删除stash

`git stash drop stash@{0}` 

#### 清除所有stash

`git stash clear`

#### 提交修改

`git add filename`

`git commit -m "message" [不能带具体文件名]`

### 2.本地覆盖服务器---回退并更新

`git reset --hard`

`git push`

#### 直接采用以下提交修改也可

`git add filename`

`git commit -m "message" [不能带具体文件名]`

## 查看远程仓库地址

`git remote -v`

### 增加远程仓库地址

`git remote add altername url`

### 推送

`git push altername branchname`

### 克隆

`git clone url`

### 拉取

`git fetch altername branchname`

### 融合

`git merge altername branchname`

### 拉取+融合

`pull = fetch + merge`

`git pull altername branchname`

## 生成密钥

`ssh-keygen -t rsa -C fwx@gmail.com`

## 配置gitlab server

### 安装

```shell

curl https://packages.gitlab.com/gitlab/gitlab-ce/packages/el/7/gitlab-ce-10.8.2-ce.0.el7.x86_64.rpm

sudo rpm -ivh /opt/gitlab-ce-10.8.2-ce.0.el7.x86_64.rpm

sudo yum install -y curl policycoreutils-python openssh-server cronie 

sudo lokkit -s http -s ssh

sudo yum install postfix

sudo service postfix start

sudo chkconfig postfix on

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash

sudo EXTERNAL_URL="http://gitlab.example.com" yum -y install gitlab-ce 
```

### 服务操作

#### 初始化

`gitlab-ctl reconfigure`
#### 启动
`gitlab-ctl start`
#### 停止
`gitlab-ctl stop`
#### 关闭防火墙
`service firewall stop`