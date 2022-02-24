const data = [
  "node-0-0",
  "node-0-1",
  "node-0-8",
  "node-0-10",
  "node-0-11",
  "node-0-12",
  "node-0-15",
  // "node-2",
  "node-2-1",
  "node-8",
  "node-9",
  "node-11",
  "node-12",
  "node-16",
  "node-17",
];

/**
 * 1. 一定会有一个位置
 * 2. 如果目标是a元素的前缀，那目标元素插入a元素之前
 * 3. 如果 a 和 target 一样长，前面数值一样，如果a的最后一个大于target最后一位，则 target插入a前面
 * 4.
 */
function getIndex(target) {
  let targetIndex = 0;
  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    if (item.startsWith(target)) {
      return index;
    }

    if (compare(item, target)) {
      return index;
    }

    if (index === data.length - 1) {
      return data.length;
    }
  }
  return targetIndex;
}

function compare(item, target) {
  const itemArr = item.split("-");
  const targetArr = target.split("-");
  let len = targetArr.length;
  let index = 1;
  while (index < len) {
    if (itemArr[index] !== targetArr[index]) {
      return Number(itemArr[index]) > Number(targetArr[index]);
    }
    index++;
  }
}

console.log("length", data.length);

console.log(getIndex("node-0"));

console.log(getIndex("node-2-0"));

// console.log(getIndex("node-0-16"));

// console.log(getIndex("node-15"));

// console.log(getIndex("node-1"));

// console.log(getIndex("node-2"));

// console.log(getIndex("node-0-15-1"));

// console.log(getIndex("node-17-1")); // error
