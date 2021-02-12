目录：

[TOC]

***

# 前言
***
- 本文旨在指导学习`ArchLinux`的配置
***
# 1. 安装`Arch`
***
- 只针对`UEFI`引导方式，硬盘引导格式是`GPT`

## 操作步骤

### 0. `Linux`下刻录
- 通过`lsblk`查看u盘位置
- 命令：`sudo dd if=archlinux-2019.01.01-x86_64.iso of=/dev/sdc bs=4M`
	- `sdc`：u盘位置
### 1. `Windows`刻录
- 刻录工具`runfuns`
- 官网下载`ArchLinux`镜像
- 刻录：
	- 选择镜像文件
	- 分区类型选择`GPT`
	- 文件系统`NTFS`簇大小4096，也可以选择`Fat32`
	- 开始刻录：`ISO`模式和`dd`模式都可
### 2. BIOS设置U盘启动
- 设置`WIFI`联网：`WIFI-MENU`
### 3. 查看磁盘分区情况
- `lsblk`
### 4. 磁盘讲解：
- 磁盘一般是`sda`, `sdb`
- a, b分别表示第一块、第二块磁盘
- 但要对这两个磁盘进行分区
### 5. 磁盘分区后，启动linux需要2件东西
- 一个是`efi`分区，用于启动`Linux`
- 一个是`/`分区，用于存放整个`Linux`系统
- 调整指令：`cfdisk /dev/sdb`
	- 如果磁盘非空闲的话，在`cfdisk`中选择`delete`全部删除
### 6. `cfdisk`选择
- 选择`new`，创建出2个分区
- 分区大小根据情况设置
- 选择`type`分区类型
```shell
sdb1 128M EFI system
sdb2 119G Linux system
```
- 在`cfdisk`中选择`write`写入，在写入`yes`后，`quit`退出

### 7.磁盘分区要有各自的文件系统
- 一般`efi`文件系统是`fat32`
- `linux`文件系统时`ext4`
所以对2块磁盘格式化文件系统：
```shell
mkfs.ext4 /dev/sda3
mkfs.fat -F 32 /dev/sdb1
mkfs.ext4 /dev/sdb2
```

### 8. 挂载
把刚格式化的文件挂在到`Linux`下：
```shell
mkdir /mnt/boot
mount /dev/sdb1 /mnt/boot
mount /dev/sdb2 /mnt
```

### 9. 更新下载源
```shell
echo "Server=https://mirrors.huaweicloud.com/archlinux/\$repo/os/\$arch" > /etc/pacman.d/mirrorlist

# 执行刷新
pacman -Syy
```
### 10. 下载系统必要组件基础包
`pacstrap /mnt base base-devel`
### 11. 生成硬盘文件有关的信息
```shell
genfstab -U /mnt > /mnt/etc/fstab
# 查看硬盘信息是否正确 正确的是显示两个
cat /mnt/etc/fstab
```
### 12. 切换到已经配置好的系统
- 系统已经配置到`/mnt`下，也就是挂载到的磁盘分区
`arch-chroot /mnt/bin/bash`

### 13. 设置时间和时区
```shell
hwclock --systohc --utc
timedatectl set-ntp true
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
### 14. 设置语言
```shell
cat > /etc/locale-gen << q
#输入以下4行
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
zh_TW.UTF-8 UTF-8
q
#写入配置文件并使其生效
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

### 15. 设置电脑主机名
`echo "你的电脑名称" > /etc/hostname`

### 16. 设置`hosts`文件
```shell
nano /etc/hosts
# 写入
127.0.0.1         localhost
::1               localhost
22：设置root密码
passwd
```

### 17. 安装`grub`引导
```shell
# 如果你是gpt格式磁盘
pacman -S grub efibootmgr os-prober ntfs-3g intel-ucode
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=grub
grub-mkconfig -o /boot/grub/grub.cfg
```

### 18. 安装联网工具
```shell
pacman -S  dialog iw wpa_supplicant networkmanager dhcp
systemctl enable NetworkManager
```

### 19. 创建用户组和用户
```shell
groupadd 用户组名 （不要有大写）
useradd 用户名 -g 用户组名 -G wheel -s /bin/bash -m
passwd 用户名
```

### 20. 去掉`sudo`的时候需要输入密码
`echo "你的用户名 ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/sudoers`

### 21. 安装中文字体
`pacman -S wqy-zenhei`

### 22. 打开配置文件
```shell
vim /etc/pacman.conf
去掉下面3行内容前面的注释
Color  
TotalDownload
[multilib]       
Include = /etc/pacman.d/mirrorlist
```
### 23. 退出当前系统
`exit`

### 24. 卸载挂载
`umount -R /mnt`

### 25. 重启
`reboot`
***
# 2. 安装`yay`
***
