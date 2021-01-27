const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.querySelector("strong");
const TODO_LS = "todo";

let todos = [];

const createTodo = e => {
  let inputValue = todoInput.value.trim(); // 공백 문자열 입력 방지
  if (!inputValue || inputValue === "") {
    return;
  }
  if (e.key === "Enter") {
    paintTodo(inputValue);
    todoInput.value = "";
  }
  return;
};

const saveTodo = () => {
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
};

const getTodos = () => {
  const savedTodos = JSON.parse(localStorage.getItem(TODO_LS));
  if (!savedTodos) {
    return;
  }
  savedTodos.forEach(savedTodo => paintTodo(savedTodo.text));
};

const paintTodo = inputValue => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${inputValue}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${inputValue}" />
  `;
  const newId = todos.length + 1;
  li.id = newId;
  todoList.appendChild(li);
  li.children[0].children[0].addEventListener("click", clickToggleBtn);
  const todoObj = {
    todoId: newId,
    text: inputValue,
  };
  todos.push(todoObj);
  todoCount.innerText = todos.length;
  saveTodo();
};

const clickToggleBtn = e => {
  let checkedBtn = e.currentTarget;
  checkedBtn.parentNode.parentNode.classList.add("completed");
  checkedBtn.checked = true;
};

function init() {
  getTodos();
  todoInput.addEventListener("keypress", createTodo);
}

init();
