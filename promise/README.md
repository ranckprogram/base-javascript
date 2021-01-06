# promise 规范原理及实现

### 三个状态

- pending 准备
- fulfilled 成功
- rejected 失败

### 两个过程

(不可逆)

- pending -> fulfilled
- pending -> rejected

### 一个方法

- then 其他的 都是 then 派生的方法

### Promise 数据结构

```javascript

{
  [[PromiseState]]: "fulfilled",  // 内部状态
  [[PromiseResult]]: 1 // 内部变量
}

```

### Promise Demo 运行说明

```javascript
const p = new Promise(function (resolve, reject) {
  console.log(0);
  setTimeout(() => {
    const number = parseInt(Math.random() * 100);
    const isOdd = number % 2;
    if (isOdd) {
      resolve(number);
    } else {
      reject(0);
    }
  }, 2000);
});

console.log(1);

p.then((data) => {
  console.log(2);
}).catch((err) => {
  console.log(3);
});

console.log(4);
```

- new Promise 属于同步执行
- setTimeout 会开启异步线程
- 顺序 0 1 4 2
- Promise 的参数是一个函数，该函数同步执行
- Promise 的参数 函数的参数， resolve reject 也是函数
  - resolve 作用
    - promise 定义中调用，传入成功结果
    - 改变 PromiseState 的状态为 fulfilled
    - 设置 PromiseResult 值
  - reject 作用
    - promise 定义中调用，传入失败原因
    - 改变 PromiseState 的状态为 rejected
    - 设置 PromiseResult 值
- then 方法
  - 将监听函数加入队列
  - 返回一个新的 promise

### promise 本质

> 生产者消费之模式，new promise 和 then 中生产回调提供消费，then catch finally
