let ul = document.querySelector(".ul");
let addTask = document.getElementById("add");

//  Upload task in browser Local Storage
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [1, 2, 3];

function listUpdate() {
    ul.innerHTML = "";
    
    // Save in browser local storage
    localStorage.setItem("myTasks", JSON.stringify(tasks));

    tasks.forEach((task, i) => {
        let li = document.createElement('li');
        li.innerHTML = `
        <p>${task}</p>
        <button class="threeDots" onclick="menuTroggel(this, event)">
            <img src="icon/three-dots.svg">
        </button>
        <div class="menu-container">
            <div onclick="edit(${i})">Edit</div>
            <div onclick="del(${i})">Delete</div>
        </div>
        `;
        ul.appendChild(li);
    });
}


addTask.addEventListener("click", () => {
    const userInput = prompt("Enter your Task:");
    if (userInput && userInput.trim() !== "") {
        tasks.push(userInput.trim());
        listUpdate();
    }
});


function menuTroggel(e, event) {
    event.stopPropagation();
    const currentMenu = e.nextElementSibling;
    
    document.querySelectorAll('.menu-container').forEach((m) => {
        if (m !== currentMenu) m.classList.remove("show");
    });
    
    currentMenu.classList.toggle("show");
}


window.addEventListener("click", (e) => {
    if (!e.target.closest('.menu-container')) {
        document.querySelectorAll('.menu-container').forEach(m => m.classList.remove("show"));
    }
});


function del(index) {
    if(confirm("Are you sure?")) {
        tasks.splice(index, 1);
        listUpdate();
    }
}

function edit(index) {
    const newTask = prompt("Edit your task", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        listUpdate();
    }
}

listUpdate();