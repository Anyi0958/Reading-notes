PostFix权威指南 目录
[TOC]
***

# 适用人群
- Postfix为Unix系统设计的网络应用系统
- 如果不习惯Unix，推荐书 《Unix System Administration Handbook》(Prentice-Hall)

# 前言
- 1-3章，Postfix与Email基础
- 4-7章，Postfix Server基本功能
- 8-15章，各特殊应用

# 1. 简介

## Internet E-mail传递流程
![maildelivery][01]

# 2.基础概念
## 在线说明书
- `man mailq`

## 模拟SMTP对话

```shell
telnet mail.example.com 25
HELO mail.example.com
MAIL from: info@example.com
rcpt to: destmail
data
xxx
.
quit
```
### 常见响应状态码
- 2xx：完成
- 3xx：信息不足
- 4xx：暂时失败
- 5xx：永久性失败

# 4.基本的配置与管理

## 默认安装目录
`/etc/postfix/` 
	- 配置文件与查询表
`/usr/libexec/postfix/`
	- postfix的各个服务器程序
`/var/spool/postfix/`
	- 队列文件
`/usr/sbin/`
	- Postfix工具程序
`/var/log/maillog`
	- 邮件日志

## 启动postfix
### 两件准备工作
- 修改`houstname`
`postconf -e myhostname-mail.example.com`
- 确定db别名
`newaliases`
- 启动： `postfix start`


## 配置文件
`/etc/postfix`
	- `master.cf`
	- `main.cf`
- 这两个拥有者必须是`root`

### 重新加载
`postfix reload`
- 只要修改，就需要重新加载
`(restart) postfix`
- 重新启动

### 配置变量
```shell
mydomain = example.com
myorigin = $mydomain
```
- 如果像放入到其他文件里：
```shell
mydest = /etc/postfix/destination
```

#### 对外统一邮箱
- `main.cf`中的`canonical_maps`参数指向外界的文件
```shell
canonical_maps = hash:/etc/postfix/canonical_maps
# canonical查询表
# 格式
# key	value
fwx@example.com	kyle.dent@example.com
```
- 对外输出value
- 每个key必须是独一无二的

##### 创建查询数据库

`postmap /etc/postfix/canonical`
- 每次修改都必须用`postmap`来重建数据库文件
- `postmap -q`指定要查询的`LHS`
`postmap -q fwx@example.com /etc/postfix/canonical`

##### 数据库格式
- btree
- dbm
- hash
- 默认数据库类型：`postconf default_database_type`

#### 别名文件
- 多组邮件列表有各自的别名文件
- `alias_maps = hash:/etc/aliases, nis:mail.aliases`

#### 重要考虑事项
- MTA标识
	- myhostname
	- mydomain
	- myorigin
	- mydestination

#### 转发控制
- 11章

#### 限制转发访问
- mynetworks_style
- mynetworks
以上两个决定客户端具备的寄出邮件资格
- 默认仅容许IP子网相同的转发
- 服务器自己使用转发服务`mynetworks_style`设置为host或者是class
- `mynetworks`指出主机享受转发服务，常用`network/mask`- `192.168.0.0/28`

#### SMTP身份验证

<span style="color: red;">**服务对象没有固定ip时，使用此机制**</span>
- SASL验证， 12章
- 验证后，批准客户端转发服务一段时间

#### 管理
- 检查postfix配置是否存在问题等`postfix check`

#### 日志记录
- `/etc/syslog.conf`决定日志写在哪
- 查看曾经出现的问题`egrep '(reject|warning|error|fatal|panic):' /var/log/maillog`
- 查询非法攻击mail服务器的ip：
```shell
#!/bin/bash
#
#       获取非法攻击mail服务器的ip
#

LOGFILE="/var/log/maillog"

# 统计maillog中authentication failure的IP个数和IP
grep "authentication failure" $LOGFILE | awk '{print $7}' | grep -E -o "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" | sort | uniq -c > af_iplist.txt

# 取出AF出现大于50次的IP
awk '$1 > 50 {print $2}' af_iplist.txt > block_ip_list.txt

# 大于50次AF的IP添加到iptables中
cat block_ip_list.txt | while read line
do
        /sbin/iptables -nL | grep $line
        if [ $? != 0 ]
        then
                iptables -I INPUT -s $line -j DROP
        fi
done


```
#### 启动、关闭和重新加载
- 启动：`postfix start`
- 重新加载：`postfix reload`
- 关闭：`postfix stop`

