// select div by ID with getElementById
const current = document.getElementById('current');

// createClock function which writes the current time on the screen
function createClock() {
    // create new date with javascript Date constructor
    const clock = new Date();
    // get the hours for display
    const hours = clock.getHours();
    // get the minutes for display
    const minutes = clock.getMinutes();
    //get the seconds for display
    const seconds = clock.getSeconds();
    // write the current time into the selected div
    // using ternary operator to better visual appearance
    return current.innerHTML = `${hours + ":" + (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (seconds < 10 ? ('0' + seconds) : seconds)}`;
}

// using setInterval to refresh the time every second
const intervalClock = setInterval(createClock, 1000);

// call the the setInterval
intervalClock;
