function reactive(fn, deps) {
  const hasChange =
    _deps && !deps.every((item, index) => item === _deps[index]);

  console.log(hasChange, _deps, deps);
  if (!deps || hasChange) {
    fn();
    _deps = deps;
  }
}
