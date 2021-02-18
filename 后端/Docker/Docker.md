Docker 目录
[TOC]
***
# 前言
- 本文为快速`Docker`上手，仅仅列举了`docker`的使用方法
- 如有深入的必要，请阅读官方文档和相关书籍

# Docker是什么？
- 因为配置得环境不同，所以开发环境上的软件移动到运维的测试机器上，可能就不能使用；
- 不能使用的原因有：环境配置，调取的库等；
- Docker三要素：仓库，镜像，容器；

# Docker安装
- `yum install -y epel-release`
- `yum install -y docker-io`
- `ll /etc/sysconfig/docker`
- `service docker start /// systemctl start docker`
- `docker version`
# 查看内核版本
- `uname -r`
- `cat /etc/redhat-release`
# Docker的架构
- `client`--->客户端，命令终端；
- `docker_host`---->服务器；
- `repository`--->远程仓库；
# 阿里云配置
1. 打开网页: `dev.aliyun.com/search.html`
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
# 运行
- `docker run hello-world`
## docker的帮助命令
- `docker version`
- `docker info`
- `docker --help`
## docker镜像命令
`docker images`:列出本地主机上的镜像
- `-a`: all
- `-q`: 显示镜像id
- `--digests`:摘要信息
- `--no-trunc`:显示完整的镜像信息
`docker search (options) [name] `
- `-s`:列出收藏数不小于多少的
- `--automated`:自动构建的类型
`docker pull`:下载镜像
`docker pull tomcat	===		docker pull tomcat:lastest`
`docker rmi [name]`
## 容器命令
- `docker pull centos`
- `docker run [options] image [command]`
	- `--name`:新名字；
	- `-d`:后台运行
	- `-i`:交互式运行
	- `-t`：为容器分配一个伪输入终端
	- `-P`：端口映射
	- `-p`:指定端口映射
- `docker ps [options] `:列出正在运行的容器
	- `-a`:列出全部
	- `-l`：最近创建的
	- `-q`:只显示编号
	- `--no-trunc`:不截断输出
退出:
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
- `docker inspect [id]`:查看容器内部细节；
- `docker exec -t [id] ls -l `:在docker外进行命令操作
- `docker cp [id]`:容器内路径 目的主机路径
- `docker attach 【id】`:连接到正在运行中的容器。
## 镜像commit
- `docker commit -m="message" -a="author" [id] [name]:tag`
- id=run起来后（`docker ps`）的container容器，而不是docker images
- `docker run -it -p 8888:8080 tomcat`
- `docker run -it -P tomcat`
## 在后台启动
`docker run -d -p 6666:8080 tomcat`
## 容器数据卷
- `docker run -it -v [宿主机绝对路径目录：容器内目录]	镜像名`
- `docker run -it -v [宿主机绝对路径目录：容器内目录]:ro	镜像名`
	- 主机可以写，docker镜像只能查看
- 本意是：数据转化；
## 数据卷容器
- 活动硬盘挂活动硬盘，实现数据的传递依赖；
- `docker run -it --name dc01 zzyy/centos`
- `docker run -it --name dc02 --volumes-from dc01 zzyy/centos`
	- 在同一个文件夹里创建文件，会达到文件共享的作用
- `docker rm -f dc01`
	- 2，3继承1的时候，删除1，并不影响2，3；
- 容器之间的配置信息的传递，数据卷的生命周期一直持续到没有容器使用为止；
- ==`DockerFile`>`Docker Image`>`Docker run`==

## `DockerFile`保留字指令

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
#当前宿主机拷贝到容器目录下（/usr/local/）
COPY xx.txt /usr/local/xx.txt
#压缩文件添加并解压到容器里
ADD xx.tar.gz /usr/local
#安装tool
RUN yum -y install vim
#设置工作路径
ENV WORKPATH /usr/local
WORKDIR $WORKPATH
#启动时运行
CMD ll [只能执行最后一个，不能重叠.出现多个前面失效]
ENTRYPOINT ['ls', '-s']
```

## 执行命令
`docker run -d -p 9080:8080 --name xx -v /usr/local:/tmp --privileged=true xx-name`

