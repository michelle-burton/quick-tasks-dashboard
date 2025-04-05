const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const summary = document.getElementById("summary");

let tasks = [];

// Load tasks from localStorage if available
const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks(); // display them on load
}

form.addEventListener("submit", (e) => {
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
    saveTasks();

    input.value = '';

    renderTasks();
})

function renderTasks() {
    list.innerHTML = ''; // clear

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            updateSummary();
        });

        // task text 
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = 'line-through'
            saveTasks();
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id)
            renderTasks();
            saveTasks();
        });

        // Append
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
    updateSummary();
}

function updateSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    summary.textContent = `Completed: ${completed} / ${total}`;
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// 🛠️ Optional Next Features (for future upgrades):
// ✨ Animations on add/delete

// 🌗 Light/Dark mode toggle

// 📅 Due dates or priorities

// 🔍 Task filtering (all / active / completed)

// 🧹 "Clear all" or "Clear completed" button

// 📱 Responsive design for mobile
