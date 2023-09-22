# Digital Clock in Javascript

### Basic digital clock using DOM and Javascript

#### createClock()
function creates a new Date object, after which
the function creates 3 const's, naming hours, minutes and seconds,
then using `innerHTML` appends the current time into the 
selected div, selected with `getElementById`

#### intervalClock
function runs every second,
updating or refreshing the clock rendered on the screen
using `setInterval`