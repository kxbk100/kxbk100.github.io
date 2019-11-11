// 封装栈类
class Stack {
  constructor() {
    // 栈中的属性
    this.items = [];
    // 栈的相关操作
    // this.push = function() {
    //   // 给某个对象的实例添加了一个方法每个实例都有一个方法，比较浪费内存
    // };
    // 1. 将元素压入到栈
    Stack.prototype.push = element => {
      // 给整个类添加一个方法，共享方法更加节约内存
      this.items.push(element);
    };
    // 2. 从栈中取出元素
    Stack.prototype.pop = () => {
      return this.items.pop();
    };
    // 3. 查看一下栈顶元素
    Stack.prototype.peek = () => {
      return this.items[this.items.length - 1];
    };
    // 4. 判断栈是否为空
    Stack.prototype.isEmpty = () => {
      return this.items.length === 0;
    };
    // 5. 获取栈中元素的个数
    Stack.prototype.size = () => {
      return this.items.length;
    };
    // 6. toString方法
    Stack.prototype.toString = () => {
      let resultString = '';
      for (let i = 0; i < this.items.length; i++) {
        resultString = resultString + this.items[i] + ' ';
      }
      return resultString;
    };
  }
}

// 栈的使用
let s = new Stack();
s.push(20);
s.push(10);
s.push(30);

console.log(s);

// 函数：将十进制转为二进制
const dec2bin = decNumber => {
  // 1. 定义一个栈对象
  let stack = new Stack();
  let reminder = 0;

  // 2. 循环操作
  while (decNumber > 0) {
    // 2.1 获取余数放入栈中
    reminder = decNumber % 2;
    stack.push(reminder);
    // 2.2 获取整除后的结果，作为下一次运行的数字
    decNumber = Math.floor(decNumber / 2);
  }
  // 3. 从栈中取出0和1
  let binaryString = '';
  while (!stack.isEmpty()) {
    binaryString = binaryString + stack.pop();
  }
  return binaryString;
};

console.log(dec2bin(10));
console.log(dec2bin(233));
console.log(dec2bin(1000));
