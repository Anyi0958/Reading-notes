Git Ŀ¼
[TOC]
***
# ָ���ܽ�

## ��ʼ��

`git init` ���� `.git/`

## �鿴ǩ�� 

`cat ./.git/config`

## ����ǩ�� 

`git config user.name name`, `git config user.email email`

## �鿴ǩ���ļ� 

`~/.gitconfig`

## ��������

`git config --global user.name name`

`git config --global user.email email`

## �鿴���������ݻ���״̬

`git status`

## ���

`git add filename`

## �ύ

`git commit -m "message" filename`

## �鿴��ʷ��¼

`git log`

## �鿴��¼��ϵ

`git log --oneline`

`git log --pretty=oneline`

## �԰汾���и���

`git reflog`

## ��������ֵ����

### �ֲ�����ֵ

`git reset --hard` 

### ����������������ؿ��ƶ�/����+�ݴ���/����+�ݴ���+��������

`git reset --soft/mixed/hard`

### �������ò�����^--step 1�� n~step n��

`git reset --hard HEAD^`

`git reset --hard HEAD~n`

## �Ƚ��ļ�����

### ������vs�ݴ�����

`git diff filename`

### �����ؿ�vs��������

`git diff [���ؿ���ʷ�汾] a/c.txt b/c.txt`

### (�Ƚ϶��)

`git diff a b c d`

## ������֧

`git branch [name]`

## �鿴��֧

`git branch -v`

## �л���֧

`git checkout [branchname]`

## �ϲ���֧

`git checkout [merged branchname]`

`git merge [branchname]`

## ���湤������-stash

### Stash�÷�

- �����������ʱ����ͻظ��޸ģ��ɿ��֧,��δadd֮ǰ����ִ��stash
- git pull �������ʱ�򣬻����л���֧��ʱ�򣬷�ֹ��ͻ�Ͳ��㣬���õ�git stash���������������ݴ�����

#### �����ڱ��湤������

`git stash save [message]`

#### �鿴list

- ִ�д洢ʱ����ӱ�ע��������ң�ֻ��git stash ҲҪ���Եģ�������ʱ������ʶ��

`git stash list`

#### �ָ�����������

##### pop

`git stash pop stash@{num}`

- �ָ���num�ǿ�ѡ�ͨ��git stash list�ɲ鿴����ֵ��ֻ�ָܻ�һ��

##### apply

`git stash apply stash@{num}`

- �ָ���num�ǿ�ѡ�ͨ��git stash list�ɲ鿴����ֵ���ɻظ����

#### ɾ������������

`git stash drop stash@{num}`

- ɾ��ĳ�����棬num�ǿ�ѡ�ͨ��git stash list�ɲ鿴����ֵ

#### ������б���

`git stash clear`

- ɾ�����б���

## ��ͻ���

### 1. ���汾�ظĶ��������·��������ֶ�merge

#### �����������޸�

`git stash` 

#### ջ��Ϣ��ӡ

`git stash list -git`

`stash@{0}` �ղű�����

#### �ݴ��pull

`git pull` 

#### ��ԭ�ݴ�����

`git stash pop stash@{0}` 

### �򿪳�ͻ�ļ����޸ĳ�ͻ���ݲ�����

#### ɾ��stash

`git stash drop stash@{0}` 

#### �������stash

`git stash clear`

#### �ύ�޸�

`git add filename`

`git commit -m "message" [���ܴ������ļ���]`

### 2.���ظ��Ƿ�����---���˲�����

`git reset --hard`

`git push`

#### ֱ�Ӳ��������ύ�޸�Ҳ��

`git add filename`

`git commit -m "message" [���ܴ������ļ���]`

## �鿴Զ�ֿ̲��ַ

`git remote -v`

### ����Զ�ֿ̲��ַ

`git remote add altername url`

### ����

`git push altername branchname`

### ��¡

`git clone url`

### ��ȡ

`git fetch altername branchname`

### �ں�

`git merge altername branchname`

### ��ȡ+�ں�

`pull = fetch + merge`

`git pull altername branchname`

## ������Կ

`ssh-keygen -t rsa -C fwx@gmail.com`

## ����gitlab server

### ��װ

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

### �������

#### ��ʼ��

`gitlab-ctl reconfigure`
#### ����
`gitlab-ctl start`
#### ֹͣ
`gitlab-ctl stop`
#### �رշ���ǽ
`service firewall stop`