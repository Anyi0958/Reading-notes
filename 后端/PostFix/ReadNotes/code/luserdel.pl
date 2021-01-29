#!/usr/bin/perl -w
#
# luserdel - deletes message containing invalid user from
# Postfix queue.
#
# Usage: luserdel
#
 
use strict;
 
# Change these paths if necessary.
my $LISTQ = "/usr/sbin/postqueue -p";
my $POSTSUPER = "/usr/sbin/postsuper";
 
my $qid = "";
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
        if ( $entry =~ /Invalid user specified/m ) {
                ($qid) = split(/\s+/, $entry, 2);
                $qid =~ s/[\*\!]//;
                next unless ($qid);
 
                #
                # Execute postsuper -d with the queue id.
                # postsuper provides feedback when it deletes
                # messages. Let its output go through.
                #
                if ( system($POSTSUPER, "-d", $qid) != 0 ) {
                        # If postsuper has a problem, bail.
                        die "Error executing $POSTSUPER: error " .
                           "code " .  ($?/256) . "\n";
                }
        }
}
close(QUEUE);
 
if (! $qid ) {
        die "No invalid user messages found in queue.\n";
}
 
exit 0;