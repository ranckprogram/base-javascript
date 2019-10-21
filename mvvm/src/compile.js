function compile (el) {

}

function node2Fragment(el) {
  let child = null;
  let frame = document.createDocumentFragment();
  while(child = el.firstChild) {
    frame.appendChild(child)
  }
  return frame
}