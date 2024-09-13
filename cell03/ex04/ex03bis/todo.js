$(document).ready(function () {
    let list = [];
    const toDoEl = $("#ft_list");
    const addBtn = $("#addBtn");

    function render() {
        toDoEl.empty();
        $.each(list, function (index, value) {
            const toDoItem = createTodoElement(value);
            toDoItem.on("click", function () {
                removeTodo(index);
            });
            toDoEl.append(toDoItem);
        });
    };

    function createTodoElement(value) {
        const button = $("<button>").addClass("todo-item").text(value);
        return button;
    };

    function addTodo(value) {
        // Add the new item to the beginning of the list
        list.unshift(value);
        updateCookie(JSON.stringify(list));
        render();
    };

    function removeTodo(index) {
        if (!confirm("Delete?")) return;
        list.splice(index, 1);
        updateCookie(JSON.stringify(list));
        render();
    };

    function updateCookie(value) {
        setCookie("toDo", value);
    };

    function setCookie(key, value) {
        document.cookie = `${key}=${encodeURIComponent(value)};`;
    };

    function getCookie(key) {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith(key + "=")) {
                return decodeURIComponent(cookie.substring(key.length + 1));
            }
        }

        return null;
    };

    addBtn.on("click", function () {
        const newTodo = prompt("New ToDo");
        if (newTodo.trim().length <= 0) return;
        addTodo(newTodo);
    });

    const oldToDo = getCookie("toDo");
    if (oldToDo) {
        list = JSON.parse(decodeURIComponent(oldToDo));
    }

    render();
});
