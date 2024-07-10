---
title: Redis哨兵模式
author: Noah
date: 2024/07/10 14:39
categories: 
 - Redis进阶
tags:
 - Redis
 - Redis进阶
---


# Redis哨兵模式

[[toc]]

::: details 哨兵模式重要配置

```bash
# Example sentinel.conf

# 哨兵sentinel实例运行的端口 默认26379
port 26379

# 哨兵sentinel的工作目录
dir /tmp

# 哨兵sentinel监控的redis主节点的 ip port
# master-name 可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。
# quorum 配置多少个sentinel哨兵统一认为master主节点失联 那么这时客观上认为主节点失联了
# sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 2

# 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供密码
# 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码
# sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd

# 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒
# sentinel down-after-milliseconds <master-name> <milliseconds>
sentinel down-after-milliseconds mymaster 30000

# 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，
这个数字越小，完成failover所需的时间就越长，
但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。
可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。
# sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1

# 故障转移的超时时间 failover-timeout 可以用在以下这些方面：
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。
#3.当想要取消一个正在进行的failover所需要的时间。
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了
# 默认三分钟
# sentinel failover-timeout <master-name> <milliseconds>
sentinel failover-timeout mymaster 180000

# SCRIPTS EXECUTION
#配置当某一事件发生时所需要执行的脚本，可以通过脚本来通知管理员，例如当系统运行不正常时发邮件通知相关人员。
#对于脚本的运行结果有以下规则：
#若脚本执行后返回1，那么该脚本稍后将会被再次执行，重复次数目前默认为10
#若脚本执行后返回2，或者比2更高的一个返回值，脚本将不会重复执行。
#如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为1时的行为相同。
#一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。

#通知型脚本:当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），将会去调用这个脚本，这时这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信息。调用该脚本时，将传给脚本两个参数，一个是事件的类型，一个是事件的描述。如果sentinel.conf配置文件中配置了这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是可执行的，否则sentinel无法正常启动成功。
#通知脚本
# shell编程
# sentinel notification-script <master-name> <script-path>
sentinel notification-script mymaster /var/redis/notify.sh

# 客户端重新配置主节点参数脚本
# 当一个master由于failover而发生改变时，这个脚本将会被调用，通知相关的客户端关于master地址已经发生改变的信息。
# 以下参数将会在调用脚本时传给脚本:
# <master-name> <role> <state> <from-ip> <from-port> <to-ip> <to-port>
# 目前<state>总是“failover”,
# <role>是“leader”或者“observer”中的一个。
# 参数 from-ip, from-port, to-ip, to-port是用来和旧的master和新的master(即旧的slave)通信的
# 这个脚本应该是通用的，能被多次调用，不是针对性的。
# sentinel client-reconfig-script <master-name> <script-path>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh # 一般都是由运维来配置！
```

:::

## 哨兵模式概述

哨兵模式是一个分布式系统，可以在一个架构中运行多个哨兵进程，这些进程使用流言协议来接收关于 Master 主服务器是否下线的信息，并使用投票协议来决定是否执行自动故障转移，以及选择哪个 Slave 作为新的 Master。

### 作用

在没有哨兵模式之前，我们主服务器出现宕机情况时，Redis 需要我们手动去干预主从模式的切换。然而人工干预的操作费事费力，还会造成一段时间服务不能使用；有了哨兵模式之后，主从模式的切换不需要我们人工干预。

### 什么是哨兵模式

哨兵模式是一个独立的进程，它对 Redis 的系统运行状态进行监控，有两个功能：

1. 通过发送命令，让 Redis 服务器返回监控其运行状态，即监控主机和从机 Redis 是否运行正常。
2. 当哨兵检测到主机宕机，会自动将 slave 切换成 master ，然后通过发布订阅模式通知其他的从服务器，修改配置，让他们切换master。

### 哨兵模式工作原理

单哨兵工作原理：

<img src="https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240710150541.jpg" style="zoom: 80%;" />

单个哨兵，由一个哨兵监控多个 Redis 服务。

::: tips TIPS:thinking:

设想: 哨兵作为单独的一个进程，且在单哨兵环境下，如果哨兵服务出现宕机，那该如何应对？

:::

多哨兵工作原理：

