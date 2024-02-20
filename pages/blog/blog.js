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
const familiarBlogs = document.querySelector(".familiar-blog");
const content = document.querySelector(".content");
const scrollRight = document.querySelector("#scroll-right");
const scrollLeft = document.querySelector("#scroll-left");
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
let blogCategories;
let openedBlogData;
async function renderBlog(id) {
  const response = await fetch(
    `https://george.pythonanywhere.com/api/blogs/${id}/`
  );
  if (!response.ok) throw new Error("failed to fetch post");
  openedBlogData = await response.json();
  blogCategories = openedBlogData.categories;
  mainContainer.innerHTML += `

        <img
          class="main-photo"
          src="${openedBlogData.image}"
          alt="photo"
        />

      <p class="name-under-the-photo">${openedBlogData.author}</p>
      <p class="date-under-the-photo">
        ${openedBlogData.publish_date.slice(0, 10)} • ${openedBlogData.email}
      </p>
      <h1>${openedBlogData.title}</h1>
      <div class="card-buttons">
        ${openedBlogData.categories
          .map((cat) => {
            return `<div class="button-container" style="color:${cat.text_color}">
          <div class="button-background" style="background:${cat.background_color}"></div>
          <button class="my-button category-button">${cat.title}</button>
       </div>`;
          })
          .join("")}
      </div>
      <p class="main-text">
       ${openedBlogData.description}
      </p>
      
  `;
}
getQuerryString();
renderBlog(id);
let readyToRenderBlog;
async function fetchAllBlog() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/blogs/"
    );
    if (!response.ok) throw new Error("failed to fetch blogs");
    const data = await response.json();
    let filtered = data.filter((blog) => {
      return blog.categories.some((cat) => {
        return blogCategories.some(
          (openedCat) => openedCat.title === cat.title
        );
      });
    });
    readyToRenderBlog = filtered.filter(
      (blog) => blog.id !== openedBlogData.id
    );
    for (let i = 0; i < readyToRenderBlog.length; i++) {
      content.innerHTML += `
      <div class="card">
      <img
        class="mobile"
        src="${readyToRenderBlog[i].image}"
        alt="mobile"
      />
      <p class="name">${readyToRenderBlog[i].author}</p>
      <p class="date">${readyToRenderBlog[i].publish_date}</p>
      <h1 class="title-h1">${readyToRenderBlog[i].title}</h1>
      <div class="card-buttons">
        ${readyToRenderBlog[i].categories
          .map((category) => {
            return `<div class="button-container" style="color:${category.text_color}">
            <div class="button-background" style="background:${category.background_color}"></div>
            <button class="common-button my-button category-button">${category.title}</button>
           </div>
          `;
          })
          .join("")}
      </div>
      <h2 class="text">${
        readyToRenderBlog[i].description.slice(0, 100) + "..."
      }</h2>
      <div class="last-part">
        <a href = "../../pages/blog/blog.html?id=${
          readyToRenderBlog[i].id
        }"><button class="full-text">სრულად ნახვა</button><a/>
        <img class="arrow" src="../../images/Arrow.png" alt="arrow" />
      </div>
    </div>
    `;
    }
    let scrollAmount = Math.ceil(readyToRenderBlog.length / 3) - 1;
    let page = 0;
    if (scrollAmount === 0) {
      scrollRight.firstElementChild.style.fill = "#E4E3EB";
    } else {
      scrollRight.style.cursor = "pointer";
    }
    scrollRight.addEventListener("click", () => {
      if (scrollAmount === 0) {
        return;
      }
      page++;
      if (scrollAmount === page) {
        scrollLeft.firstElementChild.style.fill = "#5D37F3";
        scrollLeft.style.cursor = "pointer";
        scrollRight.firstElementChild.style.fill = "#E4E3EB";
        scrollRight.style.cursor = "default";
      } else {
        scrollLeft.firstElementChild.style.fill = "#E4E3EB";
        scrollLeft.style.cursor = "default";
      }
      content.style.transform = `translateX(${page * -1340}px)`;
      scrollAmount--;
    });
    scrollLeft.addEventListener("click", () => {
      if (page === 0) {
        console.log(scrollAmount);
        return;
      }
      page--;
      if (scrollAmount === page) {
        scrollRight.firstElementChild.style.fill = "#5D37F3";
        scrollRight.style.cursor = "pointer";
        scrollLeft.firstElementChild.style.fill = "#E4E3EB";
        scrollLeft.style.cursor = "default";
      } else {
        scrollRight.firstElementChild.style.fill = "#E4E3EB";
        scrollRight.style.cursor = "default";
      }
      content.style.transform = `translateX(${page * -1340}px)`;
      scrollAmount++;
    });
  } catch (error) {
    console.log(error);
  }
}
fetchAllBlog();
// console.log(Array.from(familiarBlogs));
// async function scrollFamiliarBlogs() {
//   await fetchAllBlog();
//   console.log(scrollAmount);
// }
