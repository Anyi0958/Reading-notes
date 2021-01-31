#
#   SYN洪水是DoS攻击方法
#   功能：防止DDos攻击
#

iptables -N syn-flood                    #(如果您的防火墙默认配置有“ :syn-flood - [0:0] ”则不许要该项，因为重复了)
iptables -A INPUT -p tcp --syn -j syn-flood   
iptables -I syn-flood -p tcp -m limit --limit 2/s --limit-burst 5 -j RETURN   
iptables -A syn-flood -j REJECT   

# 防止DOS太多连接进来,可以允许外网网卡每个IP最多15个初始连接,超过的丢弃
# 需要iptables v1.4.19以上版本：iptables -V 
iptables -A INPUT -p tcp --syn -i eth0 --dport 80 -m connlimit --connlimit-above 20 --connlimit-mask 24 -j DROP   

#用Iptables抵御DDOS (参数与上相同)   
iptables -A INPUT -p tcp --syn -m limit --limit 5/s --limit-burst 10 -j ACCEPT  
iptables -A FORWARD -p tcp --syn -m limit --limit 1/s -j ACCEPT 

iptables -A FORWARD -p icmp -m limit --limit 2/s --limit-burst 10 -j ACCEPT
iptables -A INPUT -p icmp --icmp-type 0 -s ! 172.29.73.0/24 -j DROP