##### 开机时自动启动postfix
- `sendmail-bd -q15m`
- `queue_run_delay`in `main.cf`，扫描队列的间隔时间

###### Sys V风格的启动脚本
```shell
#!/sbin/sh
#
#   使用自己的logger和postfix命令
# for linux
#   Logger = "/sbin/syslogd"
#   POSTFIX = "/usr/sbin/postfix"
#
LOGGER="/usr/bin/logger"
POSTFIX="/usr/sbin/postfix"
rc=0

if [ ! -f $POSTFIX ]; then
    $LOGGER -t $0 -s -p mail.err "Unable to locate Postfix"
    exit 1
fi

if [ ! -f /etc/postfix/main.cf ]; then
    $LOGGER -t $0 -s -p mail.err "Unable to locate Postfix configuration"
    exit 1
fi

case "$1" in
    start)
        echo -n "Starting Postfix"
        $POSTFIX start
        rc=$?
        echo "."
        ;;
    
    stop)
        echo -n "Stopping Postfix"
        $POSTFIX stop
        rc=$?
        echo "."
        ;;

    restart)
        echo -n "Restarting Postfix"
        $POSTFIX reload
        rc=$?
        echo "."
        ;;
    
    *)
        echo "Usage: $0 {start|stop|restart}"
        rc=1
esac
exit $rc

```

#### master.cf
所有服务器程序的运行参数，都在此配置

#### 更改daemon端口
`/etc/services`定义smtp端口

- 如果要修改端口，直接在smtp后修改端口
- 可以设置smtp2，但要注释smtp

#### 收信限制
- `main.cf`
- smtpd daemon对邮件加强限制
- 限制：邮件大小，同一封邮件的收件人数，内容长度上限等等
	- `smtpd_recipient_limit`收件人数
	- `message_size_limit`容量上限
- 如果客户端频繁出错，通常是被攻击，设置延迟时间`smtpd_error_sleep_time`
- `smtpd_soft_error_limit`，累积到错的地方，错一次延迟增加的时间
- `smtpd_hard_error_limit`，错误次数超过次数，自动断开
```shell
smtpd_error_sleep_time = 1s
smtpd_soft_error_limit = 10
smtpd_hard_error_limit = 20
```
#### 地址自动补齐
- 避免自动附加邮件地址
- `append_at_myorigin = no`
- `append_dot_mydomain = no`

#### 伪装网关主机名称
- `masquerade_domains = example.com`
- 排除特定的账户： `masquerade_exceptions = admin, root`

#### 改变投递地址
- 不愿意代收邮件的时候，查询表定义的新旧地址对应关系
- `relocated_maps = hash:/etc/postfix/relocated`
```shell
kdent@ora.com xx@moxii.com
# 全域移动
@example.com	xx@moxixii.com
```
- 当收到kdent的信时，都会拒收，并提醒送到xx

#### 不明用户
- 默认拒收写给不明用户的信
- 收信：`local_recipient_maps = `，设置为空，接收不明用户
- 集中到特定邮箱：`luser_relay = catchall`， catchall时一个实际的用户


# 5.队列管理
- 队列管理单元的服务程序：qmgr
- 默认队列目录：`/var/spool/postfix`
	- incoming
	- active
	- deferred
	- corrupt
	- hold

## qmgr运行
- 队列占用空间： `queue_minfree`


## 等待邮件
- 退信： `bounce_size_limit`

## 队列调度
- 失败延迟时间上限：`maximal_queue_lifetime`
- 队列扫描间隔：`queue_run_delay`
- 重新投递：`minimal_backoff_time, maximal_backoff_time`

## 错误通知函
- `main.cf`
- 错误通知类型：`notify_classes`

## 显示队列邮件列表
- 列出队列里的所有邮件：`postqueue -p`
- 删除队列邮件： `postsuper -d ALL`

