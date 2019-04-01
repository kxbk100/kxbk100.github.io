---
title: 【CSS】元素居中指南
date: 2019-03-30 02:39:45
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

![](/images/20190330162209258.png)
# 水平居中
---
## inline or inline-*元素（比如文字或者链接）
- 让一个父元素为块级元素的行内元素水平居中
- text-align用于父元素，用于块元素，而不是用于a
- line-heighth设置于父元素或a均可
- vertical-align: middle设置于文本
```css
.center-children {
    text-align: center;
}
```
## 单个块级元素
- 这个块级元素是被设置了一个 `width` 属性了，否则它会占满宽度，这时候已经不需要居中了）
- 你可以设置块级元素的 `margin-left` 和 `margin-right` 为 `auto` 来使它水平居中
- 无论父级容器和块级元素的宽度如何变化，都不会影响块级元素的居中效果
- float属性是不能实现元素居中的
```css
.center-me {
    margin: 0 auto;
}
```
## 多个块级元素
如果有两个或者更多的块级元素需要在被一行里水平居中，那么你最好设置他们不同的 `display` 属性来达到效果了。
方法一：设置为 `inline-block`
![](/images/20190330014310344.png)
```html
<main class="inline-block-center">
  <div>
    I'm an element that is block-like with my siblings and we're centered in a row.
  </div>
  <div>
    I'm an element that is block-like with my siblings and we're centered in a row. I have more content in me than my siblings do.
  </div>
  <div>
    I'm an element that is block-like with my siblings and we're centered in a row.
  </div>
</main>
```
```css
.inline-block-center {
  text-align: center;
}
.inline-block-center div {
  display: inline-block;
  text-align: left;
}
```
方法二：设置为 `flexbox` 
![](/images/20190330014349766.png)
```html
<main class="flex-center">
  <div>
    I'm an element that is block-like with my siblings and we're centered in a row.
  </div>
  <div>
    I'm an element that is block-like with my siblings and we're centered in a row. I have more content in me than my siblings do.
  </div>
  <div>
    I'm an element that is block-like with my siblings and we're centered in a row.
  </div>
</main>
```
```css
.flex-center {
  display: flex;
  justify-content: center;
}
```
除非你是想让多个块级元素堆积在彼此的顶部，那么 `margin: auto` 还是依然适用的
![](/images/20190330014601727.png)
```css
main div {
   background: black;
   margin: 0 auto;
   color: white;
   padding: 15px;
   margin: 5px auto;
}

main div:nth-child(1) {
  width: 200px;
}
main div:nth-child(2) {
  width: 400px;
}
main div:nth-child(3) {
  width: 125px;
}
```
# 垂直居中
---
## inline or inline-*元素（比如文字或者链接）
### 单行
- 有时候行内元素或者文字显示为垂直居中，仅仅是因为它们的上下内边距相等
- 这样的情况下，文字也水平居中
![](/images/20190330015122978.png)
```html
<main>
  <a href="#0">We're</a>
  <a href="#0">Centered</a>
  <a href="#0">Bits of</a>
  <a href="#0">Text</a>
</main>
```
```css
main a {
  background: black;
  color: white;
  padding: 40px 30px;
  text-decoration: none;
}
```
如果 padding 出于某些原因不能用，并且你要使一些不换行的文字居中，这里有一个技巧，就是设置文字的 `line-height` 和 `height` 的值相等
```css
.center-text-trick {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
}
```

### 多行
对于多行文本，同样可以使用等值 padding-top 和 padding-bottom 的方式实现垂直居中。如果你在使用过程中发现这种方法没见效，那么你可以通过 CSS 为文本设置一个类似 table-cell 的父级容器，然后使用`vertical-align`属性实现垂直居中

真实table
![](/images/2019033002143021.png)
```html
<table>
  <tr>
    <td>
      I'm vertically centered multiple lines of text in a real table cell.
    </td>
  </tr>
</table>
```
```css
table {
  background: white;
  width: 240px;
  border-collapse: separate;
  margin: 20px;
  height: 250px;
}

table td {
  background: black;
  color: white;
  padding: 20px;
  border: 10px solid white;
  /* default is vertical-align: middle; */
}
```

table cell
```html
<div class="center-table">
  <p>I'm vertically centered multiple lines of text in a CSS-created table layout.</p>
</div>
```
```css
.center-table {
  display: table;
  height: 250px;
  background: white;
  width: 240px;
  margin: 20px;
}
.center-table p {
  display: table-cell;
  margin: 0;
  background: black;
  color: white;
  padding: 20px;
  border: 10px solid white;
  vertical-align: middle;
}
```

如果没法用类table方式，还可以使用 flexbox 实现垂直居中，对于父级容器为 display: flex 的元素来说，它的每一个子元素都是垂直居中的
```css
.flex-center-vertically {
   display: flex;
   justify-content: center;
   flex-direction: column;
   height: 400px;
 }
```
请记住这个方法仅仅适用于父容器具有一个固定的高度（px，%，等等），这也是为什么容器有一个高度。

如果上述方法都不起作用，那么你就需要使用被称为幽灵元素（ghost element）的非常规解决方式：在垂直居中的元素上添加伪元素，设置伪元素的高等于父级容器的高，然后为文本添加 `vertical-align: middle;` 样式，即可实现垂直居中
```css
.ghost-center {
  position: relative;
}
.ghost-center::before {
  content: " ";
  display: inline-block;
  height: 100%;
  width: 1%;
  vertical-align: middle;
}
.ghost-center p {
  display: inline-block;
  vertical-align: middle;
}
```
## 块级元素

### 已知元素的高度
无法获知元素的具体高度是非常常见的一种状况，比如：视区宽度变化，会触发布局重绘，从而改变高度；对文本施加不同的样式会改变高度；文本的内容量不同会改变高度；当宽度变化时，对于宽高比例固定的元素（比如图片），也会自动调整高度

如果我们知道元素的高度，可以这样来实现垂直居中

需要用负margin进行调整：`- 子元素height/width * 50% - padding-top/left`
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */
}
```
### 元素高度未知
可以通过 `transform` 来达到目的
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

### 使用flexbox
毫无疑问，用 `flexbox` 简单太多了
```css
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```
    

# 垂直水平居中
---
## 元素有固定的宽和高
设定父级容器为相对定位的容器，设定子元素绝对定位的位置 `position: absolute; top: 50%; left: 50%`，最后使用负向 margin 实现水平和垂直居中，`- 子元素height/width * 50% - padding-top/left`
```css
.parent {
  position: relative;
}
.child {
  width: 300px;
  height: 100px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -70px 0 0 -170px;
}
```

## 元素的宽和高未知

如果无法获取确定的宽高，同样需要设定父级容器为相对定位的容器，设定子元素绝对定位的位置 `position: absolute; top: 50%; left: 50%`。不同的是，接下来需要使用 `transform: translate(-50%, -50%);` 实现垂直居中
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
使用 transform 有一个缺陷，就是当计算结果含有小数时（比如 0.5），会让整个元素看起来是模糊的，一种解决方案就是为父级元素设置 `transform-style: preserve-3d;` 
```css
.parent {
  position: relative;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
```
## 使用flexbox

使用 flexbox 实现水平和垂直居中，只需使用两条居中属性即可
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

# 参考资料
---
> [1] https://www.w3cplus.com/css/centering-css-complete-guide.html
> [2] https://css-tricks.com/centering-css-complete-guide/
