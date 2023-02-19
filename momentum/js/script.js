const body = document.querySelector('body');
const time = document.querySelector('.time');
const dateDiv = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name')
let randomNum = getRandomNum();
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

showTime();
setBackground();

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
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
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
        //bgNum = '20';
        randomNum = 1;
    }

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/AlekseevDS/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.addEventListener('load', () => {
        body.style.backgroundImage = "url(" + img.src + ")";
    })
}
