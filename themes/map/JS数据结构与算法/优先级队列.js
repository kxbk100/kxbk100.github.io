// 封装优先级队列类
class PriorityQueue {
  constructor() {
    // 重新创建了一个内部类
    class QueueElement {
      constructort(element, priority) {
        this.elememn = element;
        this.priority = priority;
      }
    }
    // 属性
    this.items = [];
    // 操作
    // 将元素加入到队列中
    PriorityQueue.prototype.enqueue = (element, priority) => {
      // 1 创建QueueElement对象
      let queueElement = new QueueElement(element, priority);
      this.items.push(element);
      // 2 判断队列是否为空
      if (this.items.length === 0) {
        this.items.push(queueElement);
      } else {
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
          if (queueElement.priority < this.items[i].priority) {
            this.items.splice(i, 0, queueElement);
            added = true;
            break;
          }
        }
        if (!added) {
          this.items.push(queueElement);
        }
      }
    };

    // 2. 从队列中删除前端元素
    PriorityQueue.prototype.dequeue = () => {
      return this.items.shift();
    };
    // 3. 查看前端元素
    PriorityQueue.prototype.front = () => {
      return this.items[0];
    };
    // 4. 查看队列是否为空
    PriorityQueue.prototype.isEmpty = () => {
      return this.items.length === 0;
    };
    // 5. 查看队列中元素个数
    PriorityQueue.prototype.size = () => {
      return this.items.length;
    };
    // 6. toString()方法
    PriorityQueue.prototype.toString = () => {
      let resultString = '';
      for (let i = 0; i < this.items.length; i++) {
        resultString = resultString + this.items[i] + ' ';
      }
      return resultString;
    };
  }
}
