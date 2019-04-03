---
title: 【JavaScript】第二章 变量类型和计算
date: 2019-02-01 19:27:04
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1. JS中使用typeof能得到的哪些类型
> 1. 何时使用`===`何时使用`==`
> 1. JS中有哪些内置函数
> 1. JS变量按照存储方式区分为哪些类型，并描述其特点
> 1. 如何理解JSON

# 1 变量类型
## 值类型 VS 引用类型
值类型：
- 数据之间是值类型的：number、string、boolean、null、undefined
- 把每一个值存放在对应变量内存的位置，数据分块存放在内存中，数据之间不会相互影响

```js
var a = 100;
var b = a;
a = 200;
console.log(b); //100
```
引用类型
- 数据是引用类型的：对象、数组、函数（object、array、function）
- 把a赋值成一个对象，这个对象存在另一个地方，a内存的位置通过指针指向这个对象的地方，把b赋值成a时，其实是定义了一个b，b的指针又指向对象的位置，变量实际上是1个真实对象的指针
- 好几个变量共用1个内存块，节省内存空间，赋值只是变量指针的赋值，并不是每次赋值都把对象真正的值复制一份，所以值的修改相互干预
- 产生原因：若a赋值成一个对象，特别大，a再赋值给b，b也会占很大的空间，不合理，所以引用类型是为了让内存共用空间
- 运行过程：执行完1、2行代码后，`age = 20`这个对象是1份不是2份，只不过a和b同时指向了这个对象，第3行`b.age = 21`时，对象的值改成了21，a也指向这个对象，所以`a.age`也是21
- 特点：无限制扩展属性，比如说对象有个age属性，可以加第2个属性name属性
```js
var a = {age:20};
var b = a;
b.age = 21;
conlose.log(a.age) //21
```
## typeof运算符详解
- typeof可以识别6种数据类型（识别出来的结果）：undefined、string、number、boolean、object、function
- `typeof null -> object`，null是一个特殊的对象，它是1个空的指针，定义了1个位置，但未指向任何一个引用类型的1个真实的对象，但是类型仍是object
- typeof运算符：只能区分值类型的详细类型，引用类型无法细分
- 引用类型只能区分出function，除了function，其它的引用类型是区分不出来了。因为函数是一个十分特殊的引用类型，在js中函数的地位非常高，所以需要在任何地方轻松判断出这个是函数，所以typeof单独把函数列出来
```js
// 前4种都可以识别出来，因为都是值类型
typeof undefined //undefined
typeof 'abc' //string
typeof 123 //number
typeof true //boolean
// 后4种无能为力，识别出来只能是object/function，因为是引用类型
typeof {} //object
typeof [] //object
typeof null //object
typeof console.log //function
```
# 2 变量计算
- 针对值类型，需要强制类型转换
- 针对引用类型，需要API支持，是一种功能类型的计算，并不是变量本身发生变化的计算，只是更改对象内部属性

针对值类型的强制类型转换原则：
- string数据会转换number数据
- number会转换成true
- 0、''、null、undefined会转换成false
- 慎用`==`，`===`无类型转换
## ==运算符
```js
null == undefined;  //true
100 == '100';  //true
0 = '';  //true
```
## 字符串拼接
- 此处特殊，number会转化成string，其余string会转化成number
```js
var a = 100 + 10;  //110
var b = 100 + '10';  //'10010'
```
## if语句
- 此处特殊，为false的情况：0、''、null、undefined、NaN、false
```js
var a = true
if(a) {
  ...
}
var b = 100
if(b) {
  ...
}
var c=''
if(c) {
  ...
}
```
## 逻辑运算与或非（&&、||、!）
```js
console.log(10 && 0);  //0
console.log(''||'abc');  //'abc'
console.log(!window.abc);  //true
// 判断1个变量会被当做true还是false的方法
var a = 100;
console.log(!!a);  //true
```
# 3 题目解答
> 1. JS中使用typeof能得到的哪些类型

typeof可以识别6种数据类型：number、string、boolean、object、function、undefined

> 2. 何时使用`===`何时使用`==`

使用jQuery源码中推荐的写法，当obj.a为null或undefined时，看一个对象的属性是否存在或看一个函数的参数是否存在，但对象和形参必须定义，否则会报错，可简写使用`==`，除此外一律用`===`
```js
// 看一个对象的属性是否存在
if(obj.a == null) {
  // 相当于obj.a === null || obj.a ===undefined，简写形式
}

// 看一个函数的参数是否存在
function(a, b) {
  if(a == null) {...}
}
```

> 3. JS中有哪些内置函数（数据封装类对象）

都是函数
- Number、String、Boolean、**Object**、**Array**、**Function**、Date、RegExp、Error（一定要大写）

内置对象
- Math、JSON
> 4. JS变量按照存储方式区分为哪些类型，并描述其特点

值类型：数据分块存放在内存中，数据不会相互干涉
```js
var a = 100;
var b = a;
a = 200;
console.log(b); //100
```
引用类型：好几个变量共用1个内存块，节省内存空间，赋值只是变量指针的赋值，并不是真正值的拷贝，所以值的修改相互干预
```js
var a = {age:20};
var b = a;
b.age = 21;
conlose.log(a.age) //21
```

> 5. 如何理解JSON如何理解JSON

- json只不过是一个JS对象而已
- json也是一种数据格式
- math也是JS对象
```js
JSON.stringify({a:10,b:20}) //将对象转换为字符串
JSON.parse('{"a":10,"b":20}') //将字符串变为对象
```

