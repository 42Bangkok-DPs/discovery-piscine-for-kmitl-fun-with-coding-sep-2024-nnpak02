// โหลดลิสต์จากคุกกี้
document.addEventListener("DOMContentLoaded", function() {
    loadTodos();
});

// ฟังก์ชั่นการโหลด
function loadTodos() {
    const todos = getCookie("todos");
    if (todos) {
        const todoArray = JSON.parse(todos);
        todoArray.forEach(todo => addTodoElement(todo));
    }
}

// สร้างลิสต์ใหม่
document.getElementById("newBtn").addEventListener("click", function() {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText) {
        addTodoElement(todoText);
        saveTodos();
    }
});

function addTodoElement(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    todoDiv.innerText = todoText;

    todoDiv.addEventListener("click", function() {
        if (confirm("Do you want to delete this TO DO?")) {
            todoDiv.remove();
            saveTodos();
        }
    });

    document.getElementById("ft_list").prepend(todoDiv);
}

// เซฟลงคุกกี้
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#ft_list .todo-item").forEach(item => {
        todos.push(item.innerText);
    });
    setCookie("todos", JSON.stringify(todos), 365);
}

// ตั้งค่าคุกกี้
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// ฟังก์ชั่นดึงคุกกี้
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
