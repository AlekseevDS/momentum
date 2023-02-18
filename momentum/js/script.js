
// Date & Time

    function showTime() {
        const time = document.querySelector('.time');
        const date = new Date();
        time.textContent = date.toLocaleTimeString();
        showDate()
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

showTime();
