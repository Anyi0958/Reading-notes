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