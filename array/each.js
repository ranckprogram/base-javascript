const arr = Array.from({ length: 100000 }, (_, index) => index + 1);

console.log(arr);

let result = 0;
console.time("forEach");

arr.forEach((item) => {
  result += item;
});

console.timeEnd("forEach");

console.time("map");

arr.map((item) => {
  result += item;
});

console.timeEnd("map");

let item;
console.time("forof");

for (item of arr) {
  result+=item
}

console.timeEnd("forof");

console.time("for");

for (let i = 0; i < arr.length; i++) {
  arr[i] + 1;
}

console.timeEnd("for");

console.time("reduce");

arr.reduce((result, current) => result + current, 0);

console.timeEnd("reduce");
