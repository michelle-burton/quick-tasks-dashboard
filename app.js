const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const summary = document.getElementById("summary");

let tasks = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('hey');
    const taskText = input.value.trim(); 
    
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(task);

    input.value = '';

    renderTasks();
})

