const dropArea = document.querySelector("#drop-area");
const form = document.querySelector("form");
const fileBox = document.querySelector(".file-box");
const inputFile = document.querySelector("#input-file");
const imgUploadContainer = document.querySelector(".img-upload-container");
const backButton = document.querySelector("#img-arrow");
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
const submit = document.querySelector("#submit");
const backToMainModal = document.querySelector(".login-container");
const mainModal = document.querySelector(".main");
const backToMain = document.querySelector("#main-page");
const X = document.querySelector("#close-icon");
if (!localStorage.getItem("token")) {
  location.href = "../../index.html";
}
let clicked = {};
let imageString;
let img;
let fileName;
let storedCategoriesData;
// Load data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedImgUrl = localStorage.getItem("imgUrl");
  const storedFileName = localStorage.getItem("fileName");
  if (storedImgUrl && storedFileName) {
    submitButton();

    imgUploadContainer.style.display = "flex";
    fileBox.style.display = "none";
    fileNameP.textContent = storedFileName;
    imageString = storedImgUrl;
  } else {
    fileBox.style.display = "flex";
    imgUploadContainer.style.display = "none";
    submitButton();
  }
  const storedAuthorValue = localStorage.getItem("authorValue");
  if (storedAuthorValue) {
    authorInput.defaultValue = storedAuthorValue;
    authorValidation();
    authorValidationFinal();
    submitButton();
  }
  const storedTitleValue = localStorage.getItem("titleValue");
  if (storedTitleValue) {
    titleInput.defaultValue = storedTitleValue;
    titleValidation();
    titleValidationFinal();
    submitButton();
  }
  const storedDescriptionValue = localStorage.getItem("descriptionValue");
  if (storedDescriptionValue) {
    descriptionInput.defaultValue = storedDescriptionValue;
    descriptionValidation();
    descriptionValidationFinal();
    submitButton();
  }
  const storedDateValue = localStorage.getItem("dateValue");
  if (storedAuthorValue) {
    dateInput.defaultValue = storedDateValue;
    dateInputValidation();
    submitButton();
  }
  const storedEmailValue = localStorage.getItem("emailValue");
  if (storedEmailValue) {
    emailInput.defaultValue = storedEmailValue;
    emailValidation();
    submitButton();
  }
  storedCategoriesData =
    JSON.parse(localStorage.getItem("categoriesData")) || [];
  if (storedCategoriesData && storedCategoriesData.length > 0) {
    submitButton();

    for (let i = 0; i < storedCategoriesData.length; i++) {
      clicked[storedCategoriesData[i].title] = true;
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
        clicked[event.target.previousSibling.textContent] = false;
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
        submitButton();
      });
    }
  }
  getCategories();

  submit.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
backButton.addEventListener("click", () => {
  location.href = "../../index.html";
});
inputFile.addEventListener("change", (event) => {
  const selectedFiles = event.target.files;
  if (selectedFiles.length > 0) {
    fileName = selectedFiles[0].name;
    fileNameP.textContent = fileName;
    img = selectedFiles[0];
    storageImgAsString();
    submitButton();
    dropFile();
  }
});

["drag", "dragenter", "dragover", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => event.preventDefault());
});
let test;
dropArea.addEventListener("drop", (event) => {
  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length > 0) {
    fileName = droppedFiles[0].name;
    fileNameP.textContent = fileName;
    img = droppedFiles[0];
    storageImgAsString();
    submitButton();
    dropFile();
  }
});

function storageImgAsString() {
  if (img) {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      imageString = reader.result;
      localStorage.setItem("imgUrl", imageString);
      submitButton();
    };
  } else {
    const storedImgUrl = localStorage.getItem("imgUrl");
    if (storedImgUrl) {
      imageString = storedImgUrl;
    }
  }
}
remove.addEventListener("click", removeFile);

function dropFile() {
  fileBox.style.display = "none";
  imgUploadContainer.style.display = "flex";

  localStorage.setItem("fileName", fileName);
}

