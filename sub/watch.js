class Watcher {
  constructor(data) {
    this.map = new Map();
    this._data = data;
  }

  addDep(fn) {
    this.map.set(this._data, fn);
  }

  update(params) {
    if (this.map.has(this._data)) {
      this.map.get(this._data)(params);
    }
  }
  teardown() {
    this.map.delete(this._data);
    console.log("清空");
  }
}

const w = new Watcher();

w.addDep(function aa() {});
w.addDep(function ab() {});
w.addDep(function ac() {});
w.addDep(function ad() {});
console.log(w);

function watch(obj, fn) {
  const w = new Watcher(obj, fn);

  w.addDep(fn);
  setTimeout(() => {
    w.update();
  }, 2000);

  return function unWatchFn() {
    w.teardown();
  };
}

const obj = Object.create(null);
const w2 = watch(obj, function () {
  console.log("run");
});

setTimeout(() => {
  w2();
}, 1000);
console.log(w2);
