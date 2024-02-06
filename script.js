const cardBox = document.querySelector(".card-box");
async function fetchPosts() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/blogs/"
    );
    if (!response.ok) throw new Error("failed to fetch data");
    const data = await response.json();
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
  } catch (error) {
    // console.log(error.message);
  }
}
fetchPosts();
