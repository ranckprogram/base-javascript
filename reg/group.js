const arr = Array.from({ length: 9999 }, (_, index) => index);

function testSplit(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 3) {
      result[result.length - 1].push(array[i]);
    } else {
      result.push([array[i]]);
    }
  }
  return result;
}

console.time("testSplit");
console.log(testSplit(arr));
console.timeEnd("testSplit");

function regSplit(arr) {
  return arr.join(",").match(/(\d+,){3}/g).map(item => item.split(",").slice(0,3).map(Number));
}



console.time("regSplit");
console.log(regSplit(arr));
console.timeEnd("regSplit");
