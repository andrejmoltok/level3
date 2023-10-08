// Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Delete weight entries by clicking on the dots
canvas.addEventListener('click', function (e) {

    // Retrieve the userProfile from local storage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dotRadius = 2;

    for (let i = 0; i < userProfile.dotCoords.length; i++) {
        if (Array.isArray(userProfile.dotCoords)) {
            const dot = userProfile.dotCoords[i];
            const distance = Math.sqrt(Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2));
            if (distance <= dotRadius) {
                userProfile.dotCoords.splice(i, 1);

                userProfile.weightEntries.splice(i, 1);

                localStorage.setItem("userProfile", JSON.stringify(userProfile));

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawData();
                break;
            }
        }
    }
});

const weightInput = document.getElementById('weightInput');
const addButton = document.getElementById('addButton');

addButton.addEventListener("click", function () {

    // Retrieve the userProfile from local storage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    const currentDate = new Date();
    const monthDay = currentDate.getDate();

    const existingEntry = userProfile.weightEntries.find(entry => entry.monthDay === monthDay);

    if (existingEntry) {
        // Entry for the current day already exists, you can handle this case, for example, show an alert.
        alert("An entry for today already exists. You cannot add multiple entries for the same day.");
        weightInput.value = null;
    } else {

        const dayNumber = currentDate.getDay();

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = daysOfWeek[dayNumber];

        const monthNumber = currentDate.getMonth();

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[monthNumber];

        const year = new Date().getFullYear();

        let newWeightInputData = {
            year: year,
            month: month,
            monthDay: monthDay,
            dayName: dayName,
            weightInput: {
                value: weightInput.value,
                unit: userProfile.startingWeight.unit,
            },
        };

        // Push the new weight input data into the userProfile
        userProfile.weightEntries.push(newWeightInputData);

        // Save the updated userProfile back to local storage
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        weightInput.value = null;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawData();
    }
});

// Create select tag options based on years and months entries
if (localStorage.getItem("userProfile")) {
    // need to convert string data into Number, use `+` in front
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // Years select tag
    const yearSelect = document.getElementById('yearSelect');

    // Month Select tag
    const monthSelect = document.getElementById('monthSelect');

    // AI generatedf code
    function getDistinctYearsAndMonths(userProfile) {
        const distinctYears = new Set();
        const distinctMonths = new Set();

        // Iterate through weightEntries
        for (const entry of userProfile.weightEntries) {
            if (entry.year) {
                distinctYears.add(entry.year);
            }
            if (entry.month) {
                distinctMonths.add(entry.month);
            }
        }

        return {
            years: Array.from(distinctYears),
            months: Array.from(distinctMonths),
        };
    }

    const { years, months } = getDistinctYearsAndMonths(userProfile);

    // Fill select tag based on years entries
    for (const year of years) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    };

    yearSelect.addEventListener('change', function () {

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        const selectedYear = yearSelect.value;

        monthSelect.innerHTML = '';

        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-------------------';
        monthSelect.appendChild(emptyOption);

        // Filter months based on the selected year
        const filteredMonths = months.filter((month) => {
            const entry = userProfile.weightEntries.filter((entry) => entry.year === selectedYear && entry.month === month);
            return entry;
        });

        if (selectedYear === '') {
            drawNoData();
        } else {
            // Populate month select tag based on the filtered months
            for (const month of filteredMonths) {
                const option = document.createElement("option");
                option.value = month;
                option.textContent = month;
                monthSelect.appendChild(option);
            }
        };

        monthSelect.addEventListener("change", function () {

            const selectedMonth = monthSelect.value;

            if (selectedMonth !== "") {
                drawData();
                canvas.addEventListener('mousemove', function (e) {

                    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    // create popup-on-hover onto the canvas for the specific days
                    const hoverRadius = 8;

                    for (let i = 0; i < userProfile.weightEntries.length; i++) {
                        for (let j = 0; j < userProfile.hoverCoords.length; j++) {
                            const hover = userProfile.hoverCoords[j];
                            const distance = Math.sqrt(Math.pow(x - hover.x, 2) + Math.pow(y - hover.y, 2));
                            if (distance <= hoverRadius) {
                                if (userProfile.weightEntries[i] !== undefined && (j + 1) === userProfile.weightEntries[i].monthDay) {
                                    ctx.fillStyle = "#504507";
                                    ctx.rect(x, y - 50, 120, 50);
                                    ctx.fill();
                                    ctx.font = "14px Arial";
                                    ctx.fillStyle = "antiquewhite";
                                    ctx.fillText(`Date: ${userProfile.weightEntries[i].monthDay} ${userProfile.weightEntries[i].month}`, x + 3, y - 37);
                                    ctx.fillText(`Day: ${userProfile.weightEntries[i].dayName}`, x + 3, y - 21);
                                    ctx.fillText(`Weight: ${userProfile.weightEntries[i].weightInput.value} ${userProfile.weightEntries[i].weightInput.unit}`, x + 3, y - 5);
                                    break;
                                }
                            } else {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                drawData();

                            }
                        }
                    }
                });
            } else {
                drawNoData();
            }
        });
    });
};

