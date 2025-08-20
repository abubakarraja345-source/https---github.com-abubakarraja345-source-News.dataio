const API_KEY = "NEWS_API_KEY"; 
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

async function fetchNews() {
const url = `https://newsapi.org/v2/top-headlines?apiKey=pub_92d8f9481fe04a7fbb2d5c93f9bd1c9f`;
  loadNews(url);
}


async function fetchCategory(category) {
  const url = `/api/news?category=${category}`;
  loadNews(url);
}

async function searchNews() {
  const query = searchInput.value.trim();
  if (!query) return;
  const url = `/api/news?q=${query}`;
  loadNews(url);
}

async function loadNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.results);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No news found.</p>";
    return;
  }
  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${article.image_url || 'https://via.placeholder.com/400'}" alt="News Image">
      <div class="news-content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available"}</p>
        <a href="${article.link}" target="_blank">Read More</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

fetchNews();
