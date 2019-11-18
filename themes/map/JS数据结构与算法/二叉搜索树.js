class BinarySearchTree {
  constructor() {
    class Node {
      constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
      }
    }

    // 属性
    this.root = null;

    // 方法
    // 第一次：node = XX  newNode = XX
    // 1. 插入数据
    BinarySearchTree.prototype.insert = key => {
      // 1.1 根据key创建新节点
      const newNode = new Node(key);
      // 1.2 判断根节点是否有值
      if (this.root == null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    };

    BinarySearchTree.prototype.insertNode = (node, newNode) => {
      // 1.3 向左查找
      if (newNode.key < node.key) {
        if (node.left == null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
        // 1.4 向右查找
      } else {
        if (node.right == null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    };
    // 树的遍历
    // 1. 先序遍历
    BinarySearchTree.prototype.preOrderTraversal = () => {
      this.preOrderTraversalNode(this.root);
    };
    // 第一次：node 11 根节点
    // 第二次：node 7
    // 第三次：node 5
    // 第四次：node 3
    // 第五次：node  null
    BinarySearchTree.prototype.preOrderTraversalNode = node => {
      if (node != null) {
        // 1.1 处理经过的节点
        console.log(node.key);
        // 1.2 查找经过节点的左子节点
        this.preOrderTraversalNode(node.left);
        // 1.3 查找经过节点的右子节点
        this.preOrderTraversalNode(node.right);
        // ！递归函数执行完了之后会再回去
      }
    };
    // 2. 中序遍历
    BinarySearchTree.prototype.midOrderTraversal = () => {
      this.midOrderTraversalNode(this.root);
    };

    BinarySearchTree.prototype.midOrderTraversalNode = node => {
      if (node != null) {
        // 2.1 查找左子树中的节点
        this.midOrderTraversalNode(node.left);
        // 2.2 处理节点
        console.log(node.key);
        // 2.3 查找右子树中的节点
        this.midOrderTraversalNode(node.right);
        // ！递归函数执行完了之后会再回去
      }
    };
    // 3. 后序遍历
    BinarySearchTree.prototype.postOrderTraversal = () => {
      this.postOrderTraversalNode(this.root);
    };

    BinarySearchTree.prototype.postOrderTraversalNode = node => {
      if (node != null) {
        // 3.1 查找左子树中的节点
        this.postOrderTraversalNode(node.left);
        // 3.2 查找右子树中的节点
        this.postOrderTraversalNode(node.right);
        // 3.3 处理节点
        console.log(node.key);
        // ！递归函数执行完了之后会再回去
      }
    };

    // 4. 寻找最大值
    BinarySearchTree.prototype.max = () => {
      // 4.1 获取根节点
      let node = this.root;
      let key = null;
      // 4.2 依次向右不断查找，直到节点为null
      while (node != null) {
        key = node.key;
        node = node.right;
      }
      return key;
    };

    // 5. 寻找最小值
    BinarySearchTree.prototype.max = () => {
      // 5.1 获取根节点
      let node = this.root;

      // 5.2 依次向左不断查找，直到节点为null
      while (node != null) {
        key = node.key;
        node = node.left;
      }
      return key;
    };

    // 6. 搜索某一个key
    BinarySearchTree.prototype.search = key => {
      // 6.1 获取根节点
      let node = this.root;
      // 6.2 循环搜索key
      while (node != null) {
        if (key < node.key) {
          node = node.left;
        } else if (key > node.key) {
          node = node.right;
        } else {
          return true;
        }
      }
      return false;
    };

    // 7. 删除节点
    BinarySearchTree.prototype.remove = key => {
      // 7.1 寻找要删除的节点
      // 7.1.1 定义变量 保存一些信息
      let current = this.root;
      let parent = null;
      let isLeftChild = true;

      while (current.key !== key) {
        parent = current;
        if (key < current.key) {
          isLeftChild = true;
          current = current.left;
        } else {
          isLeftChild = false;
          current = current.right;
        }
        // 7.1.2 某种情况：已经找到了最后的节点，依然没有找到节点===key
        if (current == null) return false;
      }

      // 7.2 根据对应的情况删除节点
      // 7.2.1 删除的节点是叶子节点
      if (current.left == null && current.right == null) {
        if (current === this.root) {
          this.root = null;
        } else if (isLeftChild) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
      // 7.2.2 删除的节点有一个子节点
      else if (current.right == null) {
        if (current === this.root) {
          this.root = current.left;
        } else if (isLeftChild) {
          parent.left = current.left;
        } else {
          parent.right = current.left;
        }
      } else if (current.left == null) {
        if (current === this.root) {
          this.root = current.right;
        } else if (isLeftChild) {
          parent.left = current.right;
        } else {
          parent.right = current.right;
        }
      }
      // 7.2.3 删除的节点有两个子节点
      else {
        // 7.2.3.1 获取后继节点
        let succssor = this.getSuccssor(current);
        // 7.2.3.2 判断是否为根节点
        if (current === this.root) {
          this.root = succssor;
          // 7.2.3.3 将删除节点的左子树 = current.left
        } else if (isLeftChild) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }

        successor.left = current.left;
      }
      // 找后继的方法
      BinarySearchTree.prototype.getSuccssor = delNode => {
        // 1. 定义变量，保存找到的后继
        let succssor = delNode;
        let current = delNode.right;
        let succssorParent = delNode;
        // 2. 循环查找
        while (current != null) {
          succssor = succssor;
          succssor = current;
          current = current.left;
        }
        // 3. 判断寻找的后继节点是否直接就是delNode的right节点
        if (succssor !== delNode.right) {
          succssorParent.left = succssor.right;
          succssor.right = delNode.right;
        }
        return succssor;
      };
    };
  }
}

// 测试代码
// 1. 创建BinarySearchTree
const bst = new BinarySearchTree();
// 2. 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);

bst.preOrderTraversal();
