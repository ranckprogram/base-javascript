export class Table {
  constructor(columns, data, createRect) {
    this.body = data.map((item, index) => {
      // console.log(item);
      return new Tr(columns, item, createRect);
    });

    this.header = new Thead(columns, createRect);
  }
}

export class Thead {
  constructor(columns, createRect) {
    this.columns = columns;

    this.render(columns, createRect);
  }

  render(columns, createRect) {
    let preLeft = 0;
    columns.forEach((item, index) => {
      createRect(preLeft, 0, item.width, 60, item.title);
      preLeft += item.width;
    });
  }
}

export class Tr {
  constructor(columns, row, createRect) {
    let x = 0;
    const y = row.position;

    this.td = columns.map((column, index) => {
      let td = new Td(column, row, x, y, createRect);
      x += column.width;

      return td;
    });
    this.render(row, createRect);
  }
  render(row, createRect) {
    // createRect(0, row.position, 800, 60);
  }
}

export class Td {
  width = 200;
  constructor(column, row, x, y, createRect) {
    console.log(x);
    this.render(column, row, x, y, createRect);
  }

  // 事件能不能只直接在创建对象得时候定义了，或者全局定义后在委托
  // 返会一个数据对象？
  // 直接在过程中传入ctx渲染

  render(column, row, x, y, createRect) {
    console.log(row);
    createRect(x, y, column.width, 60, row[column.key]);
  }
}
