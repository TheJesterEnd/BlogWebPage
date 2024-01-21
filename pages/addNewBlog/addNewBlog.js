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
const authorInput = document.querySelector("#author-input");
const fourSymbol = document.querySelector("#four-symbol");
const twoWord = document.querySelector("#two-word");
const georgian = document.querySelector("#georgian");

authorInput.addEventListener("input", authorValidation);
authorInput.addEventListener("change", authorValidationFinal);

const georgianRegex = /[\u10A0-\u10EA\u10FC\u10EE\u10EB]/;
let isValidLength = false;
let isValidGeorgian = false;
function authorValidation() {
  if (authorInput.value.trim().length > 3) {
    fourSymbol.style.color = "#14D81C";
    isValidLength = true;
  } else {
    fourSymbol.style.color = "#85858D";
    isValidLength = false;
  }
  if (georgianRegex.test(authorInput.value)) {
    georgian.style.color = "#14D81C";
    isValidGeorgian = true;
  } else {
    georgian.style.color = "#85858D";
    isValidGeorgian = false;
  }
  if (authorInput.value.trimStart().includes(" ")) {
    twoWord.style.color = "#14D81C";
  } else {
    twoWord.style.color = "#85858D";
    isTwoWord = false;
  }
}
function authorValidationFinal() {
  if (isValidLength && isValidGeorgian) {
    authorInput.style.border = "1px solid #14D81C";
    [twoWord, georgian, fourSymbol].forEach(
      (li) => (li.style.color = "#85858D")
    );
  } else {
    authorInput.style.border = "1px solid #EA1919";
    authorInput.style.background = "#FAF2F3";
    if (isValidLength) {
      fourSymbol.style.color = "#85858D";
    } else {
      fourSymbol.style.color = "red";
    }
    if (isValidGeorgian) {
      georgian.style.color = "#85858D";
    } else {
      georgian.style.color = "red";
    }
    if (authorInput.value.trim().includes(" ")) {
      twoWord.style.color = "#85858D";
    } else {
      twoWord.style.color = "red";
    }
  }
}
// const dateInput = document.querySelector("#date-input");
// dateInput.addEventListener("change", () => {
//   let date = new Date();
//   let newData = new Date(dateInput.value);
//   console.log(date > newData);
// });
