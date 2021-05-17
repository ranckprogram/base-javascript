import { fabric } from "fabric";
import uuid from "node-uuid";
import _ from "lodash";

var canvas = new fabric.Canvas("canvas", { containerClass: "design" });

// 工具栏
document.querySelector("#switch").onclick = createSwitch;
document.querySelector("#wifi").onclick = createWifi;
document.querySelector("#cloud").onclick = createCloud;

document.querySelector("#delete").onclick = deleteSeleced;
document.querySelector("#download").onclick = downloadImage;
document.querySelector("#forbid").onclick = forbid;

// window document
const tooltip = document.querySelector("#tooltip");

tooltip.onclick = function () {
  tooltip.style.display = "none";
};

function deleteSeleced() {
  canvas.remove(canvas.getActiveObject());
}

function createCloud() {
  fabric.util.loadImage(require("/img/cloud.jpg"), function (img) {
    var legimg = new fabric.Image(img, {
      id: uuid.v4(),
      left: 30,
      top: 20,
      scaleX: 50 / img.width,
      scaleY: 50 / img.height,
    });
    canvas.add(legimg);
    canvas.renderAll();
  });
}

function createSwitch() {
  fabric.util.loadImage(require("/img/switch.jpg"), function (img) {
    var legimg = new fabric.Image(img, {
      id: uuid.v4(),
      left: 30,
      top: 60,
      scaleX: 50 / img.width,
      scaleY: 50 / img.height,
    });

    canvas.add(legimg);
    canvas.renderAll();
  });
}

function createWifi() {
  fabric.util.loadImage(require("/img/wify.png"), function (img) {
    // console.log(img);
    var legimg = new fabric.Image(img, {
      id: uuid.v4(),
      left: 30,
      top: 100,
      scaleX: 50 / img.width,
      scaleY: 50 / img.height,
      hasControls: false, //选中时是否可以放大缩小
      hasRotatingPoint: false, //选中时是否可以旋转
    });

    canvas.add(legimg);
    canvas.renderAll();
  });
}

console.log(canvas);

console.log(canvas.toJSON());
console.log(canvas.toObject());
console.log(canvas.getActiveObjects());

// console.log(canvas.toDataURL())

document.querySelector("#save").onclick = function () {
  console.log("save data finish");
  localStorage.setItem(
    "data",
    JSON.stringify(
      canvas.toJSON(["id", "source", "sourceId", "target", "targetId"])
    )
  ); // 存入额外数据
};

document.querySelector("#load").onclick = loadData;

function loadData() {
  const data = localStorage.getItem("data");
  const json = JSON.parse(data);
  json.objects.forEach((item) => {
    item.id = item.id || uuid.v4();
  });
  canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
}

// 导出图片
function downloadImage() {
  const a = document.createElement("a");
  a.href = canvas.toDataURL();
  a.download = "topo";
  a.click();
}

let isDown = false; // 鼠标按下
let isDraw = false; // 开始划线
let currentLine = new fabric.Line();
const stack = []; // 节点栈，包括开始节点和末尾节点
let lineList = []; // 选中的设备关联的全部连线
let linePointMap = {}; // 记录伴随移动线的固定点信息

document.querySelector("#line").onclick = function () {
  isDraw = true;
};

function forbid() {
  canvas.selection = false; // 禁止框选
}

/**
 * 划线
 * 1. 划线以设备开始
 * 2. 划线以设备结束
 * 3. 划线过程中可以取消
 * 4. 划线过后可以关联线和设备
 */

function clickBlack() {
  isDraw = false; // 开始划线
  isDown = false;
  canvas.remove(currentLine);
  console.log("取消");
}

// 重置划线调节
function resetDrwaLine() {}

// 划线过程中
function drawLineIng(o) {
  var pointer = canvas.getPointer(o.e);
  currentLine.set({ x2: pointer.x, y2: pointer.y }); // 单线情况

  if (o.target) {
    currentLine.set("id", o.target.id);
  }
  canvas.renderAll();
}

// 收集当前设备连线
function collectionDeviceLines(deviceId) {
  let result = []; // 收集之前先清空

  canvas.forEachObject(function (obj) {
    if (obj.type === "line") {
      if (obj.targetId === deviceId) {
        result.push(obj);

        linePointMap[obj.id] = obj; // 设置当前线id， map
        // 设置线条的起始点
        obj;
        console.log(obj.source, "dd");
      }
      if (obj.sourceId === deviceId) {
        result.push(obj);
      }
    }
  });

  return result;
}
canvas.on("mouse:up", function (o) {
  isDown = true;
});
canvas.on("mouse:down", function (o) {
  isDown = true;

  if (isDraw) {
    if (o.target === null) {
      clickBlack();
    } else {
      if (o.target.type === "image") {
        // o.target.setCursor("pointer");
        // o.target.set("hoverCursor", "pointer") // 鼠标样式，但是调用时机不对
        {
          console.log("MOUSE:DOWN", o.target);

          if (isDown === false) {
            console.log("开始划线");

            // 划线过程禁止拖动设备
            o.target.set("hasControls", false); // 没生效

            // 记录起始点，入栈
            stack.push(o.target);

            lineList = collectionDeviceLines(o.target.id);

            const pointer = canvas.getPointer(o.e); // TODO: 连线的起始位置，其实此时也可以在这个地方调整成为以设备参考系的相对位置
            const points = [pointer.x, pointer.y, pointer.x, pointer.y];

            let sourceId = currentLine.sourceId || o.target.id; // 划线时，记住起始，结束设备id
            let targetId = currentLine.targetId || null;

            currentLine = new fabric.Line(points, {
              sourceId,
              targetId,
              strokeWidth: 3,
              fill: "red",
              stroke: "red",
              originX: "center",
              originY: "center",
              hasControls: false, //选中时是否可以放大缩小
              hasRotatingPoint: false, //选中时是否可以旋转
            });
            canvas.add(currentLine);
          } else {
            isDown = false;
            isDraw = false;

            stack.push(o.target);

            drawLineFinish();
          }
        }
      }
    }
  }
});

// 回调： 划线完成
function drawLineFinish() {
  const [source, target] = stack;

  currentLine.source = source;
  currentLine.target = target;

  currentLine.sourceId = source.id;
  currentLine.targetId = target.id;
  stack.length = 0;
  console.log("划线完毕");
  currentLine = {};
  // tooltip.style.display = "block";  //
}

// 拖动设备过程
function moveDevice() {}

canvas.on("mouse:move", function (o) {
  console.log(2, isDown, isDraw);
  if (isDown) {
    if (isDraw) {
      drawLineIng(o);
      return;
    }

    console.log("fff");
    if (o.target) {
      // 拖动设备过程，其他线条伴随移动

      o.target.set("hoverCursor", "pointer"); // 鼠标样式

      console.log("拖动设备过程");
      return;
    }
  }
});

document.querySelector("#for").onclick = function () {
  canvas.forEachObject(function (obj) {
    console.log(obj);

    // if (obj.type === "line") {
    obj.hasControls = false; // 控制包括，变形，移动
    obj.selectable = false; // 不可选中
    // }
  });
};



