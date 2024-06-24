---
title: Java引用数据类型
author: Noah
date: 2024/06/19 16:49
categories: 
 - Java基础入门
tags:
 - Java
 - 基础
 - JDK
 - 数据类型
---
# Java引用数据类型

::: info 前言
上一章中，介绍了Java的八大基础数据类型(整数型，浮点型，字符型，布尔型)，
这些类型是Java内置的类型，用于表示简单值；而引用数据类型是指向对象实例的类型，
而不是直接存储值。
:::
---
[[toc]]
## 引用数据类型
引用数据类型包括：
- **类(Class):** 用于定义对象的属性和方法。
- **接口(Interface):** 定义一组方法，具体实现由类来完成。
- **数组(Array):** 用于存储多个相同类型的数据。
- **枚举(Enum):** 一种特殊的类，用于定义一组固定的常量。
- **字符串(String):** 用于表示字符序列，一种特殊的类。
- **集合框架(Collections Framework):** 提供了存储和操作一组对象的方法。
- **异常(Exception):** 程序运行过程中出现的错误或意外情况，异常也是对象。

### 类(Class)
#### 定义一个类
一个类通过关键字`class`来定义，类名通常与文件名相同。
::: details 示例代码👍
```java
public class Person {
    // 字段（属性）
    String name;
    int age;

    // 构造方法（用于初始化对象）
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 方法（行为）
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }

    // 主方法（程序的入口点）
    public static void main(String[] args) {
        // 创建对象
        Person person = new Person("Alice", 30);
        // 调用方法
        person.display();
    }
}
```
:::
#### 类的组成部分
- **字段(Field):** 类中定义的变量，用于存储数据。
- **构造方法(Constructor):** 用于初始化对象，可以通过`new`关键字调用。
- **方法(Method):** 类中定义的函数，用于实现特定的功能。
#### 实例化对象
通过`new`关键字来实例化对象，并调用构造方法来初始化对象。
::: details 示例代码👍
```java
Person person1 = new Person("刘备", 30);
Person person2 = new Person("关羽", 25);

```
:::


### 接口(Interface)
#### 定义一个接口
一个接口通过关键字`interface`来定义，接口中只能定义抽象方法，不能定义具体实现的方法。
::: details 示例代码👍
```java
public interface MyInterface {
    void method1();
    void method2();
}
```
:::
#### 实现一个接口
一个类可以通过关键字`implements`来实现一个接口，实现接口时必须实现接口中的所有抽象方法。
::: details 示例代码👍
```java
public class MyClass implements MyInterface {
    @Override
    public void method1() {
        System.out.println("Implementing method1");
    }

    @Override
    public void method2() {
        System.out.println("Implementing method2");
    }
}
```
:::

### 数组(Array)
#### 声明一个数组
一个数组通过`[]`来声明，数组中可以存储多个相同类型的数据。
::: details 示例代码👍
```java
int[] array; // 声明一个整型数组
array = new int[5]; // 创建一个包含5个元素的数组
int[] array = new int[5]; // 一步完成数组的声明和创建
int[] array = {1, 2, 3, 4, 5}; // 使用静态初始化创建并赋值
```
:::
#### 特点
- **定长:** 数组一旦创建，其大小固定，不能动态改变
  - **同类型:** 数组中的所有元素必须是相同的数据类型
  - **顺序存储:** 数组中的元素按照顺序存储在内存中，可以通过索引来访问元素


### 枚举(Enum)
#### 定义一个枚举
一个枚举通过关键字`enum`来定义，枚举中可以定义常量。
::: details 示例代码👍
```java
public enum Color {
    RED, GREEN, BLUE;
}
```
:::
#### 使用枚举
可以通过枚举的常量来访问枚举中的值。
::: details 示例代码👍
```java
public class EnumExample {
    public static void main(String[] args) {
        Color myColor = Color.RED;

        switch (myColor) {
            case RED:
                System.out.println("Color is Red");
                break;
            case GREEN:
                System.out.println("Color is Green");
                break;
            case BLUE:
                System.out.println("Color is Blue");
                break;
        }
    }
}
```
:::

