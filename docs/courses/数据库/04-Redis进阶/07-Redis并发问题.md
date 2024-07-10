---
title: Redis并发问题
author: Noah
date: 2024/07/10 16:44
categories: 
 - Redis进阶
tags:
 - Redis
 - Redis进阶
 - 并发
---
# Redis并发问题
[[toc]]

::: tip 前言:telescope:
在项目开发中，数据都是要持久化到磁盘中去的，但是由于流量会越来越大，导致查询速度也逐渐变慢。所以在实战项目中，一般都会使用缓存来提升查询速度。Redis作为一款高性能的内存数据库，一般都会被用作缓存来使用。但是，Redis在并发情况下，可能会出现一些问题，比如缓存穿透、缓存雪崩、缓存击穿等。本节将介绍Redis并发问题以及解决方案。:smile:

1. 缓存雪崩 Cache Avalanche
2. 缓存穿透 Cache Penetration
3. 缓存击穿 Hotspot Invalid

:::

## 缓存穿透

<img src="https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240710174847.jpg" style="zoom:80%;" />

### 概念

缓存穿透是指用户访问一个数据，但是这个数据在缓存层并不存在，也就是缓存没有命中。于是直接向持久层数据库进行查询，发生持久层数据库也没有该数据，于是本次查询失败。当用户流量大的时候，缓存都没有命中，于是都去向持久层数据库发送请求，这会给持久层数据库造成很大的压力，这个时候就相当于出现了缓存穿透。

### 解决方法

#### 缓存空值

- **原理:** 当查询到数据库中不存在的数据时，将空值(如 `null` 或特定标识) 缓存起来，设置一个合理的过期时间，这样下次相同的查询就可以直接从缓存层中返回，不要在访问数据库。

简单示例:

```java
public class CachePenetrationDemo01 {

    private final Jedis cache = new Jedis("192.168.128.129", 6001);

    public static void main(String[] args) {
        CachePenetrationDemo01 cp = new CachePenetrationDemo01();
        System.out.println(cp.getData("test"));
    }

    public Object getData(String key) {
        if (cache.get(key) == null) {
            // 查询数据库
            Object data = getDataFromDB(key);
            // 如果数据库不存在，则缓存数据不存在，设置一分钟过期时间
            if (data == null)
                cache.setex(key, 60, "数据不存在");
                // 如果数据库存在则缓存到缓存层
            else
                cache.setex(key, 60, data.toString());
        }
        return cache.get(key);
    }

    public Object getDataFromDB(String key) {
        // 模拟数据库查询结果为空
        return null;
    }

}
```

#### 布隆过滤器

- **原理:** 布隆过滤器是一种非常高效的数据结构，对所有可能查询的参数以 hash 形式存储。可以用来判断一个元素是否在一个集合中。虽然存在一个概率的误判，但对于缓存穿透问题，它可以有效过滤掉不存在的数据请求，避免这些请求直接到达数据库，给数据库造成压力。

::: info 提醒:telescope:

在实际应用中，可以在缓存层先使用布隆过滤器检查数据是否存在，如果返回 `false` ，说明数据一定不存在，无需查询数据库；如果返回 `true` ，就需要进一步查询缓存或数据库确认数据的存在。

:::

## 缓存击穿

<img src="https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240710190431.jpg" style="zoom:80%;" />

### 概念

缓存击穿是指一个热点key，在不停的扛着大并发，大并发集中对这一个key进行访问，当这个key失效的瞬间，持续的大并发就穿破缓存层直接访问持久层数据库，瞬间给持久层数据库带来巨大的压力。

### 解决方法

#### 互斥锁(Mutex Lock)

- **原理:** 保证同一时间只有一个请求去访问数据库获取并更新缓存，其他请求需要等待锁释放后从缓存中读取数据。

简单示例：

```java
public class HotspotInvalid {
    private final Jedis cache = new Jedis("192.168.128.129", 6001);
    private final ReentrantLock lock = new ReentrantLock(); // 这里使用本地锁，在分布式环境下需要使用分布式锁
    
    public String getData(String key) {
        String data = cache.get(key);
        if (data == null) {
            lock.lock();
            try {
                // 再次检查数据，因为在上锁期间可能已经有其他线程更新了缓存
                data = cache.get(key);
                if (data == null) {
                    data = fetchFromDatabase(key);
                    cache.set(key, data); // 将数据写入缓存
                }
            } finally {
                lock.unlock();
            }
        }
        return data;
    }

    private String fetchFromDatabase(String key) {
        // 模拟从数据库获取数据
        System.out.println("Fetching data from database for key: " + key);
        return "Data for key: " + key;
    }
```

#### 永久缓存热点数据

- **原理:** 将热点key永久保存在缓存中，这样只要数据不被删除或替换，就一直在缓存中，避免了过期问题。

## 缓存雪崩

<img src="https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240710190457.jpg" style="zoom:80%;" />

### 概念

缓存雪崩是指在某一个时间段，缓存集中失效，导致了大量的请求涌入持久层数据库中，给数据库带来巨大的压力。例如当用户请求一个过期的数据，如果没有适当的处理机制，那么这个请求会直接访问到持久层数据中。如果这种请求频繁发生，特别是在高并发的情况下，数据库将面临巨大的压力，可能会导致服务向变慢，甚至服务终端。

### 解决方法

#### 缓存失效

##### 过期时间随机化

- **原理:** 通过为每个缓存项设置一个随机的过期时间，避免大量缓存同时过期，减少数据库的瞬时压力。

##### 多级缓存

- **原理:** 构建多级缓存，如本地缓存+远程缓存，利用本地缓存的高速度和远程缓存的大容量，分担请求压力，提高系统的稳定性和可用性。

##### 缓存预热

- **原理:** 缓存预热是指在系统启动或在预期的高峰访问时段之前，提前将热点数据加载到缓存中，以减少数据库访问的压力。这样可以避免在系统启动初期或负载高峰期，因缓存为准备好而导致数据库的压力激增。

#### 缓存中间件故障

##### 服务熔断

- **原理:** 当检测到缓存中间件故障时，暂停业务逻辑，直接返回错误或默认值，避免系统整体崩溃。

