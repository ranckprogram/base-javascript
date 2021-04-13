console.log("hello vue");

import { compiler } from "./compiler";

class Vue {
  constructor(options) {
    this.$options = options;
    this._init();
  }

  _init() {}
  render() {
    const { template } = this.$options;
    compiler();
  }
  $mount(el = this.$options.el) {
    console.log("hahah");

    document.querySelector(el).append(1);
    return this;
  }
}

const vm = new Vue({
  template: `<div><ul><li v-for="item in list">{{item}}</li></ul></div>`,
  data() {
    return {
      list: [1, 2, 4, 5, 6, 7],
    };
  },
}).$mount("#app");
console.log(vm);
