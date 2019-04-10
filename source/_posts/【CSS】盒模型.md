---
title: 【CSS】盒模型
date: 2019年04月08日 00:27:43
categories: CSS
typora-root-url: ..
typora-copy-images-to: ../images
---

# 是什么
---
盒模型又称框模型（Box Model）,包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素
![](/images/20190330162953242.png)
# 目的
---
- 方便计算宽度
- 更好布局

# 组合
---
## W3C标准模型
**是什么**

默认都是W3C标准模型
```
width = content.width
height = content.height
```
![](/images/20190330163611690.png)、

**分类边界**

```html
<!DOCTYPE html>
```

**组合**

通过CSS3新增的属性 `box-sizing: content-box`设置盒模型为标准模型（`content-box`）

```css
.content-box {
  box-sizing:content-box;
  width: 100px;
  height: 50px;
  padding: 10px;
  border: 5px solid red;
  margin: 15px;
}
```
.content-box设置为标准模型，它的元素宽度width=100px
![](/images/20190330172923552.png)

## IE模型
**是什么**

```
width = content.width + 2padding-left + 2border-left
height = content.height + 2padding-top + 2border-top
```

![](/images/20190330165723844.png)
**分类边界**

form表单中的部分元素还是基于IE的怪异盒模型，input中的
- radio
- checkbox
- button

如果给其设置 border 和 padding 它们也只会往元素盒内延伸

如果不加DOCTYPE声明，那么各个浏览器会根据自己的行为去理解网页
- IE浏览器会采用IE盒子模型去解释你的盒子
- Chrome、Firefox等浏览器会采用标准W3C盒子模型解释你的盒子

如果加上了DOCTYPE声明，那么所有浏览器都会采用标准W3C盒子模型去解释你的盒子，网页就能在各个浏览器中显示一致了

**组合**

通过CSS3新增的属性 `box-sizing: border-box`设置盒模型为IE模型（`border-box`）
```css
.border-box {
  box-sizing: border-box;
  width: 100px;
  height: 50px;
  padding: 10px;
  border: 5px solid red;
  margin: 15px;
}
```
`.border-box`设置为IE模型，它的元素宽度width = content + 2padding + 2border = 70px + 2*10px + 2*5px = 100px
![](/images/20190330173135288.png)



## BFC

**是什么**
- 块级格式化上下文
- BFC决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用
- 当设计到可视化布局的时候，BFC提供了一个环境，HTML元素在这个环境中按照一定的规则进行布局
- 一个环境中的元素不会影响到其他环境中的布局。

**顺序**

1.  overflow不为visible;
2.  float的值不为none；
3.  position的值不为static或relative；
4.  display属性为`inline-blocks`, `table`, `table-cell`, `table-caption`, `flex`, `inline-flex`



**条件**

1.  BFC元素垂直方向的边距会发生重叠。属于不同BFC外边距不会发生重叠
2.  BFC的区域不会与浮动元素的布局重叠
3.  BFC元素是一个独立的容器，外面的元素不会影响里面的元素。里面的元素也不会影响外面的元素
4.  计算BFC高度的时候，浮动元素也会参与计算(清除浮动)


# 条件
---
## 外边距重叠

**是什么**

当两个垂直外边距相遇时，他们将形成一个外边距，合并后的外边距高度等于两个发生合并的外边距的高度中的较大者


**分类边界**

只有普通文档流中块框的垂直外边距才会发生外边距合并，行内框、浮动框或绝对定位之间的外边距不会合并

**顺序**
![](/images/20190330173751943.png)
