const https = require("https");
const fs = require("fs");
const path = require("path");

// function composite() {
//   exec(
//     "copy /b H:self-study下载视频流download*.ts H:self-study下载视频流download冷血追击.ts",
//     (error, stdout, stderr) => {
//       if (error) {
//         console.error(`执行的错误: ${error}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//       console.error(`stderr: ${stderr}`);
//     }
//   );
// }

function download(url) {
  const baseUrl = `https://tehlsvodhls02.vhallyun.com/vhallyun/vhallcoop/a0fb3172956d0467dc6adc07adfc59ae/ef1a9083/a0fb3172956d0467dc6adc07adfc59ae_480p/`;
  const downloadUrl = __dirname + "/download/" + url;
  https.get(baseUrl + url, (res) => {
    res.pipe(fs.createWriteStream(downloadUrl));
   
  })
}

// index_000000
// index_000018.ts

const taskList = Array.from({length: 1000}, (item,index) => {

  return `index_${String(index).padStart(6,0)}`
}).forEach(item => {
  download(item)
})

console.log(taskList)