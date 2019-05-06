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

1. 当回答面试题的时候，尽量去引申出这个知识点的某些坑或者与这个知识点相关联的东西，多回答原理，谁都会用，使用

- 它的原理是……
- 它的本质是……
- 比如说/举个例子……

2. 给自己挖合适的坑
3. 面试中不要经常出现一问一答的情况


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
- 引用类型：Object（Array、Function、Object）
- ES6：Symbol

**基本类型**
- 基本类型数据分块存放在内存中，数据之间不会相互影响
- 基本类型不能调用函数
- 基本类型中的number是浮点型，采用 IEEE 754，JS 采用的浮点数标准会裁剪掉我们的数字，就会出现精度丢失的问题，所以会出现`0.1 + 0.2 !== 0.3`
- `typeof null === object`，这其实是一个Bug，在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来

**引用类型**
- 引用类型中数据共享内存，变量存放的是指针，赋值也是指针，数据之间相互干预，很好的节约了内存空间
- 当我们需要复制出来一份引用类型的时候就需要使用到深浅拷贝
- 浅拷贝使用`let b = Object.assign({}, a)`，也可以使用展开运算符`let b = {...a}`，它的原理就拷贝所有的属性值到新的对象中，但当属性值是对象的时候，拷贝的仍是地址
- 深拷贝就是用来解决深层的问题，可以使用`let b = JSON.parse(JSON.stringfy(a))`，但是会忽略undefined，会忽略symbol，无法序列化函数，不能解决循环引用的问题
- 当含有内置类型，不含有函数时可以使用`messagechannel`
- 目前最完美的方案还是lodash深拷贝函数

**如何判断类型**
- typeof只能判断基本类型，instanceof只能判断引用类型
- instanceof用来判断引用类型的原理就是判断引用类型是属是否属于某个构造函数，通过对象的`__proto__`属性一层一层往上找看能否找到类型的`prototype`
- 但是`instanceof`也不是完全可靠的，因为可以通过改写`symbol.hasInstance`修改`instanceof`原本的内部逻辑，Array在多个frame中穿梭也会出现问题
- 所以我们可以通过 `Object.prototype.toString.call(obj) === '[object Array]'`来判断， 每个对象都有一个**内部属性**`[[Class]]`
- 不直接使用`toString()`是因为，虽然Array继承自Object，toString方法极有可能被重写而达不到我们的要求，而Object.prototype很少有人敢去碰它的，所以能一定程度保证其“纯洁性”
- **很多框架，比如jQuery等**，都借鉴这样的方法来进行**数组、正则表达式**等对象的类型判定，而且各大浏览器兼容性也很好

> 为什么 0.1 + 0.2 != 0.3？如何解决这个问题？

- 因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题
- 但是 JS 采用的浮点数标准却会裁剪掉我们的数字，就会出现精度丢失的问题
- console.log(0.1) 正确是因为二进制被转换为了十进制，十进制又被转换为了字符串，取了近似值
- 选用原生提供的方式来解决问题`parseFloat((0.1 + 0.2).toFixed(10)) === 0.3`

> V8 下的垃圾回收机制是怎么样的？

- V8 实现了准确式 GC，GC 算法采用了分代式垃圾回收机制。所以，V8 将内存（堆）分为新生代和老生代两部分

**新生代**
- 新生代中的对象一般存活时间较短，使用 Scavenge GC 算法
- 在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间
- 在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的
- 新分配的对象会被放入 From 空间中，当 From 空间被占满时，**新生代 GC 就会启动了**
- 算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁
- 当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了

**老生代**
- 老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除算法和标记压缩算法
- 新生代中的对象已经经历过一次 Scavenge 算法的会将对象从新生代空间移到老生代空间中。
- To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

# 原型与原型链

> ⚠️从原型到原型链

 - **JS里的数据结构都是对象**，`__proto__`、`prototype`这些属性都是对象
