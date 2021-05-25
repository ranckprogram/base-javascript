import { fabric } from "fabric";
import uuid from "node-uuid";
import _ from "lodash";

var canvas = new fabric.Canvas("canvas", {
  containerClass: "design",
  perPixelTargetFind: true, // 按照像素来选定目标
});

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

// console.log(canvas);

// console.log(canvas.toJSON());
// console.log(canvas.toObject());
// console.log(canvas.getActiveObjects());

// console.log(canvas.toDataURL())

document.querySelector("#save").onclick = saveData;
function saveData() {
  console.log("save data finish");
  localStorage.setItem(
    "data",
    JSON.stringify(
      canvas.toJSON(["id", "source", "sourceId", "target", "targetId"])
    )
  ); // 存入额外数据
}

document.querySelector("#load").onclick = loadData;

function loadData() {
  const data = localStorage.getItem("data");
  const json = JSON.parse(data);
  canvas.loadFromJSON(json, canvas.renderAll.bind(canvas)); // 异步渲染
  lineZindex();
}

/**
 * 无可奈何之举，
 * - 保存后的json和刚生成的json不一样
 * - 我现在的所有操作都是基于能存能取
 * -
 * 1. 统一化数据
 * 2. 处理line的zindex
 * 3. 线条不编辑，移动
 */
function saveCanvasData() {
  canvas.loadFromJSON(
    canvas.toJSON(["id", "source", "sourceId", "target", "targetId"])
  );
  lineZindex();
}

// 导出图片
function downloadImage() {
  const a = document.createElement("a");
  a.href = canvas.toDataURL({
    width: 500,
    height: 1000,
    left: 0,
    top: 0,
  });
  // console.log(a.href)
  a.download = "topo";
  a.click();
}

document.querySelector("#linezindex").onclick = lineZindex;

function lineZindex() {
  setTimeout(() => {
    canvas.forEachObject(function (obj) {
      if (obj.type === "line") {
        obj.moveTo(1);
        obj.hasControls = false;
        obj.selectable = false;
      } else {
        obj.moveTo(10);
      }
    });
  }, 200);
}

let isDown = false; // 鼠标按下
let isDraw = false; // 开始划线
let isMoveDevice = false; // 拖动设备
let isDragCanvas = false; // 拖拽画布
let currentLine = new fabric.Line();
const stack = []; // 节点栈，包括开始节点和末尾节点
let lineList = []; // 选中的设备关联的全部连线
let linePointMap = {}; // 记录伴随移动线的固定点信息

