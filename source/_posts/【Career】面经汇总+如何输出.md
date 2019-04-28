---
title: 【Career】面经汇总+如何输出
date: 2019年04月08日 00:27:43
categories: Career
typora-root-url: ..
typora-copy-images-to: ../images
---

# 面试技巧
---
1. 多展开，多回答原理，谁都会用，使用

- 它的原理是……
- 它的本质是……
- 比如说/举个例子……

2. 给自己挖合适的坑

# 汇总
---
> ⚠️个人介绍

- 我叫冯天祥，就读于浙江科技学院软件工程专业
- 今天面试的岗位为前端工程师
- 我在大学本科期间参加了多次学科竞赛，也主持申报了多个项目，主要负责项目整体的统筹规划和前端的主要工作，也取得了一些成绩
- 我打小就对前端开发有着很浓烈的好奇心，那时候前端的概念还没有现在那么成熟，大概在小学四年级的时候，报了一个Frontpage的网页制作班
- 刚进入大一，跟着导师做项目，当时也就前端可以搭把手，看着自己的作品给大家看见和使用，非常有成就感，发现前端是越学习越喜欢的东西，后面越做就越进去了
- 我平时喜欢阅读一些技术博客，也爱看一些互联网行业公众号的软文
- 对，大概就是这样

## JS基础

> JS有哪些数据类型？

- 基本类型：String, Number, Boolean, Null, Undefined
- 引用类型：Object
- ES6：Symbol

> 什么是立即执行函数？

- `(function(j) {})(i)`
- 它的作用是通过隔离作用域来解决命名冲突并且可以防止污染全局作用域
- 所以我们常用立即执行函数配合闭包来解决循环中`setTimeout`中`var`定义函数的问题
- **立即执行函数**将外部参数传入到函数内部，这个时候值就被固定在了立即执行函数的参数上面不会改变，当下次执行闭包的时候，就可以使用外部函数的参数，从而达到目的

> ⚠️从原型到原型链

- **JS里的数据结构都是对象**
- 每个对象都有一个`__proto__`的属性，指向它的原型对象
- 这个`__proto__`对象⼜具有⼀个⾃⼰的`__proto__`属性，这样⼀层层向上，形成了原型链
- 直到最后指向Object，而`Object.prototype`的`__proto__`是null，这是原型链的终点
- 以例⼦来说：构造函数Person的原型对象是`Person.prototype`，`person`是实例对象，它的`__proto__ `属性指向对象的原型，所以 `person.__proto__ === Person.prototype`
- `Person.__proto__ === Object.prototype`，说明Person是Object的实例对象
- instanceof用来判断引用类型的原理就是判断引用类型是属是否属于某个构造函数，通过`__proto__`属性一层一层往上找看能否找到`prototype`
	
> 作用域、执行上下文和上下文

- 作用域是程序中定义变量的地方，它规定了如何寻找变量，也就是确定了当前执行代码对变量的访问权限
- 执行上下文，当一个函数执行的时候，就会创建一个执行上下文
- 上下文，this在同一作用域内的值

> 作用域链

- 当查找变量的时候，会先从当前上下文的变量对象中查找
- 如果没有找到，就会从父级执行上下文的变量对象中查找
- 一直找到全局上下文的变量对象，也就是全局对象中查找

> ⚠️this

- this是JS的一个关键字，它指向函数调用时的对象
- new function()，this固化在实例上，指向new的对象
- function()，this指向window，本质就是function.call(undefined)
- obj.function()，this指向obj，本质是function.call(obj)
- call/apply/bind，this指向它们的第一个参数
- 箭头函数，this指向第一个包裹箭头函数的普通函数的this

> ES6 Class

