---
title: 【Career】Vue面试
date: 2019年04月08日 00:27:43
categories: Career
typora-root-url: ..
typora-copy-images-to: ../images
---

@[TOC]
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
