class DoublyLinkedList {
  constructor() {
    class Node {
      constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
      }
    }
    this.length = 0;
    this.head = null;
    this.tail = null;

    // 1. append方法
    DoublyLinkedList.prototype.append = element => {
      // 1.1 根据element创建节点
      var newNode = new Node(element);

      // 1.2 判断添加的是不是第一个节点
      if (this.head == null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      // 1.3 length + 1
      this.length++;
    };

    // 2. 将链表转换为字符串形式
    // 2.1 toString()方法
    DoublyLinkedList.prototype.toString = () => {
      return this.forwardString();
    };

    // 2.2 forwardString()方法
    DoublyLinkedList.prototype.forwardString = () => {
      var current = this.head;
      var forwardStr = '';

      while (current) {
        forwardStr += ',' + current.element;
        current = current.next;
      }

      return forwardStr;
    };

    // 2.3 reverseString()方法
    DoublyLinkedList.prototype.reverseString = () => {
      var current = this.tail;
      var reverseStr = '';

      while (current) {
        reverseStr += ',' + current.element;
        current = current.prev;
      }

      return reverseStr;
    };

    // 3. insert方法
    DoublyLinkedList.prototype.insert = (position, element) => {
      // 3.1 越界判断
      if (position < 0 || position > this.length) return false;

      // 3.2 根据data创建新的节点
      var newNode = new Node(element);

      // 3.3 判断原来的列表是否为空
      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        // 3.4 在头部插入
        if (position === 0) {
          this.head.prev = newNode;
          newNode.next = this.head;
          this.head = newNode;
          // 3.5 在尾部插入
        } else if (position === this.length) {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
          // 3.6 在中间插入
        } else {
          let current = this.head;

          for (let i = 0; i < position; i++) {
            current = current.next;
          }
          // 修改指针
          newNode.next = current;
          newNode.prev = current.prev;
          current.prev.next = newNode;
          current.prev = newNode;
        }
      }

      // 3.7 length + 1
      this.length++;

      return true;
    };

    // 4. get方法
    DoublyLinkedList.prototype.get = position => {
      // 4.1 越界判断
      if (position < 0 || position >= this.length) return null;
      // 4.2 获取元素
      // 可以判断一下是从往前遍历还是往前遍历
      if (this.length / 2 > position) {
        let current = this.tail;
        for (let i = this.length - 1; i > position; i--) {
          current = current.prev;
        }
      }

      if (this.length / 2 < position) {
        let current = this.head;
        for (let i = 0; i < position; i++) {
          current = current.next;
        }
      }
      return current.data;
    };

    // 5. indexOf方法
    DoublyLinkedList.prototype.indexOf = element => {
      // 5.1 定义变量
      let current = this.head;
      let index = 0;
      // 5.2 查找和data相同的节点
      while (current) {
        if (current.element === element) {
          return index;
        }
        index++;
        current = current.next;
      }
      return -1;
    };

    // 6. update方法
    DoublyLinkedList.prototype.update = (position, element) => {
      // 6.1 越界判断
      if (position < 0 || position >= this.length) return false;
      // 6.2 寻找正确的节点
      let current = this.head;
      for (let i = 0; i < position; i++) {
        current = current.next;
      }
      // 6.3 修改找到节点的信息
      current.data = element;
      return true;
    };

    // 7. removeAt方法
    DoublyLinkedList.prototype.removeAt = position => {
      // 7.1 越界判断
      if (position < 0 || position >= this.length) return null;

      // 7.2 判断是否只有一个节点
      let current = this.head;

      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        // 7.3 第一个节点删除
        if (position === 0) {
          this.head = this.head.next;
          this.head.prev = null;
          // 7.4 最后一个节点删除
        } else if (position === this.length - 1) {
          current = this.tail;
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else {
          // 7.5 中间节点删除

          for (let i = 0; i < position; i++) {
            current = current.next;
          }

          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }
      // 7.6 length - 1
      this.length--;

      return current.element;
    };

    // 8. remove方法
    DoublyLinkedList.prototype.remove = element => {
      // 8.1 根据data获取下标值
      let index = this.indexOf(element);
      // 8.2 根据index删除对应位置的节点
      return this.removeAt(index);
    };

    // 9. isEmpty方法
    DoublyLinkedList.prototype.isEmpty = () => {
      return this.length === 0;
    };

    // 10. size方法
    DoublyLinkedList.prototype.size = () => {
      return this.length;
    };

    // 11. getHead方法
    DoublyLinkedList.prototype.getHead = () => {
      return this.head.element;
    };

    // 12. getTail方法
    DoublyLinkedList.prototype.getTail = () => {
      return this.tail.element;
    };
  }
}