- 是ES6构造函数的语法糖
- 是实现继承的一种方式
- `class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，可以看成父类调用`call`传值
- 与ES5不同，class的属性方法不可枚举


> Set和Map数据类型

- Set：类似数组，但是值不重复
- Map：类似kv对象，key可以不局限于字符串

## JS实现
> 实现图片懒加载

- 懒加载就是将不关键的资源延后加载
- 只加载自定义区域内需要加载的东西
- 对于图片来说，加载的图片地址不是直接写在src，而是写在data-src，src放默认图
- 监听浏览器的scroll事件，当图片DOM滚动到视口位置，将src替换为data-src
- 使用`getBoundingRect`函数获取元素相对于**视口左上角**的坐标，判断元素是否出现在视口
- 因为scroll事件密集发生，计算量很大，容易造成性能问题，我们并不希望用户在滚动过程中一直发起请求，而是**隔一段时间发起一次**，所以对scroll要进行**节流**处理
- 替换的img标签需要从imgList删除
- 目前有一个新的 `IntersectionObserver` API，可以自动"观察"元素是否可见，所以`visible`的本质是，目标元素与视口产生一个交叉区


> 实现页面加载进度条

- 进度条的DOM结构需要放在body最前⾯
- 进度条的JS需要放在页⾯顶部，防止阻塞页面渲染，保证模拟效果

> ⚠️实现extend函数

主要是深浅拷贝问题
- 浅拷贝可以使用Object.assign和...展开运算符
- 深拷贝可以使用JSON.parse(JSON.stringfy(obj))，但是会忽略symbol，undefined，函数不能序列化，不能解决循环引用问题
- 如果含有内置对象但没有函数，可以使用MessageChannel
- 否则只能用lodash的深拷贝函数

> 实现快速数组去重（ES6）

- ES6新增了Set数据结构
- Set数据类似数组结构，但是值不会重复
- 扩展运算符可以展开数组对象，如果是Iterator（遍历器）接口的对象，都可以转化为数组

---

- 任何数据结构只要部署Iterator接口，就可以完成遍历操作
- ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of使用的
- 遍历器对象本质上，就是一个指针对象
- 不断调用指针对象的next方法，直到它指向数据结构的结束位置

```js
let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
console.log(array);
// => [1, 2, 3, 4]
```

> 实现节流和防抖的应用场景

- 节流：throttle，⿏标移动，隔一段时间发起一次，将当前时间和上一次执行函数时间对比，如果差值大于设置的等待时间就执行函数，设置setInterval不断调用
- 防抖：debounce，input输入，scroll，一段时间后没有再次点击的情况才去发起网络请求，设置一个定时器，延迟执行用户传入的方法，如果已经设定过定时器了就清空上一次的定时器，调用setTimeout函数

> 实现parseInt，简单实现转化数字符串

- 核⼼是进制转换 `arr[i] * Math.pow(radix, i)`
- radix进制数

## JS原理
> 事件委托（代理）原理

- 将事件添加到父节点，通过父节点来触发函数
- 利用的是浏览器的事件冒泡
- 特殊处理的元素通过stopPropagation组织冒泡

> ⚠️jsonp原理以及错误处理

**原理**

- 利⽤`<script>`标签可以跨域请求资源，它的原理就是动态插⼊script，src为请求的地址
- 返回一个callback，将请求数据放⼊其中返回
- 只⽀持get请求，不⽀持post

**错误处理**

- 利⽤`<script>`的onload和readyState事件可以进⾏超时处理
- 利⽤浏览器的onerror事件处理服务器的错误，它的本质还是`<script>`的错误处理

> require.js的实现原理

**原理**

- require.js是AMD，利用define
- 依赖的JS是靠动态创建`<script>`插入的
- onload事件来处理回调，保证JS提前加载完毕

**作用**

- 实现JS⽂件的异步加载，避免⽹⻚失去响应
- 管理模块之间的依赖性，便于代码的维护

**与Sea.js的区别**

- Sea.js是使用时加载的，加载顺序与require一致
- require.js是提前加载，加载顺序不一定


> ⚠️promise的原理

- promise是⽤来处理异步操作的对象，允许为异步操作的成功和失败分别绑定相应的处理方法
- promise是⼀个then-able的对象
- then⾥⾯的回调是异步延迟调用的，它的原理是临时存储在callback数组中，类似
`setTimeout(handle(callbacks), 0)`，但是实现上是在微任务队列（microtask）中，在
setTimeout之前，setTimeout属于宏观任务（macrotask）

promise状态：
- pending：等待态
- fulfilled：执⾏态（⼀旦达到这个状态，不再改变）
- rejected：拒绝态（⼀旦达到这个状态，不再改变）

> 链式调用为什么要返回新的promise⽽不是this

返回的状态可能不⼀样，⼀旦是resolve或者reject，状态应该不能改变

> async/await原理

- 通过yield和promise实现，有async和await关键字，⽤同步写法去做异步操作的处理
- try-catch直接处理异常

> 函数科里化的原理和作用

- 将使用多个参数的一个函数转换成一系列使⽤⼀个参数的函数的技术
- 为的就是参数复用、提前返回、延迟计算
- 比如说，⼀个ajax请求`ajax(method, url, params)`都是post请求，可以柯⾥里里化为`ajaxPost(url, params)`

> JS模块化原理（Commonjs、AMD、UMD、ES6 Module）

**目的**

- 解决命名冲突
- 提高代码复用性
- 提高代码可维护性

**CommonJS**是最常用的

- 基于nodeJS环境
- 同步加载
- 它的本质还是用了立即执行函数

**AMD**
- 基于浏览器环境
- define了就可以直接用，异步加载
- 利⽤onload事件执行代码实现依赖前置，和defer类似

**CMD**

- define之后需要require才可以使用，同步加载
- require写在函数体的任意地方实现延迟加载
- 依赖后置，⽤到才加载，和async类似

**UMD**

- 兼容AMD和CommonJS
- 利⽤立即执行函数

**ES6 Module**

- 基于浏览器环境
- ES Module会编译成require/exports来执行
- ES Module采用静态导入，CommonJS采用动态导入
- ES Module采用异步导入，基于浏览器环境，需要下载文件，如果也采用同步导入会对渲染产生很大影响
- CommonJS采用同步导入，基于nodeJS环境，文件在本地，导入卡住对主线程影响不大
- ES Module中的数据是实时绑定的，导入导出指向同一内存地址，导入值会跟随导出值变化
- CommonJS中数据是值拷贝，导出的值变了导入的值也不会变，如果要更新值，必须重新导入一次


# 阿里
---
## 一面
从项目展开

### HTML
> 单页面应用怎么做✅

**是什么**

- 只有一张Web页面的应用
- 在用户操作过程中，浏览器始终不会重载整个页面
- 公共资源（JS、CSS等）仅需加载一次
- 单页面跳转仅刷新局部资源 
- 从Web服务器加载的富客户端

**目的**

- 减少服务器压力，否则每次都要向服务器发送请求，服务器返回 HTML文件
- 增强用户体验，使用起来十分流畅

但是

- 首次加载数据大，耗时长
- 不利于SEO优化，可用SSR优化
- 导航需要人为处理

**如何达成**

1. iframe，目前浏览器都已经对iframe url发生修改产生历史记录，但是iframe的响应式兼容不好，不过iframe与父文档独立，不受父文档影响，所有QQ邮箱等还是继续使用iframe
2. Ajax + div + history，通过history提供的API实现历史记录的管理，十分方便，Vue-router默认是hash，但是可以手动修改成history或abstract


**组合**

SUI Mobile

### CSS
> [布局](https://blog.csdn.net/kxbk100/article/details/88905322) ✅

### JS
> 除了setTimeout和setInterval，还有一个适合用于动画的计时器，你知道吗？ ✅

requestAnimationFrame

专门为实现**高性能**的**帧动画**而设计的API，但是不能指定延迟时间，而是根据浏览器的刷新频率而定（帧）。

如果你想做逐帧动画的时候，你应该用这个方法。这就要求你的动画函数执行会先于浏览器重绘动作。 

通常来说，被调用的频率是每秒60次，但是一般会遵循W3C标准规定的频率。

```js
var requestId = window.requestAnimationFrame(func);
```


### Browser
> 与后台交互除了Ajax还有什么异步方式 ✅

- web socket


`WebSocket.send(data)` 向服务器发送数据
`WebSocket.close([code[, reason]])` 关闭当前链接

```js
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
```

- [MVC](https://blog.csdn.net/kxbk100/article/details/89383786)
- [MVVM](https://blog.csdn.net/kxbk100/article/details/89383786)

> 登陆信息怎么保存 ✅

[sessionStorage](https://blog.csdn.net/kxbk100/article/details/89431777)


> 后台是怎么用session保持的，为什么不用cookie？✅

每次cookie会自动把sessionID传到后端，后端通过sessionID获取session数据

看网上说现在cookie一般不建议用于存储，如果没有大量数据存储需求的话可以使用`localStorage` 或 `sessionStorage`，不怎么变的数据使用localStorage，否则可以使用sessionStorage，cookie不光存储空间小，它只有4k，其它的有5M，而且他还需要和服务端通信，每次都要携带在header中，影响请求性能，而且还会涉及到一些安全性的问题，不过可以通过它的几个属性加以限制，value不能明文，http-only->XSS，same-site->CSRF，secure->HTTPS才能携带cookie，localstorage中有BUG

> 有哪些客户端保存方案

- cookie
- localStorage
- sessionStorage
- indexedDB

> get和post的区别
### Network
> [知道几种状态码](https://blog.csdn.net/kxbk100/article/details/89450928)


### Career
> 你是怎么学习的？

项目驱动式学习

### Framework
> [Vue有了解过吗？双向绑定的底层实现是怎样的？](https://blog.csdn.net/kxbk100/article/details/89452029)

### Career
> 批注如果1篇文章有10w字怎么解决？

- 数据分页

> 懒加载 怎么实现？

懒加载就是将不关键的资源延后加载。

懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。对于图片来说，先设置图片标签的 `src` 属性为一张占位图，将真实的图片资源放入一个自定义属性中，当进入自定义区域时，就将自定义属性替换为 `src` 属性，这样图片就会去下载资源，实现了图片懒加载。

懒加载不仅可以用于图片，也可以使用在别的资源上。比如进入可视区域才开始播放视频等等。

- 传统的实现方法是，监听到`scroll`事件后，调用目标元素（绿色方块）的`getBoundingClientRect()`方法，得到它对应于**视口左上角的坐标**，再判断是否在视口之内。这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成性能问题。

- 目前有一个新的 `IntersectionObserver` API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见`visible`的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。



> 项目技术实现

word

3. [项目管理](https://blog.csdn.net/kxbk100/article/details/88942160)

> 个人介绍


# 	蘑菇街
---
## 一面
### JS
> 简单描述原型链，构造函数的`__proto__`指向什么，`__proto__.__proto__`指向什么，原型链顶端是什么？

>  [let、var、const的区别](https://blog.csdn.net/kxbk100/article/details/89181466)

>变量提升，是函数的优先级高还是变量的优先级高


> 深拷贝和浅拷贝，什么时候需要深拷贝，怎么进行深拷贝

> 基本类型和引用类型分别存在哪里，对引用类型在栈中存储了什么

基本类型：栈内存
引用类型：堆内存，赋值指针，指向堆内存中的对象

> 异步的四种实现方式，async函数相对于promise的优点

- Generator
- async
- await
- promise

---

- 调试起来更简单
- 相比于 Promise，它能更好地处理 then 链
- Pomise的实现看着很晕，传递参数太过麻烦，async对于中间值的处理比较好

> [前端几种模块化规范，commonJS的特点，ES Module的特点，ES Module的原理](https://blog.csdn.net/kxbk100/article/details/89222889)
> 给你一个场景，就是屏幕上有很多图片，要拉很长时间，怎么优化？

- 懒加载
- 缓存
- 节流
- 防抖

> [函数节流和函数防抖的区别，用代码的实现思路](https://blog.csdn.net/kxbk100/article/details/89454363)

> 有没有了解过函数式编程的理念

**是什么**

是一种编程规范，属于"结构化编程"的一种，主要思想是把运算过程尽量写成一系列嵌套的函数调用

**特点**

- 函数是第一等公民
- 只用表达式，不用语句
- 没有副作用

函数式编程强调没有"副作用"，意味着函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值

- 不修改状态
- 引用透明

不依赖外部变量，只依赖于输入的参数

http://www.ruanyifeng.com/blog/2012/04/functional_programming.html

> 知道函数柯里化吗，函数柯里化有什么用

**是什么**

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数 + 递归

**目的**

- 多参函数的复用性
- 为函数式变成而生


> 面向对象编程的缺点

有时候耦合性会很高


> [Vue的双向数据绑定原理](https://blog.csdn.net/kxbk100/article/details/89452029)
> 用Vue实现一个弹窗组件，应该设置哪些参数，怎么传值❓
> Vuex的几大核心对象

- State
- Getters
- Mutations
- Actions
- Module

> Webpack的几大核心配置

- entry
- output

> bundle.js（打包生成的文件）的执行原理

> node.js了解过吗，他的EventEmitter原理？

> CSS中实现动画的常用方式

- CSS变形：translate移动、scale缩小或放大、rotate旋转
- transition：css属性值在一定的时间区间内平滑地过渡
	- transition-property
	- transition-duration
	- transition-timing-function：缓动函数：ease；linear
	- transition-delay
- animation


> [常用的布局方案](https://blog.csdn.net/kxbk100/article/details/88905322)

> 移动端适配方案，rem，百分比什么的，然后问我有没有了解过vw

设置理想窗口
viewport严格的等于浏览器窗口
```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

