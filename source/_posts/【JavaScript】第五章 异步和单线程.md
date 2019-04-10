---
title: 【JavaScript】第五章 异步和单线程
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1. 同步和异步的区别是什么？分别举例
> 2. 一个关于setTimeout的笔试题
> 3. 前端使用异步的场景有哪些

# 什么是异步（对比同步）
判断有没有阻塞
- 异步：无阻塞，我走我的，走完之后回来再说，等着执行，但是不卡在那儿，**等着但不闲着**
```js
console.log(100)
setTimeout(function () {
  console.log(200) // 未阻塞，没有在这儿停顿1s并打印200
}, 1000)
console.log(300)
// 100 300 200
```

- 同步：有阻塞，会阻塞下面代码的执行
```js
console.log(100)
alert(200) // 1秒后点击确认
console.log(300)
```

# 前端使用异步的场景
在可能发生等待的情况，等待过程中不能像alert一样阻塞程序运行，因此，***所有的*等待情况都需要异步**
- 定时任务：setTimeout、setInverval
- 网络请求：Ajax请求（请求Google CDN），动态`<img>`加载
```js
// Ajax请求demo
console.log('start');
$.get('./data1.json', function (data1) {
  console.log(data1);
});
console.log('end');
// start end 等待Ajax执行
```

```js
// <img>加载demo
console.log('start');
var img = document.createElement('img');
img.onload = function () {
  console.log('loaded');
};
img.src = '/xxx.png';
console.log('end');
// start end 等待图片加载
```
- 事件绑定
可执行多次，可以点击再点击，而前2个场景只能执行1次
```js
// 事件绑定demo
console.log('start');
document.getElementById('btn1').addEventListener('click', function () {
  alert('clicked');
});
console.log('end');
// start end 等待元素点击事件发生
```

# 异步和单线程的实现原理

## 执行顺序demo
```js
console.log(100)
setTimeout(function () {
  console.log(200)
})
console.log(300)
```
1. 执行第一行，打印100
2. 执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行
**单线程的特点，不能同时干两件事**
3. 执行最后一行，打印300
4. 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的任务要执行
5. 发现暂存起来的setTimeout中的函数无需等待时间，就立即来过来执行
## 执行顺序原理
- **所有异步**中的函数都会被拿出去暂时不执行，让它们等待
1. 所有的异步都是有函数的
2. 只是暂存，并不排成队列
- 所有同步任务执行完后，要看边上有没有等待的程序在执行
- 所有异步等待的任务，**同时**判断是否满足以下条件，**不管排队或者代码书写先后**
1. 是否有等待时间
2. 发送的请求是否正确返回
3. 绑定事件是否发生
- 若有，则被封禁，等待时间发生时解禁执行异步任务
- 若无，则一直处于解禁状态，直接执行等待的异步任务
## 什么是单线程
- 单线程一次只能干一件事，只能一个一个任务排队来，不能同时执行两个任务
- JavaScript是单线程的，但是又不能让程序阻塞卡顿，所以必须异步

# 题目解答
> 1. 同步和异步的区别是什么？分别举例

- 同步会**阻塞**代码执行，而异步不会
- alert是同步，setTimeout是异步

> 2. 一个关于setTimeout的笔试题

```js
console.log(1)
setTimeout(function () {
  console.log(2)
}, 0)
console.log(3)
setTimeout(function () {
  console.log(4)
}, 1000)
console.log(5)
// 1 3 5 2 1s后打印4
```

> 3. 前端使用异步的场景有哪些
- 定时任务：setTimeout、setInverval
- 网络请求：Ajax请求、动态`<img>`加载
- 事件绑定



