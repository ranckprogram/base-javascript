function Controller(name) {
  this.error = [];
  console.log(1)
  this.aname = name;
}

Controller.prototype = {
  constructor: Controller,
  getName: function () {
    return this.name;
  },
  setName: function (name) {
    this.name = name;
  },
};

function AuthController(name) {
  Controller.call(this, name)  // 调用 Controller 实现属性继承
}

AuthController.prototype = Object.create(Controller.prototype)  // 这种方式稍微干净些，不会吧Controller构造函数的属性携带过去

// AuthController.prototype = new Controller();

AuthController.prototype.getInfo = function () {};

const auth = new AuthController('123');

console.dir(auth);
