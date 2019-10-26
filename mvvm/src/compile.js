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
      compileNode(node, vm)
    }

    if (node.childNodes && node.childNodes.length) {
      compileElements(node, vm)
    }

    if (isText(node)) {
      let text = node.textContent
      if (reg.test(text)) {
        temp = RegExp.$1
        compileText(node, getDataValue(vm, temp));
      }
    }

  })
}

function compileNode (node, vm) {
  const attrs = node.attributes;
  Array.from(attrs).forEach(attr => {
    const attrName = attr.name;
    const attrValue = attr.value;
    var dirs = attrName.split('-');
    if (dirs[0] === 'v') {
      compileText(node, getDataValue(vm, attrValue))
    }
    if (dirs[0] === 'on') {
      const eventName = dirs[1];
      eventHandler(node, eventName, attrValue, vm)
    }
    node.removeAttribute(attrName);
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


function eventHandler (node, eventName, method, vm) {
  try {
    const theMethod = vm.$options.methods[method]
    node.addEventListener(eventName, theMethod.bind(vm), false);
  } catch (e) {
    console.error(e)
  }
}

function directHandler () {

}