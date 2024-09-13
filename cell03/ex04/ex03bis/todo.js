$(document).ready(function() {
    loadTodos();

    $("#newBtn").click(function() {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText) {
            addTodoElement(todoText);
            saveTodos();
        }
    });

    function loadTodos() {
        const todos = getCookie("todos");
        if (todos) {
            const todoArray = JSON.parse(todos);
            $.each(todoArray, function(index, todo) {
                addTodoElement(todo);
            });
        }
    }

    function addTodoElement(todoText) {
        const todoDiv = $("<div></div>").addClass("todo-item").text(todoText);
        todoDiv.click(function() {
            if (confirm("Do you want to delete this TO DO?")) {
                todoDiv.remove();
                saveTodos();
            }
        });
        $("#ft_list").prepend(todoDiv);
    }

    function saveTodos() {
        const todos = [];
        $("#ft_list .todo-item").each(function() {
            todos.push($(this).text());
        });
        setCookie("todos", JSON.stringify(todos), 365);
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
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
});