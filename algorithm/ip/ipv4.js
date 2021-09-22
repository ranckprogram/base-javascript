// 构造函数中创建一个对象，方法可以去操控这个对象


class Address4 {
  constructor(address) {
    this.subnet = "/32";
    this.ip = address;
    this.mask = 32;
    this.value = 0;
    this.address = address;
    this.init(address);
  }

  init(address) {
    if (address.includes("/")) {
      const [ip, mask] = address.split("/");
      this.ip = ip;
      this.mask = +mask;
      this.subnet = `/${mask}`;
    }
  }

  parse() {}

  binaryZeroPad() {
    return this.ip
      .split(".")
      .map((item) => {
        return Number(item).toString(2).padStart(8, "0");
      })
      .join("");
  }

  toString() {}
}

const ipv4 = new Address4("192.168.192.0/24");

console.log(ipv4.binaryZeroPad());


// var ip = new Uint8Array(4)
// var ip = new Uint8Array([192,168,0,0])