## 重新排队

- `postsuper -r ALL`

## 显示邮件内容
- `postcat -q queueId`

## 清空邮件
- 清空队列里的邮件：`postqueue -f`

## E-mail 与 DNS
DNS是一个世界级的分布式数据库，主要是将“主机名称”和“IP地址”对应
- 每个网域至少要有两部权威域名服务器
- 网域数据关于邮件系统的四种资源记录：
    - A：主机名称和ip地址的对应关系
    - CNAME：没有对应ip地址，是一个主机名称的别名
    - MX：邮件的路由信息
    - PTR：ip地址和主机名称的关系，作用与A相反，常用来验证客户端是否可信
- 只讨论MX资源记录：
`example.com	IN	MX	10	mail1.example.com`
结构说明：
- 网域名称
- IN:资源都在Internet上
- MX:邮件交换器的资源记录
- 10：优先值（0~65536）
- `mail1.example.com`：主机名称

### 决定邮件路由
存在多个时，MX会被当作主要的邮件服务器进行投递
#### 推荐DNS资源
- 软件：BIND
- 书籍：《DNS & BIND》

### Postfix and DNS
- Postfix从DNS里查出所有MX资源记录，然后根据优先值来排序
#### 配置文件选项
- `smtp_skip_4xx_greeting = no`: 寄信出现4xx状态码，放在等待队列，下次投递
- `smtp_skip_5xx_greeting = no`: 直接将邮件退回给原寄件人

### 常见问题
- DNS设定不当的问题，只能在日志文件里看到结果
- 常见DNS有关的配置文件
	- /etc/resolv.conf
	- /etc/hosts
	- /etc/nsswitch

# 7.本地投递与POP/IMAP

- 取走邮件的协议是IMAP/POP
- Postfix将收下的邮件放入邮箱
- POP/IMAP是Postfix之外的软件提供
	- POP/IMAP服务器软件：Popper, WU IMAP Kit等
	- Postfix 与 Cyrus IMAP server

## Postfix 投递代理程序
- 三种网域邮件：local, relay, virtual

## 邮箱内容
- POP/IMAP读取邮件时：
- `postconf -l`查看系统提供了哪些锁定机制
- `man flock`查看锁定机制的详细信息

### 转发forward文件
- 用来依据其设定内容来转寄邮件
- 文件而已让用户设置自己的别名，格式与RHS-value格式一样

## Postfix and Cyrus IMAP
- 验证用户的身份
1. 安装Cyrus SASL函数库
2. 建构Cyrus IMAP server

不能将所有邮件都交付给Cyrus IMAP server:
- 选择`mailbox_transport`指向lmtp MDA，并确定master.cf里的lmtp服务能否传递
- Cyrus配置文件`/etc/cyrus.conf`

# 8.虚拟网域
- 同一台主机搭建多个网域。
- 例如：`xxnet.com`和`orr.com`
- 共享网域，独立网域；
- 系统用户，虚拟用户

## 虚拟网域的四种处理方式
- 共享网域搭配系统账户
- 独立网域搭配系统账户
- 独立网域搭配虚拟账户
- 虚拟网域搭配飞Postfix控制管理的特殊格式邮箱

### shared domain and system user
- 每位用户都可以收到每个网域的邮件
- 一个邮箱有多个地址
1. 设定虚拟网域的DNS，MX指向此服务器
2. 修改`mydestination`
```shell
# 正式网域
mydomain = xxx.com
# 虚拟网域
mydestination = $myhostname, $mydomain, ora.com, xxxy.com
```
- 重新启动`postfix reload`

