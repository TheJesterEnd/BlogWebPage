const dropArea = document.querySelector("#drop-area");
const fileBox = document.querySelector(".file-box");
const inputFile = document.querySelector("#input-file");
const imgUploadContainer = document.querySelector(".img-upload-container");
const fileNameP = document.querySelector("#file-name_p");
const remove = document.querySelector("#remove");
const titleInput = document.querySelector("#title-input");
const titleInputPara = document.querySelector("#title-input_para");
const descriptionInput = document.querySelector("#description-input");
const descriptionInputPara = document.querySelector("#description-input_para");
const dateInput = document.querySelector("#date-input");
const dropDownMenuContent = document.querySelector(".drop-down_menu");
const categoryDiv = document.querySelector(".category-div");
const h4 = document.querySelector("h4");

let imgUrl;
let fileName;
let storedCategoriesData;
// Load data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedImgUrl = localStorage.getItem("imgUrl");
  const storedFileName = localStorage.getItem("fileName");

  if (storedImgUrl && storedFileName) {
    imgUploadContainer.style.display = "flex";
    fileBox.style.display = "none";
    fileNameP.textContent = storedFileName;
    imgUrl = storedImgUrl;
  } else {
    fileBox.style.display = "flex";
    imgUploadContainer.style.display = "none";
  }
  const storedAuthorValue = localStorage.getItem("authorValue");
  if (storedAuthorValue) {
    authorInput.defaultValue = storedAuthorValue;
    authorValidation();
    authorValidationFinal();
  }
  const storedTitleValue = localStorage.getItem("titleValue");
  if (storedTitleValue) {
    titleInput.defaultValue = storedTitleValue;
    titleValidation(titleInput, titleInputPara);
    titleValidationFinal(titleInput, titleInputPara);
  }
  const storedDescriptionValue = localStorage.getItem("descriptionValue");
  if (storedDescriptionValue) {
    descriptionInput.defaultValue = storedDescriptionValue;
    titleValidation(descriptionInput, descriptionInputPara);
    titleValidationFinal(descriptionInput, descriptionInputPara);
  }
  const storedDateValue = localStorage.getItem("dateValue");
  if (storedAuthorValue) {
    dateInput.defaultValue = storedDateValue;
    dateInputValidation();
  }
  const storedEmailValue = localStorage.getItem("emailValue");
  if (storedEmailValue) {
    emailInput.defaultValue = storedEmailValue;
    emailValidation();
  }
  storedCategoriesData = JSON.parse(localStorage.getItem("categoriesData"));
  if (storedCategoriesData && storedCategoriesData.length > 0) {
    for (let i = 0; i < storedCategoriesData.length; i++) {
      const button = document.createElement("div");
      button.className = "button-container";
      button.style.color = "white";
      button.innerHTML += `
          <div class="button-background" style="background:${storedCategoriesData[i].background_color};opacity:1"></div>
          <button class="my-button category-button">${storedCategoriesData[i].title}</button>
        `;
      const closeButtonSpan = document.createElement("span");
      closeButtonSpan.textContent = "X";
      closeButtonSpan.className = "close-button";
      button.lastElementChild.appendChild(closeButtonSpan);
      categoryDiv.appendChild(button);
      button.lastElementChild.addEventListener("click", (event) => {
        event.preventDefault();
      });
      if (categoryDiv.children.length > 2) {
        h4.style.display = "none";
      }
      closeButtonSpan.addEventListener("click", (event) => {
        for (let j = 0; j < dropDownMenuContent.children.length; j++) {
          if (
            event.target.previousSibling.textContent.trim() ===
            dropDownMenuContent.children[j].textContent.trim()
          ) {
            const obj = storedCategoriesData.find(
              (categoryObj) =>
                categoryObj.title ===
                event.target.previousSibling.textContent.trim()
            );
            dropDownMenuContent.children[j].firstElementChild.style.opacity =
              "0.08";
            dropDownMenuContent.children[j].style.color = obj.text_color;
          }
        }
        categoryDiv.removeChild(button);
        const indexToRemove = storedCategoriesData.findIndex((item) => {
          return item.title === event.target.previousSibling.textContent;
        });
        if (indexToRemove !== -1) {
          storedCategoriesData.splice(indexToRemove, 1);
          localStorage.setItem(
            "categoriesData",
            JSON.stringify(storedCategoriesData)
          );
        }
        if (categoryDiv.children.length === 2) {
          h4.style.display = "block";
        }
      });
    }
  }
});

inputFile.addEventListener("change", (event) => {
  const selectedFiles = event.target.files;
  if (selectedFiles.length > 0) {
    fileName = selectedFiles[0].name;
    fileNameP.textContent = fileName;
    imgUrl = URL.createObjectURL(selectedFiles[0]);
    dropFile();
  }
});

["drag", "dragenter", "dragover", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => event.preventDefault());
});

dropArea.addEventListener("drop", (event) => {
  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length > 0) {
    fileName = droppedFiles[0].name;
    fileNameP.textContent = fileName;
    imgUrl = URL.createObjectURL(droppedFiles[0]);
    dropFile();
  }
});

remove.addEventListener("click", removeFile);

function dropFile() {
  fileBox.style.display = "none";
  imgUploadContainer.style.display = "flex";
  localStorage.setItem("imgUrl", imgUrl);
  localStorage.setItem("fileName", fileName);
}

function removeFile() {
  imgUploadContainer.style.display = "none";
  fileBox.style.display = "flex";
  localStorage.removeItem("imgUrl");
  localStorage.removeItem("fileName");
}

