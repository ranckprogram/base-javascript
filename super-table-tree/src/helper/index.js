export const executePosition = (data, height, offset = 0, begin = 0, scroll) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const position = begin + (height + offset) * i - scroll;
    result.push({
      data: data[i],
      position,
    });
  }
  return result;
};
