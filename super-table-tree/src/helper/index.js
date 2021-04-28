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


export function list2Tree(list, parentId) {
  let map = {};
  let roots = [];
  for (let data of list) {
    data.children = [];
    map[data.id] = data;
    if (data.parentId === parentId ) {
      roots.push(data);
    }
  }
  for (let data of list) {
    if (map[data.parentId]) {
      map[data.parentId].children.push(data);
    }
  }
  return roots;
}