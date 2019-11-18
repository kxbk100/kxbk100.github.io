// 创建列表类
class ArrayList {
  constructor() {
    // 属性
    this.array = [];

    // 方法
    // 将数据可以插入到数组中的方法
    ArrayList.prototype.insert = item => {
      this.array.push(item);
    };

    // toString()
    ArrayList.prototype.toString = () => {
      return this.array.join(' - ');
    };

    // 交换两个位置的数据
    ArrayList.prototype.swap = (m, n) => {
      let temp = this.array[m];
      this.array[m] = this.array[n];
      this.array[n] = temp;
    };

    // 实现排序算法
    // 1. 冒泡排序
    ArrayList.prototype.bubbleSort = () => {
      // 1.1 获取数组的长度
      const length = this.array.length;
      // 第一次：j = length - 1，比较到倒数第一个位置
      // 第二次：j = length - 2，比较到倒数第二个位置
      // 第一次进来：i = 0，比较0和1位置的两个数据
      // 最后一次进来：i = length - 2，比较length - 2和length - 1的两个数据
      for (let j = length - 1; j >= 0; j--) {
        for (let i = 0; i < j; i++) {
          if (this.array[i] > this.array[i + 1]) {
            // 交换数据
            this.swap(i, i + 1);
          }
        }
      }
    };

    // 2. 选择排序
    ArrayList.prototype.selectionSort = () => {
      // 2.1 获取数组长度
      const length = this.array.length;
      // 2.2 外层循环：从0位置开始取数据
      for (let j = 0; j < length - 1; j++) {
        // 2.3 内层循环：从i+1开始，和后面的数据进行比较
        let min = j;
        for (let i = min + 1; i < length; i++) {
          if (this.array[min] > this.array[i]) {
            min = i;
          }
        }
        this.swap(min, j);
      }
    };

    // 3. 插入排序
    ArrayList.prototype.insertionSort = () => {
      // 3.1 获取数组长度
      const length = this.array.length;
      // 3.2 外层循环：从第1个位置开始获取数据，向前面局部有序进行插入
      for (let i = 1; i < length; i++) {
        // 3.3 内层循环：获取i位置的元素，和前面的数据依次进行比较
        let temp = this.array[i];
        let j = i;
        while (this.array[j - 1] > temp && j > 0) {
          this.array[j] = this.array[j - 1];
          j--;
        }
        // 3.4 将j位置的数据放置temp
        this.array[j] = temp;
      }
    };

    // 4. 希尔排序
    ArrayList.prototype.shellSort = () => {
      // 4.1 获取数组长度
      const length = this.array.length;
      // 4.2 初始化的增量（gap -> 间隔/间隙）
      let gap = Math.floor(length / 2);
      // 4.3 while循环（gap不断的减小）
      while (gap >= 1) {
        // 4.4 以gap作为间隔，进行分组，对分组进行插入排序
        for (let i = gap; i < length; i++) {
          let temp = this.array[i];
          let j = i;
          while (this.array[j - gap] > temp && j > gap - 1) {
            this.array[j] = this.array[j - gap];
            j -= gap;
          }
          // 4.5 将j位置的元素赋值temp
          this.array[j] = temp;
        }
      }
      // 4.6 增量变化 / 2
      gap = Math.floor(gap / 2);
    };

    // 5. 快速排序
    // 5.1 选择枢纽
    ArrayList.prototype.median = (left, right) => {
      // 5.1.1 取出中间位置
      let center = Math.floor((left + right) / 2);

      // 5.1.2 判断大小并进行交换
      if (this.array[left] > this.array[center]) {
        this.swap(left, center);
      }
      if (this.array[right] < this.array[center]) {
        this.swap(right, center);
      }
      if (this.array[right] < this.array[left]) {
        this.swap(right, left);
      }

      // 5.1.3 将center换到right - 1的位置
      this.swap(center, right - 1);

      return this.array[right - 1];
    };
    // 5.2 快速排序的实现
    ArrayList.prototype.quickSort = () => {
      this.quick(0, this.array.length - 1);
    };

    ArrayList.prototype.quick = (left, right) => {
      // 5.2.1 递归总是需要结束条件的
      if (left >= right) return;

      // 5.2.2 获取枢纽
      let pivot = this.median(left, right);

      // 5.2.3 定义变量，用于记录当前找到的位置
      let i = left;
      let j = right - 1;

      // 5.2.4 开始进行交换
      while (true) {
        while (this.array[++i] < pivot) {}
        while (this.array[--j] > pivot) {}
        if (i < j) {
          this.swap(i, j);
        } else {
          break;
        }
      }

      // 5.2.5 将枢纽放置在正确的位置上，i的位置
      this.swap(i, right - 1);

      // 5.2.6 分而治之
      this.quick(left, i - 1);
      this.quick(i + 1, right);
    };
  }
}

// 测试类
const newArrayList = new ArrayList();

// 插入元素
newArrayList.insert(66);
newArrayList.insert(88);
newArrayList.insert(12);
newArrayList.insert(87);
newArrayList.insert(100);
newArrayList.insert(5);
newArrayList.insert(566);
newArrayList.insert(23);

console.log(newArrayList.toString());

// 验证冒泡排序
// newArrayList.bubbleSort();
newArrayList.insertionSort();

console.log(newArrayList.toString());
