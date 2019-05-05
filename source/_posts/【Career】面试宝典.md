---
title: 【Career】面试宝典
date: 2019年04月08日 00:27:43
categories: Career
typora-root-url: ..
typora-copy-images-to: ../images
---

@[toc]
# 面试技巧

------

1. 多展开，多回答原理，谁都会用，使用

- 它的原理是……
- 它的本质是……
- 比如说/举个例子……

2. 给自己挖合适的坑


> ⚠️个人介绍

- 我叫冯天祥，就读于浙江科技学院软件工程专业
- 今天面试的岗位为前端工程师
- 我在大学本科期间参加了多次学科竞赛，也主持申报了多个项目，主要负责项目整体的统筹规划和前端的主要工作，也取得了一些成绩
- 我打小就对前端开发有着很浓烈的好奇心，那时候前端的概念还没有现在那么成熟，大概在小学四年级的时候，报了一个Frontpage的网页制作班
- 刚进入大一，跟着导师做项目，当时也就前端可以搭把手，看着自己的作品给大家看见和使用，非常有成就感，发现前端是越学习越喜欢的东西，后面越做就越进去了
- 我平时喜欢阅读一些技术博客，也爱看一些互联网行业公众号的软文
- 对，大概就是这样

# 变量类型和计算

> JS有哪些数据类型？

- 基本类型：String, Number, Boolean, Null, Undefined
- 引用类型：Object
- ES6：Symbol

# 原型与原型链

> ⚠️从原型到原型链

- **JS里的数据结构都是对象**
- 每个对象都有一个`__proto__`的属性，指向它的原型对象
- 这个`__proto__`对象⼜具有⼀个⾃⼰的`__proto__`属性，这样⼀层层向上，形成了原型链
- 直到最后指向Object，而`Object.prototype`的`__proto__`是null，这是原型链的终点
- 以例⼦来说：构造函数Person的原型对象是`Person.prototype`，`person`是实例对象，它的`__proto__ `属性指向对象的原型，所以 `person.__proto__ === Person.prototype`
- `Person.__proto__ === Object.prototype`，说明Person是Object的实例对象
- instanceof用来判断引用类型的原理就是判断引用类型是属是否属于某个构造函数，通过`__proto__`属性一层一层往上找看能否找到`prototype`

# 闭包和作用域

> ⚠️作用域、执行上下文和上下文

- 作用域是程序中定义变量的地方，它规定了如何寻找变量，也就是确定了当前执行代码对变量的访问权限
- 执行上下文，当一个函数执行的时候，就会创建一个执行上下文
- 上下文，this在同一作用域内的值

> 作用域链

- 当查找变量的时候，会先从当前上下文的变量对象中查找
- 如果没有找到，就会从父级执行上下文的变量对象中查找
- 一直找到全局上下文的变量对象，也就是全局对象中查找

> 闭包

- 闭包就是能够读取其他函数内部变量的函数，比如说函数A内部有个函数B，函数B可以访问到函数A中的变量，函数B是闭包
- 使用闭包的目的呢就是保证数据安全不受污染，因为闭包间接访问函数内部变量，外部根本就不可能修改掉函数内部的变量
- 所以我们常用立即执行函数配合闭包来解决循环中`setTimeout`中`var`定义函数的问题
- **立即执行函数**将外部参数传入到函数内部，这个时候值就被固定在了立即执行函数的参数上面不会改变，当下次执行闭包的时候，就可以使用外部函数的参数，从而达到目的
- 闭包声明的函数保存在内存中，不会被垃圾回收，但也有可能发生内存泄漏，所以要及时释放内存，将形成循环引用的JS对象手动设置为空，切断引用

> ⚠️this

- this是JS的一个关键字，它指向函数调用时的对象
- new function()，this固化在实例上，指向new的对象
- function()，this指向window，本质就是function.call(undefined)
- obj.function()，this指向obj，本质是function.call(obj)
- call/apply/bind，this指向它们的第一个参数
- 箭头函数，this指向第一个包裹箭头函数的普通函数的this

> 什么是立即执行函数？

- `(function(j) {})(i)`
- 它的作用是通过隔离作用域来解决命名冲突并且可以防止污染全局作用域
- 所以我们常用立即执行函数配合闭包来解决循环中`setTimeout`中`var`定义函数的问题
- **立即执行函数**将外部参数传入到函数内部，这个时候值就被固定在了立即执行函数的参数上面不会改变，当下次执行闭包的时候，就可以使用外部函数的参数，从而达到目的

# 异步和单线程

> 并发和并行的区别

- 并发是**宏观概念**，如果我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，就称为并发
- 并行是**微观概念**，如何 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行

> 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

- 回调函数有一个致命的弱点，如果有多个请求存在依赖性，就是容易写出回调地狱
- 回调地狱的根本问题就是，嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，嵌套函数一多，就很难处理错误
- 回调函数不能使用 `try catch` 捕获错误，不能直接 `return`
- 可以通过 `Generator` 函数返回的迭代器解决回调地狱的问题
- 也可以通过`Promise`解决回调地狱问题

