const data = Array.from({ length: 100 }).map((item, index) => index + 1);

const filter = [
  {
    start: 2,
    end: 25,
  },
  {
    start: 37,
    end: 55,
  },
  {
    start: 58,
    end: 99,
  },
];

const result = [];

let fi = 0;
let flag = false;

for (let index = 0; index < data.length ; index++) {
  const item = filter[fi];

  if (isOk(data[index], item)) {
    flag = true;
  } else if (filter[fi + 1] && isOk(data[index], filter[fi + 1])) {
    fi++;
  } else {
    flag = false;
    result.push(data[index]);
  }
}

function isOk(data, item) {
  if (!item) {
    return true;
  }
  const { start, end } = item;
  return data >= start && data <= end;
}

console.log("result", result);