px单位的适配
设置动态缩放视口后，在iPhone6上，缩放为0.5，即CSS像素2px最终显示效果为1px，而在scale=1的设备，CSS像素1px显示效果为1px，那么，为了达到显示效果一致，以px为单位的元素(比如字体大小)，其样式应有适配不同dpr的版本，因此，在动态设置viewport: scale的时候，同时在html根元素上加上data-dpr=[dpr]，但是这种方式还是不够，如果dpr为2，3之外的其他数值，px就没办法适配到。因此我会选择都用rem为单位进行适配。

rem(一个CSS单位)
定义：font size of the root element.
这个单位的定义和em类似，不同的是em是相对于父元素，而rem是相对于根元素。rem定义是根元素的font-size, 以rem为单位，其数值与px的关系，需相对于根元素`<html>`的font-size计算，比如，设置根元素font-size=16px, 则表示1rem=16px。关于rem更多的解读，建议可以阅读本文末附的腾讯一团队的文章《web app变革之rem》。

我说只知道这个1vw是视口宽度的百分之1，其他的就不知道了

vm/vh:CSS单位
vw(view-width), vh(view-height) 这两个单位是CSS新增的单位，表示视区宽度/高度，视区总宽度为100vw, 总高度为100vh。

> 项目中比较复杂的地方

