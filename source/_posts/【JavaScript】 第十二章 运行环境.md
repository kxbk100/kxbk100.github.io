---
title: 【JavaScript】 第十二章 运行环境
date: 2019-03-22 17:46:17
categories:
typora-root-url: ..
typora-copy-lalal-to: ../lalal
---

> 1. 从输入url到得到html的详细过程
> 2. window.load和DOMContentLoaded的区别

# 页面加载过程
---
- 浏览器就可以通过访问链接来得到页面的内容
- 通过绘制和渲染，显示出页面的最终的样子

## 加载资源的形式
- 输入url或跳转页面加载html http://coding.m.imooc.com
- 加载html的静态资源`<script src="jquery.js"></script>`

## 加载一个资源的过程
1. 浏览器根据DNS服务器得到域名的IP地址
2. 向这个IP的机器发送http请求
3. 服务器收到处理并返回http请求
4. 浏览器得到返回内容

## 浏览器渲染页面的过程
1. 根据HTML结构生成DOM Tree
2. 根据CSS生成CSSOM
3. 将DOM和CSSOM整合形成Render Tree（渲染树）
4. 根据Render Tree开始渲染和展示
5. 遇到`<script>`时，会执行并阻塞渲染
因为JS会改变DOM结构及内容，所以两者不能同时进行

- 将CSS放于head中，加载完CSS后浏览器直接知道规则，在渲染body中的元素时，已将CSS考虑进去渲染
- 将CSS放于body尾部，元素先按照默认加载，然后再根据CSS进行改变，性能较差
- 将script放于body尾部，可以拿到所有DOM标签和结构，不会阻塞body上面的元素的渲染，性能较优
- `<p><img src="XXX" /></p>`img DOM元素会顺序生成，但图片src异步加载

# 性能优化
---
## 原则
- 多使用内存、缓存或者其他方法
- 减少CPU计算、减少网络请求、减少IO操作（前端不考虑）

## 从哪里入手
### 加载页面和静态资源
静态资源的压缩合并（打包合并+代码压缩）
- 手动合并效率低、会出错，一般用构建工具合并
- 3个文件需要发3个请求，每个请求都会耗费很多时间
- 1个文件只需发送1个请求
```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
// 打包合并后
<script src="abc.js"></script>
```

静态资源缓存
- 通过链接名称控制缓存，`<script src=“abc_1.js”></script>`
- 只有内容改变的时候，链接名称才会改变，`<script src="abc_2.js"></script>`

使用CDN
- 不同地域的资源优化
- 让资源加载更快

使用SSR后端渲染
- 现在VUe React提出了这样的概念
- 其实jsp php asp都属于后端渲染
- 数据直接输出到HTML中

### 页面渲染
CSS放前面，js放后面

懒加载
- 图片懒加载、下拉加载更多
- 给src赋值一个很小的图
- 真正的图片放在一个data后面
- 用的时候再把data属性赋值到src中
- 加快页面渲染速度
```html
<img id="img1" src="preview.png" data-realsrc="abc.png" />
<script>
  var img1 = document.getElementById('img1');
  img1.src = img1.getAttribute('data-realsrc');
</script>
```
减少DOM操作
- 缓存DOM查询，减少DOM查询，对DOM查询做缓存
```js
// 未缓存DOM查询
var i;
for (i = 0; i < document.getElementsByTagName('p').length; i++) {
  // TODO
}

// 缓存了DOM查询
var pList = document.getElementsByTagName('p');
var i;
for (i = 0; i < pList.length; i++) {
  // TODO
}
```

- 合并DOM插入，减少DOM操作，多个操作尽量合并在一起执行
```js
var listNode = document.getElementById('list');
// 创建1个片段
var frag = document.createDocumentFragment();
var x, li;
for (x = 0; x < 10; x++) {
  li = document.createElement('li');
  li.innerHTML = "List item" + x;
  // 插入片段
  frag.appendChild(li);
}
// 最后将片段直接插入正文
listNode.appendChild(frag);
```
事件节流
- 合并频繁操作
- 很快的连着的操作，快速打字先不触发
```js
var textaarea = document.getElementById('text');
var timeoutId;
textaarea.addEventListener('keyup', function () {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function () {
    // 触发change事件
    console.log("用户停止打字，开始触发事件")
  }, 100);
})
```
尽早执行操作
```js
window.addEventListener('load', function () {
  // 页面全部加载完之后才会执行，包括图片、视频等
})

document.addEventListener('DOMContentLoaded', function () {
  // DOM渲染完即可执行，此时图片、视频还可能没有加载完
  // jQuery、zepto均使用此方法
})
```

# 安全性
---
## XSS跨站请求攻击
- 在新浪博客写一篇文章，同时偷偷插入一段`<script>`
- 攻击代码中，获取cookie，发送到自己的服务器
- 发布博客，有人查看博客内容
- 会把查看者的cookie发送到攻击者的服务器

预防
- 前端替换关键字，例如替换`<`为`&lt;`、`>`为`&gt;`（配合）
- 后端替换（建议）

## XSRF跨站请求伪造
- 你已登录一个购物网站，正在浏览器商品
- 该网站付费接口是 xxx.com/pay?id=100 ，但是没有任何验证
- 然后你收到一封邮件，隐藏着`<img src=xxx>`
- 你查看邮件的时候，就已经悄悄的付费购买了

预防
- 增加验证流程，如输入指纹、密码、短信验证码等

# 面试技巧
---
## 简历  
- 简洁明了，重点突出项目经历和解决方案
- 把个人博客放在简历中，并且定期维护更新博客
- 把个人的开源项目放在简历中，并维护开源项目
- 简历千万不要造假，要保持能力和经历上的真实性

## 过程中
- 如何看待加班？加班就像借钱，救急不救穷
- 千万不可挑战面试官，不要反铐面试官
- 学会给面试官惊喜，但不要太多
- 遇到不会回答的问题，说出你知道的就可以
- 谈谈你的缺点：说说你最近正在学什么就可以了
> 可能对React不是很了解，最近正在学React，大约1个月后就能做出1个React的网站
 
# 题目解答
---
> 1. 从输入url到得到html的详细过程

- 浏览器根据DNS服务器得到域名的IP地址
- 向这个IP的机器发送http请求
- 服务器收到处理并返回http请求
- 浏览器得到返回内容

> 2. window.load和DOMContentLoaded的区别
```js
window.addEventListener('load', function () {
  // 页面全部加载完之后才会执行，包括图片、视频等
})

document.addEventListener('DOMContentLoaded', function () {
  // DOM渲染完即可执行，此时图片、视频还可能没有加载完
  // jQuery、zepto均使用此方法
})
```
