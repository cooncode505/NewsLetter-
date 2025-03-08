const apiKey = '98c19acebce3489e9c5b1b8c15698dd8';  
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
async function fetchNews(query = '') {
    try {
        const url = query
            ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
            : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            newsContainer.innerHTML = data.articles
                .slice(0, 5)
                .map(article => `
                    <div class="news-item">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'Click below to read more.'}</p>
                        <a href="${article.url}" target="_blank">Read More ➔</a>
                    </div>
                `)
                .join('');
        } else {
            newsContainer.innerHTML = `<p>No news found. Try searching for something else!</p>`;
        }
    } catch (error) {
        newsContainer.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
    }
}
function searchNews() {
    const searchContainer = document.getElementById("news-container");
    searchContainer.style.display = "block"; 
    const query = searchInput.value.trim();
    fetchNews(query);
}
fetchNews();
