---
title: Redis配置文件详解
author: Noah
date: 2024/07/07 15:32
categories: 
 - Redis进阶
tags:
 - Redis
 - Redis进阶
---
# Redis配置文件详解
[[toc]]

Redis 的配置文件通常位于 `redis.conf` ，在 Redis 启动的的时候，可以自定义配置文件启动以达到伪集群的效果。通过配置文件可以调节 Redis 的行为和性能。

::: details redis.conf 查看

```bash
# Redis 配置文件样本
#
# 注意：如果想要读取配置文件的参数，必须将配置文件以第一参数的形式启动，如下启动示例:
#
# ./redis-server /path/to/redis.conf

# 单位说明：当需要设置内存大小时，可以用1K 5GB 4M等常用格式指定：
#
# 1k => 1000 bytes
# 1kb => 1024 bytes
# 1m => 1000000 bytes
# 1mb => 1024*1024 bytes
# 1g => 1000000000 bytes
# 1gb => 1024*1024*1024 bytes
#
# 单位不区分大小写 所以 1GB 1Gb 1gB 都是一样的.

################################## 多包含 ###################################

# 在此处包含一个或多个其他配置文件。
# 如果您有一个标准模板，该模板可用于所有Redis服务器，
# 但还需要自定义每个服务器的一些设置，则此模板非常有用。
# include文件可以包括其他文件，因此请聪明地使用它。
#
# 注意选项“include”不会被来自admin或redis sentinel的命令“config rewrite”重写。
# 因为redis总是使用最后处理的行作为配置指令的值，所以最好将include放在该文件的开头，
# 以避免在运行时覆盖配置更改。
#
# 反之如果您对使用include覆盖配置选项感兴趣，最好使用include作为最后一行。
#
# include /path/to/local.conf
# include /path/to/other.conf

################################## 多模块 #####################################

# 启动时加载模块。如果服务器无法加载模块，它将中止。可以使用多个loadmodule指令。
#
# loadmodule /path/to/my_module.so
# loadmodule /path/to/other_module.so

################################## 网络 #####################################

# 默认情况下如果没有指定bind配置
# Redis侦听服务器上所有可用网络接口的连接（指的是网卡）
# 可以使用“bind”配置指令只侦听一个或多个选定的接口，后跟一个或多个IP地址。
#
# Examples:
#
# bind 192.168.1.100 10.0.0.1
# bind 127.0.0.1 ::1
#
# ~~~ 警告 ~~~ 如果运行Redis的计算机直接暴露在Internet上，
# 绑定到所有接口是危险的，并且会将实例暴露给互联网上的每个人。
# 因此，默认情况下，设置了bind 127.0.0.1，
# 这意味着Redis只能接受运行在同一台计算机上的客户端的连接。
#
# 如果您确定希望实例监听所有接口
# 只需要注释下面这一行.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
bind 127.0.0.1

# 保护模式是一个安全保护层，为了避免在Internet上打开的Redis实例被访问和利用
#
# 当保护模式打开时，如果:
#
# 1) 服务器没有使用“bind”指令显式绑定到一组地址。
# 2) 未配置密码。
#
# 服务器只接受来自从IPv4和IPv6内网地址
# 127.0.0.1和：：1连接的客户端以及来自Unix域socket的连接。
#
# 默认情况下启用保护模式。 只有当您确定希望来自其他主机的客户机连接到Redis时，
# 您才应该禁用它，即使没有配置身份验证，也没有使用“bind”指令显式列出特定的接口集。
protected-mode yes

# 指定端口上的连接，默认值为6379
# 如果指定了端口0，Redis将不会侦听TCP连接。
port 6379

# TCP listen() backlog.
#
# 在每秒高请求数的环境中，为了避免客户机连接速度慢的问题，您需要大量backlog。
# 请注意，Linux内核将自动将其截断为/proc/sys/net/core/somaxconn的值，
# 因此请确保同时提高somaxconn和tcp-max-syn-u backlog的值，以获得所需的效果。
tcp-backlog 511

# Unix socket.
#
# 指定将用于侦听传入连接的Unix socket的路径。
# 没有默认值，因此未指定时，redis不会在UNIX socket上侦听。
#
# unixsocket /tmp/redis.sock
# unixsocketperm 700

# 客户端空闲n秒后关闭连接（0表示禁用）
timeout 0

# TCP keepalive.
#
# 如果非零，则使用so-keepalive在没有通信的情况下向客户机发送TCP ACK。这有两个原因:
#
# 1) 能够检测无响应的服务
# 2) 让该连接中间的网络设备知道这个连接还存活
#
# 在Linux上，这个指定的值(单位秒)就是发送ACK的时间间隔。
# 注意：要关闭这个连接需要两倍的这个时间值。
# 在其他内核上这个时间间隔由内核配置决定
tcp-keepalive 300

################################# 常用 #####################################

# 默认情况下，redis不作为守护进程运行。如果需要，请使用“是”。请注意，当后台监控时，
# redis将在/var/run/redis.pid中写入一个pid文件。
daemonize no

# 是否通过upstart或systemd管理守护进程。
# 默认no没有服务监控，其它选项有upstart, systemd, auto。
supervised no

# 生成的pid文件位置
pidfile /var/run/redis_6379.pid

# 指定服务器日志级别
# 可以配置为其中一个参数:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)
# warning (only very important / critical messages are logged)
loglevel notice

# 指定日志文件名。空字符串还可以用于强制redis记录标准输出
# 请注意，如果使用标准输出进行日志记录，但使用后台监控，则日志将发送到/dev/null
logfile ""

# 启用系统日志记录, 只需要设置 'syslog-enabled' 为 yes,
# 还可以根据需要更新其他系统日志参数
# syslog-enabled no

# 指定系统日志标识
# syslog-ident redis

# 指定系统日志功能。必须是用户或介于 LOCAL0-LOCAL7.
# syslog-facility local0

# 设置数据库数。默认数据库为db0,
# 您可以使用select<dbid>在每个连接上选择不同的连接
databases 16

# redis启动时是否显示Logo
always-show-logo yes

################################  快照  ################################
#
# 保存数据到硬盘（持久化）:
#
#   save <seconds> <changes>
#
#   如果在<seconds>秒后执行过<changes>次改变将会保存到硬盘
#
#   save 900 1 表示如果在900秒后至少发生了1次改变就会保存
#   save 300 10 表示如果在300秒后至少发生了10次改变就会保存
#   save save 60 10000 表示如果在60秒后至少发生了10000次改变就会保存
#
#   注意：你可以注释掉所有的 save 行来停用保存功能。
#   也可以直接一个空字符串来实现停用：
#   save ""

save 900 1
save 300 10
save 60 10000

# 默认情况下，如果 redis 最后一次的后台保存失败，redis 将停止接受写操作，
# 这样以一种强硬的方式让用户知道数据不能正确的持久化到磁盘，
# 否则就会没人注意到灾难的发生。
#
# 如果后台保存进程重新启动工作了，redis 也将自动的允许写操作。
#
# 然而你要是安装了靠谱的监控，你可能不希望 redis 这样做，那你就改成 no 好了。
stop-writes-on-bgsave-error yes

# 是否在 dump .rdb 数据库的时候使用 LZF 压缩字符串
# 默认都设为 yes
# 如果你希望保存子进程节省点 cpu ，你就设置它为 no ，
# 不过这个数据集可能就会比较大
rdbcompression yes

# 是否校验rdb文件
rdbchecksum yes

# dump文件名
dbfilename dump.rdb

# 工作目录
# 例如上面的 dbfilename 只指定了文件名，
# 但是它会写入到这个目录下。这个配置项一定是个目录，而不能是文件名。
dir ./

################################# 复制 #################################

# 主从复制. 使用replicoaf将一个redis实例作为另一个redis服务器的副本，
# 只需要在从服务器配置
# A few things to understand ASAP about Redis replication.
#
#   +------------------+      +---------------+
#   |      Master      | ---> |    Replica    |
#   | (receive writes) |      |  (exact copy) |
#   +------------------+      +---------------+
#
# 1) Redis复制是异步的, but you can configure a master to
#    stop accepting writes if it appears to be not connected with at least
#    a given number of replicas.
# 2) 如果复制链接丢失的时间相对较短，Redis副本可以执行与主服务器的部分重新同步。
#    根据需要，您可能需要使用合理的值配置复制积压工作的大小（请参阅此文件的下一节）。
# 3) 复制是自动的，不需要用户干预。
#    在网络分区复制副本自动尝试重新连接到主服务器并与主服务器重新同步之后。
#
# replicaof <masterip> <masterport>

# 同步的主服务的密码
# masterauth <master-password>

# 当一个从服务失去和主服务的连接，或者同步正在进行中，副本可以以两种不同的方式进行操作：
# 1) 如果 replica-serve-stale-data 设置为 "yes" (默认值)，
#    从服务器会继续响应客户端请求，可能是正常数据，也可能是还没获得值的空数据。
# 2) 如果 replica-serve-stale-data 设置为 "no"，
#    从服务会回复"正在从主服务同步（SYNC with master in progress）"来处理各种请求，
#    除了 INFO, replicaOF, AUTH, PING, SHUTDOWN, REPLCONF, ROLE, CONFIG,
#    SUBSCRIBE, UNSUBSCRIBE, PSUBSCRIBE, PUNSUBSCRIBE, PUBLISH, PUBSUB,
#    COMMAND, POST, HOST: and LATENCY。
replica-serve-stale-data yes

# 你可以配置从服务实例是否接受写操作。可写的从服务实例可能对存储临时数据可能很有用(因为
# 写入从服务的数据在同主服务同步之后将很容被删除)，
# 但是如果客户端由于配置错误在写入时也可能导致问题。
# 从Redis2.6默认所有的从服务为只读
# 注意:只读的slave不是为了暴露给互联网上不可信的客户端而设计的。
# 它只是一个防止实例误用的保护层。
# 一个只读的slave支持所有的管理命令比如config,debug等。
# 为了限制你可以用'rename-command'来隐藏所有的管理和危险命令来增强只读slave的安全性。
replica-read-only yes

# 复制同步策略：磁盘或socket。
#
# -------------------------------------------------------
# WARNING: DISKLESS REPLICATION IS EXPERIMENTAL CURRENTLY
# -------------------------------------------------------
#
# 新的从服务和重新连接的从服务在复制的过程中将会无法接收差异数据，
# 需要做完全同步，RDB文件从主服务传输到从服务

# 传输有两种不同的方式：
#
# 1) 磁盘备份: redis主机创建了一个新进程，该进程将RDB文件写入磁盘。
#    随后，父进程将文件增量传输到副本。
# 2) 无盘备份: redis master创建了一个新的进程，
#    该进程直接将RDB文件写入从服务sockets，而根本不接触磁盘。
#
# 使用磁盘备份复制，在生成RDB文件的同时，
# 可以在当前生成子级时将更多从服务排队并与RDB文件一起提供服务。
# RDB文件完成其工作. 在无盘复制中，一旦传输开始，
# 新的从服务将会排队等到当前从服务终止才会开始传输
#
# 当使用无盘复制时, 服务器在开始传输之前等待一段可配置的时间（以秒为单位），
# 希望多个从服务能够到达，并且传输可以并行。
#
# 使用低速磁盘和快速（大带宽）网络，无盘复制会更好。
repl-diskless-sync no

# When diskless replication is enabled, it is possible to configure the delay the server waits in order to spawn the child that transfers the RDB via socket to the replicas.
# 当启用无盘复制时，可以配置服务器等待的延迟，以便生成通过socket将RDB传输到副本的子级。
#
# 这很重要，因为一旦转移开始，可能将不会为新的从服务提供服务,
# 那将排队等待下一次RDB传输，因此，服务器会等待一段延迟，以便让更多的从服务到达
#
# 延迟以秒为单位，默认为5秒。要完全禁用它，只需将其设置为0秒，传输将尽快开始。
repl-diskless-sync-delay 5

# 副本以预先定义的间隔向服务器发送ping。
# 可以使用repl-ping-u replica-period选项更改此间隔。默认值为10秒。
#
# repl-ping-replica-period 10

# 以下选项设置复制超时：
#
# 1) 从复制副本的角度看，同步期间的批量传输I/O。
# 2) 从从服务的角度看主服务的超时 (data, pings)。
# 3) 从主服务器的角度来看，复制超时 (REPLCONF ACK pings)。
#
# 必须确保该值大于为repl-ping-replica-period指定的值，
# 否则每次主服务器和副本之间的通信量低时都会检测到超时。
#
# repl-timeout 60

# 同步后在从服务socket上禁用TCP_NODELAY？
#
# 如果选择“yes”，Redis将使用较少的TCP数据包和较少的带宽向从服务发送数据。
# 但这可能会增加数据在从服务端出现的延迟，对于使用默认配置的Linux内核，延迟最长可达40毫秒。
#
# 如果选择“no”，将减少数据出现在从服务端的延迟，但将使用更多带宽进行复制。
#
# 默认情况下，我们会针对低延迟进行优化，但在非常高的流量条件下，
# 或者当主服务器和从哪个服务器距离很多跃点时，将其设置为“yes”会更好
repl-disable-tcp-nodelay no

# 设置从服务积压量backlog大小。backlog是一个缓冲区，当从服务器断开连接一段时间后，
# 它会累积从服务的数据，因此当从服务希望再次重新连接时，通常不需要完全重新同步，
# 只部分重新同步就足够了，只需传递断开连接时从服务丢失的数据部分。
#
# 从服务积压量backlog越大，从服务可断联时间可以越长，之后就可以执行部分重新同步。
#
# 只有在至少连接了一个从服务后，才会分配积压空间backlog。
#
# repl-backlog-size 1mb

# 在主服务器一段时间内不再连接副本后，将释放backlog空间。
# 以下选项配置从最后一个从服务断开连接开始，需要经过的秒数，以便释放backlog缓冲区。
#
# 注意，从服务永远不会释放积压的超时时间，因为它们可能在主服务挂掉之后被提升为主服务，
# 并且应该能够与从服务正确地“部分重新同步”：因此它们应该总是积累backlog。
#
# 值为0表示永不释放backlog。
#
# repl-backlog-ttl 3600

# 从服务优先级是整数类型的参数
# Redis Sentinel使用它来选择一个从服务，以便在主服务器不再正常工作时升级为主服务器
#
# 设置值越小优先级越高
#
# 但是，特殊优先级0将副本标记为无法执行master角色，
# 因此redis sentinel将永远不会选择优先级为0的副本进行升级。
#
# 默认配置为100
replica-priority 100

# 如果连接的从服务少于n个，且延迟小于或等于m秒，则主机可以停止接受写入。
#
# n个副本需要处于“oneline”状态。
#
# 延时是以秒为单位，并且必须小于等于指定值，
# 是从最后一个从slave接收到的ping（通常每秒发送）开始计数。
# 该选项不保证N个slave正确同步写操作，但是限制数据丢失的窗口期。
#
# 例如至少需要3个延时小于等于10秒的从服务用下面的指令：
#
# min-replicas-to-write 3
# min-replicas-max-lag 10
#
# 将其中一个设置为0将禁用该功能。
# 默认min-replicas-to-write是0，min-replicas-max-lag是10.

# redis主服务可以以不同的方式列出从服务的地址和端口。
# 比如"INFO replication"命令就可以查看这些信息，
# Redis Sentinel使用它和其他工具来发现副本实例。
# 另一个可以获得此信息的地方是在主服务使用“role”命令查看这些信息
#
# 从服务通常报告的列出的IP和地址是通过以下方式获得的：
#
#   IP: 通过检查从服务用于与主服务器连接的socket的对等地址，可以自动检测该地址。
#
#   Port: 在复制握手期间，该端口由从服务通信，通常是在从服务用来侦听连接的端口。
#
# 但是，当使用端口转发或网络地址转换（NAT）时，从服务实际上可以通过不同的IP和端口对访问。
# 下面两个参数就是为了解决这个问题的，可以自行设置，从节点上报给master的自己ip和端口
#
# replica-announce-ip 5.5.5.5
# replica-announce-port 1234

################################## 安全 ###################################

# 要求客户端在处理任何其他命令之前发出auth<password>。
# 在您不信任其他人访问运行redis服务器的主机的环境中，这可能很有用。
#
# 为了向后兼容，并且因为大多数人不需要身份验证（例如，他们运行自己的服务器），
# 所以应该将其注释掉。
#
# 警告: 由于redis速度非常快，外部用户尝试破解密码速度会达到每秒多达150k次。
# 这意味着您应该使用一个非常强的密码，否则很容易破解。
#
# requirepass foobared

# 命令重命名。
#
# 在共享环境下，可以为危险命令改变名字。
# 比如，你可以为 CONFIG 改个其他不太容易猜到的名字，这样内部的工具仍然可以使用
#
# 比如:
#
# rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
#
# 也可以通过将命令重命名为空字符串来完全禁用它。
#
# rename-command CONFIG ""
#
# 请注意：改变命令名字被记录到AOF文件或被传送到从服务器可能产生问题

################################### 客户端 ####################################

# 同时设置最大连接客户端数。 默认情况下，此限制设置为10000个客户端，
# 但是如果Redis服务器无法配置进程文件限制以允许指定的限制，
# 则允许的最大客户端数设置为当前文件限制减去32
#（因为Redis保留一些文件描述符供内部使用）。
#
# 达到限制后，Redis将关闭所有发送“max number of clients reached”错误的新连接。
#
# maxclients 10000

############################## 内存管理 ################################

# 设置使用内存上限，当达到上限，Redis会尝试根据maxmemory-policy的删除策略删除keys
#
# 如果redis不能根据策略删除keys,或者如果策略设置为“noevicetion”, 
# Redis会回复需要更多内存的错误信息给命令。
# 例如，SET,LPUSH等等，但是会继续响应像Get这样的只读命令。
#
# 当将redis用作LRU或LFU缓存
# 或者为实例设置了硬性内存限制的时候（使用“noevicetion”策略）时，此选项很有用。
#
# 警告：当有多个slave连上达到内存上限时，
# 主服务为同步从服务的输出缓冲区所需内存不计算在使用内存中。
# 这样当移除key时，就不会因网络问题 / 重新同步事件触发移除key的循环，
# 反过来从服务的输出缓冲区充满了key被移除的DEL命令，这将触发删除更多的key，
# 直到这个数据库完全被清空为止。
#
# 总之：如果您连接多个从服务，建议您为maxmemory设置一个下限，
# 以便系统上有一些用于副本输出缓冲区的可用RAM（但如果策略为“noevection”，则不需要这样做）。
#
# maxmemory <bytes>

# MAXMEMORY POLICY:当达到最大内存时，Redis如何选择要删除的内容。你可以选择下面五种之一:
#
# volatile-lru -> 根据LRU算法删除设置过期时间的key
# allkeys-lru -> 根据LRU算法删除任何key
# volatile-random -> 随机删除设置了过期时间的key
# allkeys-random -> 随机删除任何key
# volatile-ttl -> 删除即将过期的key(minor TTL)
# noeviction -> 不删除任何key，只返回一个写错误信息
#
# LRU means Least Recently Used
# LFU means Least Frequently Used
#
# Both LRU, LFU and volatile-ttl are implemented using approximated
# randomized algorithms.
#
# 注意: 以上任何一项政策，当没有腾出足够的空间执行写命令前，redis都会报一个写错误
#       可能受影响的命令: set setnx setex append
#       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
#       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
#       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
#       getset mset msetnx exec sort
#
# 默认配置如下（不做删除操作）：
#
# maxmemory-policy noeviction

# LRU、LFU和最小TTL算法不是精确算法，而是近似算法（为了节省内存）,
# 所以你可以调整它的速度或精度。对于默认的redis将检查五个键并选择最近使用较少的键，
# 您可以使用以下配置指令更改样本大小。
#
# 默认值5会产生足够好的结果。10非常接近真实的LRU，但消耗更多的CPU。3速度更快，但不太准确。
#
# maxmemory-samples 5

# 从redis 5开始，默认情况下从服务将忽略其maxmemory设置（除非在故障是Redis cluster转移
# 主从或手动将从服务升级为主服务）这意味着删除策略只有主服务处理, 只是发送del命令给从服务
#
# 这样可以保证主从数据的一致性
# 但是，如果您的从服务是可写的，或者您希望从服务具有不同的内存设置，
# 并且您确定对从服务执行的所有写入都是等幂的，则可以更改此默认值(但一定要明白你在做什么)。
#
# replica-ignore-maxmemory yes

############################# LAZY FREEING ####################################

# Redis has two primitives to delete keys. One is called DEL and is a blocking
# deletion of the object. It means that the server stops processing new commands
# in order to reclaim all the memory associated with an object in a synchronous
# way. If the key deleted is associated with a small object, the time needed
# in order to execute the DEL command is very small and comparable to most other
# O(1) or O(log_N) commands in Redis. However if the key is associated with an
# aggregated value containing millions of elements, the server can block for
# a long time (even seconds) in order to complete the operation.
#
# For the above reasons Redis also offers non blocking deletion primitives
# such as UNLINK (non blocking DEL) and the ASYNC option of FLUSHALL and
# FLUSHDB commands, in order to reclaim memory in background. Those commands
# are executed in constant time. Another thread will incrementally free the
# object in the background as fast as possible.
#
# DEL, UNLINK and ASYNC option of FLUSHALL and FLUSHDB are user-controlled.
# It's up to the design of the application to understand when it is a good
# idea to use one or the other. However the Redis server sometimes has to
# delete keys or flush the whole database as a side effect of other operations.
# Specifically Redis deletes objects independently of a user call in the
# following scenarios:
#
# 1) On eviction, because of the maxmemory and maxmemory policy configurations,
#    in order to make room for new data, without going over the specified
#    memory limit.
# 2) Because of expire: when a key with an associated time to live (see the
#    EXPIRE command) must be deleted from memory.
# 3) Because of a side effect of a command that stores data on a key that may
#    already exist. For example the RENAME command may delete the old key
#    content when it is replaced with another one. Similarly SUNIONSTORE
#    or SORT with STORE option may delete existing keys. The SET command
#    itself removes any old content of the specified key in order to replace
#    it with the specified string.
# 4) During replication, when a replica performs a full resynchronization with
#    its master, the content of the whole database is removed in order to
#    load the RDB file just transferred.
#
# In all the above cases the default is to delete objects in a blocking way,
# like if DEL was called. However you can configure each case specifically
# in order to instead release memory in a non-blocking way like if UNLINK
# was called, using the following configuration directives:

lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no

############################## APPEND ONLY MODE ###############################

# 默认情况下，redis异步转储磁盘上的数据集。在许多应用程序中，这种模式已经足够好了，
# 但是Redis进程的问题或断电可能会导致几分钟的写入丢失（取决于配置的保存点）。
#
# AOF是另一种持久性模式，可提供更好的耐久性。例如，如果使用RDB策略,
# Redis挂掉（如服务器断电）时只会丢失一秒钟的写入时间
#
# AOF和RDB持久性可以同时启用，不会出现问题。
# Redis会优先使用AOF策略，因为更好地保证了数据持久化
#
# 请访问 http://redis.io/topics/persistence 获取更多信息

appendonly no

# AOF文件名（默认："appendonly.aof"）
appendfilename "appendonly.aof"

# fsync() 系统调用告诉操作系统把数据写到磁盘上，而不是等更多的数据进入输出缓冲区。
# 有些操作系统会真的把数据马上刷到磁盘上；有些则会尽快去尝试这么做。
# Redis支持三种不同的模式：
# no：不要立刻刷，只有在操作系统需要刷的时候再刷。比较快。
# always：每次写操作都立刻写入到aof文件。慢，但是最安全。
# everysec：每秒写一次。折中方案。
# 默认的 "everysec" 通常来说能在速度和数据安全性之间取得比较好的平衡。
#
# 更多细节信息访问下面链接：
# http://antirez.com/post/redis-persistence-demystified.html
#
# 如果不确定就使用everysec

# appendfsync always
appendfsync everysec
# appendfsync no

# 当AOF同步策略设置为always或everysec时，后台保存进程(后台保存或写入AOF日志)正在对
# 磁盘执行大量I/O，在某些Linux配置中，redis可能会在fsync（）调用上阻塞太长时间。
# 注意，目前对这个情况还没有完美修正，甚至不同线程的 fsync() 会阻塞我们同步的write(2)调用。
#
# 为了缓解这个问题，可以用下面这个选项。它可以在 BGSAVE 或 BGREWRITEAOF
# 处理时阻止fsync()。
#
# 这意味着当另一个子进程在保存时, 那么Redis就处于"不可同步"的状态。
# 这实际上是说，在最差的情况下可能会丢掉30秒钟的日志数据。（默认Linux设定）
#
# 如果把这个设置成"yes"带来了延迟问题，就保持"no"，这是保存持久数据的最安全的方式。

no-appendfsync-on-rewrite no

# 自动重写AOF文件
# 当AOF日志大小增加指定的百分比时，Redis能够调用BGREWRITEAOF自动重写AOF的日志文件。
#
# 工作原理:Redis记住上次重写AOF文件的大小(如果重启后还没有写操作，就直接用启动时的AOF大小)
#
# 这个基准大小和当前大小做比较。如果当前大小超过指定比例，就会触发重写操作。
# 你还需要指定被重写日志的最小尺寸，这样避免了达到指定百分比但尺寸仍然很小的情况还要重写。
#
# 指定百分比为0会禁用AOF自动重写特性

auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

# 如果设置为yes，如果一个因异常被截断的AOF文件被redis启动时加载进内存，
# redis将会发送日志通知用户。如果设置为no，erdis将会拒绝启动。
# 此时需要用"redis-check-aof"工具修复文件。
aof-load-truncated yes

# 在重写AOF文件时，Redis可以使用AOF文件中的RDB前导码来更快地重写和恢复。
# 启用此选项时，重写的AOF文件由两个不同的参数组成。
#
#   [RDB file][AOF tail]
#
# 当加载redis时，识别出AOF文件以“redis”字符串开头并加载前缀RDB文件，然后继续加载AOF尾部。
aof-use-rdb-preamble yes

################################ LUA 脚本  ###############################

# Lua脚本的最大执行时间（毫秒）
lua-time-limit 5000

################################ REDIS 集群  ###############################
#
# 如果想让Redis实例作为集群的一部分，需要去掉下方配置的注释
# cluster-enabled yes

# 配置redis自动生成的集群配置文件名。确保同一系统中运行的各redis实例该配置文件不要重名。
# cluster-config-file nodes-6379.conf

# 集群节点超时毫秒数。超时的节点将被视为不可用状态。
# cluster-node-timeout 15000


# 如果发生故障的主机从服务的数据太旧了，这个从服务会避免升级为主服务，
# 如果主从失联时间超过：
#   (node-timeout * replica-validity-factor) + repl-ping-replica-period
# 则不会被提升为master
#
# 如node-timeout为30秒，slave-validity-factor为10,slave-validity-factor为10,
# 默认default repl-ping-slave-period为10秒,失联时间超过310秒slave就不会成为master。
#
# 较大的slave-validity-factor值可能允许包含过旧数据的从服务器成为主服务器，
# 同时较小的值可能会阻止集群选举出新主服务。
# 为了达到最大限度的高可用性，可以设置为0，即从服务不管和主服务失联多久都可以提升为主服务
#
# cluster-replica-validity-factor 10

# 只有在之前master有其它指定数量的工作状态下的slave节点时，slave节点才能提升为master。
# 默认为1（即该集群至少有3个节点，1 master＋2 slaves，master宕机，
# 仍有另外1个slave的情况下其中1个slave可以提升）
# 测试环境可设置为0，生成环境中至少设置为1
# cluster-migration-barrier 1

# 默认情况下如果redis集群如果检测到至少有1个hash slot不可用，集群将停止查询数据。
# 如果所有slot恢复则集群自动恢复。
# 如果需要集群部分可用情况下仍可提供查询服务，设置为no。
# cluster-require-full-coverage yes


# 选项设置为yes时，会阻止replicas尝试对其主服务在主故障期间进行故障转移
# 然而，主服务仍然可以执行手动故障转移,如果强制这样做的话。
# cluster-replica-no-failover no

# In order to setup your cluster make sure to read the documentation
# available at http://redis.io web site.

########################## CLUSTER DOCKER/NAT support  ########################

# In certain deployments, Redis Cluster nodes address discovery fails, because
# addresses are NAT-ted or because ports are forwarded (the typical case is
# Docker and other containers).
#
# In order to make Redis Cluster working in such environments, a static
# configuration where each node knows its public address is needed. The
# following two options are used for this scope, and are:
#
# * cluster-announce-ip
# * cluster-announce-port
# * cluster-announce-bus-port
#
# Each instruct the node about its address, client port, and cluster message
# bus port. The information is then published in the header of the bus packets
# so that other nodes will be able to correctly map the address of the node
# publishing the information.
#
# If the above options are not used, the normal Redis Cluster auto-detection
# will be used instead.
#
# Note that when remapped, the bus port may not be at the fixed offset of
# clients port + 10000, so you can specify any port and bus-port depending
# on how they get remapped. If the bus-port is not set, a fixed offset of
# 10000 will be used as usually.
#
# Example:
#
# cluster-announce-ip 10.1.1.5
# cluster-announce-port 6379
# cluster-announce-bus-port 6380

################################## 慢日志 ###################################

# 慢查询日志，记录超过多少微秒的查询命令。
# 查询的执行时间不包括客户端的IO执行和网络通信时间，只是查询命令执行时间。
# 1000000等于1秒，设置为0则记录所有命令
slowlog-log-slower-than 10000

# 记录大小，可通过SLOWLOG RESET命令重置
slowlog-max-len 128

################################ 延时监控 ##############################

# redis延时监控系统在运行时会采样一些操作，以便收集可能导致延时的数据根源。
# 通过 LATENCY命令 可以打印一些图样和获取一些报告，方便监控
# 这个系统仅仅记录那个执行时间大于或等于预定时间（毫秒）的操作,
# 这个预定时间是通过latency-monitor-threshold配置来指定的，
# 当设置为0时，这个监控系统处于停止状态
latency-monitor-threshold 0

############################# 事件通知 ##############################

# K 	键空间通知，所有通知以 __keyspace@<db>__ 为前缀
# E 	键事件通知，所有通知以 __keyevent@<db>__ 为前缀
# g 	DEL 、 EXPIRE 、 RENAME 等类型无关的通用命令的通知
# $ 	字符串命令的通知
# l 	列表命令的通知
# s 	集合命令的通知
# h 	哈希命令的通知
# z 	有序集合命令的通知
# x 	过期事件：每当有过期键被删除时发送
# e 	驱逐(evict)事件：每当有键因为 maxmemory 政策而被删除时发送
# A 	参数 g$lshzxe 的别名
#  Example: to enable list and generic events, from the point of view of the
#           event name, use:
#
#  notify-keyspace-events Elg
#
#  Example 2: to get the stream of the expired keys subscribing to channel
#             name __keyevent@0__:expired use:
#
#  notify-keyspace-events Ex
# Redis能通知 Pub/Sub 客户端关于键空间发生的事件，默认关闭
notify-keyspace-events ""

############################### 高级配置 ###############################

# 当hash只有少量的entry时，并且最大的entry所占空间没有超过指定的限制时，会用一种节省内存的
# 数据结构来编码。可以通过下面的指令来设定限制
hash-max-ziplist-entries 512
hash-max-ziplist-value 64

# 当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。
# 比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。
# 当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。
# 这时，它只能取-1到-5
# 这五个值，每个值含义如下：
#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb => 1024 bytes）
#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。
#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。
#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）
#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。
list-max-ziplist-size -2

# 这个参数表示一个quicklist两端不被压缩的节点个数。
# 注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。
# 实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。
# 参数list-compress-depth的取值含义如下：
#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。
#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。
#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。
#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。
#    依此类推…
# 由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，
# 以便于在表的两端进行快速存取。
list-compress-depth 0

# set有一种特殊编码的情况：当set数据全是十进制64位有符号整型数字构成的字符串时。
# 下面这个配置项就是用来设置set使用这种编码来节省内存的最大长度。
set-max-intset-entries 512

# 与hash和list相似，有序集合也可以用一种特别的编码方式来节省大量空间。
# 这种编码只适合长度和元素都小于下面限制的有序集合
zset-max-ziplist-entries 128
zset-max-ziplist-value 64

# HyperLogLog稀疏结构表示字节的限制。该限制包括
# 16个字节的头。当HyperLogLog使用稀疏结构表示
# 这些限制，它会被转换成密度表示。
# 值大于16000是完全没用的，因为在该点
# 密集的表示是更多的内存效率。
# 建议值是3000左右，以便具有的内存好处, 减少内存的消耗
hll-sparse-max-bytes 3000

# Streams宏节点最大大小/项目。 流数据结构是基数编码内部多个项目的大节点树。
# 使用此配置可以配置单个节点的字节数，以及切换到新节点之前可能包含的最大项目数
# 追加新的流条目。 如果以下任何设置设置为0，忽略限制，因此例如可以设置一个
# 大入口限制将max-bytes设置为0，将max-entries设置为所需的值
stream-node-max-bytes 4096
stream-node-max-entries 100

# 启用哈希刷新，每100个CPU毫秒会拿出1个毫秒来刷新Redis的主哈希表（顶级键值映射表）
activerehashing yes

# 客户端的输出缓冲区的限制，可用于强制断开那些因为某种原因从服务器
# 读取数据的速度不够快的客户端
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60

# 客户端查询缓冲区累积新命令。 它们仅限于固定的默认情况下，
# 多数情况下为了避免协议不同步导致客户端查询缓冲区中未绑定的内存使用量的错误
# 但是，如果你有使用的话，你可以在这里配置它，比如我们有很多执行请求或类似的。
# client-query-buffer-limit 1gb

# 在Redis协议中，批量请求，即表示单个的元素strings，通常限制为512 MB。
# 但是，您可以z更改此限制
# proto-max-bulk-len 512mb

# 默认情况下，“hz”的被设定为10。提高该值将在Redis空闲时使用更多的CPU时，但同时当有多个key
# 同时到期会使Redis的反应更灵敏，以及超时可以更精确地处理
hz 10

# Normally it is useful to have an HZ value which is proportional to the
# number of clients connected. This is useful in order, for instance, to
# avoid too many clients are processed for each background task invocation
# in order to avoid latency spikes.
#
# Since the default HZ value by default is conservatively set to 10, Redis
# offers, and enables by default, the ability to use an adaptive HZ value
# which will temporary raise when there are many connected clients.
#
# When dynamic HZ is enabled, the actual configured HZ will be used as
# as a baseline, but multiples of the configured HZ value will be actually
# used as needed once more clients are connected. In this way an idle
# instance will use very little CPU time while a busy instance will be
# more responsive.
dynamic-hz yes

# 当一个子进程重写AOF文件时，如果启用下面的选项，则文件每生成32M数据会被同步
aof-rewrite-incremental-fsync yes

# 当redis保存RDB文件时，如果启用了以下选项，每生成32 MB数据，文件将被fsync-ed。
# 这很有用，以便以递增方式将文件提交到磁盘并避免大延迟峰值。
rdb-save-incremental-fsync yes

# Redis LFU eviction (see maxmemory setting) can be tuned. However it is a good
# idea to start with the default settings and only change them after investigating
# how to improve the performances and how the keys LFU change over time, which
# is possible to inspect via the OBJECT FREQ command.
#
# There are two tunable parameters in the Redis LFU implementation: the
# counter logarithm factor and the counter decay time. It is important to
# understand what the two parameters mean before changing them.
#
# The LFU counter is just 8 bits per key, it's maximum value is 255, so Redis
# uses a probabilistic increment with logarithmic behavior. Given the value
# of the old counter, when a key is accessed, the counter is incremented in
# this way:
#
# 1. A random number R between 0 and 1 is extracted.
# 2. A probability P is calculated as 1/(old_value*lfu_log_factor+1).
# 3. The counter is incremented only if R < P.
#
# The default lfu-log-factor is 10. This is a table of how the frequency
# counter changes with a different number of accesses with different
# logarithmic factors:
#
# +--------+------------+------------+------------+------------+------------+
# | factor | 100 hits   | 1000 hits  | 100K hits  | 1M hits    | 10M hits   |
# +--------+------------+------------+------------+------------+------------+
# | 0      | 104        | 255        | 255        | 255        | 255        |
# +--------+------------+------------+------------+------------+------------+
# | 1      | 18         | 49         | 255        | 255        | 255        |
# +--------+------------+------------+------------+------------+------------+
# | 10     | 10         | 18         | 142        | 255        | 255        |
# +--------+------------+------------+------------+------------+------------+
# | 100    | 8          | 11         | 49         | 143        | 255        |
# +--------+------------+------------+------------+------------+------------+
#
# NOTE: The above table was obtained by running the following commands:
#
#   redis-benchmark -n 1000000 incr foo
#   redis-cli object freq foo
#
# NOTE 2: The counter initial value is 5 in order to give new objects a chance
# to accumulate hits.
#
# The counter decay time is the time, in minutes, that must elapse in order
# for the key counter to be divided by two (or decremented if it has a value
# less <= 10).
#
# The default value for the lfu-decay-time is 1. A Special value of 0 means to
# decay the counter every time it happens to be scanned.
#
# lfu-log-factor 10
# lfu-decay-time 1

########################### ACTIVE DEFRAGMENTATION #######################
# 启用主动碎片整理
# activedefrag yes
 
# 启动活动碎片整理的最小碎片浪费量
# active-defrag-ignore-bytes 100mb
 
# 启动碎片整理的最小碎片百分比
# active-defrag-threshold-lower 10
 
# 使用最大消耗时的最大碎片百分比
# active-defrag-threshold-upper 100
 
# 在CPU百分比中进行碎片整理的最小消耗
# active-defrag-cycle-min 5
 
# 磁盘碎片整理的最大消耗
# active-defrag-cycle-max 75
 
# 将从主字典扫描处理的最大set / hash / zset / list字段数
# active-defrag-max-scan-fields 1000


```



:::