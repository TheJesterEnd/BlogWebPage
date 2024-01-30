const dropArea = document.querySelector("#drop-area");
const fileBox = document.querySelector(".file-box");
const inputFile = document.querySelector("#input-file");
const imgUploadContainer = document.querySelector(".img-upload-container");
const fileNameP = document.querySelector("#file-name_p");
const remove = document.querySelector("#remove");
//-----------------------------------------------------------This is where the logic of drag and drop begins
let imgUrl;
inputFile.addEventListener("change", (event) => {
  fileNameP.textContent = event.target.files[0].name;
  imgUrl = URL.createObjectURL(event.target.files[0]);
  dropFile();
});

["drag", "dragenter", "dragover", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => event.preventDefault());
});
dropArea.addEventListener("drop", (event) => {
  fileNameP.textContent = event.dataTransfer.files[0].name;
  imgUrl = URL.createObjectURL(event.dataTransfer.files[0]);
  dropFile();
});

remove.addEventListener("click", removeFile);

function dropFile() {
  fileBox.style.display = "none";
  imgUploadContainer.style.display = "flex";
  localStorage.setItem("imgUrl", imgUrl);
}

function removeFile() {
  imgUploadContainer.style.display = "none";
  fileBox.style.display = "flex";
  localStorage.removeItem("imgUrl");
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
//----------------------------------------------------------------This is where title validation begins
const titleInput = document.querySelector("#title-input");
const titleInputPara = document.querySelector("#title-input_para");
let titleValue;
titleInput.addEventListener("input", () =>
  titleValidation(titleInput, titleInputPara)
);
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
//-----------------------------------------------------------Here I just added an event listener to the description input
const descriptionInput = document.querySelector("#description-input");
const descriptionInputPara = document.querySelector("#description-input_para");
let descriptionValue;
descriptionInput.addEventListener("input", () =>
  titleValidation(descriptionInput, descriptionInputPara)
);
descriptionInput.addEventListener("change", () => {
  titleValidationFinal(descriptionInput, descriptionInputPara);
  descriptionValue = descriptionInput.value.trim();
});

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
const emailInput = document.querySelector("#email-input");
const emailInputPara = document.querySelector("#email-span");
const emailPattern = /^[\w.-]+@redberry\.ge$/;
let emailValue;
emailInput.addEventListener("change", emailValidation);
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
const dropDownMenuContent = document.querySelector(".drop-down_menu");
const categoryDiv = document.querySelector(".category-div");
const h4 = document.querySelector("h4");
const categoriesData = [];
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
      let clicked = false;

      button.addEventListener("click", (event) => {
        event.preventDefault();
        button.firstElementChild.style.opacity = "1";
        button.style.color = "white";
        h4.style.display = "none";

        const duplicateButton = event.target.parentElement.cloneNode(true);
        // duplicateButton.className = "duplicate-button";
        // Create the X icon
        const closeButton = document.createElement("span");
        closeButton.textContent = "X";
        closeButton.className = "close-button";

        // Append the "X" to the cloned button
        duplicateButton.lastElementChild.appendChild(closeButton);

        // Append the cloned button to the categoryDiv
        if (!clicked) {
          categoryDiv.appendChild(duplicateButton);
          categoriesData.push(data[i]);
          console.log(categoriesData);
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
          if (categoriesData.indexOf(data[i]) !== -1) {
            categoriesData.splice(categoriesData.indexOf(data[i]), 1);
          }
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
const dateInput = document.querySelector("#date-input");
let dateValue;
dateInput.addEventListener("change", () => {
  dateValue = dateInput.value;
});

//authorValue
// emailValue;
// localStorage.getItem("imgUrl")
//descriptionValue
//titleValue
//dateValue
