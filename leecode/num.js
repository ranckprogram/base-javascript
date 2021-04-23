var singleNumber = function (nums) {
  var num = null;
  nums.sort();
  for (var i = 0; i < nums.length; i++) {
    if (num === null) {
      num = nums[i];
    } else {
      if (nums[i] === num) {
        i += 1;
        num = null;
        continue;
      } else {
        return num;
      }
    }
  }
  return num;
};

console.log(singleNumber([2, 2, 3, 2]));
