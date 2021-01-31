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
my $INFOFILE = "/home/autoresp/inforeply.txt";
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