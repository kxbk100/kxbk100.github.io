---
title: 【JavaScript】其它-数组API
date: 2019-04-04 00:41:07
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

# 数组的9大操作
---
## 数组的创建
```js
var arrayObj = new Array();　//创建一个数组
var arrayObj = new Array([size]);　//创建一个数组并指定长度，注意不是上限，是长度
var arrayObj = new Array(item1, item2, item3, ...);　//创建一个数组并赋值
```

虽然第二种方法创建数组指定了长度，但实际上所有情况下数组都是变长的，也就是说即使指定了长度为5，仍然可以将元素存储在规定长度以外的




## 数组元素的添加
```js
arrayObj. push(item1, item2, item3, ...); // 将一个或多个新元素添加到数组结尾，并返回数组新长度
arrayObj.unshift(item1, item2, item3, ...); // 将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度
arrayObj.splice(index, 0, item1, item2, item3, ...); // 将一个或多个新元素插入到数组的指定位置，插入位置的元素自动后移，返回包含被删除项目的新数组
```
splice
|参数  | 描述 |
|--|--|
|index  |必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置，index位会被删除 |
|howmany  |必需。要删除的项目数量。如果设置为 0，则不会删除项目 |
|item1, ..., itemX  |可选。向数组添加的新项目 |


## 数组元素的删除
```js
arrayObj.pop(); // 移除最后一个元素并返回该元素值
arrayObj.shift(); // 移除最前一个元素并返回该元素值，数组中元素自动前移
arrayObj.splice(deletePos, deleteCount); // 删除从指定位置deletePos开始的指定数量deleteCount的元素，数组形式返回所移除的元素
```

## 数组的截取和合并
```js
arrayObj.slice(start, end); // 以数组的形式返回数组的一部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素
arrayObj.concat([]/string); // 将多个数组（也可以是字符串，或者是数组和字符串的混合）连接为一个数组，返回连接好的新的数组
```

## 数组的元素的访问
```js
var testGetArrValue = arrayObj[1]; // 获取数组的元素值
arrayObj[1] = "这是新值"; // 给数组元素赋予新的值
```

## 数组的拷贝
**目的**

普通的`var newarr = arr；`只是一个引用，并不是真正的拷贝，真正的拷贝要用如下方法

```js
arrayObj.slice(0); // 返回数组的拷贝数组，注意是一个新的数组，不是指向
arrayObj.concat(); // 返回数组的拷贝数组，注意是一个新的数组，不是指向
```

## 数组元素的排序
```js
arrayObj.reverse(); // 反转元素（最前的排到最后、最后的排到最前），返回数组地址
arrayObj.sort(); // 对数组元素排序，原数组改变，返回数组地址，指向原数组
```
sort
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

## 数组元素的字符串化

`join()`方法是一个非常实用的方法，它把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：
```js
arrayObj.join(separator); // 返回字符串，这个字符串将数组的每一个元素值连接在一起，中间用 separator 隔开

var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
```

- 如果Array的元素不是字符串，将自动转换为字符串后再连接

toLocaleString 、toString可以看作是join的特殊用法，不常用;  
**toLocaleString()**: 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。

- **toString**:把数组转换为字符串，并返回结果
- **lastIndexOf**：返回在数组中搜索到的与给定参数相等的元素的最后（最大）索引
- **toSource()**: 返回一个字符串,代表该数组的源代码，<font color="red">该特性是非标准的，请尽量不要在生产环境中使用它！</font>

## 数组元素定位
`indexOf`: 与String类似，Array也可以通过`indexOf()`来搜索一个指定的元素的位置

```js
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2
```


# 数组对象的3个属性
---

## length属性

- length属性表示数组的长度，即其中元素的个数
- 因为数组的索引总是由0开始，所以一个数组的上下限分别是：0和length-1

JavaScript数组的length属性是可变的
- 当length属性被设置得更大时，整个数组的状态事实上不会发生变化，仅仅是length属性变大
- 当length属性被设置得比原来小时，则原先数组中索引大于或等于length的元素的值全部被丢失


```js
var arr = [12, 23, 5, 3, 25, 98, 76, 54, 56, 76]; // 定义了一个包含10个数字的数组
alert(arr.length); // 显示数组的长度10

arr.length = 12; // 增大数组的长度
alert(arr.length); // 显示数组的长度已经变为12
alert(arr[8]); // 显示第9个元素的值，为56

arr.length = 5; // 将数组的长度减少到5，索引等于或超过5的元素被丢弃
alert(arr[8]); // 显示第9个元素已经变为"undefined"

arr.length = 10; // 将数组长度恢复为10
alert(arr[8]); // 虽然长度被恢复为10，但第9个元素却无法收回，显示"undefined"
```


