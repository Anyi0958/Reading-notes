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
canonical_maps = /etc/postfix/canonical_maps
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



[01]: ./img/maildelivery.png "maildelivery"