<img src="https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240710153346.jpg" style="zoom:80%;" />

假设 Master 宕机，哨兵01先检测到结果，系统并不会马上进行故障转移(failover)，仅仅是哨兵01主观的认为 Master 不可用，这个现象称为**主观下线**。当其他哨兵也检测到 Master 不可用，并且数量达到一定值时，那么哨兵之间会进行一次投票，投票的结果由一个哨兵发起，进行 failover 操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的 Slave 实现切换主机，这个过程称为**客观下线**。

### 哨兵的功能

- **集群监控:** 负责监控主从集群中的 Master 和 Slave 进程是否正常工作。
- **故障转移(failover):** 如果 Master 宕机，会自动从 Slave 中选举出新的 Master ，进行主从切换。
- **配置中心:** 如果发生故障转移，Sentinel 负责通知客户端新的 Master 的地址。
- **消息通知:** 如果某个节点有故障，那么 Sentinel 会发送报警消息给系统管理员。

::: warning 注意:rotating_light:

如果在故障转移操作完成，选举出来新的 Master 之后，原 Master 从宕机状态恢复，则是以从机的状态认主新的 Master。

:::

## 单哨兵模式

::: info 环境:alien:

当前环境为一主二从的伪集群，其中端口6001为主机，6002、6003为从机。

```bash
127.0.0.1:6001> info replication
# Replication
role:master
connected_slaves:2
slave0:ip=127.0.0.1,port=6002,state=online,offset=16688,lag=1
slave1:ip=127.0.0.1,port=6003,state=online,offset=16688,lag=0
master_failover_state:no-failover
master_replid:0ff3808faa9869d0d2dddd5c58d39a029026107e
master_replid2:9b3a6e7e6d22a17a2f6e20efb0c6448d635eb777
master_repl_offset:16688
second_repl_offset:16661
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:16661
repl_backlog_histlen:28
```

:::

### 1.创建sentinel.conf

```bash
# 创建文件夹，复制 Redis 根目录下的 sentinel.conf
# 原 sentinel.conf 留作备份
cp sentinel.conf  sentinel/sentinel.conf
mkdir sentinel/

```

### 2.修改sentinel.conf

```bash
# sentinel monitor 名称 host port quorum
sentinel monitor myredis 127.0.0.1 6001 1
```

quorum 表示至少有 quorum 个哨兵认为主机宕机，该主机才会被判断为宕机。

### 3.启动哨兵

运行 redis目录下的 redis-sentinel 并指定上面修改的配置文件即可，默认端口为26379

```bash
[root@localhost redis-7.2.5]# bin/redis-sentinel sentinel/sentinel.conf
8621:X 11 Jul 2024 00:12:32.681 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
8621:X 11 Jul 2024 00:12:32.681 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
8621:X 11 Jul 2024 00:12:32.681 * Redis version=7.2.5, bits=64, commit=00000000, modified=0, pid=8621, just started
8621:X 11 Jul 2024 00:12:32.681 * Configuration loaded
8621:X 11 Jul 2024 00:12:32.682 * Increased maximum number of open files to 10032 (it was originally set to 1024).
8621:X 11 Jul 2024 00:12:32.682 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 7.2.5 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in sentinel mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 26379
 |    `-._   `._    /     _.-'    |     PID: 8621
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

8621:X 11 Jul 2024 00:12:32.682 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
8621:X 11 Jul 2024 00:12:32.684 * Sentinel new configuration saved on disk
8621:X 11 Jul 2024 00:12:32.684 * Sentinel ID is af95d6a8f3bc17761be985c2a2151fc86ccf19fc
8621:X 11 Jul 2024 00:12:32.684 # +monitor master myredis 127.0.0.1 6001 quorum 1
8621:X 11 Jul 2024 00:12:32.684 # +monitor master mymaster 127.0.0.1 6379 quorum 2
8621:X 11 Jul 2024 00:12:32.684 * +slave slave 127.0.0.1:6002 127.0.0.1 6002 @ myredis 127.0.0.1 6001
8621:X 11 Jul 2024 00:12:32.685 * Sentinel new configuration saved on disk
8621:X 11 Jul 2024 00:12:32.685 * +slave slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
8621:X 11 Jul 2024 00:12:32.685 * Sentinel new configuration saved on disk
```

