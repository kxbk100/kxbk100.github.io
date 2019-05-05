---
title: 【Career】面经汇总
date: 2019年04月08日 00:27:43
categories: Career
typora-root-url: ..
typora-copy-images-to: ../images
---

# 阿里

------

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

# 蘑菇街

------

## 一面

### JS

> 简单描述原型链，构造函数的`__proto__`指向什么，`__proto__.__proto__`指向什么，原型链顶端是什么？

> [let、var、const的区别](https://blog.csdn.net/kxbk100/article/details/89181466)

> 变量提升，是函数的优先级高还是变量的优先级高

> 深拷贝和浅拷贝，什么时候需要深拷贝，怎么进行深拷贝

> 基本类型和引用类型分别存在哪里，对引用类型在栈中存储了什么

基本类型：栈内存
引用类型：堆内存，赋值指针，指向堆内存中的对象

> 异步的四种实现方式，async函数相对于promise的优点

- Generator
- async
- await
- promise

------

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

------

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

------

> [1] hjp资料
> [2] https://juejin.im/post/5bab463bf265da0aa35930d8
