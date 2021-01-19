const newsContainer = document.querySelector('.news')

async function getNews() {
    const response = await fetch('/newsapi');
    const data = await response.json();
    show(data)
}


function show(data) {
    const articles = data.articles;

    for (let i = 0; i <= articles.length - 1; i++) {
        if (articles[i].title.length <= 100 && articles[i].urlToImage) {
            const section = document.createElement('div');
            section.setAttribute('class', 'news-sect');
            section.innerHTML =
                `<div class="newsImg">
                <img src="${articles[i].urlToImage}" alt="article image" class="news-img">
            </div>
            <div class="news-content">
                <h4 class="news-source">${articles[i].source.name}</h4>
                <a href="${articles[i].url}" target=”_blank”>${articles[i].title}</a>   
            </div>`
            newsContainer.appendChild(section);
        }

        const allArticles = document.querySelectorAll('.news-sect')

        if (allArticles.length == 3) {
            break;
        }

    }
}

getNews()