### 自动回信脚本
```Perl
#!/usr/bin/perl -w
#
#   inforeply.pl    - Automatic E-mail reply.
#
# 所有信息都记录在邮件日志文件(/var/log/maillog)
# 运行本程序后，可以从日志文件看到结果
# 
# 使用本程序之前，你可能需要调整某些变量的值，
# 以下是各项重要的变量的说明：
# 
# $UID是本程序的运行标识
# 正确值应该是master.cf中调用本程序的那一行，
#   其user=属性所设的UID
#   如果想在命令行测试本程序，则$UID就是你的UID
#
# $ENV_FROM是回信信封上的FROM地址
# 默认是空白，<>表示使用空地址
# 可以将它设定为一个专用来接退信的地址
#   注意：不要使用触发本程序的那个地址，
#   否则会造成邮件循环
#
# $INFOFILE是含有回信内容的文本文件
#   此文件应该包含完整的回信
#       包括Subject:与From:等必要的标题
#   唯一例外的是To:字段，本程序使用来信这的地址来自动设定此栏
#   注意：标题和正文之间至少药隔一空白行
#
#   $MAILBIN是sendmail程序文件的完整路径
#   如果你的sendmail不是安装在/usr/sbin/sendmail
#   如实修改
#
#   @MAILOPTS是一个包含sendmail命令行选项的数组
#
#   本程序调用了syslog,所以Perl环境必须先安装Sys::Syslog模块
#

# Sys::Syslog模块的setlogsock
require 5.004;
use strict;
use Sys::Syslog qw(:DEFAULT setlogsock)

#
# 配置变量。
#
my $UID = 500;
my $ENV_FROM = "";
my $INFOFILE = "/etc/postfix/common/inforeply.txt";
my $MAILBIN = "/usr/sbin/sendmail";
my @MAILOPTS = ("-oi", "-tr", "$ENV_FROM");
my $SELF = "inforeply.pl";

#
#   main
#
my $EX_TEMPFAIL = 75;
my $EX_UNAVAILABLE = 69;
my $EX_OK = 0;
my $sender;
my $euid = $>;

$SIG{PIPE} = \&PipeHandler;
$ENV{PATH} = "/bin:/usr/bin:/sbin:/usr/sbin";

setlogsock('unix');
openlog($SELF, 'ndelay,pid', 'user');

#
# 检查环境
#
if ( $euid != $UID ) {
    Syslog('mail|err', "error:invalid uid: $> (expecting: $UID)");
    exit($EX_TEMPFAIL);
}

if ( @ARGV != 1 ) {
    Syslog('mail|err', "error: invalid invocation (expecting 1 argument)");
    exit($EX_TEMPFAIL);
} else {
    $sender = $ARGV[0];
    if ( $sender =~ /([\w\-.%]+\@[\w.-]+)/ ) {
        $sender = $1;
    } else {
        Syslog('mail|err', "error: Illegal sender address");
        exit($EX_UNAVAILABLE);
    }
}

if ( ! -x $MAILBIN ) {
    Syslog('mail|err', "error: $MAILBIN not found or not executable");
    exit($EX_TEMPFAIL);
}

if( ! -f $INFOFILE ) {
    Syslog('mail|err', "error: $INFOFILE not found");
    exit($EX_TEMPFAIL);
}

#
#   检查异常寄件人
#
if ( $sender eq "" 
    || $sender =~ /^owner-|-(request|pwner)\@|^(mailer-daemon|postmaster)\@/i )
{
    exit($EX_OK);
}

#
#   检查来信标头里的Prededence字段
#
while ( <STDIN> ) {
    last if (/~$/);

exit($EX_OK)    if(/^Precedence:\s+(bulk|list|junk)/i);
}

#
#   开启邮件文件
#
if ( !open(INFO, "<$INFOFILE") ) {
    Syslog('mail|err', "error: can't open $INFOFILE: %m");
    exit($EX_TEMPFAIL);
}

#
#   将本程序的输出接到寄信程序的输入
#
my $pid = open(MAIL, "|-") || exec("$MAILBIN", @MAILOPTS);

#
#   送出回信
#
print MAIL "To: $sender\n";
print MAIL while (<INFO>);

if ( ! close(MAIL) ) {
    Syslog('mail|err', "error: failure invoking $MAILBIN: %m");
    exit($EX_UNAVAILABLE);
}

close(INFO);
Syslog('mail|info', "sent reply to $sender");
exit($EX_OK);

sub PipeHandler {
    Syslog('mail|err', "error: broken pipe to mailer");
}
```

