document.getElementById('expenseTable').addEventListener('click', function(event) {
    const target = event.target;

    if (target.id === 'delete-button') {
        const expRow = document.getElementsByClassName('expense-row')[0];
        
        const row = target.closest('.expense-row');
        const subCategoryElement = row.querySelector('#subcategory');
        const subCategory = subCategoryElement.textContent.trim();
        window.localStorage.removeItem(subCategory);
        row.remove();
        document.getElementById('expTtl').textContent = `Total: ${expenseTotal()}`;
    }
});


window.onload = function() {
    if (window.localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const subCategory = localStorage.key(i);
            const expenseData = JSON.parse(window.localStorage.getItem(subCategory));

            if (expenseData) {
            const newRow = document.createElement('div');
            newRow.classList.add('expense-row');
            newRow.style.width = '100%';
            newRow.style.height = '35px';
            newRow.style.display = 'flex';
            newRow.style.flexDirection = 'row';
            newRow.style.justifyContent = 'space-around';
            newRow.style.backgroundColor = 'antiquewhite';
            newRow.innerHTML = `
                <div id="delete-button" style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; background-color: darkolivegreen; width: 10%;">X</div>
                <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; color: black; width: 48%;">${expenseData.mainCategory}</div>
                <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; color: black;">></div>
                <div id="subcategory"style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; color: black; width: 50%;">${expenseData.subCategory}</div>
                <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; background-color: darkolivegreen; width: 50%;">${expenseData.amount} ${expenseData.currency}</div>
            `;
            document.getElementById('expenseTable').appendChild(newRow);
            }
        }
        document.getElementById('expTtl').textContent = `Total: ${expenseTotal()}`;
    }
};


function updateSubcategories() {
    const mainCategorySelect = document.getElementById('expMainCat');
    const subCategorySelect = document.getElementById('expSubCat');
    
    const selectedMainCategory = mainCategorySelect.value;
    subCategorySelect.innerHTML = '';

    const subcategories = {
        housing: ['Rent', 'Mortgage', 'Property Taxes', 'Home Insurance', 'Utilities', 'Maintenance and Repairs'],
        transportation: ['Fuel/Gas', 'Public Transportation', 'Vehicle Maintenance', 'Parking and Tolls', 'Vehicle Loan or Lease'],
        food: ['Groceries', 'Dining Out', 'Coffee and Snacks', 'Fast Food'],
        health: ['Health Insurance', "Doctor's Visits", 'Medications', 'Gym Membership'],
        entertainment: ['Movie Tickets', 'Concerts or Shows', 'Streaming Services', 'Hobbies and Recreation'],
        utilities: ['Internet', 'Cable or Satellite TV', 'Phone Bill', 'Home Security'],
        education: ['Tuition', 'Books and Supplies', 'Online Courses', 'Student Loans'],
        debt: ['Credit Card Payments', 'Personal Loans', 'Student Loans', 'Other Loans'],
        savings: ['Emergency Fund', 'Retirement Savings', 'Investments', 'Vacation Fund'],
        personal: ['Toiletries', 'Haircuts', 'Beauty Products', 'Spa or Wellness'],
        clothing: ['Clothes Shopping', 'Shoes', 'Accessories'],
        gifts: ['Gifts for Family/Friends', 'Charitable Donations', 'Special Occasions'],
        insurance: ['Life Insurance', 'Car Insurance', 'Other Insurance Policies'],
        taxes: ['Income Taxes', 'Property Taxes', 'Other Taxes'],
        travel: ['Flights', 'Hotels', 'Rental Cars', 'Travel Expenses'],
        pets: ['Pet Food', 'Vet Bills', 'Grooming'],
        childcare: ['Daycare', 'School Expenses', 'Baby Supplies'],
        misc: ['Any Other Expenses']
    };

    const subcategoriesForMain = subcategories[selectedMainCategory];
    if (subcategoriesForMain) {
        subcategoriesForMain.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subCategorySelect.appendChild(option);
        });
    }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function expenseAdd() {
    const total = document.getElementById('expTtl');
    const mainCategory = document.getElementById('expMainCat').value;
    const subCategory = document.getElementById('expSubCat').value;
    const amount = document.getElementById('expAmnt').value;
    const currency = document.getElementById('currency').value;

    const capitalizedMainCategory = capitalizeFirstLetter(mainCategory);

    const expenseTable = document.getElementById('expenseTable');

    const newRow = document.createElement('div');
    newRow.classList.add('expense-row');
    newRow.style.width = '100%';
    newRow.style.height = '35px';
    newRow.style.display = 'flex';
    newRow.style.flexDirection = 'row';
    newRow.style.justifyContent = 'space-around';
    newRow.style.backgroundColor = 'antiquewhite';
    newRow.innerHTML = `
        <div id="delete-button" style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; background-color: darkolivegreen; width: 10%;">X</div>
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; color: black; width: 48%;">${capitalizedMainCategory}</div>
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; color: black;">></div>
        <div id="subcategory"; style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; color: black; width: 50%;">${subCategory}</div>
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; text-align: center; background-color: darkolivegreen; width: 50%;">${amount} ${currency}</div>
    `;

    expenseTable.appendChild(newRow);

    const expenseData = {
        mainCategory: capitalizedMainCategory,
        subCategory: subCategory,
        amount: amount,
        currency: currency
    };

    window.localStorage.setItem(subCategory, JSON.stringify(expenseData));
    total.textContent = `Total: ${expenseTotal()}`;

    document.getElementById('expMainCat').value = '';
    document.getElementById('expSubCat').value = '';
    document.getElementById('expAmnt').value = '';
    document.getElementById('currency').value = 'USD';
};

function expenseTotal() {
    if (window.localStorage.length > 0) {
        var total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const subCategory = localStorage.key(i);
            const expenseData = JSON.parse(window.localStorage.getItem(subCategory));
            total += Number(expenseData.amount);
        }
        return total.toFixed(2);
    } else {
        return 0;
    }
}