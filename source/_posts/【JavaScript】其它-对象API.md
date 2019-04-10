---
title: 【JavaScript】其它-对象API
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---


# for in：遍历对象中所有属性
```js
var obj = {
  x: 100,
  y: 200,
  z: 300
}
var key;
for (key in obj) { // key就是obj的属性名，即x, y, z
  // 注意这里的hasOwnProperty,在讲原型链时候讲过
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
// x 100
// y 200
// z 300
```
