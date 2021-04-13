// const matrix = [[1,2,3],[4,5,6],[7,8,9]] // [1,2,3,6,9,8,7,4,5]

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  // [13, 14, 15, 16],
];
// [1,2,3,4,8,12,11,10,9,5,6,7]

// 核心思路递归
var spiralOrder = function (matrix, result = []) {
  let firstArr = [];

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    if (i === 0) {
      result.push(...line);
    } else if (i < matrix.length - 1) {
      result.push(line[line.length - 1]);
      if (line.length > 1) {
        firstArr.push(line[0]);
      }
    } else {
      result.push(...line.reverse());
    }
  }

  result.push(...firstArr.reverse());

  matrix.pop();
  const [, ...rest] = matrix;
  const smallMatrix = rest.map((item) => {
    item.pop();
    const [, ...m] = item;
    return m;
  });

  if (smallMatrix.length) {
    spiralOrder(smallMatrix, result);
  }

  return result;
};

console.log(spiralOrder(matrix));

console.log(spiralOrder([[7],[9],[6]]));
console.log(spiralOrder([[2,5],[8,4],[0,-1]]));
