SVN����ָ���ܽ� Ŀ¼
[TOC]
***

# ǰ��

- ���Ľ�Ϊ��¼`SVN`����ϼ�

# �Ƽ��Ķ�

- ��SVNȨ��ָ�ϡ�

# 1. �����汾��

`svnadmin create [path]`

# 2. ����������

`svnserve -d -r xxx\subversion`

`netstat -ano | findstr 3690`���鿴�Ƿ�����

# 3. ��������

`sc create MySVNService binpath='xxx\svnserve.exe --service -r [path]' start=autodepend=Tcpip`

# 4. ȡ���ֿ�

`svn checkout svn://localhost/xx`

# 5. ����ļ�

`svn add [filename]`

# 6. �ύ�޸�

`svn commit -m "xxx" [filename]`

# 7. ���°汾

`svn update`

# 8. ����������

## `LINUX`����

### 1. ����

`yum -y install subversion`

### 2. �����ֿ�Ŀ¼

1. `mkdir -p /var/svn/repository`
2. `cd /var/svn/repository`
3. `mkdir pro_a`

### 3. ����`SVN`�汾��

`svnadmin create [path]`

### 4. ����

`svn://ip:3690/pro_oa`

### 5. �鿴���� 

`chkconfig | grep svn` 

### 6. �� 

`chkconfig svnserve on `

### 7. ��Ӧ�ű�λ�� 

`/etc/rc.d/init.d/svnserve` 

### 8. �������� 

`args="--daemon --root/var/svn/repository --listen-port 3690 --pid-file=${pidfile}$OPTIONS"` 

### 9. �������� 

`service svnserve start`

`servei svnserve status` 

`netstat -anp | grep 3690` 

### 10. ����ļ� 

`svn add [filename]`

### 11. �������Ŀ¼ 

`svn add` 

### 12. �ύ 

������־��Ϣ��`svn commit -m "message" [filename]` 

### 13. ����`conf` 

`anon-access = write` 

- ���������ύ��Ϣ 

### 14. �鿴�ύ���ļ���Ϣ 

`svn list svn://ip:port/dir` 

### 15. ȡ�� 

`svn checkout svn://ip:port/dir` 

### 16. �����ļ� 

`svn update [filename]` 

### 17. ����ȫ�� 

`svn update` 

### 18. �鿴�ļ���Ϣ 

`svn info [filename]`