```bash
8621:X 11 Jul 2024 00:12:32.684 * +slave slave 127.0.0.1:6002 127.0.0.1 6002 @ myredis 127.0.0.1 6001
8621:X 11 Jul 2024 00:12:32.685 * +slave slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
```

从上面输入的信息可以看出 6002、6003为 Slave，6001为Master。

### 5.测试哨兵

#### 5.1 从机宕机

kill 从机线程

```bash
[MichstaBe@localhost ~]$ ps -ef|grep redis
polkitd    1732   1658  0 7月10 ?       00:00:01 redis-server *:6379
root       2501      1  0 7月10 ?       00:00:01 bin/redis-server 127.0.0.1:6001
root       2534      1  0 7月10 ?       00:00:01 bin/redis-server 127.0.0.1:6002
root       2556      1  0 7月10 ?       00:00:01 bin/redis-server 127.0.0.1:6003
root       2637   2129  0 7月10 pts/1   00:00:00 sudo bin/redis-cli -p 6001
root       2639   2637  0 7月10 pts/1   00:00:00 bin/redis-cli -p 6001
root      10622   2066  0 00:18 pts/0    00:00:00 bin/redis-sentinel *:26379 [sentinel]
Michsta+  10844  10709  0 00:18 pts/2    00:00:00 grep --color=auto redis
[MichstaBe@localhost ~]$ sudo kill -s 9 2556
[MichstaBe@localhost ~]$ ps -ef|grep redis
polkitd    1732   1658  0 7月10 ?       00:00:01 redis-server *:6379
root       2501      1  0 7月10 ?       00:00:01 bin/redis-server 127.0.0.1:6001
root       2534      1  0 7月10 ?       00:00:01 bin/redis-server 127.0.0.1:6002
root       2637   2129  0 7月10 pts/1   00:00:00 sudo bin/redis-cli -p 6001
root       2639   2637  0 7月10 pts/1   00:00:00 bin/redis-cli -p 6001
root      11362   2066  0 00:19 pts/0    00:00:00 bin/redis-sentinel *:26379 [sentinel]
Michsta+  11746  10709  0 00:20 pts/2    00:00:00 grep --color=auto redis

```

sentinel输出日志:

```bash
11362:X 11 Jul 2024 00:21:13.307 # +sdown slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
```

重新启动从机:

```bash
[MichstaBe@localhost ~]$ ps -ef|grep redis
polkitd    1732   1658  0 7月10 ?       00:00:02 redis-server *:6379
root       2501      1  0 7月10 ?       00:00:02 bin/redis-server 127.0.0.1:6001
root       2534      1  0 7月10 ?       00:00:02 bin/redis-server 127.0.0.1:6002
root      11362   2066  0 00:19 pts/0    00:00:00 bin/redis-sentinel *:26379 [sentinel]
root      12672      1  0 00:23 ?        00:00:00 bin/redis-server 127.0.0.1:6003
Michsta+  12775  10709  0 00:23 pts/2    00:00:00 grep --color=auto redis
```

sentinel:

```bash
1362:X 11 Jul 2024 00:23:23.126 * +reboot slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:23:23.193 # -sdown slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
```

查看主从详情：

``` bash

127.0.0.1:6001> info replication
# Replication
role:master
connected_slaves:2
slave0:ip=127.0.0.1,port=6002,state=online,offset=69689,lag=0
slave1:ip=127.0.0.1,port=6003,state=online,offset=69689,lag=0
master_failover_state:no-failover
master_replid:0ff3808faa9869d0d2dddd5c58d39a029026107e
master_replid2:9b3a6e7e6d22a17a2f6e20efb0c6448d635eb777
master_repl_offset:69689
second_repl_offset:16661
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:16661
repl_backlog_histlen:53029
```

::: tip 总结:sunglasses:

Slave 出现宕机情况，不会干涉其他服务运行。当宕机的 Slave 从宕机状态变成正常运行状态，会自动认主当前 Master。

:::

#### 5.2 主机宕机

进入主机，执行 shutdown 命令 关闭主机服务：

```bash
127.0.0.1:6001> shutdown
(0.71s)
not connected>
```

sentinel输出日志：

