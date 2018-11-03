const firstDay = [13, 10, 2016];

const date = new Date();
const today = [date.getDate(), date.getMonth(), date.getFullYear()];

const isLeapYear = checkLeapYear(today[2]); //sees if leap year to tell if feb needs 28/29 days
function checkLeapYear(year) {
    if ((year % 4) !== 0) {
        return false;
    } else if ((year % 100) === 0 && (year % 400) !== 0) {
        return false;
    } else {
        return true;
    }
}
if (isLeapYear) { //stores days in feb to put into array later
    feb = 29;
} else {
    feb = 28;
}

let lessThan = 0; //a value to keep track of if the day/month is less so final date change will be accurate, ex january 2018, year would be 2 and month would be -10 but it should be 1 year and 2 months, this wil keep track to avoid & fix that

const daysPerMonth = [31, 31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30]; //to be able to get days since last thirteenth for any month, shifted forward one so you'll get days from month before not current one
function dayChange() {
    if (today[0] >= firstDay[0]) {
        lessThan = 0;
        return today[0] - firstDay[0];
    } else if(today[1] != 10) {
        lessThan = -1;
        return today[0] + (daysPerMonth[today[1]] - 13);
    } else
    {
        lessThan = -1;
        return 31 - (firstDay[0] - today[0]);
    }
}

function monthChange() {
    let change = (today[1] - firstDay[1]) + lessThan;
    if (change !== 0) {
        change += 12;
    }
    if (today[1] == firstDay[1]) {
        return 11;
        lessThan = -1;
    } else if (today[1] > firstDay[1]) {
        lessThan = 0;
    } else {
        lessThan = -1;
    }
    return change;
}

function yearChange() {
    return today[2] - firstDay[2] + lessThan;
}


const howLong = [dayChange(), monthChange(), yearChange()];
console.log(howLong);

//the if statements are to avoid saying "it's been 1 years" which just sounds weird
let yearText = document.querySelector(".years");
if (howLong[2] !== 1) {
    yearText.innerHTML = "It's been " + howLong[2] + " years,";
} else {
    yearText.innerHTML = "It's been " + howLong[2] + " year,";
}

let monthText = document.querySelector(".months");
if (howLong[1] !== 1) {
    monthText.innerHTML = howLong[1] + " months,";
} else {
    monthText.innerHTML = howLong[1] + " month,";
}

let dayText = document.querySelector(".days");
if (howLong[0] !== 1) {
    dayText.innerHTML = "and " + howLong[0] + " days.";
} else {
    dayText.innerHTML = "and " + howLong[0] + " day.";
}
