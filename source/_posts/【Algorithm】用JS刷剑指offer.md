---
title: 【Algorithm】用JS刷剑指offer
date: 2019年04月08日 00:27:43
categories: Algorithm
typora-root-url: ..
typora-copy-images-to: ../images
---


# 1 二维数组的查找
## 题目描述
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

## 题目分析
该二维数组中的一个数，它左边的数都比它小，下边的数都比它大。因此，从右上角开始查找，就可以根据 target 和当前元素的大小关系来**缩小查找区间**，当前元素的查找区间为左下角的所有元素。

![](/images/20190408001749606.gif)
## 代码
```js
function Find(target, array) {
  // 边界条件
  if (array == null || array.length === 0 || array[0].length === 0) {
    return false;
  }
  var rows = array.length;
  var cols = array[0].length;
  var r = 0;
  var c = cols - 1;
  while (r <= rows - 1 && c >= 0) {
    if (target == array[r][c]) {
      return true;
    } else if (target > array[r][c]) {
      r++;
    } else {
      c--;
    }
  }
  return false;
}
```

 　　

# 2 替换空格
## 题目描述
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

## 题目分析
我们如果要替换空格，两步
1. 先知道空格的位置
2. 替换，但是字符串中有多个空格，所以我们就要循环，替换完之后再去查找字符串空格位置

当然你也可以选择用正则

## 代码
```js
function replaceSpace(str)
{
  return str.replace(/\s/g, '%20')
}
```

# 3 从尾到头打印链表
## 题目描述
输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

## 题目分析
![](/images/20190409191942462.png)
## 代码
```js
function printListFromTailToHead(head)
{
    // write code here
    let arr = [];
    while(head) {
        arr.push(head.val);
        head = head.next
    }
    return arr.reverse();
}
```
# 4 重建二叉树
## 题目描述
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

## 题目分析
前序遍历的第一个值为根节点的值，使用这个值将中序遍历结果分成两部分，左部分为树的左子树中序遍历结果，右部分为树的右子树中序遍历的结果。
![](/images/20190409195230655.gif)


## 代码
```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin)
{
    // write code here
    // 边界条件
    if(pre.lenght === 0 || vin.length === 0) {
        return null;
    }
    
    let index = vin.indexOf(pre[0]);
    let left = vin.slice(0, index);
    let right = vin.slice(index + 1);
    
    return {
        val: pre[0],
        left: reConstructBinaryTree(pre.slice(1, index + 1), left),
        right: reConstructBinaryTree(pre.slice(index + 1), right)
    }
}
```

 　　
# 5 用两个栈实现队列
## 题目描述
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
## 题目分析
in 栈用来处理入栈（push）操作，out 栈用来处理出栈（pop）操作。一个元素进入 in 栈之后，出栈的顺序被反转。当元素要出栈时，需要先进入 out 栈，此时元素出栈顺序再一次被反转，因此出栈顺序就和最开始入栈顺序是相同的，先进入的元素先退出，这就是队列的顺序。

![](/images/20190409201610193.gif)
## 代码
```js
var inStack = [];
var outStack = [];

function push(node)
{
    // write code here
    inStack.push(node);
    
}
function pop()
{
    if(!outStack.length) {
        while(inStack.length) {
            outStack.push(inStack.pop());
        }
    }
    return outStack.pop();
}
```


# 6 旋转数组中的最小数字
## 题目描述
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

## 题目分析
在一个有序数组中查找一个元素可以用二分查找，二分查找也称为折半查找，每次都能将查找区间减半，这种折半特性的算法时间复杂度都为`O(logN)`。

本题可以修改二分查找算法进行求解：
- 当 nums[mid] <= nums[high] 的情况下，说明解在 [low, mid] 之间，此时令 high = mid；
- 否则解在 [mid + 1, high] 之间，令 low = mid + 1。


## 代码
暴力使用sort
```js
function minNumberInRotateArray(rotateArray)
{
    // 边界条件
    if(rotateArray.length === 0) return 0;
    return rotateArray.sort(function(a, b){return a - b})[0];
}
```

二分法

```js
function minNumberInRotateArray(rotateArray) {
  if (rotateArray.length == 0) return 0;
  var low = 0;
  var high = rotateArray.length - 1;
  while (low < high) {
    var mid = low + high >> 1;
    if (rotateArray[mid] <= rotateArray[high])
      high = mid;
    else
      low = mid + 1;
  }
  return rotateArray[low];
}
```

# 7 斐波那契数列
## 题目描述
大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
n<=39

