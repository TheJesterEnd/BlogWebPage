const cardBox = document.querySelector(".card-box");
const buttons = document.querySelector(".buttons");
let postData;
let selectedCategories = [];
async function fetchCategories() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/categories/"
    );
    if (!response.ok) throw new Error("failed to fetch categories");
    const data = await response.json();
    for (let i = 0; i < data.length - 2; i++) {
      buttons.innerHTML += `
      <div class="button-container" style="color:${data[i].text_color}">
         <div class="button-background" style="background:${data[i].background_color}"></div>
         <button class="my-button category-button">${data[i].title}</button>
      </div>
      `;
    }
    buttons.addEventListener("click", (event) => {
      event.preventDefault();
      const button = event.target;
      if (event.target.classList.contains("category-button")) {
        button.classList.toggle("selected");
      }
      if (button.classList.contains("selected")) {
        let objButton = data.find((btn) => btn.title === button.textContent);
        selectedCategories.push(objButton);
      } else {
        const index = selectedCategories.findIndex(
          (btn) => btn.title === button.textContent
        );
        if (index !== -1) {
          selectedCategories.splice(index, 1);
        }
      }

      let filtered = postData.filter((card) => {
        let some = selectedCategories.some((item) => {
          let rame = card.categories.map((element) => {
            return element.title;
          });
          return rame.includes(item.title);
        });
        return some;
      });
      cardBox.innerHTML = "";
      if (filtered.length === 0) {
        loopPosts(postData);
      }
      loopPosts(filtered);
    });
  } catch (error) {
    console.log(error.message);
  }
}

fetchCategories();
async function fetchPosts() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/blogs/"
    );
    if (!response.ok) throw new Error("failed to fetch data");
    postData = await response.json();
    loopPosts(postData);
  } catch (error) {
    // console.log(error.message);
  }
}
fetchPosts();
function loopPosts(data) {
  for (let i = 0; i < data.length; i++) {
    cardBox.innerHTML += `
      <div class="card">
      <img
        class="mobile"
        src="${data[i].image}"
        alt="mobile"
      />
      <p class="name">${data[i].author}</p>
      <p class="date">${data[i].publish_date}</p>
      <h1>${data[i].title}</h1>
      <div class="card-buttons">
        ${data[i].categories
          .map((category) => {
            return `<div class="button-container" style="color:${category.text_color}">
            <div class="button-background" style="background:${category.background_color}"></div>
            <button class="common-button my-button category-button">${category.title}</button>
           </div>
          `;
          })
          .join("")}
      </div>
      <h2 class="text">${data[i].description.slice(0, 100) + "..."}</h2>
      <div class="last-part">
        <button class="full-text">სრულად ნახვა</button>
        <img class="arrow" src="./images/Arrow.png" alt="arrow" />
      </div>
    </div>`;
  }
}
