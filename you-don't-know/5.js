function bind(fn, obj, arg) {
  return function () {
    return fn.call(obj, arg)
  }
}


const obj = {
  a: "ranck"
}

function showName (arg){
  console.log(this, arg)
  return this.a + arg
}


const showRanck = bind(showName, obj, "hello")


console.log(showRanck())


console.log(showName.call(obj, " heheda"))