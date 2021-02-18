Docker Ŀ¼
[TOC]
***
# ǰ��
- ����Ϊ����`Docker`���֣������о���`docker`��ʹ�÷���
- ��������ı�Ҫ�����Ķ��ٷ��ĵ�������鼮

# Docker��ʲô��
- ��Ϊ���õû�����ͬ�����Կ��������ϵ�����ƶ�����ά�Ĳ��Ի����ϣ����ܾͲ���ʹ�ã�
- ����ʹ�õ�ԭ���У��������ã���ȡ�Ŀ�ȣ�
- Docker��Ҫ�أ��ֿ⣬����������

# Docker��װ
- `yum install -y epel-release`
- `yum install -y docker-io`
- `ll /etc/sysconfig/docker`
- `service docker start /// systemctl start docker`
- `docker version`
# �鿴�ں˰汾
- `uname -r`
- `cat /etc/redhat-release`
# Docker�ļܹ�
- `client`--->�ͻ��ˣ������նˣ�
- `docker_host`---->��������
- `repository`--->Զ�ֿ̲⣻
# ����������
1. ����ҳ: `dev.aliyun.com/search.html`
2. `login`
3. `copy url`
4. `sudo mkdir -p /etc/docker`
5. `sudo tee /etc/docker/daemon.json <<- 'EOF' xxxxEOF`
6. `vim /etc/sysconfig/docker`
7. `other_args="--registry-mirror=https://aa25jingu.mirror.aliyuns.com"`
8. `service docker restart`
9. `sudo systemctl daemon-reload`
10. `sudo systemctl restart docker`
11. `ps -ef | grep docker`
# ����
- `docker run hello-world`
## docker�İ�������
- `docker version`
- `docker info`
- `docker --help`
## docker��������
`docker images`:�г����������ϵľ���
- `-a`: all
- `-q`: ��ʾ����id
- `--digests`:ժҪ��Ϣ
- `--no-trunc`:��ʾ�����ľ�����Ϣ
`docker search (options) [name] `
- `-s`:�г��ղ�����С�ڶ��ٵ�
- `--automated`:�Զ�����������
`docker pull`:���ؾ���
`docker pull tomcat	===		docker pull tomcat:lastest`
`docker rmi [name]`
## ��������
- `docker pull centos`
- `docker run [options] image [command]`
	- `--name`:�����֣�
	- `-d`:��̨����
	- `-i`:����ʽ����
	- `-t`��Ϊ��������һ��α�����ն�
	- `-P`���˿�ӳ��
	- `-p`:ָ���˿�ӳ��
- `docker ps [options] `:�г��������е�����
	- `-a`:�г�ȫ��
	- `-l`�����������
	- `-q`:ֻ��ʾ���
	- `--no-trunc`:���ض����
�˳�:
	- `exit`
	- `ctrl+P+Q`
- `docker start [id / name]`
- `docker restart [id / name]`
- `docker stop [id / name]`
- `docker kill [id / name]`
- `docker rm [id]`
- `docker rm -f ${docker ps -a -q}`
- `docker ps -a -q | xargs docker rm`
- `docker logs -f -t --tail`
- `docker top`
- `docker inspect [id]`:�鿴�����ڲ�ϸ�ڣ�
- `docker exec -t [id] ls -l `:��docker������������
- `docker cp [id]`:������·�� Ŀ������·��
- `docker attach ��id��`:���ӵ����������е�������
## ����commit
- `docker commit -m="message" -a="author" [id] [name]:tag`
- id=run������`docker ps`����container������������docker images
- `docker run -it -p 8888:8080 tomcat`
- `docker run -it -P tomcat`
## �ں�̨����
`docker run -d -p 6666:8080 tomcat`
## �������ݾ�
- `docker run -it -v [����������·��Ŀ¼��������Ŀ¼]	������`
- `docker run -it -v [����������·��Ŀ¼��������Ŀ¼]:ro	������`
	- ��������д��docker����ֻ�ܲ鿴
- �����ǣ�����ת����
## ���ݾ�����
- �Ӳ�̹һӲ�̣�ʵ�����ݵĴ���������
- `docker run -it --name dc01 zzyy/centos`
- `docker run -it --name dc02 --volumes-from dc01 zzyy/centos`
	- ��ͬһ���ļ����ﴴ���ļ�����ﵽ�ļ����������
- `docker rm -f dc01`
	- 2��3�̳�1��ʱ��ɾ��1������Ӱ��2��3��
- ����֮���������Ϣ�Ĵ��ݣ����ݾ����������һֱ������û������ʹ��Ϊֹ��
- ==`DockerFile`>`Docker Image`>`Docker run`==

## `DockerFile`������ָ��

- FROM
- MAINTAINER
- RUN
- EXPOSE
- WORKDIR
- ENV
- ADD
- COPY
- VOLUME
- CMD
- ENTRYPOINT
- ONBUILD

```shell
FROM centos
- MAINAINER fwx<fwx5618177@gmail.com>
#��ǰ����������������Ŀ¼�£�/usr/local/��
COPY xx.txt /usr/local/xx.txt
#ѹ���ļ���Ӳ���ѹ��������
ADD xx.tar.gz /usr/local
#��װtool
RUN yum -y install vim
#���ù���·��
ENV WORKPATH /usr/local
WORKDIR $WORKPATH
#����ʱ����
CMD ll [ֻ��ִ�����һ���������ص�.���ֶ��ǰ��ʧЧ]
ENTRYPOINT ['ls', '-s']
```

## ִ������
`docker run -d -p 9080:8080 --name xx -v /usr/local:/tmp --privileged=true xx-name`

