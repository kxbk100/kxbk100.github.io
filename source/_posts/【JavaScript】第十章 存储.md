---
title: 【JavaScript】第十章 存储
date: 2019-03-16 15:43:36
categories:
typora-root-url: 【JavaScript】第十章 存储
typora-copy-images-to: 【JavaScript】第十章 存储
---

> 1. 请描述下cookie、sessionStorage和localStorage的区别

# cookie
- 本身用于客户端和服务端通讯
- 但它有本地存储的功能，于是就被借用了
- 使用`document.cookie = xxx`获取修改即可

缺点
- 存储量太小，4kb
- 所有http/Ajax请求都带着，影响获取资源效率
- API简单，需要封装才能用document.cookie

# localStorage
- HTML5专门为存储而设计，最大容量5M
- API简单易用
- iOS safari隐藏模式下，`localstorage.getItem`会报错，建议统一使用try-catch封装
```js
localStorage.setItem(key, value);
localStorage.getItem(key);
```
# sessionStorage
- HTML5专门为存储而设计，最大容量5M
- API简单易用
- 浏览器关了会清0
```js
sessionStorage.setItem(key, value);
sessionStorage.getItem(key);
```

# 题目解答
> 1. 请描述下cookie、sessionStorage和localStorage的区别

- 容量
- 是否会携带到Ajax中
cookie会携带，sessionStorage和localStorage不会携带
- API易用性  

