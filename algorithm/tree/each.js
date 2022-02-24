const e = require("express");

var arr = [
  {
    name: "a",
    children: [
      {
        name: "a1",
        children: [
          {
            name: "a11",
          },

          {
            name: "a12",
            children: [
              {
                name: "aa2",
              },
            ],
          },
        ],
      },          {
        name: "d"
      },
      {
        name: "a2",
        children: [
          {
            name: "a21",
          },
          {
            name: "a22",
          },
        ],
      },
    ],
  },
  {
    name: "c"
  },
  {
    name: "b",
    children: [
      {
        name: "b1",
        children: [
          {
            name: "b11",
            children: [
              {
                name: "b111",
              },
              {
                name: "b12312",
              },
            ],
          },
        ],
      },
    ],
  },
];

function each(tree) {
  const result = [];
  let index = 0;
  let children = tree;

  const stack = [];
  // stack.push({
  //   children,
  //   index,
  // });


  while (children[index] || stack.length) {
    const child = children[index];
    if (child) {
      result.push(child);
      if (Array.isArray(child.children)) {
        stack.push({
          children,
          index: index,
        });
  
        children = child.children;
        index = 0;
      } else {
        index++;
      }
    } else {
      const next = stack.pop();
      children = next.children;
      index = next.index + 1;
    }

  }

  return result;
}

const data = each(arr);

console.log(data);
