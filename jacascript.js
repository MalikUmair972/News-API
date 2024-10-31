document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://saurav.tech/NewsAPI/everything/cnn.json';

    async function fetchNews() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.articles);
            bindData(data.articles); 
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    function bindData(articles) {
        const cardContainer = document.getElementById('card-container');
        const newsCardTemplate = document.getElementById('template');

        if (!newsCardTemplate) {
            console.error("Template element not found.");
            return;
        }

        cardContainer.innerHTML = '';

        articles.forEach(article => {
            if (!article.urlToImage) return;

            const cardClone = newsCardTemplate.content.cloneNode(true);

            const newsImage = cardClone.querySelector('.news-image');
            const newsTitle = cardClone.querySelector('.news-title');
            const newsLink = cardClone.querySelector('.news-link');

            newsImage.src = article.urlToImage;
            newsImage.alt = article.title;
            newsTitle.textContent = article.title;
            newsLink.href = article.url;
            newsLink.textContent = "Read more";

            cardContainer.appendChild(cardClone);
        });
    }

    fetchNews();
});
