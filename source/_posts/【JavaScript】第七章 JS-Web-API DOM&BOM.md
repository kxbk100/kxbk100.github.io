---
title: 【JavaScript】第七章 JS-Web-API DOM&BOM
date: 2019-03-16 14:45:50
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1.	DOM是哪种基本的数据结构？
> 2.	DOM操作常用API有哪些？
> 3.	DOM节点的attr和property有何区别？
> 4. 如何检测浏览器的类型？
> 5. 拆解URL的各个部分

# 回顾JS基础知识
---
特点：表面看来并不能用于工作中开发代码
- 内置函数：Object、Array、Boolean、String等
- 内置对象：Math、JSON等
- 我们连在网页弹出一句hello world都不能实现

常说的JS（浏览器执行的JS）包含两部分：JS基础知识（ECMA262标准）和JS-Web-API（W3C标准）
- JS基础知识 ：ECMA262标准，只是一个规则
- JS-Web-API：W3C标准，没有规定任何JS基础相关的东西，不管什么变量类型、原型、作用域和异步，只管定义用于浏览器中JS操作页面的API和全局变量
- W3C标准中关于JS的规定有：DOM操作、BOM操作、事件绑定、Ajax请求（包括http协议）等
- NodeJS因为是基于JS所以符合ECMA262标准，但是其服务于服务器端，没有window、document等，而是有network、service等，不符合W3C标准

全面考虑，JS内置的全局函数和对象有哪些？
- 之前讲过的Object、Array、Boolean、String、Math、JSON
- 刚刚提到的window、document
- 所有未定义的全局变量，如navigator.userAgent

# DOM本质
---
XML是一种可扩展的描述语言，可以描述任何结构化的数据
- 数据结构：树
- HTML是XML的一种特殊类型

DOM：浏览器把拿到的HTML代码，结构化一个**浏览器能识别**并且**JS可操作性**的一个模型
- Document 文档
- Object 对象
- Modal 模型

# DOM节点操作
---
## 获取DOM节点
[QuerySelector/QuerySelectorAll和getElementById/getElementsByClassName的区别](https://juejin.im/post/5a7d8f325188257a6c690065)
```js
// div1、divList、containerList、pList都是JS对象
var div1 = document.getElementById('div1'); // 元素
var divList = document.getElementByTagName('div'); // 集合
console.log(divList.length);
console.log(divList[0]);

var containerList = document.getElementByClassName('.container'); // 集合
var pList = document.querySelectorAll('p'); // 集合
```
## property
- 文档直接修改，查看源码即可看到修改
- 修改的是JS对象的标准属性，有关JS的属性
```js
var pList = document.querySelectorAll('p');// 集合
var p = pList[0];
console.log(p.style.width); // 获取样式
p.style.width='100px';  // 修改样式
console.log(p.className); // 获取class
p.className='p1'; // 修改class

// 获取nodeName和nodeType
console.log(p.nodeClass)
console.log(p.nodeType)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190316124944639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2t4YmsxMDA=,size_16,color_FFFFFF,t_70)
## Attribute
- 文档直接修改，查看源码即可看到修改
- 修改的是HTML代码文档内的标签，有关文档内标签的属性
- setAttribute原本没有的标签属性会自动添加
```js
var pList = document.querySelectorAll('p'); // 集合
var p = pList[0];
p.getAttribute('data-name');
p.setAttribute('data-name', 'imooc');
p.getAttribute('style');
p.setAttribute('style', 'font-size:30px;');
```
# DOM结构操作
---
针对树的操作
## 获取父元素
```js
var div1 = document.getElementById("div1");
var parent = div1.parentElement;
```

## 获取子元素
在使用childNodes获取子元素时，换行也会算作1个text，计为1个Node
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190316141610797.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2t4YmsxMDA=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019031614163253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2t4YmsxMDA=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190316141714170.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2t4YmsxMDA=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190316141727999.png)
```js
var div1 = document.getElementById("div1");
var child = div1.childNodes;
console.log(child[0].nodeType) // text 3
console.log(child[1].nodeType) // p 1 标签都是1
console.log(child[0].nodeName) // text #text
console.log(child[1].nodeName) // p P
```
## 新增节点
```js
var div1 = document.getElementById('div1')
// 添加新节点
var p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素

// 移动已有节点
var p2=document.getElementById('p2')
div1.appendChild(p2)
```
## 删除节点
```js
var div1 = document.getElementById('div1');
var child = div1.childNodes;
div1.removeChild(child[0]); // 可能看不到效果，因为删除的child[0]可能是1个因换行引起的text Node
```

# BOM
---
- Browser 浏览器
- Object 对象
- Modal 模型
## navigator
```js
var ua = navigator.userAgent;
var isChrome = ua.indexof('Chrome');
console.log(isChrome);
```
## screen
```js
console.log(screen.width);
console.log(screen.height);
```
## location
```js
console.log(location.href); // 整个url
location.protocol; //协议：http or https
location.host; // 域名
location.pathname;  // 路径
location.search; // ?后的参数
location.hash // #后面是哈希
```
## history
```js
history.back(); // 返回
history.forward(); // 前进
```

# 题目解答
---
> 1.	DOM是哪种基本的数据结构？

树

> 2.	DOM操作常用API有哪些？

- 获取DOM节点以及节点的property和Attribute
- 获取父节点、子节点
- 新增节点和删除节点

> 3.	DOM节点的attr和property有何区别？

- property只是一个JS对象的属性的修改和获取
- Attribute是对HTML标签属性的修改和获取

> 4. 如何检测浏览器的类型？

```js
var ua = navigator.userAgent;
var isChrome = ua.indexof('Chrome');
console.log(isChrome);
```

> 5. 拆解URL的各个部分
```js
console.log(location.href); // 整个url
location.protocol; //协议：http or https
location.host; // 域名
location.pathname;  // 路径
location.search; // ?后的参数
location.hash // #后面是哈希
```