> 写一个观察者模式，要求使用class，要有on, emit, off, remove, once这些方法

> 移动端和PC端注意的点

> 自我介绍？

> 对前端这个行业怎么看，为什么要做前端？

> try中setTimeout的异常，catch捕获的到吗？

> chrome调试中常用的工具

> 闭包内存泄漏



# 腾讯
---
## 一面
### JS
> jQuery事件绑定的原理✔️

调用on函数的时候，将生成一份**事件数据**，并将该数据加入到元素的缓存中
```js
{
    type: type,
    origType: origType,
    data: data,
    handler: handler,
    guid: guid,
    selector: selector,
    needsContext: needsContext,
    namespace: namespace
}
```

- jquery中每个元素都可以有一个缓存（只有有需要的时候才生成）
- 缓存就是该元素的一个属性
- jquery为每个元素的每种事件都建立一个队列，用来保存事件处理函数，所以可以对一个元素添加多个事件处理函数


```js
"div#box": {  //元素
  "Jquery623873": { //元素的缓存
    "events": {
      "click": [
        {    //元素click事件的事件数据
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: guid,
          selector: selector,
          needsContext: needsContext,
          namespace: namespace
        }
      ],
        "mousemove": [
          {
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: guid,
            selector: selector,
            needsContext: needsContext,
            namespace: namespace
          }
        ]
    }
  }
}
```
当要解绑事件的时候，如果没指定fn参数，jquery就会从该元素的缓存里拿到要解绑的事件的处理函数队列，从里面拿出fn参数,然后调用`removeEventListener`进行解绑

