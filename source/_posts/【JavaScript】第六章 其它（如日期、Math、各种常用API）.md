---
title: 【JavaScript】第六章 其它（如日期、Math、各种常用API）
date: 2019-03-11 11:28:10
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1. 获取2017-06-10格式的日期
> 2. 获取随机数，要求是长度一致的字符串格式
> 3. 写一个能遍历对象和数组的通用forEach函数

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

# 数组API
## forEach：遍历数组中所有元素
```js
var arr = ['a', 'b', 'c'];
arr.forEach(function(item, index) { // 值，索引
  // 遍历数组的所有元素
  // item对应"a", "b", "c"
  // index对应0, 1, 2
  console.log(index, item);
  // 0 "a"
  // 1 "b"
  // 2 "c"
})
```
## every：判断所有元素是否都符合条件
返回true或false
```js
var arr = [1, 2, 3];
var result = arr.every(function(item, index) {
  // 用来判断所有的数组元素，都满足一个条件
  if (item < 4) {
    return true;
  }
})
console.log(result); // true
```
## some：判断是否有至少一个元素符合条件
返回true或false
```js
var arr = [1, 2, 3];
var result = arr.some(function(item, index) {
  // 用来判断所有的数组元素，只要有一个满足条件即可
  if (item < 2) {
    return true;
  }
})
console.log(result); // true
```
## sort：排序
- 改变原数组
- 可对真实数据大小进行排序而不是ACSII码
```js
var arr = [1, 4, 2, 3, 5];
var arr2 = arr.sort(function(a, b) {
  // 从小到大
  return a - b;
  // 从大到小
  return b - a;
})
console.log(arr2);
```
## map：对元素重新组装
- 不改变原数组
- 生成新数组
```js
var arr = [1, 2, 3, 4];
var arr2 = arr.map(function(item, index) {
  // 将元素重新组装，并返回
  return '<b>' + item + '</b>';
})
console.log(arr2);
```
## fileter：过滤符合条件的元素
- 不改变原数组
- 返回符合条件的数组
```js
var arr = [1, 2, 3];
var arr2 = arr.filter(function(item, index) {
  // 通过某一个条件过滤数组
  if (item >= 2) {
    return true;
  }
})
console.log(arr2);
```

# 对象API
## for in：遍历对象中所有属性
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

# 题目解答
> 1. 获取2017-06-10格式的日期
```js
function formatDate(dt) {
  if (!dt) {
    dt = new Date();
  }
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var date = dt.getDate();
  if (month < 10) {
    // 强制类型转换
    month = '0' + month;
  }
  if (date < 10) {
    // 强制类型转换
    date = '0' + date;
  }
  // 强制类型转换
  return year + '-' + month + '-' + date;
}
var dt = new Date();
var date = formatDate(dt);
console.log(date);
```

> 2. 获取随机数，要求是长度一致的字符串格式
```js
// 所有需要统一数字位数的情况都可以使用如下方法
var random = Math.random();
var random = random + '0000000000'; // 后面加10个零
var random = random.slice(0, 10); // 取前10位
console.log(random);
```

> 3. 写一个能遍历对象和数组的通用forEach函数
```js
function forEach(obj, fn) {
  var key;
  if (obj instanceof Array) {
    // 准确判断是不是数组
    obj.forEach(function(item, index)) {
      fn(index, item);
    }
  } else {
    // 不是数组就是对象
    for (key in obj) {
      fn(key, obj[key]);
    }
  }
}

var arr = [1, 2, 3];
// 注意，这里参数的顺序换了，为了和对象的遍历格式一致
forEach(arr, function(index, item) {
  console.log(index, item);
})
var obj = {
  x: 100,
  y: 200
}
forEach(arr, function(key, value) {
  console.log(key, value);
})
```