### 自动回信程序的设计
#### 需要考虑
- 程序的数据来源是网络，是不可信赖的数据源
- 永远不要用shell处理不可信的外来数据
- 回信前，检查寄件人的地址是否是`owner-list`或者`list-request`
#### 假设
假设邮件服务器规范网域是：`example.com`，虚拟网域是：`ora.com`，客服请求信息提供的服务邮箱是`info@ora.com`。`inforeply.pl`自动回复客户寄到`info@ora.com`的邮件，需要以下步骤：
1. 创建可用`inforeply.pl`的虚账户，确定有足够的权限
2. `master.cf`里，为`inforeply.pl`设置新的投递服务，名字改成`inforeply`：
```shell
inforeply	unix	-	n	n	-	-	pipe	flags= user=autoresp argv=/usr/local/bin/inforeply.pl ${sender}
```
- ${sender}代表寄件人地址
- ${recipient}代表收件人地址
3. 没有传输机制的话，`main.cf`的`transport_maps`参数指向一个传输表
`transport_maps = hash:/etc/postfix/transport`
4. 传输表结构：`收件地址 -> 投递服务`
`autoresp@ora.com	inforeply`
5. 使用`postmap`将传输表换成数据库格式`postmap /etc/postfix/transport`
6. 将`virtual_alias_maps`指向虚拟别名查询表：
`virtual_alias_maps = hash:/etc/postfix/virtual_alias`
7. 虚拟别名表定义服务地址与收件地址：`info@ora.com	autoresp@ora.com, service@oreilly.com`
8. 虚拟别名转换成数据库：`postmap /etc/postfix/virtual_alias`
所有送去`info@ora.com`的邮件都会被投递到`autoresp@ora.com`和`service@oreilly.com`
9. 重新读取配置文件：`postfix reload`
处理流程：
外界的信	->	info@ora.com
postfix：
- 先检查virtual_alias
- 展开地址
- 查看transport，利用设定的reply执行投递
- infoply使用pipe传送给外部，回信给原寄件人

# 9.邮件转发
## 入站邮件网关
网关的两个意义：
1. 网络之间的联络
2. 协议的转换

企业网络：
一家企业有多个部门，各部门有自己的子网域，有内部服务器。
网关系统：gw.example.com，负责手下所有的邮件。
人力资源：位于mail.example.com, 员工是user@hr.example.com
业务部门：位于mail2.example.com, 员工是user@sales.example.com

# 11.反垃圾邮件
目前Postfix没有表示垃圾邮件的机制，但可和Spamassassin搭配
## 挡信机制
- 客户端判别规则
- 语法检查参数
- 内容检查
- 自定义过滤规则

### 客户端判别规则
- smtpd_client_restrictions
- smtpd_helo_restrictions
- smtpd_sender_restrictions
- smtpd_recipient_restrictions
- smtpd_data_restrictions

### 设置限制条件
```shell
smtpd_client_restrictions = 
smtpd_helo_restrictions = 
smtpd_sender_restrictions =
smtpd_recipient_restrictions = 
	permit_mynetworks, reject_unauth_destination
```
- 只允许寄给postfix所统辖局域网的用户

### UBE限制条件
任何限制条件都可以用于任何过滤规则
例如：
- check_helo_access适用于smtpd_helo_restrictions和smptd_sender_restrictions或者其他
- postfix不会立刻返回拒收信，如果要立刻拒收，需要在`main.cf`里修改`smtpd_delay_reject = no`

### 反垃圾邮件的main.cf配置文件样本
```shell
#
#   本文件为postfix下的main.cf的配置文件的样本
#   功能：
#       反垃圾文件的配置
#
smtpd_restrictions_classes = 
            spamlover
            spamhater

spamhater = 
            reject_invalid_hostname
            reject_non_fqdn_hostname
            reject_unknown_sender_domain
            reject_rbl_client nospam.example.com

spamlover = permit

smtpd_helo_required = yes
smtpd_client_restrictions = 
            check_client_access hash:/etc/postfix/check_client_access
smtpd_helo_restrictions =
            reject_invalid_hostname
            check_helo_access hash:/etc/postfix/check_helo_access
smtpd_sender_restrictions =
            reject_non_fqdn_sender
            reject_unknown_sender_domain
            check_sender_access hash:/etc/postfix/check_sender_access
smtpd_recipient_restrictions =
            permit_mynetworks
            reject_unauth_destination
            reject_non_fqdn_recipient
            reject_unknown_recipient_domain
smtpd_data_restrictions = 
            reject_unauth_pipelining
header_checks = /etc/postfix/header_checks
body_checks = /etc/postfix/body_checks                             
```

