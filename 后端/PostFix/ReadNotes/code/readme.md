# 快捷办法
- startPostfix: 快速启动Postfix
- LookMailLog: 查看maillog
- searchLog.sh：查看log中出错的地方
- DeleteQueueMail：删除队列里的所有邮件

# 邮箱安全防护
- af_iplist.txt: 获取授权失败的ip列表
- block_ip_list.txt: 获取攻击者ip
- searchAttackerIp.sh: 获取非法攻击mail的ip,并且过滤
- killIp.sh: same

# 邮箱队列管理
- pfdel.pl: 是用来删除队列中指定用户的邮件的
- luserdel.pl: 是用来删除队列中无效用户的邮件的
- moqdel.pl: 是用来删除队列中邮箱配额已满的用户的邮件的
- jmoqdel.pl: 是删除邮箱配额已满的用户的垃圾邮件箱的