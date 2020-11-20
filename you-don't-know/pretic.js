function link() {
  const queue = [];

  const obj = {
    say(message) {
      queue.push(function () {
        console.log(message);
      });
      return this;
    },
    wait(time) {
      queue.push(time);
      return this;
    },
  };

  function next() {
    const target = queue.shift();

    if (typeof target === "number") {
      setTimeout(next, target);
    }

    if (typeof target === "function") {
      target();
      next();
    }
    if(typeof target === "undefined") {
      console.log("queue no data")
    }
  }

  queueMicrotask(next);

  return obj;
}

link().say("hello").wait(5000).say("world").wait(500).say("dda");

let i = 0
setInterval(function () {
  console.log(i++)
}, 500)


// 下次试试多队列，不同优先级的情况处理