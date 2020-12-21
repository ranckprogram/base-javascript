function queue2callback() {
  const queue = [];
  const obj = {
    addFn(fn) {
      queue.push(fn);
      return this;
    },
  };

  function next(data) {
    const first = queue.shift();
    console.log(first);
    const nextData = first(data);
  }
}

function getName(params, callback) {
  setTimeout(() => {
    console.log(params.name);
    callback(params);
  }, 4000);
}

function getCity(params, callback) {
  setTimeout(() => {
    console.log(params.city);
    callback(params);
  }, 1000);
}

function getJob(params, callback) {
  setTimeout(() => {
    console.log(params.fe);
    callback(params);
  }, 1000);
}

const params = {
  name: "ranck",
  city: "chengdu",
  job: "fe",
};

queue2callback.paralle([{}]).then().catch();
