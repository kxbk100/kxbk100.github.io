---
title: 【JavaScript】第六章 其它-日期、Math
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

# 日期
```js
// Date是个构造函数
// now是个属性，但也是个函数
// 所以Date.now()也是个函数
// 1552272178876
// 获取当前时间毫秒数
Date.now();
// Mon Mar 11 2019 10:42:17 GMT+0800 (CST)
// 会自动执行toString()，转化为字符串格式
var dt = new Date();
dt.getTime(); // 获取毫秒数
dt.getFullYear(); // 年
dt.getMonth(); // 月（0-11）从0开始的，比较特殊，需要+1
dt.getDate(); // 日（0-31）
dt.getHours(); // 小时（0-23）
dt.getMinutes(); // 分钟（0-59）
dt.getSeconds(); // 秒（0-59）
```

# Math
- 获取随机数Math.random() 
- 返回0-1之间的一个小数，位数不确定，一般很长，一般不会重复
- 常用于清除缓存
