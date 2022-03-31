let input = document.querySelector(".todo");
let clearBtn = document.querySelector(".clear");
let doneBtn = document.querySelector(".done");
let ul = document.querySelector(".todos");
let todos = [];
if (localStorage.length > 0) {
    todos = localStorage.getItem("todos");
    todos = JSON.parse(todos);
}
function createTodo(name, id, done) {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let button = document.createElement("button");
    let img = document.createElement("img");
    // class
    li.classList.add("list");
    if (done == true) {
        li.classList.add("todo_done");
    }
    button.classList.add("garb");
    img.classList.add("garbage");
    // atributes
    img.setAttribute("src", "garbage.svg");
    img.setAttribute("alt", "tut garbage ^-^");
    li.setAttribute("id", id);
    // a1 text
    p.innerHTML = name;
    //matreshka^-^
    li.appendChild(p);
    button.appendChild(img);
    li.appendChild(button);
    //
    ul.prepend(li);
}
for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    createTodo(todo.title, todo.id, todo.done);
}

function deleteTodo(li) {
    let id = li.getAttribute("id");
    id = parseInt(id);
    let index = todos.findIndex((todo) => todo.id == id);
    todos.splice(index, index + 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

ul.onclick = function (event) {
    let target = event.target;
    if (target.tagName == "LI") {
        target.classList.toggle("todo_done");
    } else if (target.tagName == "P") {
        target.parentElement.classList.toggle("todo_done");
        let parent = target.parentElement;
        let id = parent.getAttribute("id");
        let index = todos.findIndex((todo) => todo.id == id);
        if (parent.classList.contains("todo_done")) {
            todos[index].done = true;
        } else {
            todos[index].done = false;
        }
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    if (target.tagName == "IMG") {
        deleteTodo(target.parentElement.parentElement);
        target.parentElement.parentElement.remove();
    } else if (target.tagName == "BUTTON") {
        deleteTodo(target.parentElement);
        target.parentElement.remove();
    }
};

doneBtn.onclick = function (event) {
    let lis = ul.querySelectorAll(".list");
    for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add("todo_done");
        todos[i].done = true;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
};
clearBtn.onclick = function (event) {
    ul.innerHTML = "";
    localStorage.clear();
    todos = [];
};
input.onkeypress = function (event) {
    if (event.keyCode == 13 && input.value != "") {
        // make elements
        let index = todos.findIndex((todo) => todo.title == input.value);
        if (index <0) {
            let todo = {
                title: input.value,
                id: Date.now(),
                done: false,
            };
            createTodo(todo.title, todo.id, todo.done);
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        else{
                alert("Напиши дело,которого ещё тут нет!!! else zarezhu^-^")
        }
        input.value=""
    }
};
// _________________ 
// |have a nice day|   ~(^o^)~
// -----------------