- JavaScript中可以使用一个未声明过的变量，同样，也可以使用一个未定义的数组元素（指索引超过或等于length的元素）
- length对象不仅可以显式的设置，它也有可能被隐式修改
- length属性的值将被设置为所使用元素索引的值加1

```js
var arr = [12, 23, 5, 3, 25, 98, 76, 54, 56, 76];
console.log(arr.length);  // 10

arr[15] = 34;
console.log(arr.length);  //16

console.log(arr[10]);     // undefine
console.log(arr.toString())
// 12,23,5,3,25,98,76,54,56,76,,,,,,34
```

- 代码中同样是先定义了一个包含10个数字的数组，通过alert语句可以看出其长度为10
- 随后使用了索引为15的元素，将其赋值为15，即 `arr[15]=34`
- 这时再用alert语句输出数组的长度，得到的是16
- 多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错
- JavaScript的Array却不会有任何错误
- 但在编写代码时，**不建议直接修改Array的大小，访问索引时要确保索引不会越界**


## prototype属性
- 返回对象类型原型的引用
- prototype 属性是 object 共有的

**objectName.prototype**

- objectName 参数是object对象的名称。  
- 用 prototype 属性提供对象的类的一组基本功能
- 对象的新实例“继承”赋予该对象原型的操作。  

给数组对象添加返回数组中最大元素值的方法。要完成这一点，声明一个函数，将它加入 Array.prototype， 并使用它

```js
function array_max() {
  var i,
  max = this[0];
  for (i = 1; i < this.length; i++) {
    if (max < this[i])
      max = this[i];
  }
  return max;
}
Array.prototype.max = array_max;
var x = new Array(1, 2, 3, 4, 5, 6);
var y = x.max();
```

该代码执行后，y 保存数组 x 中的最大值，即：6

## constructor属性

- 表示创建对象的函数
- `object.constructor`是对象或函数的名称

说明：constructor 属性是所有具有 prototype 的对象的成员。它们包括除 Global 和 Math 对象以外的所有 JScript 固有对象。constructor 属性保存了对构造特定对象实例的函数的引用

```js
x = new String("Hi");
if (x.constructor == String) // 进行处理（条件为真）

function MyFunc() {
  // 函数体
}
y = new MyFunc;
if (y.constructor == MyFunc) // 进行处理（条件为真）

y = new Array();
```


# 判断是否为数组
---

- JS因为设计上的某些缺陷，导致在对于Array的判断，也是颇费周折的 
- `typeof`：对于Function， String， Number ，Undefined 等几种类型的对象来说，他完全可以胜任，但是为Array时，难免会让人失望
```js
var arr = new Array("1","2","3","4","5");
alert(typeof(arr)); // Object
```

`instanceof`：运算符会返回一个`Boolean`值，指出对象是否是特定类的一个实例
```js
var arrayStr = new Array("1","2","3","4","5");
alert(arrayStr instanceof Array);  // true
```

虽然此时能够完好的工作，但事实上在**多个frame中穿梭**就会产生大问题了
```js
variframe = document.createElement('iframe');    
document.body.appendChild(iframe);    
xArray = window.frames[window.frames.length-1].Array;       
var arr = new xArray("1","2","3","4","5"); // 这个写法IE大哥下是不支持的，FF下才有

alert(arr instanceof Array); // false 
alert(arr.constructor === Array); // false  
```

ECMA-262中规范定义了Object.prototype.toString的行为

- 首先，取得对象的一个内部属性`[[Class]]`，然后依据这个属性，返回一个类似于`[object Array]`的字符串作为结果
- `[[]]`用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”
- 利用这个方法，再配合call，我们可以取得任何对象的内部属性`[[Class]]`，然后把类型检测转化为字符串比较，以达到我们的目的。于是利用这点，就有了下面这种方法：
```js
function isArray(obj) {  
  return Object.prototype.toString.call(obj) === '[object Array]';   
}
```

- call改变toString的this引用为待检测的对象，返回此对象的字符串表示
- 然后对此字符串是否是`[object Array]`，以判断其是否是Array的实例

