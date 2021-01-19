const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
app.use(express.static('public'));

app.use(express.json({ limit: '1mb' }));


const newsapi = require('newsapi');
const news = new newsapi(process.env.API_KEY);


news.v2.topHeadlines({
    sources: 'bbc-news,the-verge,abc-news,bloomberg',
    language: 'en'
}).then(news_response => {
    app.get('/newsapi', (request, response) => {
        response.json(news_response)
    })
});