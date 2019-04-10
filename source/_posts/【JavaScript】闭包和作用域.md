---
title: 【JavaScript】闭包和作用域
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

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
---
- 没有**块级作用域**（ES6中的let使得JS存在块级作用域）
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
---
**是什么**

去父级作用域取值，根据调用回到变量定义或函数声明的地方的父作用域

**目的**

查找自由变量

**组合**

当前作用域没有定义的变量，即“自由变量”

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
---

> 涉及面试题：什么是闭包？

**是什么**

函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么**函数 B** 就是闭包

```js
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A();
B(); // 1
```

很多人对于闭包的解释可能是函数嵌套了函数，然后返回一个函数。其实这个解释是不完整的，就比如我上面这个例子就可以反驳这个观点。


**目的**

- 让我们可以间接访问函数内部的变量
- 在函数外面，根本不可能修改掉函数中定义的变量的值，以保证数据的安全不被污染

**组合**


> 经典面试题，循环中使用闭包解决 `var` 定义函数的问题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

首先因为 `setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6

解决办法有三种
- 第一种是使用闭包的方式

```js
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

在上述代码中，我们首先使用了**立即执行函数**将 `i` 传入函数内部，这个时候值就被固定在了参数 `j` 上面不会改变，当下次执行 `timer` 这个闭包的时候，就可以使用外部函数的变量 `j`，从而达到目的。

- 第二种就是使用 `setTimeout` 的第三个参数，这个参数会被当成 `timer` 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

- 第三种就是使用 `let` 定义 `i` 了来解决问题了，这个也是**最为推荐的方式**

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

let 是 ES6 的新增命令，用法同 var， 但作用域不同
- var 定义的变量会被提升，在整个函数作用域内都可以使用（在变量声明之前的代码也能够使用该变量，此时它的值是 undefined）。在函数作用域内只存在这一个变量
- let 定义的变量是块级作用域，仅在代码块中有效，且**不存在变量提升**

```js
{
  var a = 1
  let b = 1
}
a // 1
b // ReferenceError: a is not defined
```
函数作用域在其完成使命后，会被**析构**掉。但如果函数内部的变量仍被外部引用，函数的生命周期则会延续到引用变量的函数被析构

for 语句执行完后，定时器传入的匿名函数仍保持**对变量 i 的引用**，而此时 i 的值经过迭代后，变为了6，所以打印出来的值都是6

如果把 let 声明的变量提到外面，其结果和 var命令 是一样的
```js
let j=1
for(; j<=5; j++){
  setTimeout(function(){console.log(j)})
}
// 6 6 6 6 6
for(var i=1; i<=5; i++){
  setTimeout(function(){console.log(i)})
}
// 6 6 6 6 6
```

重点在 for 循环机制上

在 for 三个语句中，第一个语句在循环代码块开始前执行，每次循环都会执行
- 由于 `var` 命令的变量提升机制，`var` 命令实际只会执行**一次**
- 而 `let` 命令不存在变量提升，所以每次循环都会执行一次，声明一个新变量（但初始化的值不一样）

for 的每次循环都是不同的块级作用域，而 let 声明的变量是块级作用域的，所以也不存在重复声明的问题。

> 因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。  《ES6入门》· 阮一峰

因此，在第二个例子中，每个匿名函数实际上引用的都是一个新的变量

```js
for(let i=1; i<=5; i++){
  setTimeout(function(){console.log(i)})
}
// 1 2 3 4 5
```

**条件**

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
