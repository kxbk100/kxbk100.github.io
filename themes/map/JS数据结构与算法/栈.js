// 封装栈类
function Stack() {
  // 栈中的属性
  this.items = [];

  // 栈的相关操作

  // 1. 将元素压入到栈
  // this.push = function() {
  //   // 给某个对象的实例添加了一个方法每个实例都有一个方法，比较浪费内存
  // };

  Stack.prototype.push = function(element) {
    // 给整个类添加一个方法，共享方法更加节约内存
    this.items.push(element);
  };

  // 2. 从栈中取出元素
  Stack.prototype.pop = function() {
    return this.items.pop();
  };

  // 3. 查看一下栈顶元素
  Stack.prototype.peek = function() {
    return this.items[this.items.length - 1];
  };

  // 4. 判断栈是否为空
  Stack.prototype.isEmpty = function() {
    return this.items.length === 0;
  };

  // 5. 获取栈中元素的个数

  Stack.prototype.size = function() {
    return this.items.length;
  };

  // 6. toString方法
  Stack.prototype.toString = function() {
    let resultString = '';
    for (let i = 0; i < this.items.length; i++) {
      resultString = resultString + this.items[i] + ' ';
    }
    return resultString;
  };
}

// 栈的使用
let s = new Stack();
s.push(20);
s.push(10);
s.push(30);

console.log(s);
