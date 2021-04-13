const https = require("https");
const fs = require("fs");
const path = require("path");

const params = {
  baseUrl: "https://geo.datav.aliyun.com/areas_v2/bound/",
  start: "100000",
  savePath: "geo",
};

const history = [];

class Queue {
  constructor() {
    this.queue = [];
    this.events = Object.create(null);
  }

  product(item) {
    this.queue.push(item);
    this.next();
  }

  on(method, fn) {
    this.events[method] = fn;
  }

  next() {
    if (this.queue.length) {
      const item = this.queue.shift();
      for (let key in this.events) {
        const fn = this.events[key];
        if (typeof fn === "function") {
          fn(item);
          this.next(fn);
        }
      }
    }
  }
}

const q = new Queue();

function getUrl(adcode, options) {
  const { url, filename } = createFileParams(adcode);

  https.get(url, (res) => {
    let rawData = "";

    res.on("data", (chunk) => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const data = JSON.parse(rawData);
        q.product({
          type: "data",
          filename,
          data,
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  });
}

function writeFile(filename, data) {
  const result = fs.writeFileSync(
    path.resolve(__dirname, params.savePath, filename),
    JSON.stringify(data, null, 4),
    { encoding: "utf8" }
  );

  // console.log(result, "writeFileSync");
}

function createFileParams(adcode, baseUrl = params.baseUrl) {
  history.push(adcode);
  const filename = `${adcode}_full.json`;
  return {
    adcode,
    filename,
    url: `${baseUrl}${filename}`,
  };
}

// 加入队列呢？还是直接返回呢
function parser(data) {
  const adcodes = [];
  data.features.forEach((feature) => {
    const { childrenNum, adcode } = feature.properties;
    if (childrenNum) {
      adcodes.push(adcode);
    }
  });
  return adcodes;
}

function main() {
  // init();
  getUrl(params.start, params);

  q.on("download", function (item) {
    if (item.type === "request") {
      getUrl(item.adcodes);
      console.log(55, history.length);
      if(history.length>362) {
        console.log(history)
      }
    }
  });

  q.on("finish", function (item) {
    // console.log("finish", item);
    const { filename, data, type } = item;
    if (type === "data") {
      const result = parser(data);
      // console.log(result, 99);
      result.forEach((adcodes) => {
        q.product({
          type: "request",
          adcodes,
        });
      });

      writeFile(filename, data);
    }
  });
}

main();
