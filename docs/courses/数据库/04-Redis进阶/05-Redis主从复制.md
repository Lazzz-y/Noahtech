---
title: Redis主从复制
author: Noah
date: 2024/07/08 13:50
categories: 
 - Redis进阶
tags:
 - Redis
 - Redis进阶
---
# Redis主从复制

[[toc]]

::: tip 什么是发布订阅？:frowning:

Redis 主从复制(Replication) 是一种将数据从一个 Redis 实例(主服务器，Master) 复制到一个或多个 Redis 实例(从服务器，Slave) 的机制。这种机制很重要，它可以用于提高数据的可用性、扩展读取性能和实现数据备份。Master以写为主，Slave以读为主。

:::

## 主从复制的工作原理

### 基本概念

- **主服务器(Master):** 主要负责写操作，数据的源头。所有的数据变更都首先应用到 Master 上。
- **从服务器(Slave):** 复制 Master 的数据，主要负责读取操作。Slave 不会处理(默认情况下)，所有写操作指向 Master。Slave 可以从其他 Slave 中进行复制，从而形成树形结构的复制拓扑

### 复制过程

1. **初始化之后:** 当 Slave 第一次启动并连接到 Master 时，会触发全量同步。
2. **全量同步:** 
   - Slave 向 Master 发送 `PSYNC` 命令。
   - Master 生成 RDB 快照，并在生成的同时，将所有新写入的操作缓存在内存中。
   - 快照生成完毕后，Master 将快照发送给 Slave，Slave 收到快照后将其载入内存。
   - 同时，Master 将缓存在内存中的写操作发送给 Slave，Slave执行这些写操作，以便与 Master 的状态保持一致。
3. **增量同步:**
   - Slave 和 Master 同步后，将继续保持连接并接收 Master 的新写操作。
   - Master 的每个写操作都会发送给所有连接的Slave，Slave接收并执行这些操作，保持与Master的数据一致。

## 配置主从复制

### 配置主服务器

主服务器通常不需要额外配置，只需要确保Redis正常运行。

```bash
# 用配置文件方式启动Redis,选择要启动的Redis配置文件即可。
redis-server /etc/redis/redis.conf
```

### 配置从服务器

在从服务器的配置文件中，设置以下选项:

```bash
# 配置从服务器连接到主服务器的IP和端口
replicaof <masterip> <masterport>

# 如果主服务器设置了密码，从服务器需要提供该密码
masterauth <master-password>
```

示例

``` bash
replicaof 127.0.0.1 6379
masterauth 123456
```

保存配置文件并启动从服务器

```bash
redis-server /path/to/slave/redis.conf
```

### 动态配置从服务器

除了在配置文件中设定外，还可以通过 Redis 命令动态设置从服务器：

```bash
# 连接从服务器
redis-cli -p <slave-port>

# 设置主服务器
CONFIG SET replicaof <masterip> <masterport>

# 设置主服务器的密码（如果有）
CONFIG SET masterauth <master-password>
```

## 角色切换

Redis 支持两种切换角色的方式。

### 促使 Slave 成为 Master

打开 Slave 配置文件，删除或注释掉 `replicaof` 配置项，然后重启 Slave 。

### 手动故障转移

Redis 提供了 `Slaveof` 命令，可以手动触发故障转移

```bash
redis-cli -p <slave-port>
SLAVEOF NO ONE
```

## 复制拓扑结构

Redis 允许创建多层级树形结构的复制拓扑。一个主服务器可以有多个从服务器，而每个从服务器可以有自己的从服务器：

```plaintext
Master
  ├── Slave1
  │     ├── Slave1.1
  │     └── Slave1.2
  └── Slave2
        └── Slave2.1
```

## 优缺点

### 优点

1. **高可用性:** 通过增加 Slave ，提高系统的可用性和容灾能力。
2. **读扩展性:** Slave 可以分担读取压力，从而扩展系统的读取性能。
3. **备份:** Slave 提供了数据的实时副本，适合做数据备份。

### 缺点

1. **一致性:** 主从复制是异步的，Slave 可能会有延迟，导致数据暂时不一致。
2. **写不可扩展性:** 写操作只能应用到Master，无法通过增加 Slave 来扩展写性能。
3. **故障切换和恢复:** 当 Master 宕机时，需要手动或使用工具进行故障切换。
