#!/usr/bin/perl -w
#
# jmoqdel - deletes Junk directories whose maildir over quota from
# Postfix queue.
#
# Usage: jmoqdel
#
 
use strict;
 
my $HOME_BASE = "/home/vmail";
# Change these paths if necessary.
my $LISTQ = "/usr/sbin/postqueue -p";
my $POSTSUPER = "/usr/sbin/postsuper";
 
my $user = "";
my $domain = "";
my $email = "";
my $euid = $>;
 
if ( $euid != 0 ) {
        die "You must be root to delete queue files.\n";
}
 
 
open(QUEUE, "$LISTQ |") ||
  die "Can't get pipe to $LISTQ: $!\n";
 
my $entry = <QUEUE>;    # skip single header line
$/ = "";                # Rest of queue entries print on
                        # multiple lines.
while ( $entry = <QUEUE> ) {
        if ( $entry =~ /maildir over quota/m ) {
                ($user,$domain,$email) = split(/\n/, $entry, 3);
                ($user,$domain) = ($email =~ m!\s*(.+)@(.+)\s*!);
                `rm $HOME_BASE/$domain/$user/Maildir/.Junk -rf &> /dev/null`;
                next unless ($email);
        }
}
close(QUEUE);
 
if (! $email ) {
        die "No maildir over quota messages found in queue.\n";
}