为什么不直接o.toString()？
- 虽然Array继承自Object，toString方法极有可能被重写而达不到我们的要求
- Object.prototype则是老虎的屁股，很少有人敢去碰它的，所以能一定程度保证其“纯洁性”

如此很好的解决了跨frame对象构建的问题，经过测试，各大浏览器兼容性也很好，可以放心使用。很多框架，比如jQuery等，都计划借鉴此方法以实现某些特殊的，比如数组、正则表达式等对象的类型判定

`Array.isArray()`方法用来判断某个值是否为数组。如果是，则返回 true，否则返回 false

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
```

# 数组迭代过程
---

## filter()：过滤符合条件的元素
- 不改变原数组
- 返回符合条件的数组
- filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中

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


```js
function isBigEnough(item) {
  return item >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

### forEach() ：遍历数组中所有元素

- forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，那些已删除（使用delete方法等情况）或者从未赋值的项将被跳过（但不包括哪些值为 undefined 的项）
- forEach 遍历的范围在第一次调用 callback 前就会确定。调用forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们**那一刻**的值
- 已删除的项不会被遍历到
- 没有办法中止 forEach 循环

**打印出数组的内容**
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

**一个可以克隆对象的函数**  ？
使用下面的代码可以复制一个给定的对象，虽然有很多不同的复制对象的方法，不过下面这种方法使用了`Array.prototype.forEach`和其他一些ECMAScript 5中的Object.*函数
```js
function copy(o){
  var copy = Object.create( Object.getPrototypeOf(o) );
  var propNames = Object.getOwnPropertyNames(o);

  propNames.forEach(function(name){
    var desc = Object.getOwnPropertyDescriptor(o, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

var o1 = {a:1, b:2};
var o2 = copy(o1); // o2 looks like o1 now
```

### every()：判断所有元素是否都符合条件
语法：`arr.every(callback[, thisArg])`
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
 


- every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素
- 如果发现了一个这样的元素，every方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true
- callback只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用
- **callback 被调用时传入三个参数：元素值，元素的索引，原数组。** every 不会改变原数组

检测所有数组元素的大小
```js
//检测数组中的所有元素是否都大于 10
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```

### map() ：对元素重新组装
语法：`array.map(callback[, thisArg])`


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



- map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数
- callback 每次执行后的返回值组合起来形成一个新数组
- callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用
- **map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）**

在一个 String 上使用 map 方法获取字符串中每个字符所对应的 ASCII 码组成的数组

```js
var map = Array.prototype.map
var a = map.call("Hello World", x => x.charCodeAt(0)});
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

- 通常情况下，map 方法中的 callback 函数只需要接受一个参数，就是正在被遍历的数组元素本身
- 但这并不意味着 map 只给 callback 传了一个参数。这个思维惯性可能会让我们犯一个很容易犯的错误。比如下面的语句返回什么呢

```js
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]
```

通常使用parseInt时，只需要传递一个参数，但实际上parseInt可以有两个参数，第二个参数是进制数。可以通过语句`alert(parseInt.length) === 2`来验证

map方法在调用callback函数时，会给它传递3个参数：当前正在遍历的元素，元素索引，原数组本身

第3个参数parseInt会忽视，但第二个参数不会，也就是说parseInt把传过来的索引值当成进制数来使用，从而返回了NaN。 因此此时应该使用如下的用户函数returnInt

```js
function returnInt(element){
  return parseInt(element, 10);
}

