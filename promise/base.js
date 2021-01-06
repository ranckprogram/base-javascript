/**
 * 异步函数队列
 * 并行
 * 串行
 *
 */
class AsyncQueue {
  constructor() {
    this.callbacks = [];
    this.result = {};
  }

  static create(fn) {
    return new AsyncQueue(fn);
  }

  add(key, fn) {
    this.callbacks.push([key, fn]);
    return this;
  }

  next() {
    if (this.callbacks.length) {
      const [key, fn] = this.callbacks.pop();
      if (typeof fn === "function") {
        fn((data) => {
          this.result[key] = data;
          this.next();
        });
      }
    } else {
      this.fn(this.result);
    }
  }

  execute(fn) {
    this.next();
    return this;
  }

  then(fn) {
    this.fn = fn;
  }
}

const asq = AsyncQueue.create(1);
console.log(asq);

const api = {
  getName(cb) {
    setTimeout(() => {
      cb("ranck");
    }, 1000);
  },
  getAge(cb) {
    setTimeout(() => {
      cb(27);
    }, 2000);
  },
};

asq
  .add("age", api.getAge)
  .add("name", api.getName)
  .execute()
  .then((data) => {
    console.log(data);
  });


setTimeout(() => {
  asq.add("dd", api.getName)
}, 500);