# 12.SASL身份验证
## 验证架构
Cyrus SASL提供配置文件是`smtpd.conf`，位于`/usr/local/lib/sasl2/smtpd.conf`

## SASL专用密码
- smtpd.conf配置文件：`pwcheck_method: auxprop`
- auxprop要求使用外部的SASL密码文件
- `/etc/sasldb2`密码文件
- `saslpasswd2 -c -u \`postconf -h myhostname\` username`
-c:创建用户，-u:指出所属网域，值都取自postfix配置文件

## 启用SASL验证
`smtpd_sasl_auth_enable = yes`

### 避免寄件人冒名

建立对应关系查询表:
`kdent@example.com	kdent`
进入`main.cf`文件中，修改：
`smtpd_sender_login_maps = hash:/etc/postfix/sasl_senders`

### 核准授权用户
`smtpd_recipient_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination`

### 设定验证机制
`smtpd_sasl_security_options = xx`
- noplaintext：不允许明文流经网络，但是不能使用saslauthd
- noactive: 排除主动攻击
- nodictionary:字典攻击
- noanonymous: 排除匿名登录
- mutual auth:双方验证协议

## 设定sasl步骤
1. 确定验证机制和架构
2. 安装SASL
3. 重新安装Postfix
4. 创建`/etc/sasl2/smtpd.conf`，将`pwcheck_method`参数设定为`saslauthd`
	- saslauthd: 使用SASL saslauthd与系统密码
	- auxprop: SASL的专属密码文件
5. 如果验证架构是Unix系统密码，启动`saslauthd daemon`，指出系统验证方式。否则使用saslpasswd2在系统上创建SMTP client的账户和密码
6. 进入`main.cf`，启动SASL验证功能
```shell
smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions = permit_mynetworks,
	permit_sasl_authenticated, reject_unauth destination
```
7. 重新加载postfix

### 测试SASL
```perl
#!/usr/bin/perl
#
#   产生测试用的base64字符串
#   需要用到MIME::Base64模块，如果没有，去CPAN下载一个
#

use strict;
use MIME::Base64;

if ( $#ARGV != 1 ) {
    die "Usage: encode_sasl_plain.pl <username> <password>\n";
}

print encode_base64("$ARGV[0]\0$ARGV[0]\0$ARGV[1]");
exit 0;
```
- 运行程序`perl encode_sasl_plain.pl user pwd`
#### 链接测试
```shell
telnet mail.example.com port

EHLO mail.example.com
AUTH PLAIN base64string
mail from:xx@example.com
rcpt to:xxx@example.com
data
sss
.
quit
```
#### 找不到db文件
确定saslpasswd2所产生的密码文件在/etc文件下

# 13.TLS
传输层安全协议TLS

## TLS证书
- `yum install OpenSSL`
- openssl管理证书
- OpenSSL默认在`/usr/local/ssl/`

### 自己开设认证中心
自己收信
#### 服务端证书
 自己签署证书：
- OpenSSL安装目录下：`misc/CA.pl -newca`
- `./demoCA`开设CA所需的全部文件
- 获取`CA数字签名`

### 产生服务器端证书
1. openssl工具，产生一对公钥和私钥
2. 产生一个证书签署请求,CSR
3. CSR+公钥->CA签署
4. 私钥保密
#### 步骤
- 产生公私钥
`openssl req -new -nodes -keyout mailkey.pem -out mailreq.pem -days 365`
- new: 产生公私+CSR
- nodes:不加密
- keyout: 私钥文件名
- out: CSR文件名
- days: 有效期

##### 第三方CA:
- 提出mailreq.pem来签署

##### 自己做CA:
`openssl ca -out mail_signed_cert.pem -infiles mailreq.pem`
- mail_signed_cert.pem就是CA核发的证书

