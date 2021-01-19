const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
app.use(express.static('public'));

app.use(express.json({ limit: '1mb' }));

app.get('/getQuote', async(request, response) => {
    const quote_url = 'https://api.quotable.io/random?maxLength=120';
    const quote_response = await fetch(quote_url);
    const quote_data = await quote_response.json();
    response.json(quote_data);
})

const newsapi = require('newsapi');
const apikey = process.env.API_KEY;
const news = new newsapi(apikey);


news.v2.topHeadlines({
    sources: 'bbc-news,the-verge,abc-news,bloomberg',
    language: 'en'
}).then(news_response => {
    app.get('/newsapi', (request, response) => {
        response.json(news_response)
    })
});