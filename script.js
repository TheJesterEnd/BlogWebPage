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
            .map(
              (category) =>
                `<button class="common-button" style="color:${category.text_color}; background:${category.background_color}">${category.title}</button>`
            )
            .join("")}
        </div>
        <h2 class="text">${data[i].description.slice(0, 100)}</h2>
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
