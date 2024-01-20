const dropArea = document.querySelector("#drop-area");
const fileBox = document.querySelector(".file-box");
const inputFile = document.querySelector("#input-file");
const imgUploadContainer = document.querySelector(".img-upload-container");
const fileNameP = document.querySelector("#file-name_p");
const remove = document.querySelector("#remove");

inputFile.addEventListener("change", (event) => {
  fileNameP.textContent = event.target.files[0].name;
  dropFile();
});

["drag", "dragenter", "dragover", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => event.preventDefault());
});
dropArea.addEventListener("drop", (event) => {
  fileNameP.textContent = event.dataTransfer.files[0].name;
  dropFile();
});

remove.addEventListener("click", removeFile);

function dropFile() {
  fileBox.style.display = "none";
  imgUploadContainer.style.display = "flex";
}

function removeFile() {
  imgUploadContainer.style.display = "none";
  fileBox.style.display = "flex";
}

// const dateInput = document.querySelector("#date-input");
// dateInput.addEventListener("change", () => {
//   let date = new Date();
//   let newData = new Date(dateInput.value);
//   console.log(date > newData);
// });
