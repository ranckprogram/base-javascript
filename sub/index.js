class Event {
  constructor() {
    this.events = Object.create(null);
  }

  on(type, fn) {
    let events = this.events[type];
    if (Array.isArray(events)) {
      events.push(fn);
    } else {
      this.events[type] = [fn];
    }
  }

  once(type, fn) {

  }
  emit(type, params) {
    const events = this.events[type];
    if (Array.isArray(events)) {
      events.forEach((event) => {
        event(params);
      });
    }
  }

  remove(type){
    delete this.events[type]
  }
}

const a = new Event();
a.on("nice", console.log);

a.emit("nice", "aa");

console.log(a);
