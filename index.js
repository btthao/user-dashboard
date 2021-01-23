const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`starting server at ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '1mb' }));

//get quotes
app.get('/getQuote', async(request, response) => {
    const quote_url = 'https://api.quotable.io/random?maxLength=100';
    const quote_response = await fetch(quote_url);
    const quote_data = await quote_response.json();
    response.json(quote_data);
})


//get news 
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