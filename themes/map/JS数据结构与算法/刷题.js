/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

const deleteDuplication = pHead => {
  if (pHead == null || pHead.next == null) {
    return pHead;
  }
  // 重要，方便处理第一个、第二个节点就是相同的情况
  const Head = new ListNode(0);
  Head.next = pHead;
  let current = pHead;
  while (current !== null) {
    if (current.next !== null && current.val === current.next.val) {
     current.next =  current.next.next;
    }
  }
  return pHead;
};
