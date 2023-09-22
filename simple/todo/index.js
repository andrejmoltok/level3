const inputTodo = document.getElementById('inputTodo');
const prio = document.getElementById('prio');
const addTodo = document.getElementById('add');
const prioDiv = document.getElementById('priority');
const general = document.getElementById('general');

addTodo.addEventListener('click',function () {
    const inputTodoValue = inputTodo.value;

    const todoDiv = document.createElement('div');
    todoDiv.style.border = '2px solid gray';
    todoDiv.style.display = 'flex';
    todoDiv.style.flexDirection = 'row';
    todoDiv.style.justifyContent = 'start';

    const todoText = document.createElement('span');
    todoText.textContent = inputTodoValue;
    todoText.style.margin = '10px';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function () {
        todoDiv.remove();
    });
    deleteButton.style.margin = '10px';
    deleteButton.style.color = 'red';

    todoDiv.appendChild(deleteButton);
    todoDiv.appendChild(todoText);

    if (prio.checked) {
        prioDiv.appendChild(todoDiv);
    } else {
        general.appendChild(todoDiv);
    };

    inputTodo.value = '';
    prio.checked = false;
});