//-------------------------------------------------This is where the validation of the author's input begins
const authorInput = document.querySelector("#author-input");
const fourSymbol = document.querySelector("#four-symbol");
const twoWord = document.querySelector("#two-word");
const georgian = document.querySelector("#georgian");

authorInput.addEventListener("input", () => {
  authorValidation();
  localStorage.setItem("authorValue", authorInput.value);
});
authorInput.addEventListener("change", authorValidationFinal);

const georgianRegex = /[\u10A0-\u10EA\u10FC\u10EE\u10EB]/;

let isValidLength = false;
let isValidGeorgian = false;
let isTwoWord = false;
let authorValue;
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
    isTwoWord = true;
  } else {
    twoWord.style.color = "#85858D";
    isTwoWord = false;
  }
}
function authorValidationFinal() {
  if (isValidLength && isValidGeorgian && isTwoWord) {
    authorValue = authorInput.value.trim();
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
//----------------------------------------------------------------This is where title validation begins--------------------------------------

let titleValue;
titleInput.addEventListener("input", () => {
  titleValidation(titleInput, titleInputPara);
  localStorage.setItem("titleValue", titleInput.value);
});
titleInput.addEventListener("change", () => {
  titleValidationFinal(titleInput, titleInputPara);
  titleValue = titleInput.value.trim();
});

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
//-----------------------------------------------------------Here I just added an event listener to the description input-------------------
let descriptionValue;
descriptionInput.addEventListener("input", () => {
  titleValidation(descriptionInput, descriptionInputPara);
  localStorage.setItem("descriptionValue", descriptionInput.value);
});
descriptionInput.addEventListener("change", () => {
  titleValidationFinal(descriptionInput, descriptionInputPara);
  descriptionValue = descriptionInput.value.trim();
});
//----------------------------------------------------------------This is where email validation begins--------------------------------------

const emailInput = document.querySelector("#email-input");
const emailInputPara = document.querySelector("#email-span");
const emailPattern = /^[\w.-]+@redberry\.ge$/;
let emailValue;
emailInput.addEventListener("change", () => {
  emailValidation();
  localStorage.setItem("emailValue", emailValue);
});
function emailValidation() {
  if (emailPattern.test(emailInput.value)) {
    emailValue = emailInput.value;
    emailInput.style.border = "1px solid #14D81C";
    emailInputPara.style.display = "none";
  } else {
    emailInputPara.style.display = "flex";
    emailInput.style.border = "1px solid #EA1919";
  }
}
//-----------------------
const arrowIcon = document.querySelector("#arrow-icon");
const dropDown = document.querySelector(".drop-down_menu");
arrowIcon.addEventListener("click", dropDownMenu);
let isClicked = false;

function dropDownMenu() {
  if (!isClicked) {
    dropDown.style.display = "flex";
    arrowIcon.style.transform = "rotate(180deg)";
    isClicked = true;
  } else {
    dropDown.style.display = "none";
    arrowIcon.style.transform = "rotate(360deg)";
    isClicked = false;
  }
}

async function getCategories() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/categories/"
    );
    if (!response.ok) throw new Error("failed to fetch data");
    const data = await response.json();
    for (let i = 0; i < data.length - 2; i++) {
      const button = document.createElement("div");
      button.className = "button-container";
      button.style.color = data[i].text_color;
      button.innerHTML += `
          <div class="button-background" style="background:${data[i].background_color}"></div>
          <button class="my-button category-button">${data[i].title}</button>
        `;
      dropDownMenuContent.appendChild(button);

      if (storedCategoriesData.find((obj) => obj.title === data[i].title)) {
        button.firstElementChild.style.opacity = "1";
        button.style.color = "white";
        // button.addEventListener("click", (event) => {
        //   event.preventDefault();
        //   console.log("in");
        // });
      }
      let clicked = storedCategoriesData.find(
        (obj) => obj.title === data[i].title
      )
        ? true
        : false;
      console.log(clicked);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        button.firstElementChild.style.opacity = "1";
        button.style.color = "white";
        h4.style.display = "none";

        const duplicateButton = event.target.parentElement.cloneNode(true);
        // Create the X icon
        const closeButton = document.createElement("span");
        closeButton.textContent = "X";
        closeButton.className = "close-button";

        // Append the "X" to the cloned button
        duplicateButton.lastElementChild.appendChild(closeButton);

        // Append the cloned button to the categoryDiv
        if (!clicked) {
          console.log("lu");
          categoryDiv.appendChild(duplicateButton);
          storedCategoriesData.push(data[i]);
          localStorage.setItem(
            "categoriesData",
            JSON.stringify(storedCategoriesData)
          );
        }
        categoryDiv.addEventListener("click", (event) =>
          event.preventDefault()
        );
        clicked = true;
        duplicateButton.removeEventListener("click", getCategories);

        // Add click event listener to the X icon for removal
        closeButton.addEventListener("click", () => {
          button.firstElementChild.style.opacity = "0.08";
          button.style.color = data[i].text_color;
          clicked = false;
          categoryDiv.removeChild(duplicateButton);

          storedCategoriesData.splice(storedCategoriesData.indexOf(data[i]), 1);
          localStorage.setItem(
            "categoriesData",
            JSON.stringify(storedCategoriesData)
          );

          if (categoryDiv.children.length === 2) {
            h4.style.display = "block";
          }
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

getCategories();
let dateValue;
dateInput.addEventListener("change", () => {
  dateValue = dateInput.value;
  dateInputValidation();
  localStorage.setItem("dateValue", dateValue);
});
function dateInputValidation() {
  dateInput.style.border = "1px solid #14D81C";
}
//authorValue
// emailValue;
// localStorage.getItem("imgUrl")
//descriptionValue
//titleValue
//dateValue
