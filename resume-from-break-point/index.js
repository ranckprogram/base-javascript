const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();

const upload = multer({ dest: "upload_tmp/" });

app.use(express.static(path.resolve(__dirname, "./public") ));


app.post("/upload", upload.any(), function (req, res) {
  var des_file = path.resolve(__dirname, "public") + req.files[0].originalname;

  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.files[0].originalname,
        };
        console.log(response);
        res.end(JSON.stringify(response));
      }
    });
  });
});


app.listen(3000, () => console.log("ok"))