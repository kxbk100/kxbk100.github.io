---
title: 【CSS】background与background-color区别
date: 2019-03-30 01:32:35
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

# 理论
- background可以设置图片，背景图拉伸、背景图大小、背景图相对位置、背景颜色等
- 而background-color只能设置背景色

# 验证

```html
<!DOCTYPE html>
<html lang="zh-cn">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      a {
        background: url("./1.png")
      }

      /* 使用background */
      a:hover {
        background: blue;
      }

      /* 使用background-color */
      a:hover {
        background-color: blue;
      }
    </style>
  </head>

  <body>
    <a href="#">冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥冯天祥</a>
  </body>

</html>
```

以上代码的目的是，当鼠标停留在a文字上时，用蓝色替换红色背景图片，运行效果如下

使用background，生效
![](/images/undefined)

使用background-color，不生效
![](/images/undefined)

# 结论
background-color改变的只是背景色，而不是背景图，效果是有的，只是图片把背景色遮住了看不到，所以建议改变背景颜色时，尽可能使用background