document.querySelector("#line").onclick = function () {
  isDraw = true;
  isMoveDevice = false;
  toggleLockAllObj(false); // 锁掉全部拖动
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
 * 5. 设备的线不连本身
 */

function clickBlack() {
  isDraw = false; // 开始划线
  canvas.remove(currentLine);
  console.log("取消");
}

// 重置划线调节
function resetDrawLine() {}

/**
 * 开始划线
 * 1. 收集线起始点设备入栈
 * 2. 设置线条初始化坐标
 * 3. 设置当前线条指针到全局变量 currentLine
 * 4. 将当前currentLine 线条追加canvas中
 */
function beginDrawLine(o) {
  // 划线过程禁止拖动设备，都没生效，曲线救国全部禁止
  // o.target.set("hasControls", false); // 没生效
  // o.target.selectable = false; // 不可选中
  // o.target.hasControls = false; // 不可选中

  console.log("开始划线");

  // 记录起始点，入栈
  stack.push(o.target);

  const pointer = canvas.getPointer(o.e); // TODO: 连线的起始位置，其实此时也可以在这个地方调整成为以设备参考系的相对位置
  const points = [pointer.x, pointer.y, pointer.x, pointer.y];

  let sourceId = currentLine.sourceId || o.target.id; // 划线时，记住起始，结束设备id
  let targetId = currentLine.targetId || null;

  currentLine = new fabric.Line(points, {
    id: uuid.v4(),
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
}

// 划线过程中
function drawLineIng(line, o, x = "x2", y = "y2") {
  var pointer = canvas.getPointer(o.e);
  line.set({ [x]: pointer.x, [y]: pointer.y }); // 单线情况
  canvas.renderAll();
}

// 回调： 划线完成
function drawLineFinish(o) {
  isDraw = false;

  if (o.target && o.target.type === "image") {
    stack.push(o.target);

    const [source, target] = stack;

    currentLine.source = source;
    currentLine.target = target;

    currentLine.sourceId = source.id;
    currentLine.targetId = target.id;
  } else {
    canvas.remove(currentLine);
  }

  stack.length = 0;
  console.log("划线完毕");
  currentLine = {};
  // tooltip.style.display = "block";  //

  saveCanvasData();
}

/**
 * 开始移动设备
 * 1. 收集设备关联的连线
 * 2. 初始化相关连线起始点，线条为ip，linePointMap
 *    - 设备id拿到线条集合
 *    - 区分出线条的定点和动点
 */
function beginMoveDevice(o) {
  console.log(canvas.getObjects());

  isMoveDevice = true;
  isDraw = false;
  collectionDeviceLines(o.target.id);
  console.log("开始拖动", lineList);
}

/**
 * 拖动设备过程
 * 1. 根据鼠标的位置设置 linePointMap 内收集的线的第二点位置
 * 2. 实时渲染
 */
function moveDeviceIng(o) {
  for (let lineId in linePointMap) {
    drawLineIng(
      linePointMap[lineId].line,
      o,
      linePointMap[lineId].xField,
      linePointMap[lineId].yField
    );
  }
}

function endMoveDevice() {
  isMoveDevice = false;
  linePointMap = {};
  saveCanvasData();
}

// 收集当前设备连线
// 怎么存？
function collectionDeviceLines(deviceId) {
  linePointMap = {}; // 收集之前先清空
  canvas.forEachObject(function (obj) {
    if (obj.type === "line") {
      if (obj.targetId === deviceId) {
        // 这里面的obj是指每一根和设备关联的线

        const { sourceId, targetId, id, source, target } = obj;

        const x1 = obj.x1 + obj.left;
        const y1 = obj.y1 + obj.top;

        const x2 = obj.x2 + obj.left;
        const y2 = obj.y2 + obj.top;

        const points = [x1, y1, x2, y2];

        const line = new fabric.Line(points, {
          id: id,
          sourceId,
          targetId,
          source,
          target,
          strokeWidth: 3,
          fill: "red",
          stroke: "red",
          originX: "center",
          originY: "center",
          hasControls: false, //选中时是否可以放大缩小
          hasRotatingPoint: false, //选中时是否可以旋转
        });

        linePointMap[line.id] = { line, xField: "x2", yField: "y2" }; // 设置当前线id， map

        /**
         * 两个方案，二选一
         * 一。保留原来线对象
         * 1. 获取线的起始点，设置为定点
         * 2. 获取当前线鼠标点为第二点，静点
         *
         * 二。删除原来线，使用原来线的参数重新创建（关联关系和位置信息）【yes】
         *
         * */
        canvas.remove(obj);
        canvas.add(line);
      }
      if (obj.sourceId === deviceId) {
        const { sourceId, targetId, id, source, target } = obj;

        const x1 = obj.x2 + obj.left;
        const y1 = obj.y2 + obj.top;

        const x2 = obj.x1 + obj.left;
        const y2 = obj.y1 + obj.top;

        const points = [x2, y2, x1, y1];

        const line = new fabric.Line(points, {
          id: id,
          sourceId,
          targetId,
          source,
          target,
          strokeWidth: 3,
          fill: "red",
          stroke: "red",
          originX: "center",
          originY: "center",
          hasControls: false, //选中时是否可以放大缩小
          hasRotatingPoint: false, //选中时是否可以旋转
        });

        linePointMap[line.id] = {
          line,
          xField: "x1",
          yField: "y1",
        }; // 设置当前线id， map

        canvas.remove(obj);
        canvas.add(line);
      }
    }
  });
}

canvas.on("mouse:up", function (o) {
  isDown = false;

  if (isDraw && stack.length) {
    drawLineFinish(o);
    return;
  }

  if (isMoveDevice) {
    endMoveDevice();
  }
});

canvas.on("mouse:down", function (o) {
  isDown = true;

  if (isDraw) {
    if (o.target === null) {
      clickBlack();
    } else {
      if (o.target.type === "image") {
        if (isDown) {
          beginDrawLine(o);
        }
      }
    }
  }
  // 拖动设备， 鼠标按下，且不是划线情况视为拖动

  /**
   * 拖动设备触发条件
   * 1. 不是编辑
   * 2. 鼠标按下
   * 3. target 在设备上
   */

  if (!isDraw && o.target && o.target.type === "image") {
    beginMoveDevice(o);
  }
});

canvas.on("mouse:move", function (o) {
  if (isDown) {
    if (isDraw) {
      drawLineIng(currentLine, o);
      return;
    }

    if (isMoveDevice) {
      // 拖动设备过程，其他线条伴随移动

      o.target.set("hoverCursor", "pointer"); // 鼠标样式
      moveDeviceIng(o);
      console.log("拖动设备过程");
      return;
    }

    mouseWheelEvent(o);
  }
});

document.querySelector("#for").onclick = function () {
  canvas.forEachObject(function (obj) {
    obj.hasControls = false; // 控制包括，变形，移动
    obj.selectable = false; // 不可选中
  });
};

document.querySelector("#lock").onclick = function () {
  toggleLockAllObj(true);
};

function toggleLockAllObj(lock = false) {
  canvas.forEachObject(function (obj) {
    obj.hasControls = lock; // 控制包括，变形，移动
    obj.selectable = lock; // 不可选中
  });
}

document.querySelector("#move").onclick = function () {
  isDragCanvas = !isDragCanvas;
  canvas.selection = false;
};

function mouseWheelEvent(e) {
  if (isDragCanvas && e && e.e) {
    let delta = new fabric.Point(e.e.movementX, e.e.movementY);
    canvas.relativePan(delta);
  }
}

// canvas.isDrawingMode = true  // 自由绘制

// canvas.skipTargetFind = true; // 不可选中

// canvas.setZoom()

console.log(canvas.viewportTransform);
