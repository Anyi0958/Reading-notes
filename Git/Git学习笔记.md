Git2.3 目录
[TOC]
***
# 推荐阅读

- [廖雪峰博客](https://www.liaoxuefeng.com/wiki/896043488029600 "廖雪峰博客")

# 前言-各个版本控制工具对比

版本控制工具：控制代码版本，避免混乱。
## 集中式版本控制工具
- CVS
- SVN
- VSS

## 分布式Git
自己拥有完整的版本。
![gitcharacter][01]

### Git分区
![storeSorts][02]

### 工作流程
1. `git clone`下远程仓库
2. `git checkout`选择分支
3. `git add <filename>`文件放到暂存区
4. `git commit`提交修改到仓库
5. `git push repo branch`添加到远程仓库
![repo][03]

# 0.配置
## 查看签名
`cat ./.git/config`

## 设置签名 
`git config user.name name`, `git config user.email email`

## 查看签名文件 
`~/.gitconfig`

## 设置例子
`git config --global user.name name`
`git config --global user.email email`

# 1. 版本库与文件操作

## 1.1 创建版本库
进入目录后，执行初始化：
`git init` 或者 `.git/`

- 创建成功，会在仓库文件夹下面生成`.git`目录
- `.git`：跟踪管理版本库
- 自动创建唯一`master`分支

## 1.2 添加文件到仓库
1. `git add <filename>`
- 此举将文件放进暂存区(stage)
- 可反复使用
- 可同时添加多个文件
2. `git commit -m <message>`
- 把暂存区的所有内容提交到当前分支
- 添加到版本库，`message`是提交描述

### 1.2.1 查看仓库状态
`git status`
查看工作区的状态，常见的结果：
1. `Changes not staged for commit`: 文件更改了，但未放入暂存区，需要`add`
2. `Changes to be committed`: 文件已经放入暂存区，但未提交到版本库，需要`commit`
3. `Untracked files`: 表示该文件从未被添加到版本库

### 1.2.2 查看修改内容
如果使用`git commit -m <message>`，被告知文件被修改过：
- 使用`git diff <filename>`，查看修改内容
- <span style="color:red;">add文件之前使用此查看</span>

### 1.2.3 提交修改
提交修改与提交新文件相同：
1. `add`
2. `commit`
- 需要提交的文件修改，暂时放在暂存区，然后一次性提交暂存区的所有修改


## 1.3 版本回退
1. 当修改到一定程度时，需要对文件进行备份，此时的备份也可以看作是快照，即为`git commit -m <message>`
2. 当做出错误行为，改错文件，误删文件，可以从最近的`commit`里恢复
### 回退操作
1. `git log`可以查看提交历史，版本库的状态，并显示从近到远的提交日志
2. `git log --pretty=online`简化输出，每个日志单独成行
3. `Head`表示当前的版本，而前面的则是`commit id`代表着版本号
![gitlog][04]
4. `git reset --hard HEAD^`回退到上一版本
	- `HEAD`表示回退1个版本，新版本表示不变
	- `HEAD^`表示回退2个版本，废除
	<span style="color:red;">以上两个在新版本(2.3.0)中都已出现误差，只能使用以下</span>
	- `HEAD~n`表示回退n个版本，HEAD是个指针
5. `git reset --hard 新版本的commit id`返回**过去/未来**的版本
	- `commit id`可以只写`id`的前7位，git会自动寻找
![gitcommitid][05]
6. `git reflog`查看命令历史，确定要回到的未来版本
![gitreflog][06]

## 1.4 工作区和暂存区
- 工作区：当前的工作目录
- 版本库：工作区里隐藏的`.git`目录
- 暂存区(stage/index)：存放在版本库中，但没有提交（<span style="color:red;">最重要的区</span>）
- 版本库里，放着第一个分支`master`，以及指向`master`的指针`HEAD`
![gitRepo][07]
### 流程
- `git add <filename>`提交到暂存区
- `git commit -m <message>`一次性提交所有修改
### 注意
- Git跟踪的是<span style="color:red;">修改</span>，而非文件
- 如果不`git add`到暂存区，就不会加入到`commit`中
### 查看工作区和版本库的差别
- 提交后，`git diff HEAD -- <filename>`可以查看**工作区**和**版本库**最新版本的区别
![gitdiffhead][08]
- 此命令与`git diff <filename>`相同

### diff的补充
- `git diff`工作区(work dict)和暂存区(stage)的比较，上次`git add`的内容
- `git diff --cached`暂存区(stage)和仓库分支(master)的比较，上次`git commit`的内容

## 1.5 撤销修改
1. 改乱了工作区的某个文件，直接丢弃工作区的修改时：`git checkout -- <file>`
	- <span style="color:red;">仅限于修改内容</span>
	- 如果<span style="color:red;">文件删除</span>，需要用`git checkout branch filename`
	- 文件修改后未放到暂存区，撤销修改回到和版本库一样的状态
	- 文件已经添加到暂存区，撤销修改回到添加到暂存区后的状态
2. 改乱了工作区文件内容，还添加到暂存区，丢弃修改需要两步：
	- `git reset HEAD <file>`暂存区的修改撤销掉，重新回到工作区
	- 工作区`git checkout -- <file>`，回到未修改前
3. 已经提交到版本库，想要撤销本次提交，需要版本回退，<span style="color:red;">前提是没有提交到远程库</span>
	* `git checkout branch filename`是用版本库替换工作区
	* `git checkout`获取变化的地方

### `-`和`--`的补充
* `-`后跟短命令选项，通常是单字母，如`-m`
* `--`后跟长命令选项
	* 如果后面不跟任何选项，表示命令选项结束，后面都是命令的参数而非选项
	* `git checkout -- filename`,`filename`是参数而不是选项

## 1.6删除文件
- 在删除文件后，执行`git add/rm <filename>`
- `git commit -m <message>`提交到仓库
- 出现误删，需要使用`git checkout branch file`找回
- 命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。
![gitrm][09]

# 2.远程仓库
本地Git仓库和Github仓库之间传输是通过SSH加密
## 创建SSH Key
1. `ssh-keygen -t rsa -C "youremail@example.com"`：回车即可，无需设置密码
	- 找到.ssh目录下的`id_rsa`和`id_rsa.pub`，这两个是SSH Key的密钥对
	- `id_rsa`是私钥
	- `id_rsa.pub`是公钥
2. Github下的setting，找到`SSH and GPG keys`，点击`New SSH Key`粘贴即可
![sshkey][10]
![sshkeygit][11]

## 2.1 添加远程库
本地和远程仓库同步
1. 本地仓库下运行命令`git remote add origin url`，对远程库添加别名
2. 推送到远程
	* 第一次推送`git push -u origin master`，本地`master`和远程的`master`分支关联起来
	* 之后可以省略，直接用`git push origin master`

## 2.2远程克隆
`git clone url`克隆网络库

# 3.分支管理
创建新的分支后，如果要处理原来的分支，需要此。
## 3.1 分支与管理
`HEAD`不是指向提交，而是指向`master`，而`master`是指向提交的
`HEAD`指向当前分支
过程：
- 初始化
![pre-branch][12]
- 新增分支
![mid-branch][13]
- 切换分支，并且提交内容
![post-branch][14]
- 合并分支
![merge-branch][15]
- 结果
![final-branch][16]

1. 查看分支`git branch`
2. 创建分支`git branch <name>`
3. 切换分支`git checkout <name>`
4. 创建+切换分支`git checkout -b <name>`
5. 合并某分支到当前分支`git merge <name>`
6. 删除分支`git branch -d <name>`

## 新版切换分支switch
1. 切换分支`git switch`
2. 创建并切换`git switch -c dev`
3. 切换到已有分支`git switch master`
<span style="color:red;">Git鼓励大量使用分支</span>

## 3.2 解决冲突
合并时会出现代码冲突。
- 不同分支修改代码相同的部分，从而导致合并分支时出现冲突
- 解决冲突，就是把合并失败的文件进行手动修复，然后再提交`add + commit`
合并前：
![mergeConflict][17]
合并后：
![merged][18]

- 合并`git merge <name>`
- 查看分支合并情况和分支历史：`git log --graph --pretty=oneline --abbrev-commit`
- 合并分支图`git log --graph`

## 3.3 分支管理策略
合并时，默认采取`Fast farword`，一旦合并，看不到合并历史，删掉分支看不到分支信息
- 禁用`Fast farword`，合并分支可以出现分支信息，`git merge --no-ff -m "merge with no-ff" dev`
- `--no-ff`禁用`Fast farword`
- `-m <message>`合并后，`commit`的信息
- 查看分支历史`git log --graph --pretty=oneline --abbrev-commit`
- 建议使用<span style="color:red;">`git merge --no-ff -m "merge with no-ff" dev`</span>

不使用`Fast forward`模式，`merge`后就像这样 ：
![fastforward.png][19]

### 团队分支管理
- `master`应该非常稳定，只用来发布新版本
- `dev`用来做事，意味着不稳定
- 等到新版本发布时，把`dev`分支合并到`master`上，在`master`发布版本
- 多人合作，多加分支，然后合并到`dev`
团队分支脑图：
![team][20]

## 3.4Bug分支
修复bug，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除.

1. 假设场景A正在开发的软件
2. 假设master分支上面发布的是A的1.0版本，dev分支上开发的是A的2.0版本
3. 若这时用户反映 1.0版本存在漏洞，则需要从dev切换到master去修复漏洞， 这时按理应该先提交在dev分支上的工作，然后从dev分支切换到master分支去修复漏洞，但这时你在dev分支上的工作只进行了一半，还没法提交。
4. 此时可以用`git stash`命令来把当前工作现场（dev分支）“储藏”起来，等以后恢复现场后继续工作。
5. 切换到master分支，在master分支建立issue-101分支，切换到issue-101分支修复漏洞，修复完成后提交`commit`，然后切换到master分支上合并issue-101分支`git merge --no-ff -m "merged bug fix 101" issue-101`
6. 切换回dev分支，`git stash list`命令看看`stash`内容，然后`git stash pop`，恢复的同时把`stash`内容也删了继续工作。
7. 但这个bug也会出现在`dev`分支上，要修复需要把bug分支提交的修改`4c805e2 fix bug 101`复制过来，而不是整个master分支`merge`过来，有`git cherry-pick 4c805e2`，git会自动`commit`。
8. 存在`git cherry-pick`后，不需要在`dev`分支上手动再修复一次。
9. 同样，也可以在`dev`上修复，然后在`master`上重放，但是必须要`git stash`，才能切换到`master`分支，不然文件会丢失

主要流程：
- `git stash`储藏工作分区
- `git switch`切换分支
- `git branch <name>`创建新分支
- `git merge --no-ff -m "merged bug fix 101" issue-101`修复好bug
- `git switch dev`切换回去
- `git stash list`查看储藏内容
- `git stash pop`恢复并且删除内容
- `git cherry-pick <commit id>`打上之前的漏洞补丁
### 注意
1. `git stash apply stash@{0}`恢复储藏内容，但是不删除stash内容
2. `git stash drop`删除stash内容
3. `git stash pop`恢复并删除


## 3.5 强制删除
开发一个新特性功能，最好新建一个分支。
- 如果要舍弃一个已经提交但是没有被合并过的分支，强行删除`git branch -D <name>`

## 3.6 多人协作
从远程clone仓库时，自动把本地master和远程master对应。
- `git remote -v`查看远程仓库信息

### 3.6.1 推送分支
`git push origin master`推送到远程分支上
`git push origin dev`推送其他分支
#### 区别推送
- master:主分支，时刻与远程同步
- dev:开发分支，需要同步
- bug分支:只用于本地使用
- feature:根据是否共同开发推送

### 3.6.2抓取分支
- `git clone`默认只会克隆`master`分支。
如果要在`dev`上开发，必须创建远程的`dev`分支:
- `git checkout -b dev origin/dev`
- 完成工作后推送`git push origin dev`

#### 常见问题
同事同时推送了`origin/dev`：
- 出现冲突用`git pull`，在本地合并，解决冲突后，再推送
如果没有指定本地`dev`和远程的`origin/dev`的链接：
- 设置`dev`和`origin/dev`链接：`git branch --set-upstream-to=origin/dev dev`
- 再`git pull`
- 解决冲突，再`git push origin/dev`

### 3.6.3 多人协作的工作模式
1. `git push origin <branch-name>`推送自己的修改
2. 推送失败，`git pull`试图合并
3. 解决冲突，本地提交
4. `git push origin <branch-name>`推送

### 问题
问题：A:push 文件1.txt B:push 文件1.txt(显然冲突)，所以先pull，然后手工合并，假如合并过程中，A又push 文件1.txt了。等B合并完，push 文件1.txt时，又冲突掉了。感觉这情况很影响工作效率，请问git是否有对这情况有处理机制的？（SVN是有“锁”这概念的）。

答：无解，找A吵一架，所以说共同开发时，合作很重要！

## 3.7 Rebase
后push的开发者不得不先pull，本地合并，然后才能push成功。多次合并后，分支变得杂乱无章。

- 查看本地和远程的版本对比：
```shell
$ git log --graph --pretty=oneline --abbrev-commit
* 582d922 (HEAD -> master) add author
* 8875536 add comment
* d1be385 (origin/master) init hello
```
- 本地：582d922
- 远程：d1be385
- 本地比远程快分支两个

这时，如果已经有人推送了分支，先pull一下，再查看状态。加上刚才合并的提交，本地比远程分支超前3个提交。
- `git log`查看
```shell
$ git log --graph --pretty=oneline --abbrev-commit
*   e0ea545 (HEAD -> master) Merge branch 'master' of github.com:michaelliao/learngit
|\  
| * f005ed4 (origin/master) set exit=1
* | 582d922 add author
* | 8875536 add comment
|/  
* d1be385 init hello
...
```
rebase
![rebase1.png][21]

![rebase2.png][22]
```shell
$ git log --graph --pretty=oneline --abbrev-commit
* 7e61ed4 (HEAD -> master) add author
* 3611cfe add comment
* f005ed4 (origin/master) set exit=1
* d1be385 init hello
```
`git reabse`或者`git pull --rebase`

- 把分叉的提交历史“整理”成一条直线，看上去更直观。
- 缺点是本地的分叉提交已经被修改过了。

### 总结
- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

## 4. 标签管理
标签就是版本库的快照，指向某个`commit id`的指针。
- 分支可以移动，标签不能移动
- tag和某个`commit id`绑定

### 4.1 创建标签
1. 切换到需要打标签的分支上
2. `git tag <tagname> [commit id]`创建一个标签，默认标签是最新提交的commit上
3. 可以指定历史提交的`commit id`：`git log --pretty=oneline --abbrev-commit`
4. `git tag -a <tagname> -m "describe" [commit id]`指定标签信息
5. `git tag`查看所有标签
6. `git show <tagname>`查看标签信息

#### 注意
- 标签总是和某个`commit`挂钩
- 如果这个`commit`既出现在`master`分支，也出现在`dev`分支，那么在这两个分支上都可以看到这个标签

### 4.2 操作标签
默认标签都只存储在本地，不会推送到远程
- `git push origin <tagname>`推送一个本地标签去远程库
- `git push origin --tags`推送全部未推送的本地标签到远程库
- `git tag -d <tagname>`删除一个本地标签
- `git push origin :refs/tags/<tagname>`可以删除一个远程标签，但先从本地删除

# 5. 远程仓库的使用

## 5.1 自定义Git
### 配置设置
`git config --global color.ui true` 输出显示颜色
### 忽略特殊文件
- 如果不打算提交一些特殊文件，在git工作区的根目录下创建一个特殊的文件：`.gitignore`
- 在此文件里，加入要忽略的文件名，git就会自动忽略这些文件
#### 忽略文件原则
1. 忽略操作系统自动生成的文件，比如缩略图等
2. 忽略编译生成的周昂见文件、可执行文件等。如果一个文件是通过另一个文件自动生成的，那么自动生成的文件就没必要放进版本库，比如java编译产生的`.class`文件
3. 忽略带有敏感信息的配置文件，比如存放口令的配置文件
```shell
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini

# Python:
*.py[cod]
*.so
*.egg
*.egg-info
dist
build

# My configurations:
db.ini
deploy_key_rsa
```
4. 提交`.gitignore`到git
5. `git status`提醒`working directory clean`

##### 注意
- 添加忽略里声明的文件`git add -f <filename>`
- 检查`.gitignore`规则错误的地方：`git check-ignore -v <filename>`
- 在`.gitignore`里添加例外规则: `!`+文件名
```shell
# 排除所有.开头的隐藏文件:
.*
# 排除所有.class文件:
*.class

# 不排除.gitignore和App.class:
!.gitignore
!App.class
```

### 配置别名
- `git status`缩减成`git st`: `git config --global alias.st status`
- `co`表示`checkout`：`git config --global alias.co checkout`
`--global`参数是全局参数，全局可用
- `git reset HEAD file`的缩减名`git unstage <filename>`：`git config --global alias.unstage 'reset HEAD'`
- `git last`显示最后一次提交信息：`git config --global alias.last 'log -1'`
**特殊设置**
`git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`

## 5.2 配置文件
- `--global`的配置文件位置：`.git/config`
- 别名：`alias`

## 5.3 配置gitlab server

### 步骤
1. 安装`git`：`sudo apt-get install git`
2. 创建新用户：`sudo adduser git`
3. 创建证书登录：
	1. 收集所需要登录的用户的公钥，即`id_rsa.pub`文件
	2. 公钥导入`/home/git/.ssh/authorized_keys`文件里，一行一个
4. 初始化`/srv/sample.git`的Git仓库：`sudo git init --bare sample.git`
	1. 服务器上的Git仓库都以`.git`结尾
	2. owner改为`git`
	3. `sudo chown -R git:git sample.git`
5. 禁用shell登录：
	1. 找到`/etc/passwd`里的`git:x:1001:1001:,,,:/home/git:/bin/bash`
	2. 修改为`git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell`
	3. 每次登录`git-shell`就会自动退出
6. 克隆：`git clone git@server:/srv/sample.git`

### 管理公钥
1. 人少：每个人的公钥收集起来放到服务器`/home/git/.ssh/authorized_keys`
2. 人多：[Gitosis](https://github.com/res0nat0r/gitosis "Gitosis")

### 管理权限
- 类似SVN进行权限管理，工具：[Gitolite](https://github.com/sitaramc/gitolite "Gitolite")

### 迅速安装

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
#### 服务操作
##### 初始化
`gitlab-ctl reconfigure`
##### 启动
`gitlab-ctl start`
##### 停止
`gitlab-ctl stop`
##### 关闭防火墙
`service firewall stop`

# 6. Git Cheat Sheet
![git-cheatsheet1.png][23]

![git-cheatsheet2.png][24]


[01]:./img/gitcharacter.png "gitcharacter"
[02]:./img/storeSorts.png "storeSorts"
[03]:./img/repo.png "repo"
[04]:./img/gitlog.png "gitlog"
[05]:./img/gitcommitid.png "gitcommitid"
[06]:./img/gitreflog.png "gitreflog"
[07]:./img/gitRepo.png "gitRepo"
[08]:./img/gitdiffhead.png "gitdiffhead"
[09]:./img/gitrm.png "gitrm"
[10]:./img/sshkey.png "sshkey"
[11]:./img/sshkeygit.png "sshkeygit"
[12]:./img/pre-branch.png "pre-branch"
[13]:./img/mid-branch.png "mid-branch"
[14]:./img/post-branch.png "post-branch"
[15]:./img/merge-branch.png "merge-branch"
[16]:./img/final-branch.png "final-branch"
[17]:./img/mergeConflict.png "mergeConflict"
[18]:./img/merged.png "merged"
[19]:./img/fastforward.png "fastforward.png"
[20]:./img/team.png "team"
[21]:./img/rebase1.png "rebase1.png"
[22]:./img/rebase2.png "rebase2.png"
[23]:./img/git-cheatsheet1.png "git-cheatsheet1.png"
[24]:./img/git-cheatsheet2.png "git-cheatsheet2.png"