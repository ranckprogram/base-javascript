const PROMISE_STATE_ENUM = {
  PEDDING: "pendding",
  FULFILLED: "fulfilled", // 成功
  REJECTED: "rejected", // 失败
};

class MyPromise {
  callbacks = []; // 队列？数组？消费后出队？  还是应为 promise.All

  constructor(fn) {
    this.state = PROMISE_STATE_ENUM.PEDDING;
    this.result = void 0;
    // console.log("同步执行");

    fn(
      function resolve(data) {
        if (this.state === PROMISE_STATE_ENUM.PEDDING) {
          this.state = PROMISE_STATE_ENUM.FULFILLED;
          this.result = data;
          this.callbacks.map((fn) => {
            fn(this.result);
          });
        }
      }.bind(this),
      function reject() {
        this.state = PROMISE_STATE_ENUM.REJECTED;
        return this;
      }.bind(this)
    );
  }

  then(onFulfilled, onRejected) {
    const self = this;
    let promise2;

    if (this.state === PROMISE_STATE_ENUM.PEDDING) {
      promise2 = new MyPromise(function (resolve, reject) {
        self.callbacks.push(() => {
          // setTimeout(function () {
            let x = onFulfilled(self.result);
            resolve(x);
          // });
        });
      });
    }

    if (this.state === PROMISE_STATE_ENUM.FULFILLED) {
      console.log("getdata");
      onFulfilled(this.result);
    }

    if (this.state === PROMISE_STATE_ENUM.REJECTED) {
      onRejected(this.result);
    }

    return promise2;
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }

  finally() {}

  static all() {}

  static race() {}
  static allSettled() {}
  static any() {}
  static resolve(a) {
    return a;
  }
  static reject() {}
}

const p = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
    if (1) {
      resolve("should data 123");
    } else {
      reject("error");
    }
  }, 300);
});

// console.dir(MyPromise);
// console.log(p, "p");

const p1 = p.then(
  (resolve) => {
    // console.log(resolve, ": then 1");
    return 555
  },
  (error) => {
    console.log(error);
  }
);
// console.log(p1, "p1");

p1.then((data) => {
  // console.log(data, ": then 2");
});

// console.log(p, "p2");
