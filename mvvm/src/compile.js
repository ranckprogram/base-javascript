function compile (el) {
  const vNode = node2Fragment(el)
  compileElements(vNode)
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

function compileElements (vNode) {
  const reg = /\{\{(.*)\}\}/;

  Array.from(vNode.childNodes).forEach(node => {
    console.log(node)
    if(isElement(node)){
      compile(node)
    }
    if (isText(node)) {

    }
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

function bind() {
  
}