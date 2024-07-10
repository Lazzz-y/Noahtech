---
Ltitle: Lock
author: Noah
date: 2024/07/09 21:18
categories: 

 - JUC
tags:
  - JUC
  - 并发编程
  - 锁
---
# Lock

[[toc]]



## 线程的五大状态

- **新建状态:** 新建线程对象。没有调用 start() 之前。
- **就绪状态:** 调用 start() 之后，线程进入就绪状态。
- **运行状态:** 线程被设置为当前线程，由CPU调度分配。
- **阻塞状态:** 线程被暂停，调用 sleep() 方法后线程就进入阻塞状态。
- **死亡状态:** 线程执行结束。

## 锁类型

- **可重入锁(synchronized 和 ReentrantLock):** 在执行对象中所有同步方法不用再次获得锁。
- **可中断锁:** 在等待获取锁过程中可中断。Lock是可中断锁，synchronized 不是可中断锁。
- **公平锁:** 按等待获取锁的线程的等待时间进行获取，等待时间长的具有优先获取锁的权利，且不可插队。
- **非公平锁:** 可以插队的锁，ReentrantLock 和 ReentrantReadWriteLock 创建时默认为非公平锁，可以指定创建为公平锁。
- **读写锁（ReadWriteLock和ReentrantReadWriteLock）**：对资源读取和写入的时候拆分为2部分处理，读的时候可以多线程一起读，写的时候必须同步地写。

## 传统的锁(synchronized)

Synchronized 是 Java 并发编程中很重要的关键字，其目的是一次只允许一个线程进入由它修饰的代码段。

### 释放锁

- 获取锁的线程执行完同步代码后，锁自动释放。
- 线程执行发生异常，JVM 会让线程释放锁。

### 获取锁

假设 A 线程获取锁， B 线程等待。如果 A 线程阻塞，那么B线程也会一直等待

### 使用

```java
public class SaleTicketDemo01 {

    public static void main(String[] args) {
        // 并发：多线程操作同一个资源，把资源丢入线程。
        Ticket ticket = new Ticket();

        new Thread(()->{for (int i = 0; i < 20; i++) ticket.sale();},"A").start();
        new Thread(()->{for (int i = 0; i < 20; i++) ticket.sale();},"B").start();
        new Thread(()->{for (int i = 0; i < 20; i++) ticket.sale();},"C").start();
    }
}

class Ticket{

    private int tickerNum = 50;
	
    // synchronized的本质是队列和锁
    public synchronized void sale(){
        if (tickerNum > 0){
            System.out.println(Thread.currentThread().getName()+"卖出第"+tickerNum+"张票");
            tickerNum--;
        }
    }
}
```

## Lock锁

Lock是一个接口，在创建Lock锁的时候可以指定创建公平锁和非公平锁，默认为非公平锁。

### 释放锁

Lock需要手动调用 unlock() 方法进行释放锁，并且发生异常时不会自动释放锁，因此使用Lock需要在 try-catch 中运行，并且将释放锁放在 finally 块中。

### 获取锁

Lock中声明了4个方法来获取锁

- **lock():** 最常用的加锁方法，如果锁已经被其他线程获取，则进行等待。
- **tryLock():** 该方法拥有返回值，表示尝试获取锁，获取成功返回true，失败返回false。拿不到锁不会一直等待
- **tryLock(long time, TimeUnit unit):** 与 tryLock() 类似，区别在于这个方法拿不到锁时会等待一定的时间，在时间期限之内如果还是拿不到锁，就返回false。
- **lockInterruptibly():** 如果线程正在等待获取锁，则这个线程能够响应中断，即中断线程等待过程。

### Lock 初体验

```java
public class SaleTicketDemo02 {

    public static void main(String[] args) {
        Ticket2 ticket = new Ticket2();

        new Thread(()->{for (int i = 0; i < 20; i++) ticket.sale();},"A").start();
        new Thread(()->{for (int i = 0; i < 20; i++) ticket.sale();},"B").start();
        new Thread(()->{for (int i = 0; i < 20; i++) ticket.sale();},"C").start();
    }
}

class Ticket2{

    private int tickerNum = 50;

    private final ReentrantLock lock = new ReentrantLock();

    public void sale(){

        lock.lock();

        try {
            if (tickerNum > 0){
                System.out.println(Thread.currentThread().getName()+"卖出第"+tickerNum+"张票");
                tickerNum--;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            lock.unlock();
        }
    }

}
```

## Synchronized 和 Lock 的区别

1. Synchronized 内置的 Java 关键字；Lock 是一个Java Interface。
2. Synchronized 无法判断获取锁的状态；Lock 可以判断获取锁的状态。
3. Synchronized 会自动释放锁；Lock 必须要手动释放锁，并且线程异常也不会自动释放锁，如果不释放就会出现死锁。
4. Synchronized 线程如果堵塞，后续线程就会一直等；Lock 可以调用四种获取送方法，不一定会一直等待下去，
5. Synchronized 不可以中断，非公平锁；Lock 可以判断锁，可以指定获取非公平锁与公平锁。
6. Synchronized 适合锁少量的代码同步问题，Lock 适合锁大量的同步代码。