---
title: 【JavaScript】闭包和作用域
date: 2019-03-06 00:34:15
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1. 说一下变量提升的理解
> 2. 说明this几种不同的使用场景
> 3. 创建10个`<a>`标签，点击的时候弹出来对应的序号
> 4. 如何理解作用域
> 5. 实际开发中闭包的应用

# 执行上下文（声明提升）
---
范围：一段`<script>`或者一个函数
- 全局（某个`<script>`）：变量定义提前、函数声明提前
- 函数（函数即将执行之前）：变量定义提前、函数声明提前、确定this的值、确定arguments的值

注意：函数声明和函数表达式的区别

函数声明
```js
fn(); // 不会报错，因为函数声明会提升
function fn() {
  ... // 函数声明
}
```
函数表示式
```js
fn1(); // 会报错，fn1会被当做变量定义，会提升相当于var fn1 = undefined，在执行fn1();
// 以下均为函数表达式，函数表达式本质上即为变量定义
var a = 100;
var fn1 = function () {
  ...
}
```
假如下列代码在一个`<script>`中，在一个`<script>`中要定义一个全局的执行上下文，在执行第1行代码之前，会把所有的变量声明和函数声明都执行一遍，执行顺序如下：
- 第2行，变量定义 ，还未执行到此，所以不会赋值，把a先拿出来，用undefined代替来占位
- 第4-8行，函数声明，把整个函数拿出来，以此函数生效可以执行
- 第1行，undefined
- 第2行，a被赋值成100
- 第3行，进入函数体，函数顺利执行
- 第7行，变量定义，并用undefined代替来占位
- 第5行，age被赋值成20
- 第6行，打印arguments参数
```js
console.log(a); // undefined
var a = 100;
fn('zhangsan'); // 'zhangsan', 20
function fn(name) {
  age = 20;
  console.log(name, age);
  var age；
}
```

```js
// 全局
// var a = undefined;
console.log(a);
var a = 100;

fn('zhangsan');
function fn(name) {
  // 函数
  // 函数代码执行之前（不是函数声明之前），就已经确定了this的值
  console.log(this);
  // 函数代码执行之前（不是函数声明之前），就已经确定了arguments的值
  // arguments：函数参数的集合体
  console.log(arguments);
  age = 20;
  console.log(name, age);
  var age;

  bar(100);
  function bar(num) {
    console.log(num);
  }
}
```
# this
---

> 涉及面试题：如何正确判断 this？箭头函数的 this 是什么？

**是什么**

指向当前对象

**分类边界**

可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。

如果你还是觉得有点绕，那么就看以下的这张流程图吧，图中的流程只针对于单个规则。

![](/images/20190405174036963.png)


this要在执行时才能确定值，定义时无法确认
- 一个函数后面加`()`，即为要执行
- 在此之前，函数永远处于定义状态
```js
var a = {
  name: 'A',
  fn: function () {
    console.log(this.name);
  }
} // 只看到这里不能确认this到底是什么
a.fn(); // this === a
a.fn.call({ name: 'B' }); // this === {name: 'B'}
var fn1 = a.fn;
fn1(); // this === window
```


**组合**

## call apply bind中的this判断

说到 `bind`，不知道大家是否考虑过，如果对一个函数进行多次 `bind`，那么上下文会是什么呢？

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```

如果你认为输出结果是 `a`，那么你就错了，其实我们可以把上述代码转换成另一种形式

```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2();
```

可以从上述代码中发现，不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`

```js
let a = { name: 'yck' }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'yck'
```

## 题目描述

将函数 fn 的执行上下文改为 obj，返回 fn 执行后的值

示例1

输入

```js
alterContext(function() {return this.greeting + ', ' + this.name + '!'; }, {name: 'Rebecca', greeting: 'Yo' })
```

输出

```js
Yo, Rebecca!
```

回答

```js
function alterContext(fn, obj) {
  return fn.bind(obj)(); // .bind()返回的是一个函数，所以需要立即执行
}
 
function alterContext(fn, obj) {
  return fn.call(obj);
}
 
function alterContext(fn, obj) {
  return fn.apply(obj);
}
```

**条件**

对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`

```js
function foo() {
  console.log(this.a)
}
var a = 1
foo()
```

对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象

```js
const obj = {
  a: 2,
  foo: foo
}
obj.foo()
```

对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`

```js
const c = new foo()
```

箭头函数

箭头函数中的 `this`
```js
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```

- 首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`
- 在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`
- 另外对箭头函数使用 `bind` 这类函数是无效的

最后种情况也就是 `bind` 这些改变上下文的 API 了，对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window`

ex

作为构造函执行

```js
function Foo(name) {
  // this = {};
  this.name = name;
  // return this;
}
var f = new Foo('zhangsan');
```

作为对象属性执行

```js
var obj = {
  name: 'A',
  printName: function () {
    console.log(this.name); // this === obj
  }
}
obj.printName();
```

作为普通函数执行
```js
function fn() {
  console.log(this); // this === window
}
fn();
```
call apply bind
```js
function fn1(name, age) {
  alert(name);
  alert(age);
  console.log(this);  // this === window
}

