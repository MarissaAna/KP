import React from "react";

const useStack = (defaultValue = []) => {
  const [stack, setStack] = React.useState(() => [...defaultValue]);

  const getHead = () => {
    return stack[stack.length - 1];
  };

  const setHead = (newVal) => {
    setStack((prev) => {
      const newStack = [...prev];
      if (!newStack.length) newStack.push(newVal);
      else {
        newStack[newStack.length - 1] = newVal;
      }
      return newStack;
    });
    return newVal;
  };

  const push = (val) => {
    setStack((prev) => {
      const newStack = [...prev, val];
      return newStack;
    });
  };

  const pop = () => {
    if (!stack.length) return;
    let val = getHead();
    setStack((prev) => {
      const newStack = [...prev];
      newStack.pop();
      return newStack;
    });
    return val;
  };

  const reset = () => {
    setStack([...defaultValue]);
  };

  const isEmpty = () => !stack.length;

  return {
    stack,
    getHead,
    setHead,
    push,
    pop,
    reset,
    isEmpty,
    setStack,
  };
};

export default useStack;
