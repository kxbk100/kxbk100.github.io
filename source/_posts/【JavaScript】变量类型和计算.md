---
title: 【JavaScript】变量类型和计算
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

# 变量类型
---
JS中有7种**内置类型**，7种内置类型又分为两大类型
- 基本类型/值类型：`null`、`undefined`、`boolean`、`number`、`string`、`symbol`
- 对象/引用类型：`object`

## 基本类型/值类型

> 涉及面试题：原始类型有哪几种？null 是对象嘛？

**是什么**

把每一个值存放在对应变量内存的位置，数据分块存放在内存中，数据之间不会相互影响
```js
var a = 100;
var b = a;
a = 200;
console.log(b); // 100
```
**条件**

原始类型存储的都是值，是没有函数可以调用的，比如`undefined.toString()`
![](/images/20190325104109107.png)
 `'1'.toString()` 是可以使用的。在这种情况下，`'1'` 已经不是原始类型了，而是被强制转换成了 `String` 类型（大写）也就是引用类型，所以可以调用 `toString` 函数
 
JS 的`number` 类型是浮点类型的，在使用中会遇到某些 Bug
- `NaN`也属于`number`类型，并且`NaN`不等于自身
- `0.1 + 0.2 !== 0.3`

`string`类型是不可变的，无论你在`string`类型上调用何种方法，都不会对值有改变

对于`null`来说，很多人会认为他是个引用类型，其实这是错误的。虽然 `typeof null` 会输出 `object`，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 **32 位系统**，为了性能考虑使用**低位存储**变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来

## 对象/引用类型
> 涉及面试题：对象类型和原始类型的不同之处？函数参数是对象会发生什么问题？

**是什么**

当你创建了一个引用类型a的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针），引用类型a存储的就是这个地址 
```js
const a = [];
```
对于常量 `a` 来说，假设内存地址（指针）为 `#001`，那么在地址 `#001` 的位置存放了值 `[]`，常量 `a` 存放了地址（指针） `#001`

当我们将变量赋值给另外一个变量时，复制的是原本变量的地址（指针），也就是说当前变量 `b` 存放的地址（指针）也是 `#001`，当我们进行数据修改的时候，就会修改存放在地址（指针） `#001` 上的值，也就导致了两个变量的值都发生了改变
```js
const a = []
const b = a
b.push(1)
```

**产生原因**

若a赋值成一个对象，特别大，a再赋值给b，b也会占很大的空间，不合理，所以引用类型是为了让内存共用空间，好几个变量共用1个内存块，节省内存空间，赋值只是变量指针的赋值，并不是每次赋值都把对象真正的值复制一份，所以值的修改相互干预

**分类边界**

数组`array`、函数`function`、对象`object`

**目的**

无限制扩展属性，比如说对象有个age属性，可以加第2个属性name属性

**组合**

## 深浅拷贝
> 涉及面试题：什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？

对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都被改变的情况。通常在开发中我们不希望出现这样的问题，我们可以使用**浅拷贝**来解决这个情况

```js
let a = {
  age: 1
}
let b = a
a.age = 2
console.log(b.age) // 2
```

### 浅拷贝

**条件**

- 通过 `Object.assign` 来解决这个问题

很多人认为这个函数是用来深拷贝的。其实并不是，`Object.assign` 只会拷贝所有的属性值到新的对象中，**如果属性值是对象的话，拷贝的是地址**，所以并不是**深拷贝**。
```js
let a= {
  age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```

- 通过**展开运算符** `...` 来实现浅拷贝

```js
let a = {
  age: 1
}
let b = { ...a }
a.age = 2
console.log(b.age) // 1
```

- 通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况就可能需要使用到深拷贝了

```js
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

浅拷贝只解决了**第一层**的问题，如果接下去的值中**还有对象**的话，那么就又回到最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了。

### 深拷贝
**条件**

这个问题通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决
```js
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first) // FE
```

但是该方法也是有局限性的：

*   会忽略 `undefined`
*   会忽略 `symbol`
*   不能序列化函数（会忽略函数）
*   不能解决循环引用的对象

```js
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj)
```

如果你有这么一个循环引用对象，你会发现并不能通过该方法实现深拷贝

![](/images/20190410224903500.png)

在遇到函数、 `undefined` 或者 `symbol` 的时候，该对象也不能正常的序列化
```js
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}
```

你会发现在上述情况中，该方法会忽略掉函数、 `undefined` 和 `Symbol` 。

但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题。

如果你所需拷贝的对象**含有内置类型**并且**不包含函数**，可以使用 `MessageChannel`

```js
function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()
```

当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，比如原型链如何处理、DOM 如何处理等等，所以这里我们实现的深拷贝只是简易版，并且我其实更推荐使用 [lodash 的深拷贝函数](https://lodash.com/docs/4.17.11#cloneDeep)。

```js
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```

**条件**

函数参数是对象的情况
```js
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }
  return person;
}

