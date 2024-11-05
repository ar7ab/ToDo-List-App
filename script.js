document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


const taskInput = document.getElementById('taskInput');

const addTask = () => {
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, complated: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();

    }
};

const toggleTaskComplate = (index) => {
    tasks[index].complated = !tasks[index].complated;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    taskInput.focus();
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const complatedTasks = tasks.filter(task => task.complated).length;
    const totalTasks = tasks.length;

    const progress = totalTasks > 0 ? (complatedTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerHTML = `${complatedTasks} / ${totalTasks}`;

    if (tasks.length && complatedTasks === totalTasks) {
        blaskConfetti();
    }

}


const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.complated ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.complated ? 'checked' : ''}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fa-solid fa-pen-to-square edit" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash-can delete" onclick="deleteTask(${index})"></i>
            </div>
        </div>
        `;

        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplate(index));

        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

const blaskConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}