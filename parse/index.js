var obj = {
  a: 1,
  b: 2,
  c: {
    d: {
      e: 3,
    },
  },
};

var str = `{"a":1,"bv":2,"cc":{"d":{"e":3}}}`;

// console.log(JSON.stringify(obj));
// console.log(JSON.parse(str));
function parse(str, fn) {
  var stack = [];

  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
    const char = str[i];
    if (char === "{") {
      stack.push({});
    }
    if (char === '"') {
    }
    if (/^[0-9][a-z][A-Z]&/.test(char)) {
    }
  }
}

// parse(str)

var s = "3[a]2[bc]"; // 返回 "aaabcbc".
function parseString(str) {
  let result = "";
  let time = "";
  let words = null;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "[") {
      words = "";
      time = Number(time);
      continue;
    }

    if (char === "]") {
      while (time--) {
        result += words;
      }
      time = "";
      words = null;

      continue;
    }
    if (words === null) {
      time += char;
      continue;
    }

    words += char;
    

    console.log(words, time)
  }

  return result;
}

console.log(parseString(s));
