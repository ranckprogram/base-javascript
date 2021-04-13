const a = Promise.all([1, Promise.resolve(2), Promise.resolve(2), 1]);

a.then((res) => {
  console.log(res);
});
