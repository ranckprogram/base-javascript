class Cash {
  constructor(num) {
    this.num = num;
  }
  static add(...arg) {
    const num = arg.reduce((prev, item) => item + prev, 0);
    return new Cash(num);
  }
  add(cash) {
    return Cash.add(this, cash);
  }
  toString() {
    const num = this.num;
    const yuan = parseInt(num / 100);
    const jiao = parseInt((num % 100) / 10);
    const fen = (num % 10) % 10;
    return `${yuan}元${jiao}角${fen}分`;
  }
  valueOf() {
    return this.num;
  }
}

//期望执行下面代码：
const cash1 = new Cash(105);
const cash2 = new Cash(66);
const cash3 = cash1.add(cash2);
const cash4 = Cash.add(cash1, cash2);
const cash5 = new Cash(cash1 + cash2);

console.log(`${cash3}`, `${cash4}`, `${cash5}`);
// 希望输出结果为：
// 1元7角1分，1元7角1分 ，1元7角1分