// call表示{x:100}为this，'zhangsan'为第1个参数，20为第2个参数，最常用
fn1.call({ x: 100 }, 'zhangsan', 20);

// apply将后面当做数组，相当于fn1.apply({ x: 100 }, ['zhangsan', 20]);
fn1.apply({ x: 100 }, 'zhangsan', 20);

// 使用bind修改默认this，.bind必须是函数表达式
var fn2 = function (name, age) {
  alert(name);
  alert(age);
  console.log(this);
}.bind({ y: 200 })
fn2('zhangsan', 20)
```

# 作用域
- 没有**块级作用域**
- 但有**函数**和**全局作用域**
```js
// 没有块级作用域
if (true) {
  // 在外面定义和定义在if语句块中是一样的
  // 尽量不要在块中定义变量，容易使程序不易读
  var name = 'zhangsan';
}
console.log(name); // 'zhangsan'

// 但有函数和全局作用域
var a = 100;
function fn() {
  var a = 200;
  // 函数中也有a，则使用函数中的a = 200
  // 函数中的变量值，外面是改不了的
  // 所以框架的第三方库就采用将变量定义在函数中的方法来防止变量被污染，与外面隔绝
  console.log('fn', a);
}
console.log('global', a);// 全局 a = 100
fn();  // 函数 a = 200
```
# 作用域链
- 去父级作用域取值，根据调用回到变量定义或函数声明的地方的父作用域
```js
var a = 100
function fn() {
  var b = 200;
  // 当前作用域没有定义的变量，即“自由变量”
  console.log(a); // 去父级作用域取值，变量定义或函数声明时的父作用域
  console.log(b)
}
fn();
```
```js
var a = 100;
function F1() {
  var b = 200;
  function F2() {
    var c = 300;
    // a是自由变量
    // 父级F1中a未定义，再在F1父级中找a，a = 100
    console.log(a);
    // b是自由变量
    console.log(b);
    console.log(c);
  }
  F2();
}
F1();
```
# 闭包
## 使用场景
函数作为返回值
```js
function F1() {
  // a是F1局部变量
  var a = 100;
  // 返回一个函数（函数作为返回值）
  return function () {
    // a是个自由变量
    console.log(a); // 去父级作用域取值，声明时的父作用域
  }
}
var f1 = F1();
// a是全局变量，不会影响到函数中定义的局部变量
var a = 200;
// 不是看此处执行时的作用域，而是回到其定义处的作用域
f1(); // 100
```
函数作为参数传递
```js
function F1() {
  // a是F1局部变量
  var a = 100;
  // 返回一个函数（函数作为返回值）
  return function () {
    // a是个自由变量
    console.log(a); // 去父级作用域取值，声明时的父作用域
  }
}
var f1 = F1();

function F2(fn) {
  var a = 200;
  fn(); // 此处为执行作用域
}

F2(f1);
```
## 意义
在函数外面，根本不可能修改掉函数中定义的变量的值，以保证数据的安全不被污染

# 题目解答
---
> 1. 说一下变量提升的理解

- 变量定义
- 函数声明（注意和函数表达式的区别）

> 2. 说明this几种不同的使用场景

- 构造函数
- 对象属性
- 普通函数
- call apply bind

> 3. 创建10个`<a>`标签，点击的时候弹出来对应的序号

错误写法
```js
var i, a
for (i = 0; i < 10; i++) {
  a = document.createElement('a');
  a.innerHTML = i + '<br>';
  a.addEventListener('click', function (e) {
    e.preventDefault();
    // i是自由变量，要去父作用域获取值，无块级作用域（for），即要找全局作用域
    alert(i);
  })
  document.body.appendChild(a);
}
```
正确写法
```js
var i;
for (i = 0; i < 10; i++) {
  // 自执行函数，不用调用，只要定义完成，立即执行的函数
  (function (i) {
    // 函数作用域
    var a = document.createElement('a');
    a.innerHTML = i + '<br>';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      // i是自由变量，要去父作用域获取值，无块级作用域（for），即要找全局作用域
      alert(i);
    })
    document.body.appendChild(a);
  })(i)
}
```

> 4. 如何理解作用域

- 自由变量 
- 作用域链，即自由变量的查找
- 闭包的两个场景

> 5. 实际开发中闭包的应用

- 闭包实际应用主要用于封装变量，收敛权限
- 闭包的意义：你在isFirstLoad()函数外面，根本不可能修改掉_list的值，以保证数据的安全不被污染
```js
function isFirstLoad() {
  // _list表示是私有的
  var _list = [];

  return function (id) {
    if (_list.indexOf(id) >= 0) {
      return false;
    } else {
      _list.push(id);
      return true;
    }
  }
}

var firstLoad = isFirstLoad();
firstLoad(10); // true
firstLoad(10); // false
firstLoad(20); // true
firstLoad(20); // false
```
