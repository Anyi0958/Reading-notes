#!/usr/bin/perl -w
#
# pfdel --- 从postfix队列删除含有特定邮件地址的邮件
# (不管收件人还是寄件人的邮件地址)
#
#  usage: pfdel <email_address>
#

use strict;

my $LISTQ = "/usr/bin/postqueue -p";
my $POSTSUPER = "/usr/sbin/postsuper";

my $E-mail_addr = "";
my $qid = "";
my $euid = $>;

if (@ARGV != 1){
    die "Usage: pfdel <E-mail_address>\n";
} else {
    $E-mail_addr = $ARGC[0];
}

if($euid != 0) {
    die "You must be root to delete queue files.\n";
}

open(QUEUE, "$LISTQ |") ||
    die "Can't get pipe to $LISTQ: $!\n";

my $entry = <QUEUE>;    #跳过第一行
$/ = "";                #其余数据分散在多行

while ( $entry = <QUEUE>) {
    if( $entry =~ / $E-mail_addr$/m) {
        ($qid) = split(/\s+/, $entry, 2);
        $qid =~ s/[\*\!]//;
        next unless ($qid);

        #
        #   运行postsuper -d $qid
        #   直接将postsuper 的输出信息传送给用户
        #
        if (system($POSTSUPER, "-d", $qid) != 0){
            # 如果postsuper遇到问题，则直接放弃
            die "Error executing $POSTSUPER: error" . "code " . ($?/256) . "\n";
            
        }
    }
}


close(QUEUE)

if(! $qid) {
    die "No message with the address <$E-mail_addr> " .
        "found in queue. \n"
}

exit 0;