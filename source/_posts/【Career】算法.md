---
title: 【Career】算法
date: 2019年04月08日 00:27:43
categories: Career
typora-root-url: ..
typora-copy-images-to: ../images
---

# 手写闭包

函数作为返回值

```js
function F1() {
	let a = 100;
	return function () {
		console.log(a);
	}
}

let f1 = new F1();

let a = 200;

f1(); // 100
```

函数作为参数

```js
function F1() {
  let a = 100;
  return function () {
    console.log(a);
  }
}

function F2(fn) {
  let a = 200;
  fn();
}

let f1 = new F1();

F2(f1); // 100
```

# 手写Ajax

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/app', false);
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4) {
    if(xhr.state === 200) {
      alert(xhr.responseText);
    }
  }
}
xhr.send(null);
```

# ES6 class继承

```js
class Parent {
  constructor (value) {
    this.val = value;
  }
  getValue () {
    console.log(this.val);
  }
}

class Child extends Parent {
  constructor (value) {
    super(value);
    this.val = value;
  }
}

let child = new Child(1);
child.getValue();
child instanceof Parent;
```

# 获取URL

```js
console.log(location.href); // 整个url
location.protocol; //协议：http or https
location.host; // 域名
location.pathname;  // 路径
location.search; // ?后的参数
location.hash // #后面是哈希
```

# ===转化

- 类型相同直接比较大小
- 类型不同进行转换
- null == undefined true
- string number string -> number
- boolean == any boolean -> number
- object == symbol number string object toPrimitive valueOf() or toString()

# 其它

if(Array.prototype.indexOf) 判断是否可用

indexOf判断某个元素在数组中的索引，没有则为-1

| slice | 不会改变 | 返回一个新的数组，包含从 start 到 end （不包括该元素）中的元素 | 从已有的数组中返回选定的元素。-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推 |
| :---: | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|       |          |                                                              |                                                              |

数组去重

```js
function duplicates(arr) {
    var result = [];
    arr.forEach(function(e) {
        if(result.indexOf(e) === -1) { // 判断数组中是否存在某元素
            result.push(e);
        }
    })
    return result;
}
```

查找重复元素

```js
function duplicates(arr) {
    var result = [];
    arr.forEach(function(e) {
      // arr.indexOf(e) !== arr.lastIndexOf(e)判断是否数组中是否存在重复的元素 !==代表有重复
        if(arr.indexOf(e) !== arr.lastIndexOf(e) && result.indexOf(e) === -1) {
            result.push(e);
        }
    })
    return result;
}
```

map

```js
var arr = [1, 2, 3, 4];
var arr2 = arr.map(function(item, index) {
  // 将元素重新组装，并返回
  return '<b>' + item + '</b>';
})
console.log(arr2);
```

forEach

```js
function findAllOccurrences(arr, target) {
    var temp = [];
    arr.forEach(function(item,index){
        if(val === target) {
            temp.push(index);
        }
    });
    return temp;
}

```

遍历对象

```js
function iterate(obj) {
    var arr = [];
    for(key in obj) {
        if(obj.hasOwnProperty(key)) {
            arr.push(key + ": " + obj[key]) // kv对象也采用数组访问的形式
        }
    }
    return arr;
}
```


