function observe (data) {
  if (typeof data === null || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(key => {
    let val = data[key]
    observe(val); // 
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get () {
        return val
      },
      set (newValue) {
        console.log('set', key, '=', newValue)

        val = newValue
      }
    })
  })
}