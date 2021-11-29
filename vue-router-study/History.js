class History {}

const obj = Object.create(null);

let names = obj.names || (obj.names = []);

names.push(1)

console.log(names)
console.log(obj)

// const assetFunction = {
//   asset: value => typeof value === "function",
//   message: "函数"
// }

// function assetFN (condition, message) {
//   if(condition) {
//     throw new Error(`[vv] ${message}`)
//   }
// }

// const {asset,message} = assetFunction
// assetFN(asset(() =>{}), message)
