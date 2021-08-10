class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  isEmpty() {
    return this.count === this.lowestCount;
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return void 0;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  // 查看第一个元素
  peek() {
    if (this.isEmpty()) {
      return void 0;
    }
    return this.items[this.lowestCount];
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.items = {};
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    let result = this.peek();
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result += `,${this.items[i]}`;
    }
    return result;
  }
}

const queue = new Queue();
queue.enqueue(2);
queue.enqueue(21);
queue.enqueue(3);
queue.enqueue(6);
queue.enqueue(22);

console.log(queue.toString());


module.exports = Queue