> ⚠️promise的原理

`Promise` 代表承诺会在未来有一个确切的答复，承诺有三种状态：

- 等待态（pending）
- 完成态 （resolved）
- 拒绝态（rejected）

------

- 一旦状态变为 resolved 后，就不能再次改变
- `promise`是⽤来处理异步操作的对象，允许为异步操作的成功和失败分别绑定相应的处理方法
- `promise`是⼀个then-able的对象，构造函数内部的代码是立即执行的
- then⾥⾯的回调是异步延迟调用的，它的原理是临时存储在callback数组中，类似`setTimeout(handle(callbacks), 0)`，但是实现上是在微任务队列（microtask）中，在setTimeout之前，setTimeout属于宏观任务（macrotask）
- `Promise` 也有一些缺陷，比如无法取消 `Promise`，错误需要通过回调函数捕获

> 链式调用为什么要返回新的promise⽽不是this

- `Promise` 实现了链式调用，每次调用 `then` 之后返回的都是一个`Promise`，并且是一个全新的 `Promise`
- 因为状态不可变。如果在 `then` 中 使用了 `return`，那么 `return` 的值会被 `Promise.resolve()` 包装
- 返回的状态可能不⼀样，⼀旦是resolve或者reject，状态应该不能改变

> async/await原理

- 一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`，`async` 就是将函数返回值使用 `Promise.resolve()` 包裹了下，和 `then` 中处理返回值一样
- `async` 和 `await` 可以说是**异步**终极解决方案了， 通过yield和promise实现，`await` 只能配套 `async` 使用，⽤同步写法去做异步操作的处理，解决了使用`promise`写一大堆`then`的问题，也能解决回调地狱问题
- `await` 就是 `generator` 加上 `Promise`的语法糖，且内部实现了自动执行 `generator`
- 因为 `await` 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 `await` 会导致性能上的降低
- 可以使用`try-catch`直接处理异常

> setTimeout、setInterval、requestAnimationFrame 各有什么特点？

**setTimeout**

- 很多人认为 `setTimeout` 是延时多久，然后多久后执行，其实这个观点是错误的
- JS 是单线程执行的
- 如果前面的代码影响了性能，就会导致 `setTimeout` 不会按期执行
- 当然了，我们可以通过代码去修正 `setTimeout`，从而使定时器相对准确

**setInterval**

- `setInterval`作用和 `setTimeout` 基本一致，只是该函数是每隔一段时间执行一次回调函数
- 我们通常不使用 `setInterval`。因为第一，它和 `setTimeout` 一样，不能保证在预期的时间执行任务。第二，它存在**执行累积**的问题
- 比如说我进行了sleep操作，多个回调函数会在耗时操作结束后同时执行，带来性能上的问题

**requestAnimationFrame**

- 如果有循环定时器的需求我们一般使用`requestAnimationFrame`来实现
- 首先 `requestAnimationFrame` 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次，因为浏览器的刷新频率60FPS（不掉帧的情况下）
- 延时效果是绝对精确的，没有其他定时器时间不准的问题

# ES6

> ES6 Class

- 是ES6构造函数的语法糖
- 是实现继承的一种方式
- `class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，可以看成父类调用`call`传值
- 与ES5不同，class的属性方法不可枚举

> Set和Map数据类型

- Set：类似数组，但是值不重复
- Map：类似kv对象，key可以不局限于字符串

# 模块化

> JS模块化原理（Commonjs、AMD、UMD、ES6 Module）

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
- 利⽤onload事件执行代码实现依赖前置，和defer类似

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

> ⚠️require.js的实现原理

**原理**

- require.js是AMD，利用define
- 依赖的JS是靠动态创建`<script>`插入的
- onload事件来处理回调，保证JS提前加载完毕

**作用**

- 实现JS⽂件的异步加载，避免⽹⻚失去响应
- 管理模块之间的依赖性，便于代码的维护

**与Sea.js的区别**

- Sea.js是使用时加载的，加载顺序与require一致
- require.js是提前加载，加载顺序不一定

# JS实际应用

> ⚠️实现图片懒加载

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

------

- 任何数据结构只要部署Iterator接口，就可以完成遍历操作
- ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of使用的
- 遍历器对象本质上，就是一个指针对象
- 不断调用指针对象的next方法，直到它指向数据结构的结束位置

```js
let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
console.log(array);
// => [1, 2, 3, 4]
```

> ⚠️实现节流和防抖的应用场景

- 节流：throttle，⿏标移动，隔一段时间发起一次，将当前时间和上一次执行函数时间对比，如果差值大于设置的等待时间就执行函数，设置setInterval不断调用
- 防抖：debounce，input输入，scroll，一段时间后没有再次点击的情况才去发起网络请求，设置一个定时器，延迟执行用户传入的方法，如果已经设定过定时器了就清空上一次的定时器，调用setTimeout函数

