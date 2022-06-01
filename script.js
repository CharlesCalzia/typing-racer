const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const textDisplayElement = document.getElementById('textDisplay');
const textInputElement = document.getElementById('textInput');
const typingSpeedElement = document.getElementById('typingSpeed');
const timerElement = document.getElementById('timer');

let time = 0;

function checkLocalStorage(){
    if(localStorage.getItem('nPhrases') === null){
        return false;
    }
    return true;
}

textInputElement.addEventListener('input', () => {
    const arrayText = textDisplayElement.querySelectorAll('span');
    const arrayValue = textInputElement.value.split('');
    
    let nCorrect = 0;
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
            nCorrect+=1;
        }else{
            letterSpan.classList.add('incorrect');
            letterSpan.classList.remove('correct');
            correct=false;
        }
    });

    if (timerElement.innerText!="0"){
        typingSpeedElement.innerText = `${Math.floor((nCorrect/5)/(timerElement.innerText/60))} WPM`;
    }
    
    
    if(correct){
        if (checkLocalStorage()){
            localStorage.setItem('nPhrases', parseInt(localStorage.getItem('nPhrases'))+1);
        }
        else{
            localStorage.setItem('nPhrases', 1);

        }
        typingSpeedElement.innerText = "0 WPM";
        
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
    if (checkLocalStorage()){
        nPhrases.innerText = localStorage.getItem('nPhrases') + " phrases";
    }
    else{ 
        nPhrases.innerText = 0; 
    }
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