- 每个对象都有一个`__proto__`的属性，指向它的原型对象
- 这个`__proto__`对象⼜具有⼀个⾃⼰的`__proto__`属性，这样⼀层层向上，形成了原型链
- 直到最后指向Object，而`Object.prototype`的`__proto__`是null，这是原型链的终点
- 原型的`constructor`指向构造函数，构造函数使用`prototype`指向原型
- 比方说构造函数Person的原型对象是`Person.prototype`，`person`是实例对象，它的`__proto__ `属性指向对象的原型，所以 `person.__proto__ === Person.prototype`
- `Person.__proto__ === Object.prototype`，说明Person是Object的实例对象
- instanceof用来判断引用类型的原理就是判断引用类型是属是否属于某个构造函数，通过对象的`__proto__`属性一层一层往上找看能否找到类型`prototype`

**我们也可以通过原型实现继承**
- 可以使用组合继承，通过构造函数传参，可以复用父级的函数，不会与父类元素的引用属性发生共享，但是继承父级的时候调用了父级的构造函数，会继承很多父级的无用的属性，浪费了内存空间
- 我们也可以使用寄生组合继承，通过Object.create将父类的原型直接赋值给子类的原型，自己写constructor
- 现在用的比较多的是用ES6 class实现继承，它实际上是ES6构造函数的语法糖，`class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，父类中定义构造函数，并且在子类构造函数中必须调用 `super`，可以看成父类调用`call`传值，与ES5不同，class的属性方法不可枚举

> new一个对象的过程

- new就是根据构造函数的模板创建一个对象
- 首先new创建一个新对象
- 然后链接到原型
- 绑定this
- 执行构造函数
- 默认return this
- 对于创建一个对象来说，更推荐使用**字面量**的方式创建对象。因为你使用 `new Object() `的方式创建对象需要通过**作用域链**一层层找到 Object，但是你使用**字面量**的方式就没这个问题

> instanceof原理
- instanceof用来判断引用类型的原理就是判断引用类型是属是否属于某个构造函数，通过对象的`__proto__`属性一层一层往上找看能否找到类型`prototype`
- 首先获取类型的原型，然后获得对象的原型，然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
- 通过改写`symbol.hasInstance`可修改`instanceof`原本的内部逻辑，Array在多个frame中穿梭也会出现问题，所以`instanceof`也不是完全可靠的
- 所以我们可以通过 `Object.prototype.toString.call(obj) === '[object Array]'`来判断， 每个对象都有一个**内部属性**`[[Class]]`
- 不直接使用`toString()`是因为，虽然Array继承自Object，toString方法极有可能被重写而达不到我们的要求，而Object.prototype很少有人敢去碰它的，所以能一定程度保证其“纯洁性”
- **很多框架，比如jQuery等**，都借鉴这样的方法来进行**数组、正则表达式**等对象的类型判定，而且各大浏览器兼容性也很好

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
- this是在函数运行的时候才能确定的
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

> bind、call 和 apply 各自有什么区别？

**区别**

- 在JS中，这三者都是用来改变函数的this对象的指向的，第一个参数都是this要指向的对象
- call和apply都是对函数的直接调用，而bind方法返回的仍然是一个函数，因此后面还需要()来进行调用才可以
- call后面的参数与方法中是一一对应的，而apply的第二个参数是一个数组，数组中的元素是和方法中一一对应的
- bind传参和call类似

**说到this**
- this是JS的一个关键字，它指向函数调用时的对象
- this是在函数运行的时候才能确定的
- new function()，this固化在实例上，指向new的对象
- function()，this指向window，本质就是function.call(undefined)
- obj.function()，this指向obj，本质是function.call(obj)
- call/apply/bind，this指向它们的第一个参数
- 箭头函数，this指向第一个包裹箭头函数的普通函数的this

**new**
- new就是根据构造函数的模板创建一个对象
- 首先new创建一个新对象
- 然后链接到原型
- 绑定this
- 执行构造函数
- 默认return this
- 对于创建一个对象来说，更推荐使用**字面量**的方式创建对象。因为你使用 `new Object() `的方式创建对象需要通过**作用域链**一层层找到 Object，但是你使用**字面量**的方式就没这个问题
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

> 进程与线程区别？JS 单线程带来的好处？

- 进程描述了 CPU 在**运行指令及加载和保存上下文所需的时间**，放在应用上来说就代表了一个程序
- 线程是进程中的更小单位，描述了执行**一段指令**所需的时间
- 比如在浏览器中，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁
- JS引擎和渲染引擎的两个线程是互斥的，JS 运行的时候可能会阻止 UI 渲染，这说明了这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI
- 这就是个单线程的好处，得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题

> 什么是执行栈？
- 执行栈是一个存储**函数调用**的栈结构，遵循**先进后出**的原则
- 首先会执行一个`main`函数，需执行的函数入栈，执行完后从栈中弹出
- 平时开发时，在报错信息Uncaught Error中就可以找到执行栈的痕迹
- 栈可存放的函数是有限制的，当我们使用递归的时候，一旦存放了过多的函数且没有得到释放的话，就会出现爆栈的问题

> 异步代码执行顺序？解释一下什么是 Event Loop ？
- 当我们执行JS代码的时候其实就是往执行栈中放入函数
- 当遇到异步的代码时，会被挂起并在**需要执行的时候**加入到 Task队列中，有多种 Task队列
- 一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，**所以本质上来说 JS 中的异步还是同步行为**
- 不同的任务源会被分配到不同的 Task 队列中，任务源可以分为微任务（microtask）和宏任务（macrotask）。在 ES6 规范中，微任务被称为 jobs，宏任务被称为 task

**所以 Event Loop 执行顺序是**

- 首先执行同步代码，这属于**宏任务**
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 如果有异步代码则执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码

微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`
# ES6
> ES6 中有使用过什么？