> 实现parseInt，简单实现转化数字符串

- 核⼼是进制转换 `arr[i] * Math.pow(radix, i)`
- radix进制数

> 数组操作

？？？

> 函数科里化的原理和作用

- 将使用多个参数的一个函数转换成一系列使⽤⼀个参数的函数的技术
- 为的就是参数复用、提前返回、延迟计算
- 比如说，⼀个ajax请求`ajax(method, url, params)`都是post请求，可以柯⾥里里化为`ajaxPost(url, params)`

# HTML

> ⚠️你是如何理解 HTML 语义化的

- 让合适的标签做合适的事，⽐如header代表头部、footer代表尾部
- ⻚⾯结构更加清晰
- 更好的SEO

> meta viewport 是做什么⽤的

设置视⼝⼤⼩和缩放的属性

> DOCTYPE有什么⽤

设置⽤来区别盒子模型是标准模式还是怪异模式，⽤来告知浏览器使⽤标准模式渲染⻚⾯

> HTML5新内容，使⽤过什么

- 我使⽤过navigator.mediaDevices.getUserMedia()⽅法，主要⽤来获取摄像头的视频流
- 返回的是⼀个promise对象，⼊参可以是`{ audio:true, video: true }`
- 成功返回可以设置

```js
video.srcObject = stream;
video.play();
```

- 关闭的话

```js
// 方法1
video.pause();
// 方法2
video.srcObject = null;
// 方法3
stream.getVideoTracks()[0].stop();
```

video可以设置多个参数

- 分辨率：`{video: {width:1280, height: 720}}`，可以⽤exact强制指定分辨率，如果摄像头不⽀持请求的或者更⾼的分辨率，返回的Promise会处于rejected状态
- 帧率：`{video: {frameRate: { ideal: 10, max: 15}}}`
- 前置或者后置摄像头：`{video: {facingMode: "user"}`，user代表前置，environment代表后置
- 该API只有在HTTPS下才可以调⽤，localhost或者本地file也可以调⽤，Electron特殊需求可以使⽤本地file

```html
<!DOCTYPE html>
<html lang="zh-cn">

  <head>
    <meta charset="UTF-8">
    <title>web调取摄像头</title>
  </head>

  <body>
    <video src=""></video>
    <script>
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
      window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL);
      var mediaOpts = {
        audio: false,
        video: true,
      }
      function successFunc(stream) {
        var video = document.querySelector('video');
        if ("srcObject" in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL && window.URL.createObjectURL(stream) || stream
        }
        video.play();
      }
      function errorFunc(err) {
        alert(err.name);
      }

      navigator.getUserMedia(mediaOpts, successFunc, errorFunc);
    </script>
  </body>

</html>
```

> input和textarea区别

- input是单⾏⽂本，单标签，需要指定 type 属性，⽀持的属性有： type 、 size 、 value
  等
- textarea是多⾏⽂本，是闭合标签，⽀持的属性有： row 、 col 等

> ⽤⼀个div模拟textarea的实现

HTML5有个属性叫`contenteditable`，将其设置为true

> 移动设备忽略将⻚⾯中的数字识别为电话号码的⽅法

设置meta标签： `<meta name="format-detection" content="telephone=no" />`

> script标签的defer和async区别

- defer是异步加载，延后执⾏，会和HTML解析并⾏执⾏，并且会在HTML解析完毕后，DOMContentLoaded之前执⾏，defer执⾏顺序按照script标签先后顺序执⾏，但是实际中不⼀定是按顺序的
- async是异步加载，加载完⽴即执⾏，会和HTML解析并⾏执⾏，并且加载完毕后⽴即执
  ⾏，也就是说，执⾏脚本的时候会阻塞HTML解析，async执⾏顺序也不⼀定
- 最简单的还是把脚本放在body前

> ⚠️DOMContentLoaded、load和document.readyState

DOM⽂档加载顺序

- 解析HTML结构
- 加载外部脚本和样式表⽂件
- 解析并执⾏脚本代码
- DOM树构建完成 -> DOMContentLoaded
- 加载图⽚等外部⽂件
- ⻚⾯加载完毕 -> load

readyState 属性返回当前⽂档的状态

- uninitialized * 还未开始载⼊
- loading * 载⼊中
- interactive * 已加载，⽂档与⽤户可以开始交互
- complete * 载⼊完成 DOMContentLoaded

# CSS

> css reset 和 normalize.css 有什么区别

- reset.css：直接去掉浏览器所有样式，但是这种方式加载极慢，性能较低

风靡一时的reset书写方式

```css
* { margin:0; padding:0; }
```

现在常用reset书写方式

