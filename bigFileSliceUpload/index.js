const fileInput = document.querySelector("#file");

class SliceUploadSchedule {
  constructor() {
    this.taskList = [];
    this.sliceSize = 1000;
    this.concurrentCount = 3;
  }

  loadFile(e) {
    const { files, value } = e.target;
    const filePath = value;

    for (let file of files) {
      this.addTask(file);
    }
  }

  addTask(file) {}

  saveTask() {}
}

function selectFile(e) {
  console.log(e);
  const { files, value } = e.target;
  const filePath = value;

  console.log(files, value);
  for (let file of files) {
    spliteFile(file);
  }
}

function spliteFile(file, sliceSize = 1000) {
  // const reader = new FileReader
  const size = file.size;
  const result = [];

  file.slice();
  size: 1406163;
}

fileInput.addEventListener("change", selectFile);

function send() {
  const xhr = new XMLHttpRequest();
  const method = "POST";
  const url = "/upload";
  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}

const sliceFile = new SliceUploadSchedule();
