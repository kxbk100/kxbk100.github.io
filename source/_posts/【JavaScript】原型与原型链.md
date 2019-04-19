---
title: 【JavaScript】原型与原型链
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

# 构造函数
---

**是什么**

- 构造函数首字母大写
- 构造函数类似于模板


**组合**

## new一个构造函数，返回一个对象的过程

**new一个对象是什么**

根据构造函数模板创建一个对象

**new一个对象顺序**

1. new的时候把参数传入也可不传
2. new函数执行时，创建一个空对象
3. this指向这个新对象`this = {}`
4. 执行代码，即对this.name等开始顺序赋值
5. 赋值完后，默认return this
6. 赋值给`f`，`f.name`、`f.age`、`f.class`生效

```js
function Foo(name, age){
  this.name = name;
  this.age = age;
  this.class = 'class-1';
  // return this    //默认有这一行
}

var f = new Foo('zhangsan', 20);
// var f1 = new Foo('lisi', 23); 可创建多个对象
```

**Tips**

- `var a = {}`其实是`var a = new Object()`的语法糖
- `var a = []`其实是`var a = new Array()`的语法糖
- `var Foo = funtion () {...}`其实是`var Foo = new Function(){...}`的语法糖
- 所有的引用类型（对象、数组、函数）都有构造函数
- 推荐使用前者的写法
- 使用`instanceof`判断一个函数是否是一个变量的构造函数

# 原型
---

> 涉及面试题：如何理解原型？如何理解原型链？


**是什么**

当我们创建一个对象时 `let obj = { age: 25 }`，我们可以发现能使用很多种函数，但是我们明明没有定义过它们

![](/images/20190410230542984.png)

当我们在浏览器中打印 `obj` 时你会发现，在 `obj` 上居然还有一个 `__proto__` 属性，那么看来之前的疑问就和这个属性有关系了。

其实每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型。这个属性在现在来说已经**不推荐直接去使用它**了，这只是浏览器在早期为了让我们访问到内部属性 `[[prototype]]` 来实现的一个东西。

讲到这里好像还是没有弄明白什么是原型，接下来让我们再看看 `__proto__` 里面有什么吧。

![](/images/20190410230724580.png)

看到这里你应该明白了，**原型也是一个对象**，并且这个**对象中包含了很多函数**，所以我们可以得出一个结论：对于 `obj` 来说，可以通过 `__proto__` 找到一个**原型对象**，在该对象中定义了很多函数让我们来使用。

在上面的图中我们还可以发现一个 `constructor` 属性，也就是构造函数

![](/images/20190411001355579.png)
![](/images/20190417234523563.png)
打开 `constructor` 属性我们又可以发现其中还有一个 `prototype` 属性，并且这个属性对应的值和先前我们在 `__proto__` 中看到的一模一样。所以我们又可以得出一个结论：原型的 `constructor` 属性指向构造函数，构造函数又通过 `prototype` 属性指回原型，但是并不是所有函数都具有这个属性，`Function.prototype.bind()` 就没有这个属性。

其实原型就是那么简单，接下来我们再来看一张图，相信这张图能让你彻底明白原型和原型链

![](/images/20190411001243757.png)



看完这张图，我再来解释下什么是原型链吧。其实原型链就是多个对象通过 `__proto__` 的方式连接了起来。为什么 `obj` 可以访问到 `valueOf` 函数，就是因为 `obj` 通过原型链找到了 `valueOf` 函数。

对于这一小节的知识点，总结起来就是以下几点：

*   `Object` 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
*   `Function` 是所有函数的爸爸，所有函数都可以通过 `__proto__` 找到它
*   函数的 `prototype` 是一个对象
*   对象的 `__proto__` 属性指向原型， `__proto__` 将对象和原型连接起来组成了原型链
*   原型的 `constructor` 属性指向构造函数，构造函数又通过 `prototype` 属性指回原型


**组合**

