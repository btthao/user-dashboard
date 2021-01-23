const content = document.querySelector('.quote-cont')
const author = document.querySelector('.quote-author')
const heart = document.querySelector('.heart')
const dislike = document.querySelector('.dislike')

async function randomQuote() {
    const response = await fetch('/getQuote');
    const data = await response.json();

    if (response.ok) {
        content.innerHTML = data.content;
        author.innerHTML = data.author;
        heart.classList.remove('like');
    } else {
        content.innerHTML = 'Oops! An error has occured. No quote today :/'
        console.log(data)
    }

}

randomQuote()

heart.onclick = () => {
    heart.classList.toggle('like');
}

dislike.onclick = () => {
    randomQuote();
}