```css
html, body, div, span, applet, object, iframe, 
h1, h2, h3, h4, h5, h6, p, 
blockquote, pre, a, abbr, acronym, address, big, 
cite, code, del, dfn, em, font, img, 
ins, kbd, q, s, samp, small, strike, 
strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, 
fieldset, form, label, legend, 
table, caption, tbody, tfoot, thead, tr, th, td, 
center, u, b, i { 
    margin: 0; 
    padding: 0; 
    border: 0; 
    outline: 0; 
    font-weight: normal; 
    font-style: normal; 
    font-size: 100%; 
    font-family: inherit; 
    vertical-align: baseline 
} 
body { 
    line-height: 1 
} 
:focus { 
    outline: 0 
} 
ol, ul { 
    list-style: none 
} 
table { 
    border-collapse: collapse; 
    border-spacing: 0 
} 
blockquote:before, blockquote:after, q:before, q:after { 
    content: “” 
} 
blockquote, q { 
    quotes: “” “” 
} 
input, textarea { 
    margin: 0; 
    padding: 0 
} 
hr { 
    margin: 0; 
    padding: 0; 
    border: 0; 
    color: #000; 
    background-color: #000; 
    height: 1px 
}}
```

- normalize.css：统⼀浏览器的默认样式，并不是完全去掉

> 左右布局：左边定宽、右边⾃适应，不少于3种⽅法

- 设置左边左浮动，右边的margin-left设置等于左边宽度
- 父元素设置flex布局，子左元素设置宽度，右子元素设置flex: 1
- 定位布局：父元素relative，子左元素设置absolute，设置宽度，设置left: 0，子右元素设置width: 100%; height: 100%;

> CSS3⽤过哪些新特性

垂直水平居中常⽤：transform: translate(-50%, -50%)

> ⚠️BFC形成以及作⽤

- BFC (Block Formatting Contexts) （块级格式化上下文）是一种普通流的定位方案
- 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素
- 通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部

**触发BFC条件**：满足任一条件

- 浮动元素（float属性不为none）
- 绝对定位元素（position为absolute或fixed）
- ⾮块级元素（display为inline-block, table-cell, table-caption, flex, inline-flex）
- overflow不为visible（hidden、auto、scroll）
- body根元素

**作⽤**

- 清除浮动（overflow: hidden）
- 防⽌margin重叠塌陷
- 布局（左边固定，右边⾃适应）

> 垂直⽔平居中实现

- 知道宽高：使用relative+absolute绝对定位，负边距宽⾼的50%加以调整
- 未知宽高：`transform: translate(-50%, -50%); transform-style: preserve-3d`
- flex布局：`item-align: center; justify-content: center`
- grid：`html, body {height: 100%; display: grid}; element {margin: auto}`
- table-cell布局：`display: table-cell; vertical-align: middle`

> ⚠️边框1px问题

**原因**

CSS中的1px并不等于移动设备的1px，这个是由dpr决定的（devicePixelRatio = 物
理像素 / 独⽴像素）

**解决⽅案**：1px边框的本质是弄出0.5px的边框

- viewport + rem：动态更改meta标签viewport的scale，比如说dpr=2，initial-scale=0.5
- 设置border-image为一张透明的图片
- 设置background-image渐变实现，并使用svg插件
- tranform加伪类标签：利用伪类标签，根据父级定位，大小根据媒体查询缩放实现效果，推荐，兼容性较好

> CSS的盒⼦模型、box-sizing

**W3C标准模型**

- 默认都是W3C标准模型，加上DOCTYPE确保是按W3C标准模型加载的
- width = content.width
- height = content.height
- 相当于box-sizing: content-box

**IE怪异模型**

- width = content.width + 2padding-left + 2border-left
- height = content.height + 2padding-top + 2border-top
- form中的input、radio、checkbox、button都是按照IE怪异模型来计算的
- 相当于box-sizing: border-box

> BEM与CSS Modules

- BEM的意思就是块（block）、元素（element）、修饰符（modifier），是⼀种CSS类的命名规范，为了解决命名冲突以及更好的语义化而生

```css
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```

- CSS Modules默认是以hash: base64来进行类名转换的，保证唯⼀，但是需要配合打包⼯具来使用

> rem和em区别

- rem：是相对于根元素计算的，比如说根元素font-size: 16px, 则表示1rem=16px
- em：是相对于⽗元素计算的，比如说父元素font-size: 16px，则表示1em=16px

> ⚠️CSS动画怎么优化

**减少重排和重绘**

- 重排：width、height、font这些属性
- 重绘：color、background-image、border这些属性

**推荐使⽤**

- translate、opacity、scale、rotate这些属性
- 可以⽤translate3d强制开启gpu加速，但是会增加性能消耗，如果滥用反而会使动画变得更加卡

> ⚠️移动端适配 - vw适配⽅案

通过安装PostCSS插件来实现

- postcss-aspect-ratio-mini：利⽤padding-top百分⽐等于宽度，实现固定宽⾼的box
- postcss-px-to-viewport：转化为vw
- postcss-write-svg：处理1px边框问题
- postcss-viewport-units：添加content属性，配合viewport-units-buggyfill做vw、vh、vmin、vmax的兼容polyfill

