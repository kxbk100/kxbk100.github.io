// 封装队列类
class Queue {
  constructor() {
    // 属性
    this.items = [];
    // 操作
    // 1. 将元素加入到队列中
    Queue.prototype.enqueue = element => {
      this.items.push(element);
    };

    // 2. 从队列中删除前端元素
    Queue.prototype.dequeue = () => {
      return this.items.shift();
    };
    // 3. 查看前端元素
    Queue.prototype.front = () => {
      return this.items[0];
    };
    // 4. 查看队列是否为空
    Queue.prototype.isEmpty = () => {
      return this.items.length === 0;
    };
    // 5. 查看队列中元素个数
    Queue.prototype.size = () => {
      return this.items.length;
    };
    // 6. toString()方法
    Queue.prototype.toString = () => {
      let resultString = '';
      for (let i = 0; i < this.items.length; i++) {
        resultString = resultString + this.items[i] + ' ';
      }
      return resultString;
    };
  }
}
// 使用队列
let queue = new Queue();

queue.enqueue('abc');
queue.enqueue('cba');
queue.enqueue('nba');

console.log(queue.front());
console.log(queue.isEmpty());
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

const passGame = (nameList, number) => {
  // 1. 创建一个队列结构
  let queue = new Queue();
  // 2. 将所有人依次加入到队列中
  nameList.forEach(item => {
    queue.enqueue(item);
  });
  // 3. 开始数数字，不是number的时候，重新加入到队列的末尾，是number的时候从队列中删除
  while (queue.size() > 1) {
    for (let i = 0; i < number - 1; i++) {
      // 3.1 number之前的人重新放入到队列末尾
      queue.enqueue(queue.dequeue());
    }
    // 3.2 number之后的人直接从队列中删除掉
    queue.dequeue();
  }
  // 4. 获取剩下的那个人
  let endpeople = queue.front();
  console.log(endpeople);
  return nameList.indexOf(endpeople);
};

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const index = passGame(names, 7);
console.log('最终位置:' + index);