证书位置：
Postfix目录下
- `cp /usr/local/ssl/mailkey.pem /etc/postfix`
- `cp /usr/local/ssl/mail_signed_cert.pem /etc/postfix`
由于postfix不能使用密封的私钥文件，应该用严格权限
```shell
chown root /etc/postfix/mailkey.pem
chmod 400 /etc/postfix/mailkey.pem
```
### 安装CA证书
Postfix/TLS server 必须能够访问CA的公开证书
- 如果服务端证书是自己签发给自己，将CA.pl脚本产生的cacert.pem文件复制到postfix目录下
`cp /usr/local/ssl/demoCA/cacert.pem /etc/postfix`
- 如果是第三方，获取PEM，然后放在/etc/postfix/cacert.pem

#### 安装方法
1. 所有根证书集中在一个文件，smtpd_tls_CAfile指向此文件
只需要将新证书附加在现有文件末端：
- 原有CA在/etc/postfix/cacert.pem, 新CA在newCA.pem
新纳入认同：
`cp /etc/postfix/cacet.pem /etc/postfix/cacert.pem.old`
`cat newCA.pem >> /etc/postfix/cacert.pem`

2. 每个CA根证书集中在专用目录下的个别文件里，`smtpd_tls_CApath`指向目录
每当需要安装新的CA证书时，只要将新的证书文件放到目录下就行，然后执行一次OpenSSL的c_rehash命令
新证书：newCA.pem	根证书目录：/etc/postfix/certs/
`cp newCA.pem /etc/postfix/certs`
`c_rehash /etc/postfix/certs`

**postfix reload**

### 设定Postfix/TLS
在`main.cf`配置文件中设置
`smtpd_use_tls = yes`: 启动TLS支持
`smtpd_tls_key_file = /etc/postfix/mailkey.pem`: 指向服务器私钥文件
`smtpd_tls_cert_file = /etc/postfix/mail_signed_cert.pem`: 指向经过CA的PEM证书
`smtpd_tls_CAfile = /etc/postfix/cacert.pem`: 指向CA根证书
`smtpd_tls_CApath = /etc/postfix/certs`: 指向CA证书文件目录

- `postfix reload`重启

### 设定过程整理
1. 安装OpenSSL，产生TLS证书
2. 产生CSR，CA签署（自己或第三方）
3. 密钥，CSR，CA放在Postfix下
4. 编辑`main.cf`
5. 重启

### TLS/SMTP client
客户端
1. `openssl req -new -keyout kdentkey.pem -out kdentreq.pem -days 365`
2. `openssl ca -out kdent_signed_cert.pem -infiles kdentreq.pem`
3. 转换格式:
```shell
openssl pkcs12 -in kdent_signed_cert.pem \
	-inkey kdentkey.pem -certfile /etc/postfix/cacert.pem \
	-out kdent.p12 - export -name "kdent@ora.com"
```
- 生成的文件可以交给用户

#### 设定客户端证书验证
1. 计算指纹：`openssl x509 -fingerprint -noout -in kdent_signed_cert.pem | cut -d= -f2`
2. 集中在/etc/postfix/clientcerts文件，并注明辨别名称
`xxxxx:xx		kdent@ora.com`
3. postmap /etc/postfix/clientcerts
4. main.cf配置
```shell
relay_clientcerts = hash:/etc/postfix/clientcerts
smtpd_tls_ask_ccert = yes
smtpd_recipient_restrictions =
	permit_mynetworks
	permit_tls_clientcerts
	reject_unauth_destination
```
5. 重启

#### TLS/SMTP client的服务器设定
寄信到其他服务器。
1. 打算让smtp和smtpd用相同的证书.
`smtp_use_tls = yes`: 启动TLS支持
`smtp_tls_key_file = /etc/postfix/mailkey.pem`: 指向服务器私钥文件
`smtp_tls_cert_file = /etc/postfix/mail_signed_cert.pem`: 指向经过CA的PEM证书
`smtp_tls_CAfile = /etc/postfix/cacert.pem`: 指向CA根证书
`smtp_tls_CApath = /etc/postfix/certs`: 指向CA证书文件目录

- `postfix reload`重启


[01]: ./img/maildelivery.png "maildelivery"