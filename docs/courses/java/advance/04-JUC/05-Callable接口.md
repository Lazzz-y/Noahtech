---
title: Callable 接口
author: Noah
date: 2024/07/29 18:21
categories: 
 - JUC
tags:
  - JUC
  - 并发编程
---
# Callable 接口

[[toc]]

## 与 Runnable 的区别

- Callable 规定的方法是 call(), Runnable 规定的方法是 run().
- Callable 的任务执行带有返回值, Runnable 任务没有返回值.
- Callabel 的 call 方法能抛出异常, Runnable 的 run 方法不能抛出异常.

## FutureTask 接口

- FutureTask 类实现了 RunnableFuture 接口, 而 RunnableFuture 接口继承了 Runnable 和 Future 接口, 所以说 FutureTask 是一个提供异步计算结果的任务.
- FutureTask 可以用来包装 Callable 或者 Runnable 对象. 因为 FutureTask 实现了 Runnable 接口, 所以 FutureTask 也可以被提交给 Executor.

## Callable 示例

```java
public class CallableTest {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyThread myThread = new MyThread();

        // 适配类
        FutureTask<Integer> task = new FutureTask<>(myThread);

        new Thread(task, "A").start();
        new Thread(task, "B").start(); // 不会执行

        // 获取 Callable 的返回结果.
        Integer rs = task.get(); // get 方法可能会产生阻塞, 需要把get方法放到最后. 或者使用异步通讯处理.

        System.out.println(rs);
    }
}

class MyThread implements Callable<Integer> {

    @Override
    public Integer call() throws Exception {
        System.out.println(Thread.currentThread().getName() + " come in call() method");
        return 1;
    }
}
```

**结果:**

```bash
A come in call() method
1
```

## FutureTask 的任务仅执行一次?

FutrueTask run方法源代码

```java
public void run() {
    if (state != NEW ||
        !UNSAFE.compareAndSwapObject(this, runnerOffset,
                                     null, Thread.currentThread()))
        return;
    try {
        Callable<V> c = callable;
        if (c != null && state == NEW) {
            V result;
            boolean ran;
            try {
                result = c.call();
                ran = true;
            } catch (Throwable ex) {
                result = null;
                ran = false;
                setException(ex);
            }
            if (ran)
                set(result);
        }
    } finally {
        // runner must be non-null until state is settled to
        // prevent concurrent calls to run()
        runner = null;
        // state must be re-read after nulling runner to prevent
        // leaked interrupts
        int s = state;
        if (s >= INTERRUPTING)
            handlePossibleCancellationInterrupt(s);
    }
}
```

**原因:**

- state != NEW 表示任务正在被执行或已执行完成, run() 方法直接 return.
- state == NEW, 则尝试使用 CAS 将当前线程设置为执行 run() 的线程, 如果失败,说明已经有其他线程先行一步执行了 run(),则当前线程直接 return.

FutureTask线程执行的几个状态:

``` java
private volatile int state;
//线程创建状态
private static final int NEW = 0;
//完成(一个瞬时的标记)   
private static final int COMPLETING = 1;
//正常完成状态
private static final int NORMAL = 2;
//执行过程出现异常
private static final int EXCEPTIONAL = 3;
//执行过程中被取消
private static final int CANCELLED = 4;
//线程执行被中断(**一个瞬时的标记**)
private static final int INTERRUPTING = 5;
//线程执行被中断的状态
private static final int INTERRUPTED = 6;
```

volatile保证了线程执行的状态改变之后会刷新到内存中，被其他线程可见

如果线程还处于未完成的状态，即`s <= COMPLETING`，就会进入等待状态，调用awaitDone(false, 0L)方法