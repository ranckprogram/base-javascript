function Vue(options){
  this.$options = options || {};
  var data = this._data = this.$options.data;
  observe(data, this);

  this.$compile =  compile(options.el || document.body, this)
}