## 原型链
- `f.toString()`  ->  `f.__proto__`  ->  `Foo.prototype` -> 无`toString`属性 -> `Foo.prototype`是一个对象 -> `Foo.prototype.__proto`__ -> `Object.prototype` -> `f.__proto__.__proto__`
- `Object.prototype.__proto__ = null`

```js
// 构造函数
function Foo(name, age){
  this.name = name;
}
Foo.prototype.alertName = function () {
  alert(this.name);
}
// 创建实例 
var f = new Foo('zhangsan');
f.printName = function () {
  console.log(this.name);
}
// 测试
f.printName();
f.alertName();
f.toString(); // 要去f.__proto__.__proto__中查找
```
![](/images/2019040401394160.png)
![](/images/20190404013953717.png)

# 5条原型规则和示例
---

1. **所有**的引用类型（数组、对象、函数），都具有**对象**特性，即可自由扩展属性（`null`除外）


```js
var obj ={};
obj.a = 100 ;
var arr = [];
arr.a = 100;
function fn(){};
fn.a = 100;
```

2. **所有的引用类型**，都有一个`__proto__`属性（隐式原型属性），属性值是一个普通的**对象**

```js
console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);
```

3. **所有函数**，都有一个`prototype`属性（显式原型属性），属性值是一个普通的**对象**
- Number、String、Boolean、**Object**、**Array**、**Function**、Date、RegExp、Error（一定要大写）都是函数

```js
console.log(fn.prototype);
```

4. **所有引用类型**，`__proto__`属性值指向（完全等===）他的构造函数的`prototype`属性值

```js
console.log(obj.__proto__ === Object.prototype)
```

5. 当试图得到一个对象的某个属性时，若果这个对象本身没有这个属性，那么它的`__proto__`（即它的构造函数的`prototype`）中寻找

```js
// 构造函数
function Foo(name, age){
  this.name = name;
}
Foo.prototype.alertName = function () {
  alert(this.name);
}
// 创建实例
var f = new Foo('zhangsan');
f.printName = function () {
  console.log(this.name);
}
// 测试
f.printName();
f.alertName();
```

- f本身没有`alertName`的属性，所以会去f的隐式原型`__proto__`中去寻找，f的隐式原型`__proto__`即为其构造函数Foo的显式原型`prototype`，Foo的显式原型已被扩展了`alertName`的属性，所以可顺利执行
- this永远指向对象本身，在执行`f.alertName()`的时候会执行到第6行`alert(this.name)`，但是这里的this还是f本身

## 循环对象自身属性
- 从上述代码中可得f拥有三个属性：name、printName、alertName
- 但我们往往希望拿到对象本身定义的属性，而不要来自其原型的属性
```js
var item;
for(item in f){
  // 高级浏览器已经在for in中屏蔽了来自原型的属性
  // 但这里建议大家加上这个判断，保证程序的健壮性以满足浏览器的兼容性
  if(f.hasOwnProperty(item)){
    console.log(item)
  }
}
```


# instanceof
---

**是什么**

用于判断**引用类型**属于哪个**构造函数**的方法

**目的**

如果我们想判断一个对象的正确类型，这时候可以考虑使用 `instanceof`，因为内部机制是**通过原型链来判断的**，在后面我们也会自己去实现一个 `instanceof`
```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

**如何达成**

- `f instanceof Foo`判断逻辑：`f`的`__proto__`一层一层往上，能否对应到`Foo.prototype`
- `f instanceof Object`判断逻辑：`f`的`__proto__`一层一层往上，是否对应到`Object.prototype`


**组合**

通过对象内部属性`[[class]]`来实现

**条件**

对于基本类型来说，你想直接通过 `instanceof` 来判断类型是不行的，当然我们还是有办法让 `instanceof` 判断原始类型的

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

你可能不知道 `Symbol.hasInstance` 是什么东西，其实就是一个能让我们自定义 `instanceof` 行为的东西，以上代码等同于 `typeof 'hello world' === 'string'`，所以结果自然是 `true` 了。这其实也侧面反映了一个问题， `instanceof` 也不是百分之百可信的
