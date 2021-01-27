[TOC]

#Linux CentOS7 搭建邮件服务器及其调用

##  设置域名、主机名、开启25端口

### 1. 设置域名
- 申请域名
![Domain][01]

- 点击解析，并进行添加
	1. **<span style="color:red;">MX记录与申请的域名必须相同</span>** mail.domain.com
	2. 其他红色值为服务器公网IP
![DNSrecord][02]

### 2.Linux 服务器修改主机名和设置本地hosts文件地址
```shell
sudo su - root

[root@mail ~]# hostnamectl set-hostname mail.domain.cn
[root@mail ~]# cat /etc/hostname 
mail.domain.cn
 
[root@mail ~]# vim  /etc/hosts       //添加下面一行
127.0.0.1 mail.domain.cn
```
### 3.打开25端口

- 确保服务器上的110、143、25的端口是对外开放的

#### 如果不能打开25端口
- 采用多端口方式来防止25端口的不可用
```shell
有的时候SMTP的默认25端口不能用会导致无法使用邮箱功能，解决办法就是添加多端口。
 
1、修改postfix的配置文件
 
vim /etc/postfix/master.cf
 
在已有第一行：
 
smtp      inet  n       -       n       -       －     smtpd
 
之后添加：
 
smtp2      inet  n       -       n       -       －     smtpd
 
2、修改/etc/services文件，增加smtp2监听端口，本文以2525端口为例
vim /etc/services
 
找到：
 
smtp            25/tcp          mail
 
其后添加：
 
smtp2           2525/tcp        mail2
 
smtp2           2525/udp        mail2
 
3、重启postfix
 
service postfix restart
```

### 4.配置postfix

#### 安装
```shell
[root@mail ~]# yum -y install postfix.x86_64 dovecot.x86_64  cyrus-sasl
 
[root@mail ~]# postconf –a        //验证是否支持cyrus dovecot功能
 
cyrus
dovecot
 
（postfix主要是为发件服务25，devocot为收件服务110、145， cyrus-sasl登陆验证服务）
```

#### 修改main.cf
```shell
[root@mail ~]# vim /etc/postfix/main.cf
#修改以下配置
myhostname = mail.domain.cn   //邮件服务器的主机名
mydomain = domain.cn          //邮件域
myorigin = $mydomain        //往外发邮件的邮件域
inet_interfaces = all       //监听的网卡 
inet_protocols = all       
mydestination = $myhostname, $mydomain     //服务的对象
home_mailbox = Maildir/      //邮件存放的目录
 
#新添加以下配置
#--------自定义（下面可以复制粘贴到文件最后面，用于设置服务器验为主等）
 
# 规定邮件最大尺寸为10M 
message_size_limit = 10485760 
# 规定收件箱最大容量为1G 
mailbox_size_limit = 1073741824 
# SMTP认证 
smtpd_sasl_auth_enable = yes
smtpd_sasl_security_options = noanonymous
mynetworks = 127.0.0.0/8, 公网IP/24
smtpd_recipient_restrictions = permit_mynetworks,permit_sasl_authenticated,reject_unauth_destination,check_policy_service unix:private/policy-spf
 
[root@mail ~]# postfix check   //修改保存后检查配置文件是否有错
[root@mail ~]# systemctl restart postfix.service  
[root@mail ~]# systemctl enable postfix.service
```

##### 配置说明

- smtpd_sasl_auth_enable = yes //开启认证
- smtpd_sasl_security_options = noanonymous //不允许匿名发信
- mynetworks = 127.0.0.0/8 //允许的网段，如果增加本机所在网段就会出现允许不验证也能向外域发信
- smtpd_recipient_restrictions = permit_mynetworks,permit_sasl_authenticated,reject_unauth_destination, check_policy_service unix:private/policy-spf
//允许本地域以及认证成功的发信，拒绝认证失败的发信

##### QQ邮箱返回500
- 缺少SPF记录

###### 1.安装SPF模块(Python)

```shell
wget https://launchpad.net/pypolicyd-spf/1.1/1.1/+download/pypolicyd-spf-1.1.tar.gz
tar -zxvf pypolicyd-spf-1.1.tar.gz
cd pypolicyd-spf-1.1
python setup.py build
python setup.py install
```
###### 2.配置Postfix支持SPF检查
```shell
# vi /etc/postfix/master.cf
添加以下内容：
## spf check
policy-spf unix -       n       n       -       -       spawn
    user=nobody argv=/usr/bin/python /usr/bin/policyd-spf

# vi /etc/postfix/main.cf
添加以下内容：
smtpd_recipient_restrictions =
        ......(其他模块),
        check_policy_service unix:private/policy-spf
        
重新载入postfix服务
# service postfix reload
```

#### 修改dovecot
```shell
[root@mail ~]# vim /etc/dovecot/dovecot.conf
#修改以下配置
protocols = imap pop3 lmtp
listen = *, ::
!include conf.d/10-auth.conf
 
#在最后面新添加以下配置
#-----------自定义------------
ssl = no
disable_plaintext_auth = no
mail_location = maildir:~/Maildir
 
[root@mail ~]# systemctl restart dovecot.service
[root@mail ~]# systemctl enable dovecot.service

```
#### 修改 cyrus-sasl
```shell
[root@mail ~]# vim /etc/sasl2/smtpd.conf  //这个是空文件，直接添加下面配置（配置认证方式）
pwcheck_method: saslauthd
mech_list: plain login
log_level:3
 
[root@mail ~]# vim /etc/sysconfig/saslauthd  //修改下面配置项（本地用户认证）
MECH=shadow
 
[root@mail ~]# systemctl restart saslauthd.service
[root@mail ~]# systemctl enable saslauthd.service
```

### 5.创建邮箱用户
```shell
[root@mail ~]# yum -y install telnet-server.x86_64 telnet.x86_64
[root@mail ~]# useradd tmp1 -s /sbin/nologin
[root@mail ~]# useradd tmp2 -s /sbin/nologin
[root@mail ~]# echo '123' | passwd --stdin lcf
[root@mail ~]# echo '123' | passwd --stdin zjc
```
#### 1.telnet 邮件发送
```shell
[root@mail ~]# telnet mail.domain.cn 25
//连接成功，开始写信
helo mail.domain.com              //声明本机的主机
mail from:tmp1@domain.com     //声明发件人地址
rcpt to:tmpxx@163.com       //声明收件人地址
data                                  //写正文
HI. This is Z.jc,Nice Good day!
.                                      //记住这里是以点作为正文结束标记
quit // 退出
```
![sendmail][03]

- 此处基本会得到邮件

#### 2.收取邮件验证
```shell
[root@localhost ~]# telnet mail.aa.com 110
user tmp1 //收件人登录
pass 123 //邮箱密码
list //列表查看邮件
retr 1 //读取编号为1的邮件
quit //退出邮箱
```

#### 3.安装Mailx测试
```shell
su - tmp1
echo 'test' | mail -s 'Hello' test@126.com
```


[01]: ./domain.png "domain"
[02]: ./DNSrecord.png "DNSrecord"
[03]: ./sendmail.png "sendmail"