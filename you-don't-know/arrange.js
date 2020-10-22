function arrange(message) {
  const queue = [];
  queue.push(function () {
    console.log(`${message}  is notified`);
  });

  function next() {
    const task = queue.shift();
    if (typeof task === "number") {
      setTimeout(next, task * 1000);
    }
    if (typeof task === "function") {
      task();
      next();
    }
  }

  const processUtil = {
    do(method) {
      if (method === "commit") {
        queue.push(function () {
          console.log("Start  to  commit");
        });
      }
      if (method === "push") {
        queue.push(function () {
          console.log("Start  to  push");
        });
      }
      return processUtil;
    },
    wait(time) {
      queue.push(time);
      return processUtil;
    },
    waitFirst(time) {
      queue.unshift(time);
      return processUtil;
    },
  };

  queueMicrotask(function () {
    next();
  });

  return processUtil;
}

// arrange("William");
arrange("William").wait(5).do("commit");
// arrange("William").waitFirst(5).do("push");


/**
 * 1.定义queue 队列
 * 2.定义方法库 processUtil ;需要return 实现链式调用
 * 3.定义next，递归遍历队列
 * 
*/