// Render data from userProfile object
function drawData() {
    // Render data based on localStorage availabiulity
    if (localStorage.getItem("userProfile")) {
        // need to convert string data into Number, use `+` in front
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        // Canvas values
        const baseHeight = 110;
        const baseDist = 40;

        // Canvas dimensions
        canvas.width = 700;
        canvas.height = (+userProfile.startingWeight.value + baseHeight);

        // Draw canvas
        ctx.fillStyle = 'antiquewhite';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw coordinate axis
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        // draw Y axis
        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(40, +userProfile.startingWeight.value + (baseHeight - baseDist));
        ctx.stroke();

        // draw X axis
        ctx.beginPath();
        ctx.moveTo(40, +userProfile.startingWeight.value + (baseHeight - baseDist));
        ctx.lineTo(685, +userProfile.startingWeight.value + (baseHeight - baseDist));
        ctx.stroke();

        // draw dashed lines along the X axis at 50,100,150 units
        const weightIncrement = +userProfile.startingWeight.value + 25;

        const coords = Array
            .from({ length: Math.floor(weightIncrement / 25) }).map((_, i) => { return (i + 1) * 25 });

        for (let k = 0; k < coords.length; k++) {
            // draw dashed lines at step = 25
            ctx.strokeStyle = 'silver'; //#4d4d4d
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(45, (+userProfile.startingWeight.value + (baseHeight - baseDist) - coords[k]));
            ctx.lineTo(685, (+userProfile.startingWeight.value + (baseHeight - baseDist) - coords[k]));
            ctx.stroke();

            // draw the values for the dashed steps
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#4D4D4D';
            ctx.fillText(coords[k], 10, (+userProfile.startingWeight.value + (baseHeight - baseDist) - coords[k]));
        };

        ctx.setLineDash([]);

        // prepare for vertical lines for loop
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.font = '12px Arial';

        const startX = 60;
        const startY = +userProfile.startingWeight.value + (baseHeight - baseDist);

        // prepare the `numLines` value based on the month

        // Month Select tag
        const monthSelect = document.getElementById('monthSelect');

        function getMonthNumber(monthName) {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            return months.indexOf(monthName);
        };

        function daysInMonth(monthName) {
            const monthNumber = getMonthNumber(monthName);
            return new Date(new Date().getFullYear(), monthNumber + 1, 0).getDate();
        };

        const numLines = daysInMonth(monthSelect.value);

        // Vertial line spacing
        const lineSpacing = (canvas.width - startX) / numLines;

        // Set for uniqueDotCoords
        const uniqueDotCoords = new Set();
        // Set for uniqueHoverCoords
        const uniqueHoverCoords = new Set();

        // draw lines based weightEntries array of objects
        for (let i = 0; i < numLines; i++) {
            for (let j = 0; j < userProfile.weightEntries.length; j++) {

                // check if there are weight inputs
                if (userProfile.weightEntries[j] !== undefined) {
                    const entry = userProfile.weightEntries[j];

                    // setup x axis data
                    const x = startX + (i * lineSpacing);
                    ctx.beginPath();
                    if ((i + 1) === entry.monthDay) {
                        const y = +entry.weightInput.value;
                        ctx.strokeStyle = 'CornflowerBlue';
                        ctx.fillStyle = 'CornflowerBlue';
                        ctx.beginPath();
                        ctx.arc(x, startY - y, 2, 0, Math.PI * 2);
                        uniqueDotCoords.add({ x: x, y: (startY - y) });
                        ctx.fill();
                        ctx.stroke();
                        ctx.moveTo(x, startY);
                        ctx.lineTo(x, startY - y);
                        ctx.stroke();
                    } else {
                        const y = 100;
                        ctx.strokeStyle = 'silver';
                        ctx.fillStyle = 'silver';
                        ctx.moveTo(x, startY);
                        ctx.lineTo(x, startY - y);
                        ctx.stroke();
                    }
                    ctx.fillText((i + 1).toString(), (x - 5), (startY + 25));
                    uniqueHoverCoords.add({ x: (x - 5), y: (startY + 25) });
                }
            }
        };
        userProfile.hoverCoords = Array.from(uniqueHoverCoords);
        userProfile.dotCoords = Array.from(uniqueDotCoords);
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
    };
};

// When there is no data to display,
// call drawNoData() o
function drawNoData() {

    // Canvas dimensions
    canvas.width = 700;
    canvas.height = 300;

    // Draw canvas
    ctx.fillStyle = 'antiquewhite';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 'no data to show' text
    ctx.font = 'bold 42px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('No data to show', canvas.width / 2 - 150, canvas.height / 2);
}

drawNoData();
