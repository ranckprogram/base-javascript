function watcher () {
  const listen = {}
  function on (event, fn) {
    listen[event] = fn
  }

  function emit (event, message) {
    listen[event] && listen[event](message)
  }

  function off (event) {
    delete listen[event]
  }

  return {
    on,
    off,
    emit
  }
} 