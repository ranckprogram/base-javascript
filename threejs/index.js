const express = require("express");

const app = express();

app.use("/", express.static("./public"));

// app.get("/",function(req, res) {
//   res.json("1")
// })

app.listen(3001, function (e) {
  console.log(e)
  console.log("ok");
});