## 题目分析
![](/images/20190410003716825.gif)
## 代码
递归
虽然可以实现，但是运行超时:您的程序未能在规定时间内运行结束，请检查是否循环有错或算法复杂度过大。
```js
function Fibonacci(n)
{
    // write code here
    if(n >= 0 && n < 2) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

动态规划
```js
function Fibonacci(n)
{
    // write code here
    let arr = [];
    arr[0] = 0;
    arr[1] = 1;
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
}
```
# 8 跳台阶 　　简单　　动态规划
# 9 变态跳台阶 　　中等　　类似斐波那契、数学分析
# 10 矩形覆盖 　　简单偏难　　类似斐波那契
# 二进制中1的个数 　　中等　　位运算n=n&n-1　　
# 数值的整数次方 　　中等　　数学分析、位运算
# 调整数组顺序使奇数位于偶数前面 　　简单　　两个变量作为奇数和偶数的下标
# 链表中倒数第k个节点 　　简单　　双指针法
# 反转链表 　　简单　　三个指针
# 合并两个排序的链表 　　简单　　递归
# 树的子结构 　　简单偏难　　注意判断条件、递归
# 二叉树的镜像 　　简单　　递归
# 顺时针打印矩阵 　　中等偏难　　注意判断条件、递归 || 模拟魔方法
# 包含min函数的栈 　　中等　　辅助栈　　
# 栈的压入、弹出序列 　　中等　辅助栈　
# 从上往下打印二叉树　　简单　　广度遍历、队列
# 二叉树的后续遍历序列　　中等　　画图
# 二叉树和为某一值的遍历序列　　中等　　深度遍历、递归
# 复杂链表的复制 　　难　　map保存<N,N'> || N->N'得S->S‘
# 二叉搜索树与双向链表　　中等偏难　　递归、中序遍历
# 字符串的排列　　难　　回溯法 || 递归全排列法
# 数组中出现次数超过一半的数　　中等　　partion法 || times变量变化法
# 最小的k个数 　　中等　　partion法
# 连续子数组的最大值　　中等　　找规律、动态规划、注意判断条件
# （~n整数中1出现的次数 　　中等　　位运算 || 数学分析
# 把数组排成最小的数　　简单偏难　　改变排序规则
# 丑数 　　难　　动态规划、注意判断条件
# 第一个只出现一次的字符 　　哈希表记录　
# 数组中的逆序对　　难+　　基于归并排序、临时数组
# 两个链表中的第一个公共节点 　　简单　　双指针法　　
# 数字在排序数组中出现的次数 　　简单偏难　　二分法改造　　　　
# 二叉树的深度　　简单　　递归
# 平衡二叉树　　简单　　递归
# 数组中只出现一次的数字　　简单　　indexOf || map记录 || 异或
# 和为S的连续正数序列　　中等　　数学分析
# 和为S的字符串 　　简单　　双指针
# 左旋转字符串　　简单　　裁剪拼接　　
# 单次翻转序列　　简单　　转数组，对每项反序
# 扑克牌顺子　　中等　　注意题目条件、位运算判断数字重复
# 孩子们的游戏　　难　　数学分析得出公式 || 画图按题目做、注意下标
# 求1+2+3+...+n　　中等　　位运算、递归
# 不用加减乘除做加法　　中等　　位运算
# 把字符串转成整数　　中等　　位运算
# 数组中重复的数字　　中等　　将值放到对应位置上
# 构建乘积数组　　中等偏上　　借助中间变量存储后面的乘积
# 正则表达式的匹配　　难　　注意判断条件、递归
# 表示数值的字符串　　中等　　正则
# 字符流中第一个不重复的数字　　中等　　map记录 || indexOf法 
# 链表中环的入口节点　　中等　　双指针法、数学分析
# 删除链表中重复的节点　　中等　　加头节点、注意多个重复
# 二叉树的下一个节点 　　中等　　画图、分析各种情况
# 对称的二叉树 　　中等　　递归、对称遍历
# 按之字形顺序打印二叉树 　　难　　广度遍历、两个栈
# 把二叉树打印成多行 　　中等偏难　　队列+两个记录变量
# 序列化二叉树 　　中等　　数组代表流、递归
# 二叉搜索树的第k个节点 　　中等　　中序遍历+计数变量
# 数据流的中位数 　　中等　　partion法 || 维持排序 || 排序链表法 || AVL树 || 最大堆和最小堆
# 滑动窗口中的最大值 　　难　　改变参考对象、双端队列、存下标
# 矩阵中的路径 　　中等　　回溯法
# 机器人的运动范围 　　中等　　回溯法
# 参考资料
> [1] https://www.cnblogs.com/wuguanglin/p/code-interview.html
> [2] https://github.com/CyC2018/CS-Notes/blob/master/docs/notes/%E5%89%91%E6%8C%87%20Offer%20%E9%A2%98%E8%A7%A3%20-%20%E7%9B%AE%E5%BD%95.md
> [3] https://www.cnblogs.com/wuguanglin/p/SummaryOfJSDoAlgorithmProblem.html

