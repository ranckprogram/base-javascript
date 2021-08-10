const Stack = require("../stack");

function toString(num, radix) {
  const stack = new Stack();
  let number = num;

  let binaryString = "";

  while (number > 0) {
    const extra = number % radix;
    stack.push(extra);
    number = Math.floor(number / radix);
  }

  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }

  return binaryString;
}

console.log(toString(10, 8));