**使用过ES6 class**

- 它实际上是ES6构造函数的语法糖
- 是实现继承的一种方式
- `class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，父类中定义构造函数，并且在子类构造函数中必须调用 `super`，可以看成父类调用`call`传值
- 与ES5不同，class的属性方法不可枚举

**我们也可以通过原型实现继承**
- 可以使用组合继承，通过构造函数传参，可以复用父级的函数，不会与父类元素的引用属性发生共享，但是继承父级的时候调用了父级的构造函数，会继承很多父级的无用的属性，浪费了内存空间
- 我们也可以使用寄生组合继承，通过Object.create将父类的原型直接赋值给子类的原型，自己写constructor

**原本都是通过var来定义变量，现在比较多用let和const**
- 原本var的话是存在变量提升的，并挂载到window上，let/const即使在全局作用域下声明也不会挂载到window上
- let和const也存在提升，告知在这块作用域可以访问，但是访问受限，因为存在暂时性死区，所以不能在声明前使用变量
- const和let的区别在于不能再次赋值，但如果定义的是对象的话可以对对象进行操作
- let和const使得JS存在块级作用域
---
- 变量提升，是将声明挪到顶部为undefined
- 函数提升，是将整个函数挪到顶部
- 函数提升优于变量提升

**还使用过箭头函数**

- 箭头函数类似于匿名函数简写
- 但和匿名函数还是存在一定区别的
- 匿名函数的this挂载在window上
- 而箭头函数的this指向词法作用域，由上下文确定，所以call/apply/bind的第一个参数失效

		
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
> JS 是如何运行的？


**JS是单线程运行的**

- 进程描述了 CPU 在**运行指令及加载和保存上下文所需的时间**，放在应用上来说就代表了一个程序
- 线程是进程中的更小单位，描述了执行**一段指令**所需的时间
- 比如在浏览器中，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁
- JS引擎和渲染引擎的两个线程是互斥的，JS 运行的时候可能会阻止 UI 渲染，这说明了这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI
- 这就是个单线程的好处，得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题

**JS中存在一个执行栈**
- 执行栈是一个存储**函数调用**的栈结构，遵循**先进后出**的原则
- 首先会执行一个`main`函数，需执行的函数入栈，执行完后从栈中弹出
- 平时开发时，在报错信息Uncaught Error中就可以找到执行栈的痕迹
- 栈可存放的函数是有限制的，当我们使用递归的时候，一旦存放了过多的函数且没有得到释放的话，就会出现爆栈的问题

**JS中代码的执行顺序依赖于Event Loop**
- 当我们执行JS代码的时候其实就是往**执行栈**中放入函数
- 当遇到异步的代码时，会被挂起并在**需要执行的时候**加入到 Task队列中，有多种 Task队列
- 一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，**所以本质上来说 JS 中的异步还是同步行为**
- 不同的任务源会被分配到不同的 Task 队列中，任务源可以分为微任务（microtask）和宏任务（macrotask）。在 ES6 规范中，微任务被称为 jobs，宏任务被称为 task

**所以 Event Loop 执行顺序是**

- 首先执行同步代码，这属于**宏任务**
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 如果有异步代码则执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码

微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

**JS中还存在垃圾回收机制**

- V8 实现了准确式 GC，GC 算法采用了分代式垃圾回收机制。所以，V8 将内存（堆）分为新生代和老生代两部分
- 新生代中的对象一般存活时间较短，使用 Scavenge GC 算法
- 在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间
- 在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的
- 新分配的对象会被放入 From 空间中，当 From 空间被占满时，**新生代 GC 就会启动了**
- 算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁
- 当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了
- 老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除算法和标记压缩算法
- 新生代中的对象已经经历过一次 Scavenge 算法的会将对象从新生代空间移到老生代空间中。
- To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

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
- DOM操作的多叉树，复杂度为O(n^3)

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
> Vue 双向数据绑定的实现

- Vue数据双向绑定是通过**数据劫持**结合**发布者-订阅者模式**的方式来实现的
- 主要设计Observer监听数据变化，设计Dep发布者来管理Watcher订阅者
- 通过Observer递归defineProperty来设置getter和setter
- Observer data初次渲染的时候会触发getter，会把当前data的watcher实例设置Dep的target
- 接下来进⼊依赖收集阶段，通过dep的addSub把它添加到subs⾥面
- 当data更改的时，会触发setter，调⽤用dep的notify通知Watcher，并循环subs进行回调
- watcher回调调用Compiler，进行diff和patch

**diff和patch**

- VNode是JS对象抽象的DOM树，可以做到不依赖平台
- 新旧VNode对⽐是在同层级的VNode之间进行⽐较的
- 判断是否是【sameNode】（key，tag，isComment，data，inputType），如果是
sameNode，就进行patchVnode过程
# 项目
## A Mobile Intelligent Reading Teaching Annotation System（移动智能阅读教学批注系统）
### 背景
在“互联网+”普及的时代下，教育与数字阅读相结合是必然的趋势
### 要研究什么问题（解决了什么问题）
一个能够给学生提供阅读展示，给教师提供授课参考帮助，对师生批注进行智能分析的多终端智能批注系统
- 布置了课外阅读作业，无法考证学生是否真的阅读了，无法追溯学生的阅读轨迹和阅读情况
- 由于每个人的阅读习惯不同，即使在规定批注格式的情况下，学生提交的作业仍会出现格式多样，书写杂乱等问题，给教师批改造成困难，增加教师工作负担
- 目前阅读教学中普遍存在的作业布置成本高、收发不便、查验难、不易保存
### 创新点及意义
- 系统规范了不同类型批注的标记样式，批注类型的分类更加明确
- 作业的布置流程更短，内容更自由，作业的查验更加准确、高效
- 批注内容云端保存，使阅读记录有迹可循，有据可循
- 在学生阅读量化、可视化，减轻教师教学压力，提高工作效率
- 数据挖掘、智能推荐（采用混合推荐算法，以解决稀疏性、冷启动、可扩展性问题。根据不同的学生特点采用多模式的推荐策略，以实现提高推荐的针对性）
### 系统功能
**作业流程**

![](/images/20190506142018128.png)
 
教师可以创建班级并发布作业，学生完成作业后教师即可批阅作业

**教学辅助**
![](/images/20190506142026386.png) 

学生教师均可自由阅读并添加批注，他们都可以创建群组并在其中分享资料，群组与班级的区别是：群组是一个兴趣小组，大家自由阅读，而班级是发布作业、批改作业。
### 整体技术架构
- Framework7 + Spirng + SpringMVC + Hibernate + MySQL
- 前后端完全分离，大量使用RESTFul接口，使用Ajax进行数据交互

### 核心功能及其技术实现原理
**getLocation()用于获取用户选择的文本范围**

- 通过window.getSelection()方法获取一个Selection对象

**getString(n)用于获取选中文本的内容**
 
- 通过调用Selection对象的toString()方法来获取并传递到弹出的popup，在popup中可以输入批注内容

**toPanel()用于将选中文本和批注内容添加到侧边栏**

- toPanel中调用getRangeObject、 getInfo()、anPaint()方法

**getRangeObject()用于将Selection对象转化为Range对象**

- 针对现代浏览器可直接调用getRangeAt()函数将Selection对象转化为Range对象 range = sel.getRangeAt(index)
- 针对较低版本的浏览器我们进行了兼容性的适配，通过createRange()生成一个range对象，然后通过setStart、setEnd来实现
- 之所以转成Range对象是因为Range提供了很多Section对象所没有的API，比如可以通过Range提供的函数直接获取选中对象在某一段中的起始位置和结束位置等

**getInfo(n)用于获取Range对象的所在段落，起始位置和结束位置**
- 通过遍历计数range.startContainer.parentNode即可获得其所在段落数
- 通过range.startOffset即可获得其在段落中开始的位置
- 通过range.endOffset即可获得其在段落中结束的位置
- 通过传入的n来判断批注的类型
- 通过Ajax将一条批注的结构化数据传递到后台存储

```js
{
	selected: text,
	content: textarea,
	start: start,
	end: end,
	type: type,
	userId: userId,
	passageId: passageId
}
```

```js
function getLocation(n) {
  var userSelection;
  var par = 0;
  if (window.getSelection) { //现代浏览器
    userSelection = window.getSelection();
  }
  var getRangeObject = function (selectionObject) {
    if (selectionObject.getRangeAt)
      return selectionObject.getRangeAt(0);
    else { // 较老版本Safari!
      var range = document.createRange();
      range.setStart(selectionObject.anchorNode, selectionObject.anchorOffset);
      range.setEnd(selectionObject.focusNode, selectionObject.focusOffset);
      return range;
    }
  }
  var rangeObject = getRangeObject(userSelection);
  var p = rangeObject.startContainer.parentNode;
  while (p = p.previousSibling) {
    par++;
  }
  par = par + 1;
  paragraph = par;
  start = rangeObject.startOffset;
  console.log(start);
  end = rangeObject.endOffset;
  type = n;
}
```
 
**anPaint(bton)用于为批注添加样式**
之前没有考虑到批注文本的重叠，我们直接用了jQuery的wrap()方法，引入了rangy，使用其createClassApplier方法为不同的批注添加不同的样式，其原理是为选中的range对象添加带有样式的`<span>`标签，引入rangy是因为其对于不同批注的重叠部分有更好的处理，重叠部分颜色会加深
```js
 //添加批注样式
