let id;
const mainContainer = document.querySelector(".main-container");
const loginModal = document.querySelector(".login-container");
const enterButton = document.querySelector(".enter");
const backImg = document.querySelector(".back-img");
const emailInput = document.querySelector("#email-input");
const submit = document.querySelector("#submit");
const closeX = document.querySelector("#close-icon");
const errorSpan = document.querySelector("#error-span");
const login = document.querySelector(".login");
const succeedLogin = document.querySelector(".succeed");
const X = document.querySelector(".x");
const succeed = document.querySelector(".good");
async function getQuerryString() {
  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
}
if (localStorage.getItem("token")) {
  enterButton.textContent = "დაამატეთ ბლოგი";
}
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("back-img")) {
    location.href = "../../index.html";
  }
});

enterButton.addEventListener("click", () => {
  if (enterButton.textContent === "დაამატეთ ბლოგი") {
    location.href = "../../pages/addNewBlog/addNewBlog.html";
  } else {
    loginModal.style.display = "flex";
    login.style.display = "block";
  }
});
closeX.addEventListener("click", () => {
  loginModal.style.display = "none";
  login.style.display = "none";
});
submit.addEventListener("click", (event) => {
  event.preventDefault();
  emailValidation();
  if (emailValue !== undefined) {
    fetchData();
  }
});
const emailPattern = /^[\w.-]+@redberry\.ge$/;

function emailValidation() {
  if (emailPattern.test(emailInput.value)) {
    emailValue = emailInput.value;
  } else {
    emailValue = undefined;
    errorSpan.style.display = "flex";
  }
}
async function fetchData() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/login/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      }
    );
    console.log(response.status);
    if (response.status === 500) throw new Error("ელ-ფოსტა არ მოიძებნა");
    const data = await response.json();
    console.log(data);
    token = data.token;
    localStorage.setItem("token", token);
    login.style.display = "none";
    succeedLogin.style.display = "block";
  } catch (error) {
    console.log(error.message);
    errorSpan.lastChild.textContent = error.message;
    errorSpan.style.display = "flex";
  }
}
X.addEventListener("click", () => {
  loginModal.style.display = "none";
  changeButtonText();
});
succeed.addEventListener("click", (event) => {
  event.preventDefault();
  loginModal.style.display = "none";
  changeButtonText();
});
function changeButtonText() {
  enterButton.textContent = "დაამატეთ ბლოგი";
}
async function renderBlog(id) {
  const response = await fetch(
    `https://george.pythonanywhere.com/api/blogs/${id}/`
  );
  if (!response.ok) throw new Error("failed to fetch post");
  const data = await response.json();
  mainContainer.innerHTML += `

        <img
          class="main-photo"
          src="${data.image}"
          alt="photo"
        />

      <p class="name-under-the-photo">${data.author}</p>
      <p class="date-under-the-photo">
        ${data.publish_date.slice(0, 10)} • ${data.email}
      </p>
      <h1>${data.title}</h1>
      <div class="card-buttons">
        ${data.categories
          .map((cat) => {
            return `<div class="button-container" style="color:${cat.text_color}">
          <div class="button-background" style="background:${cat.background_color}"></div>
          <button class="my-button category-button">${cat.title}</button>
       </div>`;
          })
          .join("")}
      </div>
      <p class="main-text">
       ${data.description}
      </p>
      
  `;
}
getQuerryString();
renderBlog(id);