const p1 = {
  name: 'yck',
  age: 25
}

const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

- 首先，函数传参是传递对象指针的副本
- 到函数内部修改参数的属性这步，我相信大家都知道，当前 `p1` 的值也被修改了
- 但是当我们重新为 `person` 分配了一个对象时就出现了分歧，请看下图

![](/images/20190405182545309.png)

所以最后 `person` 拥有了一个新的地址（指针），也就和 `p1` 没有任何关系了，导致了最终两个变量的值是不相同的

# typeof运算符
---
> 涉及面试题：typeof 是否能正确判断类型？instanceof 能正确判断对象的原理是什么？

**是什么**

只能区分基本类型的详细类型，引用类型无法细分

**分类边界**

`typeof`对于基本类型来说，除了`null`都可以显示正确的类型
```js
typeof null // 'object' BUG
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof 1 // 'number'
typeof '1' // 'string'
typeof Symbol() // 'symbol'
```
`typeof`对于引用类型来说，除了函数都会显示`object`，所以说`typeof`并不能准确判断引用变量到底是什么类型。因为函数是一个十分特殊的引用类型，在JS中函数的地位非常高，所以需要在任何地方轻松判断出这个是函数，所以typeof单独把函数列出来
```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

**组合**

instanceof


# 类型转换
---

> 涉及面试题：该知识点常在笔试题中见到，熟悉了转换规则就不惧怕此类题目了。


**是什么**

在JS中类型转换只有三种情况
- 转换为布尔值
- 转换为数字
- 转换为字符串

![](/images/2019040518250766.png)

**组合**

## 转Boolean
在条件判断时，除了`undefined`、`null`、`false`、`NaN`、`''`、`0`、`-0`，其他所有值都转为`true`，包括所有对象

## 引用类型转基本类型
引用类型在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下
- 如果已经是基本类型了，那就不需要转换了
- 调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
- 调用 `x.toString()`，如果转换为基础类型，就返回转换的值
- 如果都没有返回基本类型，就会报错

当然你也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高
```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

## 四则运算
**目的**

- 字符串拼接
- 运算

**组合**

- 加法运算中一方为**字符串**，那么就会把另一方也转换为**字符串**
- 加法运算中一方**不是数字或字符串**，那么会将它转换为**数字或字符串**

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"
```
- 对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
- 对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
- 对于第三行代码来说，触发特点二，所以将数组通过 `toString` 转为字符串 `1,2,3`，得到结果 `41,2,3`

**条件**

对于加法还需要注意这个表达式 `'a' + + 'b'`
```js
'a' + + 'b' // -> "aNaN"
```
因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`

**Tips**

- 用 `+ '1'` 的形式来快速获取 `number` 类型
- 用`!!`判断变量会被当做`true`还是`false`

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字
```js
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```

## 比较运算符

**是什么**
`== > < !=`

**组合**

如果是对象，就通过 `toPrimitive` 转换对象
如果是字符串，就通过 `unicode` 字符索引来比较
```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```
在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值

# `==` vs `===`
---

> 涉及面试题：`==` 和 `===` 有什么区别？

对于 `==` 来说，如果对比双方的类型**不一样**的话，就会进行**类型转换**

假如我们需要对比 `x` 和 `y` 是否相同，就会进行如下判断流程：

1.  首先会判断两者类型是否**相同**。相同的话就是比大小了
2.  类型不相同的话，那么就会进行类型转换
3.  会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4.  判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`

```js
1 == '1'
      ↓
1 ==  1
```

5.  判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断

```js
'1' == true
        ↓
'1' ==  1
 ↓
 1  ==  1
```

6.  判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

```js
'1' == { name: 'yck' }
              ↓
'1' == '[object Object]'
```
    

> 思考题：看完了上面的步骤，对于 [] == ![] 你是否能正确写出答案呢？

```js
[] == ![]
       ↓
[] == !true
       ↓ // 在条件判断时，除了`undefined`、`null`、`false`、`NaN`、`''`、`0`、`-0`，其他所有值都转为`true`，包括所有对象
[] == false
       ↓
[] ==  0
 ↓ // 调用ToPrimitive.valueOf()
 0 ==  0 // true
```

流程图如下
![](/images/20190410144314354.png)

当然了，这个流程图并没有将所有的情况都列举出来，我这里只将常用到的情况列举了，如果你想了解更多的内容可以参考 [标准文档](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.1)。

对于 `===` 来说就简单多了，就是判断两者类型和值是否相同。

