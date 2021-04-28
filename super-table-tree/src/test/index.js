export const columns = [
  {
    key: "prefix",
    title: "子网",
    width: 300,
  },
  {
    key: "semanticName",
    title: "组织",
    width: 100,
  },
  {
    key: "networkType",
    title: "子网类型",
    width: 80,
  },
  {
    key: "business",
    title: "业务",
    width: 80,
  },
  {
    key: "createMode",
    title: "创建方式",
    width: 80,
  },
  {
    key: "comment",
    title: "备注",
    width: 100,
  },
  {
    key: "dhcpUsage",
    title: "使用率",
    width: 80,
  },
  {
    key: "action",
    title: "操作",
    width: 100,
    render: (row) => {
      return {
        type: "button",
        text: "编辑",
        data: row,
      };
    },
  },
];

export const generate = (count = 300) => {
  return Array.from({ length: count }, function (_, index) {
    return {
      index,
      data: Math.random() * 1000 * index,
    };
  });
};