["1", "2", "3"].map(returnInt);
// 返回[1,2,3]
```

### some()：判断是否有至少一个元素符合条件
语法：`arr.some(callback[, thisArg])`

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





- some 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）
- 如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false
- callback 只会在那些”有值“的索引上被调用，不会在那些**被删除**或**从来未被赋值**的索引上调用

测试数组元素的值
```js
//检测在数组中是否有元素大于 10
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough);
// passed is false
passed = [12, 5, 8, 1, 4].some(isBigEnough);
// passed is true
```

### reduce() ：接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终为一个值
语法：`arr.reduce(callback,[initialValue])`  


callback执行数组中每个值的函数，包含四个参数

- previousValue上一次调用回调返回的值，或者是提供的初始值（initialValue）
- currentValue 数组中当前被处理的元素
- index 当前元素在数组中的索引
- array 调用 reduce 的数组
- initialValue作为第一次调用 callback 的第一个参数。

> **描述**：reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组

> 回调函数第一次执行时，previousValue 和 currentValue 可以是一个值，如果 initialValue 在调用 reduce 时被提供，那么第一个 previousValue 等于 initialValue ，并且currentValue 等于数组中的第一个值；如果initialValue 未被提供，那么previousValue 等于数组中的第一个值，currentValue等于数组中的第二个值。

> 如果数组为空并且没有提供initialValue， 会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。

将数组所有项相加
```js
var total = [0, 1, 2, 3].reduce(function (a, b) {
  return a + b;
});
// total == 6
```

数组扁平化
```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function (a, b) {
  return a.concat(b);
});
// flattened is [0, 1, 2, 3, 4, 5]
```

统计一个数组中有多少个不重复的单词

- 不使用reduce时的写法

```js
var arr = ["apple", "orange", "apple", "orange", "pear", "orange"];
function getWordCnt() {
  var obj = {};

  for (var i = 0, l = arr.length; i < l; i++) {
    var item = arr[i];
    obj[item] = (obj[item] + 1) || 1;
  }

  return obj;
}
console.log(getWordCnt());
```

- 使用reduce()后的写法
```js
var arr = ["apple", "orange", "apple", "orange", "pear", "orange"];
function getWordCnt() {
  return arr.reduce(function (prev, next) {
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  }, {});
}
console.log(getWordCnt());
```

这其中一个需要注意的点在于，initialValue提供与否对prev和next的影响
```js
/* 二者的区别，在console中运行一下即可知晓*/
var arr = ["apple", "orange", 'pear', 'jade'];

function noPassValue() {
  return arr.reduce(function (prev, next) {
    console.log("prev:", prev);
    console.log("next:", next);

    //console.info('prev type:'+ typeof(prev)); //prev type:string
    return prev + " " + next;
  });
}
function passValue() {
  return arr.reduce(function (prev, next) {
    console.log("prev:", prev);
    console.log("next:", next);

    prev[next] = 1;
    //console.info('prev type:'+ typeof(prev)); // object
    return prev;
  }, {});
}
console.log("No Additional parameter:", noPassValue());
console.log("----------------");
console.log("With {} as an additional parameter:", passValue());
```

# 总结
---
| 函数名 | 是否改变原数组 | 返回值 |说明 |  
|--|--|--|--|
| push | 会改变 | 返回新数组长度 | 向数组的末尾添加一个或更多元素，并返回新的长度 |
| pop | 会改变 | 返回被删除元素 | 删除并返回数组的最后一个元素 |
| unshift | 会改变 |返回新的长度 | 向数组的开头添加一个或更多元素，并返回新的长度|
|shift | 会改变 | 返回被删除元素 | 	删除并返回数组的第一个元素|
| splice | 会改变| 返回被删除元素组成的数组，或者为空数组 | 删除元素，并向数组添加新元素 |
| reverse | 会改变| 返回原数组 |颠倒数组中元素的顺序 |
| sort | 会改变 |返回原数组 | 对数组的元素进行排序|
| join | 不会改变 | 返回字符串 | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔|
| concat | 不会改变 |返回新数组| 连接两个或更多的数组，并返回结果 |
| indexOf | 不会改变 | 返回数组中某个指定的元素位置，如果不存在返回 -1 |查找数组中某个指定的元素位置。|
| lastIndexOf | 不会改变 |返回指定元素在数组中的最后一个的索引，如果不存在返回 -1|查找指定元素在数组中的最后一个的索引|
| slice | 不会改变 |返回一个新的数组，包含从 start 到 end （不包括该元素）中的元素|从已有的数组中返回选定的元素|
| toString | 不会改变 |返回字符串|把数组转换为字符串，并返回结果|
| map | 不会改变 |返回处理后的数组|通过指定函数处理数组的每个元素，并返回处理后的数组|
| filter | 不会改变 |返回新数组|检测数值元素，并返回符合条件所有元素的数组|
| some | 不会改变 |返回true或false| 检测数组元素中是否有元素符合指定条件，有true的时候停止 |
| every | 不会改变 |返回true或false| 检测数组元素中是否有元素符合指定条件，在有false的时候停止 |
| reduce | 不会改变 |返回计算结果|将数组元素计算为一个值（从左到右）|
| forEach | 不会改变 |undefined|调用数组的每个元素，并将元素传递给回调函数|

上述的迭代方法可以在最后追加一个参数thisArg,它是执行 callback 时的 this 值

# 参考资料
> [1] https://www.jeffjade.com/2015/09/25/2015-09-25-js-array/

