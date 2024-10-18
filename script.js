const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const addTaskButton = document.getElementById('add-task-btn');
const clearTasksButton = document.getElementById('clear-tasks-btn');
const filterAllButton = document.getElementById('filter-all');
const filterCompletedButton = document.getElementById('filter-completed');
const filterPendingButton = document.getElementById('filter-pending');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // all tasks
    });
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - Due: ${task.dueDate} [${task.priority}]`;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(filter);
        });
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskName = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskName) {
        tasks.push({ name: taskName, dueDate, priority, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        dueDateInput.value = '';
        renderTasks();
    } else {
        alert('Please enter a task name.');
    }
}

function clearTasks() {
    tasks = [];
    localStorage.removeItem('tasks');
    renderTasks();
}

addTaskButton.addEventListener('click', addTask);
clearTasksButton.addEventListener('click', clearTasks);
filterAllButton.addEventListener('click', () => renderTasks('all'));
filterCompletedButton.addEventListener('click', () => renderTasks('completed'));
filterPendingButton.addEventListener('click', () => renderTasks('pending'));

window.onload = () => renderTasks();