**步骤**

1. 引⼊viewport-units-buggyfill.js
2. 使用vw的polyfill解决方案会在用到的vw的地方添加content，会影响到img和伪元素，所以⾃定义的content需要注意，使⽤!important
3. viewport添加viewport-fit=cover，适配iPhoneX
4. 配合postcss插件，实现vw转化

> ⚠️CSS实现⻓宽⽐固定的box

- 若div中只有img标签，且需要div按照图片长宽比自动缩放，则只需将img和div的height均设置为auto
- padding设置为百分比时，是以元素的宽度乘以百分比从而得到padding值的。所以在div的width为固定的情况下，设置height为0，使内容自然溢出，再通过设置padding-bottom使元素有一定高度，实现固定宽⾼的box

```css
.box{
      width: 50%;
      height: 0;
      padding-bottom: 30%;
      /*宽高比为5:3*/
      background-size: cover;
    }
```

# 网络

> HTTP状态码

- 200：请求成功
- 301：永久重定向
- 302：临时重定向
- 304：资源未修改，返回body为空
- 400：客户端语法错误，服务器⽆法理解
- 404：请求资源不存在
- 500：服务器内部错误

> 301和302的区别是什么

- 301：永久重定向，原地址被删除
- 302：临时重定向，原地址还存在，SEO抓取不知道抓原站还是302的，而且有可能被劫持

> cookie和session的区别

- cookie存储于浏览器端，而session存储于服务端
- cookie大小4k左右，session服务端无限制

> localStorage、sessionStorage、cookie和IndexDB的区别

- cookie大小4k，sessionStorage和localStorage大小5M，IndexDB没有限制
- localStorage和IndexDB一直有效，除非手动删除；sessionStorage在浏览器关闭就失效；cookie一般由服务器生成，可以设置过期时间
- localStorage、sessionStorage、IndexDB均不参与服务器通信，而cookie每次都会携带在 header 中，对于请求性能有影响，所以现在一般不用于存储了
- sessionStorage不能在不同源页面间共享，而localStorage和cookie在所有同源页面间可以共享
- 对于 `cookie` 来说，我们还需要注意安全性，value不能使用明文存储，http-only设置不能通过JS访问Cookie，减少XSS攻击，secure设置协议为HTTPS协议才能访问，same-site设置浏览器不能在跨域请求中携带Cookie，防止CSRF攻击

> GET 和 POST 的区别是什么

- get⽤于获取数据，post⽤于提交数据
- get参数拼接在url中，⼤⼩在2K左右，具体大小还是由浏览器决定的；post参数放在body中，无大小限制
- 按照规范get是幂等的，多次请求结果一致；而post是不幂等的

------

幂等意思就是说，一个方法无论执行多少次，结果都会是一样

> ⚠️HTTP缓存

**强缓存**：浏览器发送请求前，根据请求头的`expires`和`cache-control`判断是否命中强缓存策略，如果命中，直接从缓存获取资源
**协商缓存**：根据请求头的`last-modified`和`etag`判断是否命中协商缓存策略，如果命中，直
接从缓存获取资源

**强缓存**需要在服务端设置`expires`和`cache-control`

- expires：绝对时间，但是如果浏览器和服务端时间误差比较大的话，会有一定偏差
- cache-control：相对时间长度
- 所以在**优先级**方面：`cache-control` > `expires`
- 强缓存HTTP状态码为200
- 强缓存不会发送多余请求

**协商缓存**会根据`if-modified-since: last-modified` 或 `if-none-match: etag`来进行判断缓存是否过期

- `if-modified-since: last-modified`：浏览器在第⼆次请求会带上 `if-modified-since: last-modified`，根据浏览器和服务器的修改时间⽐对，这个比对是个只读操作，如果一致表示命中。保存单位是秒，所以1秒以内的改动会检测不到
- `if-none-match: etag`：浏览器在第⼆次请求会带上 `if-none-match: etag` 并和服务端生
  成的 `etag` ⽐较，所以会有读和写操作，如果⼀致表示命中。`if-none-match: etag` 这样的方式解决了了秒级的问题，但是每次都有读写消耗
- 协商缓存HTTP状态码为304
- 协商缓存会向服务端发送请求，response body为空，内容小的多
- 强制刷新办法：`?v=xxx`

> ⚠️TCP三次握⼿和四次挥⼿

**三次握手**

- client发送syn，进⼊syn_send
- server应答ack，进⼊syn_rcvd
- client发送ack，进⼊established，server接收后，也进入established

**四次挥手**

- client发送fin，进入fin_wait_1
- server发送确认包，进⼊close_wait，client接收后，进入fin_wait_2
- server发送结束请求，进入last_ack，client接收到后发送确认包，进⼊入time_wait
- server接收后，进⼊入closed，client在⼀定时间没有收到ack也会进⼊入closed

> webSocket协议

**是什么**

