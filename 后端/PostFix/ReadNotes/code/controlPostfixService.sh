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
