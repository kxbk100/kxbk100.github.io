---
title: 【JavaScript】原型与原型链
date: 2019-02-01 19:29:46
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

# 构造函数
---

- 构造函数首字母大写
- 构造函数类似于模板
## new一个构造函数，返回一个对象的过程
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
# 构造函数-扩展
---

- `var a={}`其实是`var a=new Object()`的语法糖
- `var a=[]`其实是`var a=new Array()`的语法糖
- `funtion() Foo(){...}`其实是`var Foo=Function(){...}`的语法糖
- 所有的引用类型（对象、数组、函数）都有构造函数
- 推荐使用前者的写法
- 使用`instanceof`判断一个函数是否是一个变量的构造函数
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

# 原型链
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
# instanceof
**是什么**

用于判断**引用类型**属于哪个**构造函数**的方法

**目的**

如果我们想判断一个对象的正确类型，这时候可以考虑使用 `instanceof`，因为内部机制是通过原型链来判断的，在后面我们也会自己去实现一个 `instanceof`
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

