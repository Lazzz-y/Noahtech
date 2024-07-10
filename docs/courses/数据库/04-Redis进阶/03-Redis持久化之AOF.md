---
title: Redis持久化之AOF
author: Noah
date: 2024/07/07 20:17
categories: 
 - Redis进阶
tags:
 - Redis
 - Redis进阶
---
# Redis持久化之AOF
[[toc]]

AOF（Append-Only File）是 Redis 提供的一种持久化机制，它通过记录每一个写操作来实现数据的持久化存储。与 RDB 快照相比，AOF提供了更高的数据恢复精度，因为它能够以更细粒度的方式记录数据变化。

## AOF 工作原理

AOF 通过将每一个写操作(如 SET、SADD 等)追加到一个日志文件中来记录数据变更。当服务器重启时，Redis 会重新执行这些写操作以恢复数据。

### 主要步骤

1. **写操作追加:**
   - 每个写操作都会以 Redis 命令的形式被追加到 AOF 文件中 `appendonly.aof`。
2. **文件同步:**
   - 根据配置，Redis 以不同的同步频率将 AOF 文件同步到磁盘上。
3. **重写:**
   - 随着时间推移，AOF 文件会变得越来越大。为了防止 AOF 文件过大，Redis 会定期进行重写（rewrite），以生成更小和高效的 AOF 文件。

## AOF工作流程

1. 子进程fork父进程。
2. 子进程根据内存中的数据快照，将写命令记录在临时的AOF文件中。父进程继续处理 Client 请求。
3. 父进程将写命令几率在临时缓存里面，并写入原来的AOF文件中。
4. 临时 AOF 文件记录完成数据快照中的命令后，子进程通知父进程写入完毕。
5. 父进程将缓存的写命令写入到临时文件。
6. 父进程用写入完毕的临时 AOF 文件替换旧的 AOF 文件。
7. 父进程后面的写命令都将往新的AOF文件中追加。

![](https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240708134057.jpg)

## 配置 AOF 持久化

### 配置文件

```bash
# 启用AOF持久化
appendonly yes

# AOF文件名
appendfilename "appendonly.aof"

# AOF文件保存路径
dir /var/lib/redis
```

### 文件同步策略

Redis 提供三种同步策略，分别是 `always`、`everysec`、`no`，这些策略会影响数据安全性和写性能。

```bash
# AOF文件的同步策略
appendfsync everysec
```

- **`always`:** 每次写操作都立即同步到磁盘，保证最大的数据安全性，但性能较低。
- **`everysec`:** 每秒同步一次，写性能与数据安全性之间的良好折中，推荐配置。
- **`no`:** 由操作系统决定何时同步，性能最好，但数据安全性最低。

## AOF 重写(rewrite)

AOF 文件会随着写操作的增多而不对增长，Redis 提供AOF 重写机制来优化文件大小和性能。

### 自动触发重写

通过以下配置，Redis会在满足条件时自动触发 AOF 重写:

```bash
# AOF文件重写触发条件
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

- **`auto-aof-rewrite-percentage` :** 设置当前 AOF 文件大小相对于上一次重写后的增长百分比，超过该百分比时触发重写。
- **`auto-aof-rewrite-min-size`:** 设置重写的最小文件大小，当 AOF 文件大小小于此值时不进行重写。

### 手动触发重写

可以通过 Redis 命令手动触发AOF重写

```bash
> BGREWRITEAOF
```

## AOF 的优缺点

### 优点

- **数据恢复精度高:** 相比于RDB，AOF 能够更细粒度的记录数据，每一个写操作都会被保存。
- **数据丢失少:** 默认配置下(appendfsync everysec)，最多只会丢失1秒的数据。
- **可读性强:** AOF 文件是一个包含所有写操作的日志，可以方便的进行审计和分析。

### 缺点

- **文件较大:** 由于每个写操作都被记录，AOF 文件通常比 RDB 文件大。
- **恢复速度慢:** 恢复时需要执行所有写操作，时间较长，恢复速度较慢。
- **性能问题:** 频繁的写操作以及同步磁盘会影响写性能。

## RDB 和 AOF 对比

- **数据恢复精度**：AOF 提供更高的精度，几乎不会丢失数据，而 RDB 只能恢复到最后一次快照生成的状态。
- **性能**：AOF 写操作频繁，可能会影响性能，RDB 对性能影响较小。
- **文件大小**：AOF 文件通常较大，而 RDB 文件较为紧凑。
