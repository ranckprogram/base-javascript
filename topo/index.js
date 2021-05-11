import { fabric } from "fabric";
var canvas = new fabric.Canvas("canvas", { containerClass: "design" });

var rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 60,
  height: 70,
  fill: "red",
});

canvas.add(rect);

var line = new fabric.Line([20, 20, 150, 210], {
  fill: "#5E2300", //填充颜色
  stroke: "#5E2300", //笔触颜色
  strokeWidth: 2, //笔触宽度
  hasControls: false, //选中时是否可以放大缩小
  hasRotatingPoint: false, //选中时是否可以旋转
  hasBorders: false, //选中时是否有边框
  transparentCorners: true,
  perPixelTargetFind: true, //默认false。当设置为true，对象的检测会以像互点为基础，而不是以边界的盒模型为基础。
  selectable: true, //是否可被选中
  // lockMovementX: true, //X轴是否可被移动(true为不可，因为前缀是lock)
  // lockMovementY: true, //Y轴是否可被移动(true为不可，因为前缀是lock)
});
canvas.add(line);

// let isDown = false;

// canvas.on("mouse:down", function (o) {
//   console.log("MOUSE:DOWN");
//   if (isDown === false) {
//     isDown = true;
//     var pointer = canvas.getPointer(o.e);
//     var points = [pointer.x, pointer.y, pointer.x, pointer.y];
//     line = new fabric.Line(points, {
//       strokeWidth: 9,
//       fill: "red",
//       stroke: "red",
//       originX: "center",
//       originY: "center",
//     });
//     canvas.add(line);
//   } else {
//     isDown = false;
//   }
// });

// canvas.on("mouse:move", function (o) {
//   if (!isDown) return;
//   var pointer = canvas.getPointer(o.e);
//   line.set({ x2: pointer.x, y2: pointer.y });
//   canvas.renderAll();
// });

// fabric.util.addListener(window, "keyup", function (e) {
//   console.log("KEYUP :: " + e.keyCode);
//   if (e.keyCode === 13) {
//     isDown = false;
//   }
// });
// console.log(canvas);

fabric.util.loadImage(require("/img/cloud.jpg"), function (img) {
  var legimg = new fabric.Image(img, {
    left: 30,
    top: 20,
    scaleX: 50 / img.width,
    scaleY: 50 / img.height,
  });
  canvas.add(legimg);
  canvas.renderAll();
});

fabric.util.loadImage(require("/img/switch.jpg"), function (img) {
  var legimg = new fabric.Image(img, {
    left: 30,
    top: 60,
    scaleX: 50 / img.width,
    scaleY: 50 / img.height,
  });

  canvas.add(legimg);
  canvas.renderAll();
});

fabric.util.loadImage(require("/img/switch.jpg"), function (img) {
  var legimg = new fabric.Image(img, {
    left: 30,
    top: 60,
    scaleX: 50 / img.width,
    scaleY: 50 / img.height,
  });
  canvas.add(legimg);
  canvas.renderAll();
});

fabric.util.loadImage(require("/img/switch.jpg"), function (img) {
  console.log(img);
  var legimg = new fabric.Image(img, {
    left: 30,
    top: 60,
    scaleX: 50 / img.width,
    scaleY: 50 / img.height,
  });
  canvas.add(legimg);
  canvas.renderAll();
});

fabric.util.loadImage(require("/img/wify.png"), function (img) {
  console.log(img);
  var legimg = new fabric.Image(img, {
    scaleX: 50 / img.width,
    scaleY: 50 / img.height,
    hasControls: false, //选中时是否可以放大缩小
    hasRotatingPoint: false, //选中时是否可以旋转
  });

  var circle = new fabric.Circle({
    radius: 10,
    fill: "#f80",
    originX: "center",
    originY: "center",
    visible: false,
    hoverCursor: "pointer",
  });

  var group = new fabric.Group([legimg, circle], {
    left: 300,
    top: 260,
    gtype: "device",

    hasControls: false, //选中时是否可以放大缩小
    hasRotatingPoint: false, //选中时是否可以旋转
  });

  console.log(group);
  console.log(group.getObjects());

  canvas.add(legimg);
  canvas.renderAll();
});

fabric.util.loadImage(require("/img/wify.png"), function (img) {
  console.log(img);
  var legimg = new fabric.Image(img, {
    left: 30,
    top: 120,
    scaleX: 50 / img.width,
    scaleY: 50 / img.height,
  });
  canvas.add(legimg);
  canvas.renderAll();
});

console.log(canvas);

console.log(canvas.toJSON());
console.log(canvas.toObject());
console.log(canvas.getActiveObjects());

// console.log(canvas.toDataURL())

document.querySelector("#save").onclick = function () {
  console.log("save data finish");
  localStorage.setItem("data", JSON.stringify(canvas.toJSON()));
};

document.querySelector("#load").onclick = loadData;

function loadData() {
  const data = localStorage.getItem("data");
  const json = JSON.parse(data);
  canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
}

// loadData();
// canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));

// 导出图片
// function createImage() {
//   const img = document.createElement("img")
//   img.src = canvas.toDataURL()
//   document.body.appendChild(img)
// }

// createImage()

let i = 0;
let circle = null;

// canvas.on("mouse:move", (e) => {
//   if (e && e.target) {
//     if (e.target.gtype === "device") {
//       const group = e.target;
//       circle = group.item(1);
//       circle.set("visible", true);

//       console.log(circle, 55)

//       canvas.renderAll();
//     }
//   } else {
//     if (circle) {
//       circle.set("visible", false);
//       canvas.renderAll();
//     }
//   }
// });

canvas.on("mouse:move", (e) => {
  if (e && e.target) {
    if (e.target.type === "image") {
      const image = e.target;

      console.log(image, 55);

      // canvas.renderAll();

      add(image.left + image.width, image.top + image.height);
    }
  } else {
  }
});

function add(left, top) {
  var circle = new fabric.Circle({
    radius: 10,
    fill: "#f80",
    originX: "center",
    originY: "center",
    left,
    top,
    // visible: false,
  });
  canvas.add(circle);
  canvas.renderAll();
}

// add();

let isDown = false;
let isDraw = false; // 开始划线

document.querySelector("#line").onclick = function () {
  isDraw = true;
};

canvas.on("mouse:down", function (o) {
  console.log("MOUSE:DOWN");
  if (isDown === false) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    line = new fabric.Line(points, {
      strokeWidth: 9,
      fill: "red",
      stroke: "red",
      originX: "center",
      originY: "center",
    });
    canvas.add(line);
  } else {
    isDown = false;
  }
});

canvas.on("mouse:move", function (o) {
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);
  line.set({ x2: pointer.x, y2: pointer.y });
  canvas.renderAll();
});
