---
title: 初识JVM
author: Noah
date: 2024/07/03 14:11
categories: 
 - JVM
tags:
 - Java
 - JVM
 - JDK
---

# 初识JVM
[[toc]]

::: tip 面试常见问题：

1. 请谈谈你对JVM的理解？
2. Java8虚拟机和之前的变化更新？
3. 什么是OOM，什么是溢出StackOverFlowError？怎么分析？
4. JVM常用的调优参数有哪些？
5. 内存快照如何抓取，怎么分析Dump文件？
6. 谈谈JVM中，你对类加载器的认识？

:::

## JVM概述
JVM（Java Virtual Machine，Java虚拟机）是一个虚拟化的计算环境，负责执行Java字节码并提供运行Java程序所需的系统资源，它是Java平台的一部分，能够使Java程序具有跨平台的特性，实现“一次编写，到处运行”。

## JVM体系架构

JVM主要有由以下几个部分组成：

1. **类加载器子系统（Class Loader Subsystem）：**
   - 负责加载、链接和初始化Java类。把字节码文件(.class)加载到JVM中。
   - 包括加载、验证、准备、解析和初始化五个阶段
2. **运行时数据区（Runtime Data Areas）：**
   JVM在运行时使用的内存结构，包括以下几个重要区域：
   - **方法区（Method Area）：** 存储已加载的类信息（构造方法、接口定义），常量、静态变量和运行时常量池等。
   - **堆（Heap）：** 存储所有对象实例，是垃圾收集的主要区域。
   - **栈（Java Stack）：** 每个线程都会创建一个Java栈，存储局部变量，操作数栈，方法出口等信息。每个方法在调用时都会创建一个栈帧。
   - **程序计数器（Program Counter Register）：** 每个线程都有一个独立的程序计数器，存储当前线程正在执行的字节码的地址。
   - **本地方法栈（Native Method Stack）：** 为JVM使用本地方法服务，存储本地方法和调用结果。
3. **执行引擎（Exection Engine）：**
   - **解释器（Interpreter）：** 将字节码解释称机器码逐条执行，但效率较低。
   - **即时编译器（JIT Compiler）：** 将热点代码编译成机器码，提高执行效率。
   - **垃圾收集器（Garbage Collector）：** 自动管理堆内存，回收不在使用的对象，避免内存溢出。
4. **本地方法接口（JNI，Java Native Interface）：**
   - 允许Java代码调用和被本地方法调用，通常是C或者C++编写的程序，用于与操作系统的底层资源进行交互。



<img src="https://raw.githubusercontent.com/Noah2Y/img/main/blog/20240703145327.png" style="zoom:80%;" />

Java栈、本地方法栈、程序计数器不会有垃圾回收，否则程序会死掉。百分之99的JVM调优都是在方法区和堆（99%是堆）中调优，Java栈、本地方法栈、程序计数器不会有垃圾的存在。

## native关键字

- 凡是带了native关键字的，说明Java本身的作用范围达不到要求了，会去调用底层C语言的库。
- 调用本地方法接口 JNI(Java Native Interface)
- JNI 的作用: 开拓Java的使用，融合不同的编程语言为Java所用。
- Java诞生之初C、C++横行，Java想要立足，就必须要有调用C、C++的程序。
- 它在内存空间中专门开辟了一块标记区域：Native Method Stack，等级native方法。
- 在最终执行的时候，加载本地方法库中的方法通过JNI。

目前该关键字使用的越来越少了，除非是与硬件有关的应用，比如通过Java程序驱动打印机。
