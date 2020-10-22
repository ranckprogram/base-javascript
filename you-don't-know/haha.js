function findMoreThanHalf(arr) {
  const arrMap = {};
  let result = -1;
  arr.forEach((item) => {
    if (arrMap[item]) {
      arrMap[item]++;
      if (arrMap[item] > arr.length / 2) {
        result = item
      }
    } else {
      arrMap[item] = 1;
    }
  });
  return result;

}

console.log(findMoreThanHalf([0]))  //  0
console.log(findMoreThanHalf([0,1]))  //  -1
console.log(findMoreThanHalf([0,1,2,2]))  //  -1
console.log(findMoreThanHalf([0,1,2,2,2]))  //  2
console.log(findMoreThanHalf([0,1,2,2,2,3,3,3]))  //  -1
console.log(findMoreThanHalf([0,1,2,2,2,3,3,3,3]))  //  3