- 建⽴在TCP协议上
- 与HTTP协议兼容
- 数据较小，尤其是头部，所以开销较小
- 可以发送⽂本和二进制
- 没有同源策略

**与HTTP轮询相⽐**

- 头部很小，消耗比较少
- webSocket是长连接，它会保持状态
- 能够接收到服务端的push

**建立连接的过程**

- 首先，TCP三次握⼿
- 浏览器发送：key，protocol，version
- 服务器返回：accept，protocol

**webSocket常用的事件**

- onopen
- onclose
- onmessage
- onerror

> HTTPS和HTTP2

**HTTPS**

- HTTP是建立在TCP协议上，HTTPS是建立在SSL/TLS协议上，SSL/TLS运行在TCP上，会有⼀层加密
- HTTP端口为80，HTTPS端⼝为443
- HTTPS可以有效防⽌运营商劫持

**HTTP2**

- 多路复⽤。单连接多资源，减⼩了压力，提⾼了吞吐量
- header也压缩了。使⽤HPACK算法，header更小了
- HTTP2使用服务端推送

------

HPACK的原理是使用2个索引表（静态索引表和动态索引表）来把头部映射到索引值，并对不存在的头部使用哈夫曼编码，并动态缓存到索引，从而达到压缩头部的效果

# 浏览器

> 事件的触发过程是怎么样的？

- **事件捕获阶段**：当我们在某个元素上触发了某个事件后，`window` 会顺着DOM节点往事件触发处传播，遇到注册的捕获事件不会触发
- **目标事件处理阶段**：传播到事件触发处时触发绑定函数
- **事件冒泡**：从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发
- 但是也有特例，**如果给一个 body 中的子节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。**
- 我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象
- 我们一般希望事件只触发在目标上，这时候可以使用 `stopPropagation` 来阻止事件的进一步传播。 `stopPropagation` 可以阻止事件冒泡和事件捕获
- `stopImmediatePropagation` 同样也能实现阻止事件，但是还能阻止该事件目标执行的别的注册事件

> 知道什么是事件委托（代理）吗？

- 将事件添加到父节点，通过父节点来触发函数，比如说如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话**应该注册在父节点上**
- 利用的是浏览器的事件冒泡
- 特殊处理的元素通过stopPropagation阻止冒泡
- 代理的方式相较于直接给目标注册事件来说更加节省内存，而且不需要给子节点注销事件

> ⚠️输入 URL 到页面渲染的整个流程

**DNS查询获取IP**

- 首先是 DNS 查询，如果这一步做了智能 DNS 解析的话，会提供访问速度最快的 IP 地址回来
- 操作系统会首先在本地缓存中查询 IP
- 没有的话会去系统配置的 DNS 服务器中查询
- 如果这时候还没得话，会直接去 DNS 根服务器查询，这一步查询会找出负责一级域名的服务器，然后去该服务器查询二级域名
- 接下来三级域名的查询其实是我们配置的，你可以给 www 这个域名配置一个 IP，然后还可以给别的三级域名配置一个 IP

------

以上介绍的是 DNS 迭代查询，还有种是递归查询，区别就是DNS迭代查询是由客户端去做请求，而递归查询是由系统配置的 DNS 服务器做请求，得到结果后将数据返回给客户端。
PS：DNS 是基于 UDP 做的查询

<hr>

**TCP连接**

- 接下来是 TCP 握手，应用层会下发数据给传输层，这里 TCP 协议会指明两端的端口号，然后下发给网络层
- 网络层中的 IP 协议会确定 IP 地址，并且指示数据传输中如何跳转路由器
- 然后包会再被封装到**数据链路层**的数据帧结构中
- 最后就是物理层面的传输了
- 当 TCP 握手结束后就会进行 TLS 握手，然后就开始正式的传输数据

------

在这一部分中，可以详细说下 TLS 的握手情况以及两种加密方式的内容

<hr>

**HTTP请求及响应**

**服务器响应**

数据在进入服务端之前，可能还会先经过**负载均衡**的服务器，它的作用就是将请求合理的分发到多台服务器上，然后服务端会响应一个 HTML 文件

- 首先浏览器会判断状态码是什么，如果是 200 那就继续解析，如果 400 或 500 的话就会报错，如果 300 的话会进行重定向，这里会有个重定向计数器，避免过多次的重定向，超过次数也会报错
- 接下来浏览器开始解析文件，如果是 gzip 格式的话会先解压一下，然后通过文件的编码格式去解码文件

**客户端渲染**

**首先浏览器接收到 HTML 文件并转换为 DOM 树，在这一过程中**

- 浏览器接收到0、1这些字节数据后，会将这些**字节数据转换为字符串**，也就是我们写的代码
- 当数据转换为字符串以后，浏览器会通过词法分析转换为**标记**，标记还是字符串，是构成代码的**最小单位**
- **标记**会紧接着转换为 Node，最后这些 Node 会根据不同 Node 之前的联系构建为一颗 DOM 树
- 在解析 HTML 文件的时候，浏览器也会去下载并解析 CSS 和 JS 文件

