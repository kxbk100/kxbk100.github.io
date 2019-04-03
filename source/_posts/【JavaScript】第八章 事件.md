---
title: 【JavaScript】第八章 事件
date: 2019-03-16 15:41:25
categories:JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1. 编写一个通用的事件监听函数
> 2. 描述事件冒泡过程
> 3. 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

# 通用事件绑定
关于低版本IE兼容性问题
- IE低版本使用attachEvent，和W3C标准不一样
- IE低版本使用量非常少，很多网站早已不支持
```js
var btn = document.getElementById('btn1');
btn.addEventListener('click', function (event) {
  console.log('clicked');
})
// 封装
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn);
}
var a = document.getElementById('link1');
bindEvent(a, 'click', function (e) {
  e.preventDefault(); // 阻止默认行为，比如：阻止a标签的跳转
  alert('clicked');
})
```
# 事件冒泡
- 顺着DOM的顺序结构，底层叶节点的点击事件会一层一层根据顺序结构往其父元素上触发
- 点击p1后往上冒泡：触发p1的click事件 -> 触发div1的click事件 -> 触发body的click事件
```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
  </div>
  
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
</body>

<script>
var p1 = document.getElementById('p1');
var body = document.body;
bindEvent(p1, 'click', function (e) {
  e.stopPropagation(); // 阻止冒泡
  alert('激活');
})

bindEvent(body, 'click', function (e) {
  alert('取消');
})
</script>
```
# 代理
- 事件冒泡的应用：通过事件冒泡机制，在元素的上层增加事件绑定机制
- 代理到某个元素上：
- 好处：代码简洁，减少浏览器内存占用
```html
<body>
  <div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
    <!-- 会随时新增更多a标签 -->
  </div>
</body>

<script>
  var div1 = document.getElementById('div1');
  div1.addEventListener('click', function (e) {
    var target = e.target;
    if (target.nodeName === 'A') {
      alert(target.innerHTML);
    }
  })
</script>
```
完善版本
```js
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, function (e) {
    var target;
    if (selector) {
      target = e.target;
      if (target.matches(selector)) {
        fn.call(target, e); // this = target
      } else {
        fn(e);
      }
    }
  })
}
```
```js
// 使用代理
bindEvent(a, 'click', 'a', function (e) {
  console.log(this.innerHTML);
})

// 不使用代理
bindEvent(a, 'click', function (e) {
  console.log(this.innerHTML);
})
```
# 题目解答
> 1. 编写一个通用的事件监听函数

> 2. 描述事件冒泡过程

DOM树形结构 -> 事件冒泡 -> 阻止冒泡 -> 冒泡的应用（代理）

> 3. 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

使用代理



