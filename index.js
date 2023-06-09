// Quote element tags from html
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Quotes array
let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quotes
function newQuote(){
    loading();
     // Pick a random quote from apiQuotes array
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //   Check if author is blank and replace it with `unknown`
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }
    // Check quote length
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
     quoteText.textContent = quote.text;
     complete();
}

// Get quotes from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error.message);
    }
}

// Tweet quote
function tweetQuote(){
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


//  Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();