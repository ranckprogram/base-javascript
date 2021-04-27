import { createRect } from "./figures/createRect";
import { Table } from "./entity/table";
import { executePosition } from "./helper";

import { columns, generate } from "./test";

const defaults = {};

/**
 * 多个对象怎么协同?
 * 数据流？
 * 设计模式？
 */

class SuperTreeTable {
  canvas = null;
  ctx = null;
  background = "#ddd";
  el = "";
  paperPosition = 200; // Y 卷动到的位置
  constructor(options) {
    this.data = options.data;

    this.init();
  }

  init() {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    this.canvas = canvas;
    this.ctx = ctx;

    canvas.width = 1000;
    canvas.height = 600;
    canvas.style.background = this.background;

    console.log(ctx);

    this.render();

    this.bindEvent(canvas);
  }

  clear() {
    const canvas = this.canvas;
    createRect(this.ctx, 0, 0, canvas.width, canvas.height, {
      color: {
        backgroundColor: this.background,
        bgColor: this.background,
      },
    });
  }

  initData() {
    const dataWithPosition = executePosition(
      this.data,
      60,
      10,
      50,
      this.paperPosition
    );
    // console.log(data, dataWithPosition);

    return dataWithPosition;
  }

  setPaperPosition(paperPosition) {
    this.paperPosition = paperPosition; // 触发渲染
    this.render();
  }

  bindEvent(canvas) {
    const self = this;
    canvas.addEventListener("click", function (e) {
      console.log("click", e);
    });

    canvas.addEventListener("mousemove", function (e) {
      // console.log("mousemove", e);
    });

    canvas.addEventListener("wheel", function (e) {
      console.log("wheel", e);

      const paperPosition = self.paperPosition - e.wheelDeltaY;
      console.log(paperPosition);
      self.setPaperPosition(paperPosition);
    });
  }

  render(ctx = this.ctx) {
    console.log("render");
    this.clear();
    const data = this.initData();

    const offset = 10;
    const width = 800;
    const height = 60;
    // ctx.translate(150, 550);

    // data.forEach(({ position }, index) => {
    //   createRect(ctx, offset, position, width, height, {
    //     color: "",
    //     text: "index" + index,
    //   });
    // });

    const table = new Table(
      columns,
      data,
      function _createRect(x, y, width, height, text) {
        createRect(ctx, x, y, width, height, {
          color: "",
          text,
        });
      }
    ); // 事件咋搞呢？特殊列咋搞呢？
    console.log(Table, table);

    // ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

const data = generate(20);

const superTreeTable = new SuperTreeTable({
  columns,
  data,
});

console.log(superTreeTable, data);
// superTreeTable.clear()