### 字符串(String)
#### 定义一个字符串
`String`类用于表示字符串，字符串是不可变的，一旦创建就不能被修改。这意味一旦创建，它的值就不能被修改
####特点
- **不可变性:** `String`类中的字符串值是不可变的，一旦创建就不能被修改。
- **字符串池:** Java维护一个字符串池，字符串池中包含了所有的字符串字面量。相同的字面量字符串在内存中只有一个副本，这样可以减少内存的开销。
::: details 示例代码👍
```java
String str = "Hello";
str = str + " World"; // 创建了一个新的字符串对象

String str1 = "Hello";
String str2 = "Hello";
System.out.println(str1 == str2); // 输出 true，因为str1和str2引用的是同一个对象
```
:::

### 集合框架(Collections Framework)
#### 核心接口
集合框架的核心接口定义了集合的基本操作。主要接口包括：

- **Collection**: 是所有集合的根接口，定义了基本操作，如添加、删除、迭代等。
- **List**: 继承自Collection接口，表示有序的元素集合。常用实现类包括ArrayList、LinkedList等。
- **Set**: 继承自Collection接口，表示无序且不允许重复元素的集合。常用实现类包括HashSet、LinkedHashSet、TreeSet等。
- **Queue**: 继承自Collection接口，表示一个先进先出的集合。常用实现类包括LinkedList、PriorityQueue等。
- **Map**: 不继承Collection接口，表示键值对的集合。常用实现类包括HashMap、LinkedHashMap、TreeMap等。

#### 实现类
Java集合框架提供了一些实现上述接口的类：

- **ArrayList**: 实现了可变大小的数组，适合随机访问元素。
- **LinkedList**: 实现了链表结构，适合频繁的插入和删除操作。
- **HashSet**: 基于哈希表实现的Set，保证元素的唯一性但不保证顺序。
- **LinkedHashSet**: 保证元素的插入顺序。
- **TreeSet**: 基于红黑树实现的Set，保证元素的排序。
- **HashMap**: 基于哈希表实现的Map，键值对的顺序不保证。
- **LinkedHashMap**: 保证键值对的插入顺序。
- **TreeMap**: 基于红黑树实现的Map，键值对按照键的自然顺序排序。

#### 工具类
- **Collections**: 提供了一些静态方法用于操作或返回集合，如排序、查找、线程安全包装等。

### 异常(Exception)
#### 受检异常（Checked Exception）
受检异常是编译器强制要求处理的异常，通常是由于外部原因引起的（如文件未找到、网络故障等）。这些异常需要通过`try-catch`块或在方法签名中声明`throws`来处理。
::: details 示例代码👍
```java
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class CheckedExceptionExample {
    public static void main(String[] args) {
        try {
            File file = new File("nonexistentfile.txt");
            FileReader fr = new FileReader(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
:::
#### 非受检异常（Unchecked Exception）
非受检异常包括运行时异常（Runtime Exception）和错误（Error），通常是由编程错误引起的，如数组越界、空指针引用等。非受检异常不要求强制处理，但建议通过适当的代码逻辑避免这些异常的发生。

::: details 示例代码👍
```java
public class UncheckedExceptionExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        try {
            System.out.println(numbers[3]); // 数组越界异常
        } catch (ArrayIndexOutOfBoundsException e) {
            e.printStackTrace();
        }
    }
}
```
:::

## 主要区别
1. **存储位置：**
    - **基础数据类型：** 直接存储在栈内存中，存储的是实际的值。
    - **引用数据类型：** 存储在堆内存中，栈内存中存储的是对象的引用（地址）。

2. **大小和内存分配：**
    - **基础数据类型：** 内存大小固定且由Java语言规范定义。
    - **引用数据类型：** 内存大小不固定，取决于对象的具体实现和属性。

3. **默认值：**
    - **基础数据类型：** 有默认值，例如`int`的默认值是`0`，`boolean`的默认值是`false`。
    - **引用数据类型：** 默认值是`null`，表示不引用任何对象。

4. **使用方式：**
    - **基础数据类型：** 直接使用基本的运算符进行操作。
    - **引用数据类型：** 通过对象的引用调用其方法和属性。

5. **性能：**
    - **基础数据类型：** 由于直接存储值，性能较高，适用于对性能要求高的场景。
    - **引用数据类型：** 由于需要通过引用访问对象，性能相对较低，但灵活性和功能性更强。
