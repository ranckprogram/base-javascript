function compile (el, vm) {
  const vNode = node2Fragment(el)
  compileElements(vNode, vm)
  el.appendChild(vNode)
  // console.log(vm)
  // getDataValue(vm, 'name')
}


/**
 * 将dom上的元素转移到内存中
 * @param {Element} el 
 * @return {Element} frame
 */
function node2Fragment (el) {
  let child = null
  let frame = document.createDocumentFragment()
  while (child = el.firstChild) {
    frame.appendChild(child)
  }
  // console.log(frame.childNodes)
  return frame
}

function compileElements (vNode, vm) {
  const reg = /\{\{(.*)\}\}/;

  Array.from(vNode.childNodes).forEach(node => {
    if (isElement(node)) {
      compile(node, vm)
    } else if (isText(node)) {
      let text = node.textContent
      if (reg.test(text)) {
        text = RegExp.$1 //缓存最近一次的正则里面的值;
        //调用方法编译
        compileText(node, getDataValue(vm, text));
      }
    } else if (isAttr(node)) {
      console.log(node)

    }
    console.log(node)

  })
}

function isElement (node) {
  return node.nodeType === 1
}

function isAttr (node) {
  
  return node.nodeType === 2
}

function isText (node) {
  return node.nodeType === 3
}

function isDirect (attrName) {
  return attrName.indexOf("v-") >= 0; //判断属性名中是否有v-开头的属性
}

function isEventDirective (dir) {
  return dir.indexOf('on') === 0;
}

function bind () {

}

function compileText (node, value) {
  node.textContent = value
}

function getDataValue (vm, exp) {
  return vm._data[exp]
}