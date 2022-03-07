---
title: Ubuntu更新python
date: 2022-01-14
categories: tool
tags:
- Linux
- vim
---

主要记录一下更新Ubuntu更新python的踩坑记录。

<!-- more -->

## 版本确定

Ubuntu 16.04 中安装为例，一开始的时候`python3 --version`

![](https://0314valen.github.io/images/img/python/1.jpg)

可以看到是Python 3.5.2

## 准备操作

```
apt可以看作apt－get和apt－cache命令的子集，可以为包管理提供必要的命令选项。
apt－get虽然没被弃用，但作为普通用户，还是应该首先使用apt。
```

Ubuntu系统自带的源都是国外的网址，国内用户在使用的时候网速比较慢。建议大家更换国内的源，这里使用阿里源，步骤如下：

- 备份现在使用的源

```
sudo cp /etc/apt/sources.list /etc/apt/sources_init.list
```

- 更换源

```
sudo vi /etc/apt/sources.list
把下面阿里云的信息复制进去
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse  
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse  
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse  
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse  
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse  
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse  
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse  
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse  
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse  
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse 
然后：wq保存
```

- 更新添加的源

```
sudo apt-get update
```

- 更新软件

```
sudo apt-get upgrade
```

- 安装依赖

```
sudo apt install software-properties-common
```

![](https://0314valen.github.io/images/img/python/2.jpg)

- 添加 deadsnakes PPA 源

```
sudo add-apt-repository ppa:deadsnakes/ppa
运行到下面这个位置回车即可
Press [ENTER] to continue or Ctrl-c to cancel adding it.
```

![](https://0314valen.github.io/images/img/python/3.jpg)

![](https://0314valen.github.io/images/img/python/4.jpg)

## 更新到 python 3.8

- 安装python3.8

```
sudo apt install python3.8
```

![](https://0314valen.github.io/images/img/python/5.jpg)

- 定位python位置和设置优先级

此时能看到有两个python

```
$ which python3.8
/usr/bin/python3.8
$ sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
 
$ which python3.5
/usr/bin/python3.5
$ sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.5 2
```

![](https://0314valen.github.io/images/img/python/6.jpg)

- 设置默认python3指向python3.8

```
sudo update-alternatives --config python3
```

在后面输入python版本前面的数字，然后回车即可。

![](https://0314valen.github.io/images/img/python/7.jpg)

此时可以看到python版本以及变成了3.8

![](https://0314valen.github.io/images/img/python/8.jpg)

## 开始踩坑

### pip丢失

前面已经可以看到python版本显示3.8.9但是`pip3 --version`不显示没有命令

![](https://0314valen.github.io/images/img/python/9.jpg)

#### 解法一

直接使用其他机器上的get-pip.py[下载链接](https://0314valen.github.io/images/img/python/get-pip.py)

![](https://0314valen.github.io/images/img/python/16.jpg)

这样就能解决问题了

#### 解法二

通过`sudo apt-get install python3-pip`安装

![](https://0314valen.github.io/images/img/python/10.jpg)

可以看到这样安装会有错误，而且问题好像严重了

![](https://0314valen.github.io/images/img/python/11.jpg)

此时通过`sudo apt-get install python3.8-distutils`来解决上述问题，注意python3.8-distutils中的python版本问题

![](https://0314valen.github.io/images/img/python/12.jpg)

此时再看`pip3 --version`会发现问题变化了

![](https://0314valen.github.io/images/img/python/13.jpg)

然后去修改一下`sudo vi /usr/bin/pip3`内容

将原来的

```
from pip import main
if __name__ == '__main__':
    sys.exit(main())
```

改成

```
from pip import __main__
if __name__ == '__main__':
    sys.exit(__main__._main())
```

此时能看到`pip3 --version`会有版本显示，但是这样pip list会报错

![](https://0314valen.github.io/images/img/python/14.jpg)

![](https://0314valen.github.io/images/img/python/15.jpg)

建议使用解法1



























