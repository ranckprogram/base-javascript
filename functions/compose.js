function compose() {
  const args = arguments;
  let length = args.length - 1;

  return function () {
    let i = length;
    let result = args[length].apply(this, arguments);

    while (i--) {
      result = args[i].call(this, result);
    }

    return result;
  };
}

function map(x) {
  console.log("map");
  return x + 1;
}
function map(x) {
  console.log(x, "map");
  let result = [];
  for (let item of x) {
    result.push(item + 1);
  }

  return result;
}

const targetFunction = compose(map, reduce);

const data = [1, 6, 3, 7, 3];
console.log(targetFunction(data));