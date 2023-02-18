// *** Date & Time ***

function showTime() {
    const time = document.querySelector('.time');
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
    const currentDate = date.toLocaleDateString('en-Us', options);
    const dateDiv = document.querySelector('.date');
    dateDiv.textContent = currentDate;

}

// *** Welcome ***

function showGreeting() {
    const greeting = document.querySelector('.greeting');
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
    const name = document.querySelector('.name')
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

showTime();
