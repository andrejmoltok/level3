window.onload = function () {
    saveEdit();
};

function saveEdit() {
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');
    if (localStorage.getItem("userProfile")) {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        document.getElementById('firstName').value = userProfile.firstName;

        document.getElementById('ageInput').value = userProfile.age;

        userProfile.sex === 'male' ? document.getElementById('male').checked : document.getElementById('female').checked;

        document.getElementById('startingWeight').value = userProfile.startingWeight.value;

        document.getElementById('startingWeightUnit').value = userProfile.startingWeight.unit;

        document.getElementById('heightUnit').value = userProfile.height.unit;

        const userProfileHeightUnitEvent = new Event('change', { bubbles: true });
        document.getElementById('heightUnit').dispatchEvent(userProfileHeightUnitEvent);

        userProfile.height.unit === 'cm' ? document.getElementById('heightCm').value = userProfile.height.value :
            document.getElementById('heightFeet').value = `${userProfile.height.value.feet}`
        document.getElementById('heightInches').value = `${userProfile.height.value.inches}`;

        deleteButton.style.display = 'block';

    } else {
        saveButton.style.display = 'block';
        deleteButton.style.display = 'none';
    }
};

// Range validation
function ageRangeCheck(age) {
    if (age < 16 || age > 70) {
        alert("Age must be between 16 and 70.");
        return false;
    }
};

// Delete button eventlistener
const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener('click', function (event) {
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');
    event.preventDefault();
    localStorage.clear('userProfile');
    document.getElementById('firstName').value = null;
    document.getElementById('ageInput').value = null;
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById('startingWeightUnit').value = 'kg';
    document.getElementById('startingWeight').value = null;
    document.getElementById('heightUnit').value = 'cm';
    const deleteHeightUnitEvent = new Event('change', { bubbles: true });
    document.getElementById('heightUnit').dispatchEvent(deleteHeightUnitEvent);
    document.getElementById('heightCm').value = null;

    saveButton.style.display = 'block';
    deleteButton.style.display = 'none';
});

// Sex radio selection
const maleRadio = document.getElementById("male");
const femaleRadio = document.getElementById("female");

maleRadio.addEventListener("change", function () {
    if (maleRadio.checked) {
        avatar.src = "./male.jpg";
    }
});

femaleRadio.addEventListener("change", function () {
    if (femaleRadio.checked) {
        avatar.src = "./female.jpg";
    }
});

// Height selection
const height = document.getElementById('height');
const heightCm = document.getElementById("heightCm");
const heightFeet = document.getElementById("heightFeet");
const heightInches = document.getElementById("heightInches");
const heightFeetInches = document.getElementById("heightFeetInches");
const heightUnitSelect = document.getElementById("heightUnit");

heightUnitSelect.addEventListener("change", function () {
    if (heightUnitSelect.value === "cm") {
        height.style.display = 'flex';
        height.style.flexDirection = 'row';
        height.style.justifyContent = 'flex-start';
        height.style.gap = '20px';
        heightCm.style.display = "block";
        heightFeetInches.style.display = "none";
        heightInches.removeAttribute("required");
        heightFeet.removeAttribute("required");
    } else if (heightUnitSelect.value === "ft") {
        height.style.display = 'flex';
        height.style.flexDirection = 'column';
        height.style.gap = '5px';
        heightCm.style.display = "none";
        heightFeetInches.style.display = "block";
        heightInches.setAttribute("required", true);
        heightFeet.setAttribute("required", true);
    }
});

// ProfileForm selection
const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Name and age selection
    const firstName = document.getElementById('firstName').value;
    const age = document.getElementById('ageInput').value;

    // Avatar and Sex selection
    const avatar = document.getElementById("avatar");

    // Sex radio selection
    const maleRadio = document.getElementById("male");
    const femaleRadio = document.getElementById("female");

    // Sex Value selection
    const maleValue = document.getElementById("male").value;
    const femaleValue = document.getElementById("female").value;

    // Starting Weight Unit selection
    const startingWeight = document.getElementById('startingWeight').value;
    const startingWeightUnit = document.getElementById('startingWeightUnit').value;

    // Height selection
    const height = document.getElementById('height');
    const heightCm = document.getElementById("heightCm").value;
    const heightFeet = document.getElementById("heightFeet").value;
    const heightInches = document.getElementById("heightInches").value;
    const heightFeetInches = document.getElementById("heightFeetInches");
    const heightUnitSelect = document.getElementById("heightUnit").value;

    const regex = /^(?:\p{L}|\s)*$/iu;

    if (!regex.test(firstName)) {
        console.log('Validation failed');
        alert('First Name must consist of letters and/or spaces');
        return false;
    }

    ageRangeCheck(age);

    const currentDate = new Date();

    const dayNumber = currentDate.getDay();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[dayNumber];

    const monthDay = currentDate.getDate();

    const monthNumber = currentDate.getMonth();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[monthNumber];

    const year = new Date().getFullYear();

    const userProfile = {
        firstName: firstName,
        age: age,
        sex: maleRadio.checked ? maleValue : femaleValue,
        startingWeight: {
            value: startingWeight,
            unit: startingWeightUnit === "kg" ? "kg" : "lbs",
        },
        height: {
            value: heightUnitSelect === "ft" ? { feet: heightFeet, inches: heightInches } : heightCm,
            unit: heightUnitSelect === "cm" ? "cm" : "ft",
        },
        weightEntries: [
            {
                year: year, 
                month: month, 
                monthDay: monthDay,
                dayName: dayName,
                weightInput: {
                    value: startingWeight,
                    unit: startingWeightUnit,
                }
            },
        ],
        dotCoords: [],
        hoverCoords: [],
    };

    localStorage.removeItem('saveMessageShown');

    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    if (!localStorage.getItem("saveMessageShown")) {
        // Profile Saved Message
        const saveDiv = document.getElementById('save');
        const saveMessage = document.createElement('div');

        saveMessage.textContent = 'Profile Saved!';
        saveDiv.style.color = 'red';
        saveDiv.appendChild(saveMessage);

        setTimeout(() => {
            saveMessage.remove();
        }, 2000);

        localStorage.setItem("saveMessageShown", true);
    }

    saveEdit();
    return false;
});