function removeFile() {
  imgUploadContainer.style.display = "none";
  fileBox.style.display = "flex";
  localStorage.removeItem("imgUrl");
  localStorage.removeItem("fileName");
  imageString = undefined;
  submitButton();
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
authorInput.addEventListener("change", () => {
  authorValidationFinal();
  submitButton();
});

const georgianRegex = "აბგდევზთიკლმნოპჟრსტუფ ქღყშჩცძწჭხჯჰ";

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

  let splitedValue = authorInput.value.trim().split("");
  for (let i = 0; i < splitedValue.length; i++) {
    if (georgianRegex.includes(splitedValue[i])) {
      georgian.style.color = "#14D81C";
      isValidGeorgian = true;
    } else {
      georgian.style.color = "#85858D";
      isValidGeorgian = false;
      break;
    }
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
    authorValue = undefined;
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
let descriptionValue;
let titleValue;
titleInput.addEventListener("input", () => {
  titleValidation();

  localStorage.setItem("titleValue", titleInput.value);
});
titleInput.addEventListener("change", () => {
  titleValidationFinal();
  submitButton();
});

function titleValidation() {
  if (titleInput.value.trim().length > 1) {
    titleInputPara.style.color = "#14D81C";
    titleValue = titleInput.value.trim();
  } else {
    titleValue = undefined;

    titleInputPara.style.color = "#85858D";
  }
}

function titleValidationFinal() {
  if (titleInput.value.trim().length > 1) {
    titleInputPara.style.color = "#85858D";
    titleInput.style.border = "1px solid #14D81C";
  } else {
    titleInputPara.style.color = "#EA1919";
    titleInput.style.border = "1px solid #EA1919";
  }
}
//-----------------------------------------------------------Here I just added an event listener to the description input-------------------
descriptionInput.addEventListener("input", () => {
  descriptionValidation();
  localStorage.setItem("descriptionValue", descriptionInput.value);
});
descriptionInput.addEventListener("change", () => {
  descriptionValidationFinal();
  submitButton();
});
function descriptionValidation() {
  if (descriptionInput.value.trim().length > 1) {
    descriptionInputPara.style.color = "#14D81C";
    descriptionValue = descriptionInput.value.trim();
  } else {
    descriptionValue = undefined;

    descriptionInputPara.style.color = "#85858D";
  }
}
function descriptionValidationFinal() {
  if (descriptionInput.value.trim().length > 1) {
    descriptionInputPara.style.color = "#85858D";
    descriptionInput.style.border = "1px solid #14D81C";
  } else {
    descriptionInputPara.style.color = "#EA1919";
    descriptionInput.style.border = "1px solid #EA1919";
  }
}
//----------------------------------------------------------------This is where email validation begins--------------------------------------

const emailInput = document.querySelector("#input-email");
const emailInputPara = document.querySelector("#email-span");
const emailPattern = /^[\w.-]+@redberry\.ge$/;
let emailValue;
emailInput.addEventListener("change", () => {
  emailValidation();
  localStorage.setItem("emailValue", emailValue);
  submitButton();
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
      if (!clicked[data[i].title]) {
        clicked[data[i].title] = false;
      }
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
        button.addEventListener("click", (event) => {
          event.preventDefault();
          submitButton();
        });
      }

      button.addEventListener("click", (event) => {
        event.preventDefault();
        button.firstElementChild.style.opacity = "1";
        button.style.color = "white";
        h4.style.display = "none";
        submitButton();

        const duplicateButton = event.target.parentElement.cloneNode(true);
        // Create the X icon
        const closeButton = document.createElement("span");
        closeButton.textContent = "X";
        closeButton.className = "close-button";

        // Append the "X" to the cloned button
        duplicateButton.lastElementChild.appendChild(closeButton);

        // Append the cloned button to the categoryDiv
        if (clicked[event.target.textContent.trim()] === false) {
          categoryDiv.appendChild(duplicateButton);
          storedCategoriesData.push(data[i]);
          localStorage.setItem(
            "categoriesData",
            JSON.stringify(storedCategoriesData)
          );
        }
        categoryDiv.addEventListener("click", (event) => {
          event.preventDefault();
          submitButton();
        });
        clicked[event.target.textContent.trim()] = true;
        duplicateButton.removeEventListener("click", getCategories);

        // Add click event listener to the X icon for removal
        closeButton.addEventListener("click", () => {
          submitButton();
          button.firstElementChild.style.opacity = "0.08";
          button.style.color = data[i].text_color;
          clicked[event.target.textContent.trim()] = false;
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
    console.log(error);
  }
}

let dateValue;
dateInput.addEventListener("change", () => {
  dateInputValidation();
  localStorage.setItem("dateValue", dateValue);
  submitButton();
});
function dateInputValidation() {
  if (dateInput.value != "") {
    dateInput.style.border = "1px solid #14D81C";
    dateValue = dateInput.value;
  } else {
    dateInput.style.border = "1px solid #EA1919";
  }
}
//--------------------------------------------------//
let readyToSendBack;
let objectToSend;
storedCategoriesData = JSON.parse(localStorage.getItem("categoriesData")) || [];
let formData;

function submitButton() {
  if (
    authorValue != "" &&
    authorValue != undefined &&
    emailValue != "" &&
    emailValue != undefined &&
    descriptionValue != "" &&
    descriptionValue != undefined &&
    storedCategoriesData != undefined &&
    storedCategoriesData.length > 0 &&
    imageString != undefined &&
    titleValue != "" &&
    titleValue != undefined
  ) {
    objectToSend = {
      categories: storedCategoriesData,
      title: titleValue,
      publish_date: dateValue,
      description: descriptionValue,
      image: imageString,
      email: emailValue,
      author: authorValue,
    };
    console.log(JSON.parse(JSON.stringify(objectToSend)));
    readyToSendBack = true;
    submit.style.background = "#5D37F3";
  } else {
    submit.style.background = "#E4E3EB";
    readyToSendBack = false;
  }
}
let count = 0;
async function uploadBlog() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/blogs/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(objectToSend),
      }
    );
    console.log(await response.json());
    if (!response.ok) throw new Error("failed to upload blog");
    backToMainModal.style.display = "flex";
  } catch (error) {
    console.log(error.message);
  }
}
submit.addEventListener("click", (event) => {
  count++;
  event.preventDefault();
  if (readyToSendBack && count === 1) {
    uploadBlog();
  }
});
X.addEventListener("click", (event) => {
  event.preventDefault();
  mainPageModal();
});
backToMain.addEventListener("click", (event) => {
  event.preventDefault();
  mainPageModal();
});
function mainPageModal() {
  location.href = "../../index.html";
  localStorage.removeItem("dateValue");
  localStorage.removeItem("fileName");
  localStorage.removeItem("categoriesData");
  localStorage.removeItem("imgUrl");
  localStorage.removeItem("authorValue");
  localStorage.removeItem("descriptionValue");
  localStorage.removeItem("emailValue");
  localStorage.removeItem("titleValue");
}
