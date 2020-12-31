let arr = [1, 2, 5, 6, 7];

let obj = {
  name: "sofy",
  age: 31,
};

for (index in obj) {
  console.log(index);
  console.log(typeof index);
}

console.log("=====");

for (index in arr) {
  console.log(index);
  console.log(typeof index);
}

console.log("=====");

for (value of arr) {
  console.log(value);
}

// Object.defineProperty(obj, Symbol.iterator, {
//   value: Array.prototype[Symbol.iterator]
// });


// Object.defineProperty(obj, Symbol.iterator, {
//   value: Array.prototype[Symbol.iterator]
// });


Object.create({
  [Symbol.iterator]: function values () {

  }
})


for (value of obj) {
  // TypeError: obj is not iterable
  console.log(value);
}
