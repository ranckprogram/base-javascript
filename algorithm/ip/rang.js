let count = 100;

function createIPList(count) {
  let _count = 0;
  for (var i = 12; i < 254; i++) {
    for (var j = 0; j < 255; j++) {
      console.log(`${i}.${j}.0.12/16`);
      _count++;
      if (_count > count) {
        return;
      }
    }
  }
}

createIPList(1000);
