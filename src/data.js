import { Todo } from './todo.js';
import { logger } from '../lib/logger.js';

export const state = {
    todos: [],

    addTodo() {
        const text = document.getElementById('inputField').value;
        const estCycles = document.getElementById('inputNumber').value;
        const todo = new Todo(text, estCycles);
        this.todos.push(todo)
    },

    addTodoHandler(event) {

        if (event.target.id === 'saveBtn') {
            this.addTodo()
            this.render();
        } else if (event.target.id === 'cancelBtn') {
            this.render();
        } else {
            return;
        }
        //devlogs

        logger.push({
            action: 'add todo',
            state,
            event
        })

    },

    addTodoScreenCall(event) {

        //call add todo screen
        this.renderAddTodoWindow();
    },

    render() {
        const userInt = document.getElementById('todo')
        userInt.innerHTML = '';

        //todo container
        const todoDiv = document.createElement('div');
        todoDiv.id = 'todoContainer';
        todoDiv.classList.add('container');

        //header
        const headerDiv = document.createElement('div');
        headerDiv.id = 'headerDiv';

        const header = document.createElement('span');
        header.textContent = 'Tasks';

        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.id = 'todoOptionBtn';
        optionBtn.innerHTML = '<i class="fas fa-ellipsis-v"></i>';

        headerDiv.appendChild(header);
        headerDiv.appendChild(optionBtn);

        todoDiv.appendChild(headerDiv);


        userInt.appendChild(todoDiv)


        //add todo button

        const addTodoBtn = document.createElement('button');
        addTodoBtn.type = 'button';
        addTodoBtn.id = 'addTodoBtn'
        addTodoBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Task'

        userInt.appendChild(addTodoBtn)
        addTodoBtn.addEventListener('click', this.addTodoScreenCall.bind(this))

        //todos


        if (state.todos.length === 0) { return }

        const renderedTodos = state.todos.map((todo, i) => {
            const li = document.createElement('li');
            li.classList.add('todoItem');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.index = i;

            if (todo.isCompleted) {
                checkbox.checked = true;
            }

            checkbox.addEventListener('click', todo.toggleCompleted)

            const body = document.createElement('span');
            body.textContent = todo.text;

            li.appendChild(checkbox);
            li.appendChild(body);
            return li;

        }).reduce((all, next) => {
            all.appendChild(next);
            return all;
        }, document.createElement('ul'))



        userInt.insertBefore(renderedTodos, addTodoBtn);

    },

    renderAddTodoWindow() {
        //Add todo screen
        const addTodoDiv = document.createElement('div');
        addTodoDiv.id = 'addTodoDiv'
            // input field
        const inputDiv = document.createElement('div');
        inputDiv.id = 'inputDiv'

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'inputField';
        inputField.placeholder = 'What are you working on?'
        inputDiv.appendChild(inputField)


        // Number of estimated pomodoros
        const title = document.createElement('span');
        title.textContent = 'Est Pomodoros'
        inputDiv.appendChild(title);

        const estPomodoros = document.createElement('input');
        estPomodoros.type = 'number';
        estPomodoros.min = '0';
        estPomodoros.step = '1';
        estPomodoros.value = '1';
        estPomodoros.id = 'inputNumber'
        inputDiv.appendChild(estPomodoros);

        addTodoDiv.appendChild(inputDiv)

        // save and cancel buttons

        const confirmDiv = document.createElement('div');
        confirmDiv.id = 'confirmationDiv';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.id = 'cancelBtn';
        cancelBtn.classList.add('confirmationBtn')
        cancelBtn.textContent = 'Cancel'

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.id = 'saveBtn';
        saveBtn.classList.add('confirmationBtn')
        saveBtn.textContent = 'Save'

        confirmDiv.appendChild(cancelBtn);
        confirmDiv.appendChild(saveBtn);

        addTodoDiv.appendChild(confirmDiv);

        const addTodoBtn = document.getElementById('addTodoBtn');
        addTodoBtn.parentElement.insertBefore(addTodoDiv, addTodoBtn)
        document.getElementById('todo').removeChild(addTodoBtn);
        addTodoDiv.addEventListener('click', this.addTodoHandler.bind(this))
    }
}