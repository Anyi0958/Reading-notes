����git������¼ Ŀ¼
[TOC]
***

# ǰ��

- ����������¼����`git`��`github`����

# �Ƽ��Ķ�

- ��GitȨ��ָ�ϡ�

***

# 1. �޷���`github`

1. ��[��վIP��ѯ](ip.chinaz.com)
2. ����`www.github.com`

![0-open][01]

3. ��`C:\Windows\System32\drivers\etc`�µ�`hosts`�ļ������ļ�ĩβ����`52.74.223.119 www.github.com`

![1-hosts][02]

4. ��`cmd`����`ipconfig /flushdns`��`ping www.github.com`��ȡ����ͼ����

![2-ping][03]

5. ���Դ�[github](www.github.com)

# 2. `github`�����ٶȹ���

1. �������ھ���Դ

���磬`git clone github.com/xxx`�ĳ�`git clone github.com.cnpmjs.org/xxx`

2. ����`hosts`��`buffer`

`git config --global http.postBuffer 524288000`

3. �޸�`hosts`
   1. �򿪲�ѯ[����ip](https://www.ipaddress.com/)
   2. Ѱ��������Ӧ`ip`
   3. ��`hosts`�ļ�����Ӷ�Ӧ

```shell
151.101.72.249 github.global.ssl.fastly.net  
192.30.253.112 github.com
```

`hosts`�ļ�λ�ã�

- `win`��`C:\Windows\System32\drivers\etc\hosts`
- `linux`��`/etc/hosts`

4. ������Ϊ��תվ����ת�ļ�







***

[01]: ./��������img/0-open.png "0-open"
[02]: ./��������img/1-hosts.png "1-hosts"
[03]: ./��������img/2-ping.png "2-ping"