const Widge = {
  init(width, height) {
    this.width = width;
    this.height = height;
    this.$el = null;
  },
  insert(where) {
    this.$el.style.width = this.width + "px";
    this.$el.style.height = this.height + "px";
    where.append(this.$el);
  },
};

let Button = Object.create(Widge);

Button.setUp = function (width, height, text) {
  this.init(width, height);
  this.text = text;
  const el = (this.$el = document.createElement("button"));
  el.innerText = text;
};

Button.build = function ($where) {
  this.insert($where);

  // bind event

  this.$el.onclick = this.onClick.bind(this);
};

Button.onClick = function (e) {
  console.log(this.text, e);
};


;;;+(function iife() {
  const body = document.body;

  const btn = Object.create(Button);
  console.log(btn);
  btn.setUp(120, 40, "ok");

  btn.build(body);

  // console.log(window);
})();