**CSS 文件也会被转换为 CSSOM，过程和生成DOM树类似**

- 浏览器会确定下每一个节点的**样式**到底是什么
- 样式可以自行设置给某个节点，也可以通过**继承**获得
- 在这一过程中，浏览器得**递归** CSSOM 树，十分**消耗资源**
- 所以我们应该尽可能的避免写**过于具体**的 CSS 选择器，避免无意义的HTML标签，保证**层级扁平**

**当遇到script标签时，会暂停构建DOM**

- 当 `script` 标签加上 `defer` 属性以后，表示该 JS 文件会并行下载，等到HTML 解析完成后顺序执行，所以可以把 `script` 标签放在任意位置
- 当`script` 标签加上 `async` 属性以后，表示该 JS 文件会并行下载并执行，不会阻塞渲染
- 如果 `script` 标签没有这些属性，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这也是都建议将 `script` 标签放在 `body` 标签底部的原因
- 这里如果使用 HTTP/2 协议的话会极大的提高多图的下载效率

**接下来是生成渲染树，确定页面元素的布局、样式等**

- 这不是简单的将DOM和CSSOM简单合，渲染树只会包括**需要显示的节点**和这些节点的样式信息，如果某个节点是 `display: none` 的，那么就不会在渲染树中显示
- 当浏览器生成渲染树以后，就会根据渲染树来进行**布局**，然后调用 GPU 绘制，合成图层，显示在屏幕上

> 为什么操作DOM慢？

- **DOM** 是属于**渲染引擎**中的东西
- **JS** 是属于 **JS 引擎**中的东西
- 当我们通过 JS 操作 DOM 的时候，其实涉及到了**两个线程之间的通信**
- 操作 DOM 次数一多，也就等同于**一直在进行线程之间的通信**，并且操作 DOM 可能还会带来**重绘回流**的情况，所以会导致性能上的一些问题

> 插入几万个 DOM，如何实现页面不卡顿？

- 解决这个问题我们可以采用**分批次部分渲染 DOM**的方法
- 通过 `requestAnimationFrame` 的方式去**循环的插入 DOM**
- 也可以通过**虚拟滚动**来实现，它的原理就是只渲染可视区域内的内容，非可见区域的那就完全不渲染了，当用户在滚动的时候就**实时去替换渲染的内容**
- 即使页面/列表很长，但是渲染的 DOM 元素永远只有那么几个，当我们滚动页面的时候就会实时去更新 DOM

> 什么情况阻塞渲染

- 渲染的前提是生成渲染树，所以 HTML 和 CSS 肯定会阻塞渲染。如果想要渲染的越快，就应该降低一开始需要渲染的文件**大小**，并且**扁平层级，优化选择器**
- 如果 `script` 标签没有 `defer` 、`async` 这些属性，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这也是都建议将 `script` 标签放在 `body` 标签底部的原因

> 什么是重绘和回流？

重绘和回流会在我们**设置节点样式**时频繁出现，同时也会很大程度上影响性能

- 重绘是当节点需要**更改外观**而**不会影响布局**的，比如改变 `color` 
- 回流是**布局**或者**几何属性**需要改变
- 回流**必定**会发生重绘，重绘**不一定**会引发回流
- 回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流

重绘和回流其实也和 Eventloop 有关

1. 当 Eventloop 执行完 Microtasks 后，会判断 `document` 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次
2. 然后判断是否有 `resize` 或者 `scroll` 事件，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
3. 判断是否触发了 media query
4. 更新动画并且发送事件
5. 判断是否有全屏操作事件
6. 执行 `requestAnimationFrame` 回调
7. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
8. 更新界面
9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。

> 在不考虑缓存和优化网络协议的前提下，考虑可以通过哪些方式来最快的渲染页面？

加快页面渲染速度的关键在于提前 `DOMContentLoaded` 事件，当发生 `DOMContentLoaded` 事件后，就会生成渲染树，生成渲染树就可以进行渲染了，这一过程更大程度上和硬件有关系了

**从文件大小考虑**

渲染的前提是生成渲染树，所以 HTML 和 CSS 肯定会阻塞渲染。如果想要渲染的越快，就应该降低一开始需要渲染的文件**大小**，并且**扁平层级，优化选择器**

**从 `script` 标签使用上来考虑**

- 当 `script` 标签加上 `defer` 属性以后，表示该 JS 文件会并行下载，等到HTML 解析完成后顺序执行，所以可以把 `script` 标签放在任意位置
- 当`script` 标签加上 `async` 属性以后，表示该 JS 文件会并行下载并执行，不会阻塞渲染
- 如果 `script` 标签没有这些属性，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这也是都建议将 `script` 标签放在 `body` 标签底部的原因
- 这里如果使用 HTTP/2 协议的话会极大的提高多图的下载效率

**从 CSS、HTML 的代码书写上来考虑**