> [数组函数是否改变原数组](https://blog.csdn.net/kxbk100/article/details/89005213)✔️

> [用过哪些数组的API](https://blog.csdn.net/kxbk100/article/details/89005213)✔️

> jQuery怎么获取DOM元素，DOM怎么获取jQuery元素✔️

jQuery -> DOM
- 使用数组索引方式访问
```js
var dom = $(dom)[0];
```

- 使用函数`get()`访问，get()函数中的参数为索引号

```js
var dom = $(dom).get(0);
```

DOM -> jQuery
对于已经是一个DOM对象，只需要用`$()`把DOM对象包装起来，就可以获得一个jQuery对象了
```js
var v=document.getElementById("v"); //DOM对象
var $v=$(v); //jQuery对象
```

> 深浅拷贝✔️

> 如何判断数据类型？除了使用typeof instanceof之外怎么判断？✔️

```js
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[Object Array]'
}
```

> jQuery链式操作是怎么实现的？✔️

```js
return this
```

> new一个对象的过程 ✔️

> ES6了解吗？ ✔️

> 有没有用过组件？完全没用过Vue或React？ ✔️❓

> 作用域和闭包？ES6有块级作用域！ ✔️

> 事件冒泡代理 

### CSS

> CSS动画
> CSS选择器
> 元素如何在页面中上下居中
> 知道几种盒模型？怎么计算宽度？

### 浏览器

> 跨域

> 存储

> DOM增加节点


### 安全性

> 安全性问题

### 算法

> 判断字符串中是否有重复 

> 计算字符串中重复字符的个数

> 如何匹配`{[(`

### 项目相关

> 如何实现长按批注？

> 印象深刻的前端项目？


# 参考资料
---
> [1] hjp资料
> [2] https://juejin.im/post/5bab463bf265da0aa35930d8
