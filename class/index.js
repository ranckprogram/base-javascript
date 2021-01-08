class Foo {
  constructor(props) {
    props.forEach((element) => {
      this[element] = element;
    });
  }

  getOne() {}
}

const f = new Foo(["fa", "as", "ss"]);

console.log(f);

class Money {
  constructor(num) {
    this.num = num;
  }

  toString() {
    return `${this.num}元`;
  }

  valueOf() {
    return this.num;
  }
  add(n) {
    return Money.add(this, n)
  }
  static add(n, m) {
    return new Money(m + n);
  }
}

const m = new Money(2);
const n = new Money(3);

console.log(m, n);
console.log(`${new Money(m + n)}`);
console.log(`${Money.add(n, m)}`);
console.log(`${n.add(n)}`);
