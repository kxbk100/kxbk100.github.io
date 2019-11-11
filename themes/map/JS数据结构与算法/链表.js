class LinkedList {
  constructor() {
    // 内部类：节点
    class Node {
      // 内部类的属性
      constructor(data) {
        this.data = data;
        this.next = null;
      }
    }
    // 属性
    this.head = null;
    this.length = 0;

    // 操作
    // 1. 追加方法
    LinkedList.prototype.append = data => {
      // 1.1 创建新节点
      const newNode = new Node(data);
      // 1.2 判断添加的是不是第一个节点
      // 是最后一个节点
      if (this.length === 0) {
        this.head = newNode;
      } else {
        // 不是最后一个节点，通过while找到最后一个节点
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        // 让最后节点的next指向新节点
        current.next = newNode;
      }
      // 1.3 length+1
      this.length += 1;
    };
    // 2. toString()方法
    LinkedList.prototype.toString = () => {
      // 1. 定义变量
      let current = this.head;
      let listString = '';
      // 2. 循环获取一个个节点
      while (current) {
        listString += current.data + ' ';
        current = current.next;
      }
      return listString;
    };
    // 3. insert方法
    LinkedList.prototype.insert = (position, data) => {
      // 3.1 对position进行越界判断，负数或超过链表长度
      if (position < 0 || position > this.length) return false;
      // 3.2 根据data创建newNode
      const newNode = new Node(data);
      let previous = null;
      // 3.3 判断插入的位置是否是第一个
      if (position === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current = this.head;
        for (let i = 0; i < position; i++) {
          previous = current;
          current = current.next;
        }
        newNode.next = current;
        previous.next = newNode;
      }
      // 3.4 length + 1
      this.length += 1;
      // 3.5 返回插入成功
      return true;
    };
    // 4. get方法
    LinkedList.prototype.get = position => {
      // 4.1 越界判断
      if (position < 0 || position >= this.length) return null;
      // 4.2 获取对应的data
      let current = this.head;
      for (let i = 0; i < position; i++) {
        current = current.next;
      }
      return current.data;
    };
    // 5. indexOf方法
    LinkedList.prototype.indexOf = data => {
      // 5.1 定义变量
      let current = this.head;
      let index = 0;
      // 5.2 开始查找
      while (current) {
        if (current.data === data) {
          return index;
        }
        current = current.next;
        index++;
      }
      // 5.3 找到最后没有找到返回-1
      return -1;
    };

    // 6. update方法
    LinkedList.prototype.update = (position, newData) => {
      // 6.1 越界判断
      if (position < 0 || position >= this.length) return false;
      // 6.2 查找更新
      let current = this.head;
      for (let i = 0; i < position; i++) {
        current = current.next;
      }
      // 6.3 修改值
      current.data = newData;
      return true;
    };
    // 7. removeAt方法
    LinkedList.prototype.removeAt = position => {
      // 7.1 越界判断
      if (position < 0 || position >= this.length) return false;
      // 7.2 判断是不是删除第一个节点
      let current = this.head;
      if (position === 0) {
        this.head = this.head.next;
      } else {
        let previous = null;
        for (let i = 0; i < position; i++) {
          previous = current;
          current = current.next;
        }
        // 前一个节点的next指向current的next即可
        previous.next = current.next;
      }
      // 7.3 length - 1
      this.length -= 1;
      return current.data;
    };
    // 8. remove方法
    LinkedList.prototype.remove = data => {
      // 8.1 获取data在链表中的位置
      let index = this.indexOf(data);
      // 8.2 根据位置信息删除节点
      return this.removeAt(index);
    };
    // 9. isEmpty方法
    LinkedList.prototype.isEmpty = () => this.length === 0;
    // 10. size方法
    LinkedList.prototype.size = () => this.length;
    // 11. getFirst方法
    LinkedList.prototype.getFirst = () => this.head.element;
  }
}

// 测试代码
// 1. 创建LinkedList
const list = new LinkedList();

// 2.测试append方法
list.append('abc');
list.append('cba');
list.append('nba');

// 3. 测试insert方法
list.insert(0, 'aaa');
list.insert(3, 'bbb');
list.insert(5, 'ccc');

// 4. 测试get方法
console.log(list.get(1));

// 5. 测试indexOf方法
console.log(list.indexOf('abc'));
console.log(list.indexOf('cba'));
