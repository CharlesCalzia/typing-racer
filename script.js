const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const textDisplayElement = document.getElementById('textDisplay');
const textInputElement = document.getElementById('textInput');
const timerElement = document.getElementById('timer');

textInputElement.addEventListener('input', () => {
    const arrayText = textDisplayElement.querySelectorAll('span');
    const arrayValue = textInputElement.value.split('');
    let correct=true

    arrayText.forEach((letterSpan, index) => {
        const char = arrayValue[index];
        if(char==null){
            letterSpan.classList.remove('correct');
            letterSpan.classList.remove('incorrect');
            correct=false;
        }
        else if(char===letterSpan.innerText){
            letterSpan.classList.add('correct');
            letterSpan.classList.remove('incorrect');
        }else{
            letterSpan.classList.add('incorrect');
            letterSpan.classList.remove('correct');
            correct=false;
        }
    });
    if(correct){
        renderQuote();
    }
});


function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderQuote(){
    const text = await getRandomQuote();
    textDisplayElement.innerHTML = '';
    text.split('').forEach(letter=>{
        const span = document.createElement('span');
        span.innerText = letter;
        textDisplayElement.appendChild(span);
    })
    textInputElement.value = null;
    startTimer();
}

let startTime;
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(()=>{
        timer.innerText= getTimerTime();
    },1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000);
}

renderQuote();