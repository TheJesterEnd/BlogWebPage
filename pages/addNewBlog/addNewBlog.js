const dropArea = document.querySelector("#drop-area");
const fileBox = document.querySelector(".file-box");
const inputFile = document.querySelector("#input-file");
const imgUploadContainer = document.querySelector(".img-upload-container");
const fileNameP = document.querySelector("#file-name_p");
const remove = document.querySelector("#remove");
//-----------------------------------------------------------This is where the logic of drag and drop begins
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
//-------------------------------------------------This is where the validation of the author's input begins
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
  }
}
function authorValidationFinal() {
  if (isValidLength && isValidGeorgian) {
    authorInput.style.border = "1px solid #14D81C";
    authorInput.style.background = "#F8FFF8";
    [twoWord, georgian, fourSymbol].forEach(
      (li) => (li.style.color = "#85858D")
    );
  } else {
    authorInput.style.border = "1px solid #EA1919";
    authorInput.style.background = "#FAF2F3";
    if (isValidLength) {
      fourSymbol.style.color = "#85858D";
    } else {
      fourSymbol.style.color = "#EA1919";
    }
    if (isValidGeorgian) {
      georgian.style.color = "#85858D";
    } else {
      georgian.style.color = "#EA1919";
    }
    if (authorInput.value.trim().includes(" ")) {
      twoWord.style.color = "#85858D";
    } else {
      twoWord.style.color = "#EA1919";
    }
  }
}
//----------------------------------------------------------------This is where title validation begins
const titleInput = document.querySelector("#title-input");
const titleInputPara = document.querySelector("#title-input_para");
titleInput.addEventListener("input", () =>
  titleValidation(titleInput, titleInputPara)
);
titleInput.addEventListener("change", () =>
  titleValidationFinal(titleInput, titleInputPara)
);

function titleValidation(input, inputPara) {
  if (input.value.trim().length > 1) {
    inputPara.style.color = "#14D81C";
  } else {
    inputPara.style.color = "#85858D";
  }
}

function titleValidationFinal(input, inputPara) {
  if (input.value.trim().length > 1) {
    inputPara.style.color = "#85858D";
    input.style.border = "1px solid #14D81C";
  } else {
    inputPara.style.color = "#EA1919";
    input.style.border = "1px solid #EA1919";
  }
}
//-----------------------------------------------------------Here I just added an event listener to the description input
const descriptionInput = document.querySelector("#description-input");
const descriptionInputPara = document.querySelector("#description-input_para");

descriptionInput.addEventListener("input", () =>
  titleValidation(descriptionInput, descriptionInputPara)
);
descriptionInput.addEventListener("change", () =>
  titleValidationFinal(descriptionInput, descriptionInputPara)
);

const arrowIcon = document.querySelector("#arrow-icon");
const dropDown = document.querySelector(".drop-down_menu");
arrowIcon.addEventListener("click", dropDownMenu);
let isClicked = false;

function dropDownMenu() {
  if (!isClicked) {
    dropDown.style.display = "flex";
    isClicked = true;
  } else {
    dropDown.style.display = "none";
    isClicked = false;
  }
}
const emailInput = document.querySelector("#email-input");
const emailInputPara = document.querySelector("#email-span");
const emailPattern = /^[\w.-]+@redberry\.ge$/;

emailInput.addEventListener("change", emailValidation);
function emailValidation() {
  if (emailPattern.test(emailInput.value)) {
    emailInput.style.border = "1px solid #14D81C";
    emailInputPara.style.display = "none";
  } else {
    emailInputPara.style.display = "flex";
    emailInput.style.border = "1px solid #EA1919";
  }
}
// const dateInput = document.querySelector("#date-input");
// dateInput.addEventListener("change", () => {
//   let date = new Date();
//   let newData = new Date(dateInput.value);
//   console.log(date);
//   console.log(newData);
//   console.log(date > newData);
// });