- 使用 `transform` 替代 `top`
- 使用 `visibility` 替换 `display: none` ， `visibility` 只会引起重绘，而 `display: none` 会引发回流，改变了布局
- 不要把节点的**属性值**放在一个循环里当成循环里的变量
- 不要使用 `table` 布局，可能很小的一个小改动会造成整个 `table` 的回流
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`
- CSS 选择符**从右往左**匹配查找，避免节点层级过多，避免写**过于具体**的 CSS 选择器，避免无意义的HTML标签，保证**层级扁平**
- 将频繁重绘或者回流的节点设置为图层，图层能够阻止**该节点的渲染行为影响别的节点**。比如浏览器会自动将 `video` 标签变为图层，普通标签通过`will-change`实现，`video`、`iframe` 本身就是图层

**从需要下载的内容是否需要在首屏使用上来考虑**

> ⚠️跨域

只要协议、域名、端⼝有任何一个不同，都被当作是不同的域，Ajax请求就会失败，同源策略只要是为了防止CSRF攻击，CSRF 攻击是利用用户的登录态发起恶意请求。跨域并不能完全阻止 CSRF，因为请求还是发出去了，只是浏览器拦截了响应

**解决方案**

**首选肯定是CORS**

- CORS需要服务端设置`Access-Control-Allow-Origin`，该属性表示哪些域名可以访问资源
- 浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。
- 如果需要携带cookie，需要`Access-Control-Allow-Credentials`，同时前端需要加上`withCredentials`

**然后是JSONP**

- JSONP的原理就是利⽤`<script>`标签可以跨域请求资源，它的原理就是动态插⼊script，src为请求的地址，将请求数据放⼊callback返回
- 只⽀持GET请求，不⽀持POST等其它类型的HTTP请求
- 利⽤`<script>`的onload和readyState事件可以进⾏超时处理
- 利⽤浏览器的onerror事件处理服务器的错误，它的本质还是`<script>`的异常监控

**postMessage**

- 通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
- 利用`window.postMessage(data, domain)`这个方法发送信息
- 通过message事件获取receiveMessage来接收信息，receiveMessage包括data，origin，source，需要通过origin和source保证安全

**document.domain**

- 该方式只能用于**二级域名相同**的情况下，比如 `a.test.com` 和 `b.test.com` 
- 只需要给页面添加 `document.domain = 'test.com'` 表示二级域名都相同就可以实现跨域

# 安全

> ⚠️XSS和CSRF

**XSS：跨站脚本攻击**

想尽一切办法将可执行的代码注入网页，如果不过滤执⾏JS代码，可能导致cookie泄露等，比如在评论框输⼊JS脚本，获取到cookie等敏感信息

**XSS防御**

- 通过转义字符对输⼊来源进⾏过滤
- 为富文本编辑器等设置CSP白名单，通过设置HTTP Header Content Security Policy和meta来规定哪些外部资源可以执行加载，兼容性也不错

**CSRF：跨站请求伪造**

在已经授权的⽹站中发起某些请求，从⽽实现⾃⼰的⽬的，比如说构造出一个后端请求地址

**CSRF防御**

- 服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效
- 调用接口时，验证Referer来判断是否为第三方网站发起的请求
- cookie设置为SameSite不随着跨域请求发送
- 设置Get请求不可对数据进行修改，只能通过后台逻辑修改

> ⚠️前端异常监控

- `window.onerror`：全局错误处理，⽤于运⾏错误，跨域脚本会返回`script error`
- 资源404：`window.addEventListener('error', fn, true)`，但是必须在捕获阶段处理，因为error
  事件不会冒泡
- promise错误：`window.addEventListener('unhandledrejection', fn, false)`
- try-catch：⽤于可预⻅情况下监控特定的错误

上报错误

- 需要错误到⼀定量才会上报、上报采样率（防⽌PV过⾼对⽹⻚的压⼒过⼤）
- 压缩代码错误，并使⽤sourcemap找具体错误

# 性能

> ⚠️前端性能优化

**减少HTTP资源请求次数**

- 使用CSS雪碧图，HTTP2不需要，多路复⽤，单连接多资源，减⼩了压力，提⾼了吞吐量
- bundle js和css

**减⼩ HTTP 请求⼤⼩**

- ⽹⻚gzip
- 压缩js和css
- 压缩静态图⽚资源

**避免使⽤空的src和href（浏览器会加载直到超时）**

**设置强缓存和协商缓存**

**使⽤CDN管理静态资源**

**cookie隔离，不需要携带cookie的请求不携带**

**⻚⾯渲染**

- style放在head，script放在body
- 图⽚懒加载
- 减少⻚⾯重排和重绘
- 尽量减少使⽤JS动画（容易引起重排和重绘）
- 减少使⽤iframe（会阻塞）

**meta dns prefetch 设置 DNS 预解析**

**资源预加载**

**图⽚懒加载**

**单⻚应⽤路由懒加载**

# Vue

# 项目
