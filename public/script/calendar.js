const dates = document.querySelector('.dates')
const head = document.querySelector('.calendar-head h4')

//get today date

const today = new Date();

// generate calendar for current month

function calendar() {
    // set first day of the month
    today.setDate(1);

    //find day of the week of the first day of month

    const firstDay = today.getDay()

    //find last day of the month

    const lastDay = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate();

    //find last day of the previous month
    const prevLastDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
    ).getDate();


    //fill calendar-head
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];


    const currentMonth = today.getMonth();

    const currentYear = today.getFullYear();

    head.innerHTML = `${months[currentMonth]} ${currentYear}`



    //fill in the days (of previous month) before first day of the current month
    let list = '';
    if (firstDay == 0) {
        for (i = 6; i > 0; i--) {
            list += `<div class="prevDays">${prevLastDay-i+1}</div>`;
        }
    } else {
        for (i = firstDay - 1; i > 0; i--) {
            list += `<div class="prevDays">${prevLastDay-i+1}</div>`;
        }
    }



    //fill in the days of the current month
    for (i = 1; i <= lastDay; i++) {
        list += `<div class="daysOfCurrentMonth">${i}</div>`;
    }

    dates.innerHTML = list;

    //determine today
    const allDays = document.querySelectorAll('.daysOfCurrentMonth')


    for (i = 0; i <= allDays.length - 1; i++) {
        if (allDays[i].textContent == new Date().getDate() &&
            currentMonth == new Date().getMonth() && currentYear == new Date().getFullYear()) {
            allDays[i].classList.add('today')
        }

    }

}


calendar()

//show next, previous months 

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

prev.addEventListener("click", () => {
    today.setMonth(today.getMonth() - 1);
    calendar();
});

next.addEventListener("click", () => {
    today.setMonth(today.getMonth() + 1);
    calendar();
});