- 由输出日志可以观察出 6001 出现宕机，并且执行 failover 操作，将 Master 转移给了 6002。

```bash
11362:X 11 Jul 2024 00:31:25.601 # +sdown master myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:25.602 # +odown master myredis 127.0.0.1 6001 #quorum 1/1
11362:X 11 Jul 2024 00:31:25.602 # +new-epoch 1
11362:X 11 Jul 2024 00:31:25.602 # +try-failover master myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:25.603 * Sentinel new configuration saved on disk
11362:X 11 Jul 2024 00:31:25.603 # +vote-for-leader af95d6a8f3bc17761be985c2a2151fc86ccf19fc 1
11362:X 11 Jul 2024 00:31:25.603 # +elected-leader master myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:25.603 # +failover-state-select-slave master myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:25.664 # +selected-slave slave 127.0.0.1:6002 127.0.0.1 6002 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:25.664 * +failover-state-send-slaveof-noone slave 127.0.0.1:6002 127.0.0.1 6002 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:25.731 * +failover-state-wait-promotion slave 127.0.0.1:6002 127.0.0.1 6002 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:26.636 * Sentinel new configuration saved on disk
11362:X 11 Jul 2024 00:31:26.636 # +promoted-slave slave 127.0.0.1:6002 127.0.0.1 6002 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:26.636 # +failover-state-reconf-slaves master myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:26.737 * +slave-reconf-sent slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:27.733 * +slave-reconf-inprog slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:27.734 * +slave-reconf-done slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:27.805 # +failover-end master myredis 127.0.0.1 6001
11362:X 11 Jul 2024 00:31:27.805 # +switch-master myredis 127.0.0.1 6001 127.0.0.1 6002
11362:X 11 Jul 2024 00:31:27.805 * +slave slave 127.0.0.1:6003 127.0.0.1 6003 @ myredis 127.0.0.1 6002
11362:X 11 Jul 2024 00:31:27.805 * +slave slave 127.0.0.1:6001 127.0.0.1 6001 @ myredis 127.0.0.1 6002
11362:X 11 Jul 2024 00:31:27.806 * Sentinel new configuration saved on disk
11362:X 11 Jul 2024 00:31:57.867 # +sdown slave 127.0.0.1:6001 127.0.0.1 6001 @ myredis 127.0.0.1 6002
```

查看当前主从关系：

- 可以看得出来，当前6002只有一台 slave，这台slave的端口是6003。

```bash
127.0.0.1:6002> info replication
# Replication
role:master
connected_slaves:1
slave0:ip=127.0.0.1,port=6003,state=online,offset=91053,lag=0
master_failover_state:no-failover
master_replid:daa140a0ae602200902b3d67145666bfeefd7c59
master_replid2:0ff3808faa9869d0d2dddd5c58d39a029026107e
master_repl_offset:91053
second_repl_offset:90357
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:16661
repl_backlog_histlen:74393
```

启动6001:

- sentinel输出下面语句，表示6001以从机身份连接到主机6002。

```bash
11362:X 11 Jul 2024 00:38:19.081 * +convert-to-slave slave 127.0.0.1:6001 127.0.0.1 6001 @ myredis 127.0.0.1 6002
```

查看当前主从关系:

- 由日志信息能够看出，当前6002主机拥有两台从机，端口分别是6001、6003。

```bash
127.0.0.1:6002> info replication
# Replication
role:master
connected_slaves:2
slave0:ip=127.0.0.1,port=6003,state=online,offset=123428,lag=1
slave1:ip=127.0.0.1,port=6001,state=online,offset=123428,lag=1
master_failover_state:no-failover
master_replid:daa140a0ae602200902b3d67145666bfeefd7c59
master_replid2:0ff3808faa9869d0d2dddd5c58d39a029026107e
master_repl_offset:123428
second_repl_offset:90357
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:16661
repl_backlog_histlen:106768
```

::: tip 总结:sunglasses:

如果主机出现宕机，经过哨兵发送的心跳包，检测到主机确实宕机，那么哨兵将会进行选举投票。从存活的从机里投票选举一个主机出来。如果故障转移完成，原主机重新正常运行，那么原主机会以从机的身份连接到新的主机。

:::

