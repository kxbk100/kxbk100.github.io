const inStack = [];
const outStack = [];

const push = node => {
  inStack.push(node);
};

const pop = () => {
  if (!outStack.length) {
    while (inStack.length) {
      outStack.push(inStack.pop());
    }
  }
  return outStack.pop();
};
