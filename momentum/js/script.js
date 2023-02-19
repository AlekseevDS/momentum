const body = document.querySelector('body');
const time = document.querySelector('.time');
const dateDiv = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name')
let randomNum = getRandomNum();
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const quotes = 'assets/quotes.json';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)
city.addEventListener('change', getWeather);
quoteButton.addEventListener('click', getQuotes);

showTime();
setBackground();
getWeather();
getQuotes();


// *** Date & Time ***
function showTime() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString();
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {
        weekday: "long",
        //year: "numeric",
        month: "long",
        day: "numeric",
    };
    dateDiv.textContent = date.toLocaleDateString('en-Us', options);

}

// *** Welcome ***

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}`;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDayMap = new Map();
    timeOfDayMap
        .set(0, 'night')
        .set(1, 'morning')
        .set(2, 'afternoon')
        .set(3, 'evening');

    return timeOfDayMap.get(Math.floor(hours / 6));
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather();
    }
}

//*** Background slider ***

function setBackground() {
    const timeOfDay = getTimeOfDay();
    const bgNum = getRandomNum().toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/AlekseevDS/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.addEventListener('load', () => {
        body.style.backgroundImage = "url(" + img.src + ")";
    })

}
function getRandomNum () {
    return Math.floor(Math.random() * (20 - 1) + 1);
}

function getSlidePrev() {
    const timeOfDay = getTimeOfDay();
    let bgNum = 20;
       if (randomNum > 1) {
           randomNum--;
           bgNum = (randomNum).toString().padStart(2, "0");
       } else {
           //bgNum = '20';
           randomNum = 20;
       }

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/AlekseevDS/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.addEventListener('load', () => {
        body.style.backgroundImage = "url(" + img.src + ")";
    })
}

function getSlideNext() {
    const timeOfDay = getTimeOfDay();
    let bgNum = '01';
    if (randomNum < 20) {
        randomNum++;
        bgNum = (randomNum).toString().padStart(2, "0");
    } else {
        randomNum = 1;
    }

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/AlekseevDS/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.addEventListener('load', () => {
        body.style.backgroundImage = "url(" + img.src + ")";
    })
}

// *** Weather ***

async function getWeather() {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a011aeb88485bdc0e73f33da6007a535&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        //удаляем все лишние классы перед добавлением нового, чтобы иконка погоды обновлялась корректно.
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)}%`;

        //console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        prevCity = city.value;
    } catch (err) {
        city.value = prevCity;
        alert('Wrong input. Select correct city name.')
        getWeather()
    }

}


// *** Quotes ***

async function getQuotes() {

    try {
        const response = await fetch(quotes);
        const data = await response.json();
        const quoteNum = Math.floor(Math.random() * 101);
        quote.textContent = data.quotes[quoteNum].quote
        author.textContent = data.quotes[quoteNum].author

    } catch (err) {
        console.log('Not new quotes')
    }

}
