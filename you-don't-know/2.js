function Controller(name) {
  this.error = [];
  console.log(1)
  this.name = name;
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

// AuthController.prototype = Object.create(Controller.prototype)

AuthController.prototype = new Controller();

AuthController.prototype.getInfo = function () {};

const auth = new AuthController('123');

console.dir(auth);

auth;