function anPaint(bton) {
  rangy.init();
  var classApplierModule = rangy.modules.ClassApplier;
  if (true) {
    switch (bton) {
      case 0:
        cssApplier = rangy.createClassApplier("Bton0Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 1:
        cssApplier = rangy.createClassApplier("Bton1Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 2:
        cssApplier = rangy.createClassApplier("Bton2Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 3:
        cssApplier = rangy.createClassApplier("Bton3Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 4:
        cssApplier = rangy.createClassApplier("Bton4Backgrond", false);
        cssApplier.toggleSelection();
        break;
    }
  }
};
```
**reAnnotate()用于文本重新渲染**
- createRange setStart setEnd select() rangy.creatClassApplier

**rePanel()用于侧边栏批注的重新渲染**
- 点赞、修改、删除……

**智能推荐的实现**
- 使用k-means和TF-IDF算法进行资料聚类并使用ItemCF、UserCF、隐语义、社交网络等4种算法进行混合推荐

### 结论
平台基于“互联网+”与批注式阅读相结合的设计理念，提出了批注式课外阅读教学平台，为目前阅读教学中存在的作业布置成本高、收发不便、查验难、不易保存等问题提供了较为完善的解决方案。


## Intelligent Student Services Administration System in the Context of Collegiate System
### 背景
这篇论文主要讲的是书院制在引入国内初期带来的一些问题，比如部门增加、职责不明、管理效率降低等。所以课题组设计开发了一个系统，为书院制高校的事务管理提供一套更加契合书院制的通用解决方案，提高管理效率。
### 具体问题
- 针对假期离校统计这个问题，辅导员采用的方式是：将电子名单放在班级群文件内，每位同学自行下载，填好自己的假期离校情况，再单独发送给班长，最后由班长统计再发送给辅导员，辅导员还要再次汇总
- 包括对一些简单信息的征集，比如开学订寝具包的人数、班级家庭情况等信息的征集都采用这种比较低效率的方式
### 系统功能
**活动管理子系统**
- 学生：填报活动、查看已填报的活动
- 教师：发布活动、查看并下载活动报名情况

**离返校管理子系统**
- 学生：填写离校信息、返校定位签到
- 教师：发布假期离返校统计、查看并下载学生离返校情况

**智能表单子系统**
- 学生：填写并查看表单
- 教师：发布智能表单、查看并下载汇总信息

**志愿分流管理子系统**
- 学生：填报志愿信息、查看并修改已填报的志愿信息
- 教师：发布志愿信息、查看并下载志愿填报情况

### 整体技术架构
Bootstrap + jQuery + 高德地图API + ThinkPHP + MySQL

### 核心功能及其技术实现原理
**智能表单**
- DOM元素的动态生成
- 采用ECharts框架实现数据的统计与可视化

**信息存储**
建立了4张表，分别是表单、问题、选项、回答，多表联查进行信息的处理

**定位签到**
通过高德地图API进行定位并返回经纬度，设定经纬度的最值，通过比对来判断是否在校从而进行签到的实现

### 结果
- 在减轻了班委统计工作的同时，也提高了管理者工作的效率。
- 2017年4月，学院使用该系统完成了全体学生的三轮专业分流工作，一改纸质操作，避免数据录入错误，教务处工作量减少50%，工作周期从16天减少至7天

## Personalized Reading Education Platform under Big Data-Driven Decision Making（大数据驱动决策下的个性化阅读教育平台）
这篇论文主要讲的是随着大数据时代的到来，青少年阅读的细节化测量成为可能，所以为了促进青少年个性化阅读并辅助教师及教育管理者决策，课题组设计了这个个性化阅读教育平台，通过分析大量青少年的阅读数据，生成可视化阅读报告。通过分析这个平台未来发展中的应用场景，证明该平台能为个性化阅读和决策提供技术支撑。
我们对平台系统架构进行了较详细的设计，分为了数据生成、数据获取、数据存储、数据分析四个过程。
 
![](/images/20190506141815371.png)

在**数据生成**阶段，我们从网络爬虫、系统数据库、系统日志这三个地方获取数据，以保证数据的充足，为后续数据挖掘工作做好准备。

在**数据获取**阶段，由于平台生成的原始数据中存在大量错误、重复的数据，且传统的数据存储方式不利于进行数据的分析与计算。
- 所以我们运用Sqoop在Hadoop与传统的数据库之间进行数据传递
- 同时运用Flume采集日志数据并进行简单处理，并进行清洗和重构
- 通过TF-IDF算法获得各文章关键字的权重矩阵，再采用k-means算法进行文章聚类，为每类文章定义标签，完成文章标签化
- 通过计算词频和逆文本频率指数得出基本权重值，再根据用户行为对权重进行调整，通过分析得到用户阅读偏好、阅读能力、用户受欢迎程度作为用户画像的主要构成部分。
 
![](/images/20190506141803627.png)

在**数据存储**阶段，我们使用HDFS和HBase这两种技术来存储数据。

在**数据分析**阶段，我们运用Hive对大量数据进行处理，运用MapReduce对数据进行分布式计算，运用Spark Streaming对数据进行实时处理。运用ploty将数据以多维报表、图片等形式进行展现，为教师及教育管理者的科学决策提供依据。

本平台采用混合**智能推荐**方式，通过4种推荐算法的并行运算，其中包括：基于物品的协同过滤算法(ItemCF)、基于用户的协同过滤算法(UserCF)、基于隐语义模型的推荐算法、基于社交网络的推荐算法。在不同情况下，以不同的权重比将上述方式的结果推荐给学生。（当学生行为记录数小于50条时，ItemCF与UserCF的推荐结果较不准确，因此本平台将基于隐语义模型推荐算法的结果及排行榜的内容，以4:1的权重比推荐给学生。当学生行为记录数大于或等于50条时，由于数据已经充足，可以较好的采用ItemCF与UserCF，且这两种算法的推荐结果要优于其他几种方式，因此本平台按照3:3:2:1:1的权重比将上述几种推荐算法的结果推荐给学生。）
首先根据学生喜欢的文章，采用ItemCF，若两篇文章同时被多名用户喜欢，则它们之间有一定的相似性，由此推荐与其所喜欢的文章相似的文章，接着采用UserCF，找到与目标学生有相同兴趣的学生，计算出学生之间的余弦相似度、兴趣相似度，将有相同兴趣学生所喜欢的文章推荐给目标学生，接下来通过一些特征联系学生和文章，为学生建立隐语义模型，通过矩阵分解建立学生和隐类之间的关系，推荐学生可能喜欢的文章。最后通过用户关联的社交账号，可获得其社交信息，本平台通过这些信息向学生推荐其感兴趣的内容。

## Student Affairs Management System Design Based on Mobile Application EAider
这篇文章是在Intelligent Student Services Administration System in the Context of Collegiate System这篇论文的研究成果上写的，但是是基于Android开发的移动端，而Intelligent是基于web开发的（我不是第一作者）

## 基于互联网+的书院制学生事务管理系统
这篇文章是和教授合写，主要是讲教育改革及书院制的方面的内容
## University Discipline Construction Progress Monitoring System（高校学科建设进程监控系统）
### 背景
这篇论文主要讲了在国家双一流建设的背景下，针对浙江省一流学科建设所开发的一套进程监控系统
### 要研究什么问题（解决了什么问题）
- 考核评定工作繁琐复杂
- 信息更新不够及时
- 建设进度不够直观难以把控
### 系统功能及意义
**指标定义模块**：通过指标定义模块，管理员可以在系统初始化时定义所需要的各级指标信息以及观测点，同时设置指标任务目标值、阶段性考核评定时间和最终考核评定时间，并且可以根据建设过程的具体情况随时调整，解决了同一系统不适用于多所高校和多个学科的问题。
表单提交模块：达到一份表单和材料对应的多个观测点能够通过一次提交操作同时更新，减少用户的重复操作次数。
**表单审核模块**：当指标对应的观测点数据需要更新时，负责相关指标任务的教职工就会通过表单提交模块提交更新内容和佐证材料，提交的信息必须通过管理员的审核才能生效。该模块保证数据来源真实有效，防止部分弄虚作假行为的出现，为获得准确有效的进度信息提供了保障。
**数据统计模块**：通过数据统计模块，管理员审核通过后的每一条数据都会进行实时更新，观测点对应的现状值是系统通过对数据库数据实时统计得到的结果，即便是管理员也没有直接修改的权限，确保了数据的真实性。数据统计结果通过表格、进度条和统计图三种形式进行展示，直观实时的数据统计结果也更好的增强了管理者对建设进度的监控管理效果。
**用户管理模块**：通过用户管理模块，管理员可以进行新增用户、删除用户、修改用户信息、重置用户密码等操作，还可以查看用户提交表单的记录，确保每条表单记录都能找到对应的负责人，出现问题即可追溯责任到个人。如果某项指标进度缓慢，管理员可以通过该模块对相关负责人进行警示，督促其尽快进行调整，保证每一项指标都能够顺利完成。
**公告通知模块**：通过公告通知模块，管理员可以发布信息，教职工可以查看信息。
### 整体技术架构
Bootstrap AppUI jQuery Ajax EChart (Canvas) J2EE (Spring + SpringMVC + Hibernite + MySQL)

## 其它
**主持参与国家级大学生创新创业训练计划、新苗人才计划项目8项，其中主持2项（2016-2018）**
1. 课外阅读智能批注系统
2. ISchool书院制学生事务管理系统
3. 浙江科技学院软件工程一流学科网站 - 项目负责人
一个门户网站，该网站已被浙江科技学院信息与电子工程学院采用并投入正式使用 (http://rjgc.zust.edu.cn)
4. 基于微信小程序的3D全景创业资源对接平台建设 - 前端负责人
本项目是基于微信小程序并利用H5的3D全景漫游技术打造的创业资源对接平台。本平台分为创业广场模块、投资机构模块和沟通交流模块等3大模块，每个模块均由3D全景漫游技术打造。通过本平台，创业者们可以在创业广场模块中展示自己的公司，可浏览参观其他公司，寻找公司合作，在投资机构模块寻找投资者，在沟通交流模块寻找适合自己的合作伙伴。投资者们可在投资机构模块展示自己的实力概况，在创业广场模块寻找自己中意的企业进行投资。未创业者们可在沟通交流模块中展示自己的创意和才能，在创业广场模块选择自己青睐的企业申请成为合伙人。本平台在互联网信息大爆炸的时代，对创业资源进行整合，形成一张创业者、投资者和未创业者之间的创业网，使创业更加高效、快速。
	采用基于WePY的小程序组件化开发框架开发
	全景采用Three.js的panorama来实现
5. 基于移动端的EAider学生事务管理平台
项目组成员通过参加班级事务管理以及辅助辅导员工作，针对安吉校区中学生与辅导员之间信息交互效率较低的现象，提出基于移动端的EAider高校学生事务管理平台，以减轻班委及管理者的工作。
管理者用户可通过该平台采集学生的信息、发布校内消息、处理事务等，并可以及时处理学生的信息，进行汇总、统计。学生用户可以登陆系统，查看各种通知、公告，填报各种活动，进行如“心目中的好老师”的投票，运动会报名等。
本平台可以由管理者发布信息，实现学生自主填报信息，并及时将信息反馈给管理者，由系统智能处理、统计、分派、汇总。在减轻了班委统计工作的同时，也提高了管理者工作的效率。
6. 基于“互联网+”车辆调度综合管理系统 
项目组成员通过对事业单位的车辆调度进行调查分析，发现现阶段存在调度无法高效的调配有效资源，在一些方面存在资源的浪费，调配存在不合理因素的现象，由此项目组提出了基于 “互联网+”车辆调度综合管理系统，使事业单位车辆调度更加智能化。
7. 浙江省一流学科建设进程监控系统
为了加强浙江省高校一流学科建设，全面提升全省高校学科实力和水平，浙江省各高校开始执行《浙江省一流学科建设实施办法》，按照要求，各学校、学科应科学制定一流学科建设任务书，并建立一流学科建设实施情况定期报告制度。为此，项目组成员提出开发一流学科建设进程监控系统，通过互联网的实时性与信息平台的便捷性提高管理者日常监测、中期检查和终期验收的工作效率，督促各部门按时完成各项指标。
管理者可按照一流学科建设任务书中设立的建设指标自定义相应表单，下属各部门负责人通过填写表单以及上传佐证材料完成指标建设进展的信息更新，上传的信息通过审核后生效。管理者还可通过本系统随时查看一流学科建设各指标当前的完成情况，系统将可视化地展示各指标的完成状态，管理者可对完成度较低的指标提出警示，督促其负责人进行调整。同时管理者也可以在该系统发布建设进展相关信息、工作安排公告等。
8. 通用型专家工作室管理系统
本项目是设计具有通用性专家工作室管理系统。专家可以根据自己的喜好选择网站模板，通过可视化的界面、自定义设置的方式，设置工作室网站的栏目、整体框架和各个模块的开启状态，也可以修改模块内容来展示自己的信息，工作室系统设置好后，会自动生成对应的域名，专家可以通过该域名访问自己的工作室网站。
本项目还包含后台管理系统，专家用户可以根据自定义模板的开启状态，使用后台管理系统添加或修改自己的专家工作室网站的内容，以达到信息实时更新。
本项目的功能较全，形式多样的访问者可以在专家发布的文章下添加自己的评论，与专家互动，进行学术交流。
9. 基于人工智能的儿童启迪助手
根据调查研究，当今社会节奏过快，竞争激烈，父母肩负更多的工作压力，又或知识有限，无法给予孩子即时性的启迪教育，但这又深刻影响孩子的成长。为此，项目组提出了“基于人工智能的儿童启迪助手”。
儿童时期是人的认知发展最为迅速、最重要的时期，在人一生认识能力的发展中具有十分重要的奠基性作用,为青少年的发展打下坚实的基础,具有重要的现实意义。“基于人工智能的儿童启迪助手”中的AI助手小Y，模仿儿童形象与声音，能成为孩子在启迪过程中的小伙伴。通过AI助手小Y与孩子开放式交谈，既可以满足孩子对未知事物的好奇，给出适合孩子年龄段的人性化解释，解答其困惑。同时父母可在本系统查看孩子的提问，并通过由人工智能分析得出的个性分析报告，了解孩子的内心状态，提升对孩子内心的理解，达到因材施教的目的。当开启栅栏模式时，通过定位功能对孩子的安全也有一定程度的保证。
本项目将独立开发家长端app和儿童端app。儿童端中人工智能助手小Y为核心模块，以AI语音交流为主要交互手段。家长端中，设计了问答记录模块、个性分析模块、学习建议模块、位置共享模块和通讯模块。

