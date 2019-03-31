---
title: 【技术之瞳】Web前端开发学习小记及部分答案解析
date: 2019-03-07 00:30:41
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

基础技术
- HTTP
- HTML
- CSS
- JavaScript

编程能力
- 数据结构和算法
- 正则表达式

扩展技术
- Node.js
- 前端框架
- 前端工程
- 数据可视化

# HTTP协议
> 1. 与浏览器缓存相关的字段名 P113习题4.2

Expires
- 当客户端第一次访问一个文件资源的时候，服务端在返回资源内容的同时也返回了：
`Expires: Mon, 1 Aug 2016 22:43:02 GMT`
- 也就是服务端告诉浏览器，先把这个文件缓存起来，在这个过期时间之前，该文件都不会变化了
- 下一次浏览器又要访问这个资源，并且访问的时间在`Mon, 1 Aug 2016 22:43:02 GMT`之前，那浏览器就不去服务器那边获取文件了，而是直接从缓存中取文件

Cache-Control
- 由于Expires给定的是绝对时间，而客户端的系统时间可以由用户任意修改，比如Expires设定的过期时间是`Mon, 1 Aug 2016 22:43:02 GMT`，现在用户把系统时间改为`Tue, 2 Aug 2016 22:43:02 GMT`，则缓存会被判为过期（虽然实际上还没到那个时间）
- 因此在HTTP1.1中引入了Cache-Control，这就是一个相对时间，比如`Cache-Control: max-age=80`，那就是说这份缓存的有效期是80秒，而没有给定过期的绝对时间
- 由于Cache-Control是HTTP1.1中才有的，因此可能会有Expires和Cache-Control同时出现的情况，这时以Cache-Control为准

Last-Modified / If-Modified-Since
- 现在有另外一个问题，**服务端有个文件可能会更新**，因此希望客户端时不时过来问一下这个文件是否过期
- 如果没有过期，服务端不返回数据给浏览器，只返回**304**状态码，告诉浏览器目前的缓存还没有过期，然后浏览器继续使用已有缓存
- 这个就叫做条件请求。这里就要用到以下两个头部信息
```
Last-Modified (response header)
If-Modified-Since (request header)
```
- 浏览器第一次请求资源的时候，服务端返回资源内容，同时也返回了`Last-Modified: Mon, 01 Aug 2016 13:48:44 GMT`，也就是服务端在告诉客户端这个文件在服务器上的最后修改时间
- 浏览器第二次访问的时候（假设这里没有设置Expires或者Cache-Control）。那么浏览器在访问资源的时候会在请求头上带上`If-Modified-Since: Mon, 01 Aug 2016 13:48:44 GMT`
- 服务端收到后对比目前文件的最后修改时间和该请求头的信息，如果没有修改，那就直接返回304给浏览器，而不返回实际资源。如果有变化了，就返回200，并且带上新的资源内容

Etag / If-None-Match
- 条件请求还有另外一种方法——打标签，也就是使用Etag
- 第一次拿到资源的时候，服务器的响应头中包含了Etag，用来作为时间标签
- 下一次浏览器再次请求资源的时候会把原来的Etag标签带上（在请求头中变成了If-None-Match）作为校验标准
- 若这个文件如果发生了改变，则Etag也会改变
- 服务器对比浏览器请求头中的的If-None-Match
- 如果相同就返回304，而不返回实际资源
- 如果不同，就返回200和新的资源
- 由于Etag需要通过服务器计算得出，每次都进行计算需要额外的开销，有时候这也是一种负担

> 2. HTTP协议与HTTPS协议，分析两者的相同点与不同点 P114习题4.4

- https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用
- http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议
- http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443
- http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全

# HTML

> 1. HTML5新特性 P117 习题4.8

https://www.cnblogs.com/greatluoluo/p/5714221.html

# CSS

> 1. 请用CSS实现：在所有新窗口打开的链接右侧添加一个示意图标 P123 习题4.11

```css
a[target="_blank"] {
  padding-right: 20px;
  background: url(123.png) no-repeat left top;
}
```
```html
<a href="/index.html">Homepage</a>
<a href="http://www.alibaba.com" target="_blank">Alibaba.com</a>
<a href="http://www.taobao.com" target="_blank">Taobao.com</a>
```

> 2. CSS中用`display: none`可以隐藏页面元素，请另外说出5种或以上隐藏一个页面元素的方法 P123 习题4.14

https://www.zcfy.cc/article/457

- 将opacity设为0
- 将visibility设为hidden
- 将display设为none
- 将position设为absolute，然后将位置设到不可见区域
- 使用clip-path属性裁剪

> 3. 请阐述CSS实现三角形的原理 P123 习题4.15

http://alvinwp.com/html-css/462
http://www.tashan10.com/zhong-yu-gao-dong-liao-cssshi-xian-san-jiao-xing-tu-biao-de-yuan-li/
```css
.div3 {
	margin-top: 20px;
	width: 0;
	height: 0;
	border-top: 40px solid transparent;
	border-left: 40px solid #ff0000;
	border-bottom: 40px solid transparent;
}
```
![](../images/undefined)
![](../images/undefined)
![](../images/undefined)
border-top + border-bottom = 三角形的底
border-left = 三角形的高
# JavaScript
> 1. 请填入内容，使得数组从小到大排序。 P130 习题4.17
> ```js
> var arr = [6, 2, 10, 5, 9, 5];
> arr.sort(_______);
> ```

- 数组调用sort方法后，会影响本身（而非生成新数组）
- `sort()`方法默认是按字符来排序的，所以在对数字型数组排序时，不可想当然的以为会按数字大小排序
- 要改变默认的sort行为（即按字符排序），可以自行指定排序规则函数
```js
var arr = [6, 2, 10, 5, 9, 5];
arr.sort(); // 调用sort方法后，数组本身会被改变，即影响原数组
console.log(arr); // 10, 2, 5, 5, 6, 9 默认情况下sort方法是按ASCII字母顺序排序的，而非我们认为是按数字大小排序
arr.sort(function (a, b) { return a > b ? 1 : -1 }); // 从小到大排序
console.log(arr); // 2, 5, 5, 6, 9, 10
arr.sort(function (a, b) { return a < b ? 1 : -1 });//从大到小排序
console.log(arr); // 10, 9, 6, 5, 5, 2
```
>  2. 删除给定数组中的第2项和第3项，并且在得到的新数组中的第2项后面添加一个新的值。
>  ```js
>  var arr1 = ['a', 'b', 'c', 'd','e'];
> var arr2 = arr1.___(___, ___, 'newvalue');
> ```

```js
var arr1 = ['a', 'b', 'c', 'd','e'];
var arr2 = arr1.splice (1, 2, 'newvalue');
// arr2 = [b, c] 删除的元素
// arr1 = [a, newvalue, d, e]
```

> 3. 对比jsonp和document.domain+ iframe做跨域的异同，分别指出其优缺点。

[见博文](https://blog.csdn.net/kxbk100/article/details/88356854)
# 数据结构与算法
# 正则
# Node.js
# 前端框架
# 前端工程化
# 数据可视化

