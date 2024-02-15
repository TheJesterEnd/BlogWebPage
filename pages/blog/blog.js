let id;
const main = document.querySelector("main");
async function getQuerryString() {
  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
}

async function renderBlog(id) {
  const response = await fetch(
    `https://george.pythonanywhere.com/api/blogs/${id}/`
  );
  if (!response.ok) throw new Error("failed to fetch post");
  const data = await response.json();
  main.innerHTML += `
  <div class="main-fist-part">
        <button class="first-arrow">
          <img src="/images/Arrow2.png" alt="arrow" />
        </button>
        <img
          class="main-photo"
          src="${data.image}"
          alt="photo"
        />
      </div>

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
