"use strict"

// BU YERDA BIZ ELEMENTLARNI TANLAB OLDIK
const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form-input");
const elList = document.querySelector(".todos-list");

// SPANLARNI TANLABN OLDIK
const elCountAll = document.querySelector(".count-all");
const elCompleted = document.querySelector(".count-completed");
const elUncompleted = document.querySelector(".count-uncompleted");

// FILTER BUTTONLARNI TANLAB OLDIK
const elBtnAll = document.querySelector(".btn-all");
const elBtnCompleted = document.querySelector(".btn-completed");
const elBtnUncompleted = document.querySelector(".btn-uncompleted");

const todos = [];

elList.addEventListener("click", function (e){
    const deleteBtnId = Number(e.target.dataset.deleteBtnId);
    const foundTodoIndex = todos.findIndex(todo => todo.id === deleteBtnId)

    if(e.target.matches(".btnDelete")) {
        todos.splice(foundTodoIndex, 1)

        elList.innerHTML = null
        renderTodos(todos, elList)
    } else if (e.target.matches(".checkbox-btn")) {
        const checkboxId = Number(e.target.dataset.checkboxBtnId);

        const foundTodo = todos.find((todo) => todo.id === checkboxId);
        foundTodo.isCompleted = !foundTodo.isCompleted;

        elList.innerHTML = null

        renderTodos(todos, elList)
    }
})

const renderTodos = function(arr, htmlElement){
    arr.forEach((todo) => {
        elCountAll.textContent = todos.length

        elCompleted.textContent = todos.filter((todo) => todo.isCompleted === true).length;

        elUncompleted.textContent = todos.filter((todo) => todo.isCompleted === false).length

        const newItem = document.createElement("li");
        const newCheckbox = document.createElement("input");
        const newDeleteButton = document.createElement("button");

        newCheckbox.style.marginLeft = "10px"
        newDeleteButton.classList.add("delete-button")
        newDeleteButton.style.marginLeft = "10px"
        newItem.style.listStyle = "none"

        newDeleteButton.classList.add("btnDelete")
        newCheckbox.classList.add("checkbox-btn")

        newDeleteButton.dataset.deleteBtnId = todo.id
        newCheckbox.dataset.checkboxBtnId = todo.id

        newItem.textContent = todo.title;
        newCheckbox.type = "checkbox"
        newDeleteButton.type = "submit"
        newDeleteButton.textContent = "Delete";

        if(todo.isCompleted){
            newCheckbox.checked = true
            newItem.style.textDecoration = "line-through"
        }

        htmlElement.appendChild(newItem);
        newItem.appendChild(newCheckbox);
        newItem.appendChild(newDeleteButton);
    });
}

elForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const inputValue = elFormInput.value;

    const newTodo = {
        id: todos[todos.length - 1]?.id + 1 || 0,
        title: inputValue,
        isCompleted: false
    };


    todos.push(newTodo);

    elFormInput.value = null
    elList.innerHTML = null

    renderTodos(todos, elList)
});

elBtnAll.addEventListener("click", function () {
    elList.innerHTML = null;

    renderTodos(todos, elList)
});

elBtnCompleted.addEventListene("click", function () {
    const completedTodos = todos.filter(function (todo){
        return todo.isCompleted
    });
    elList.innerHTML = null;

    renderTodos(completedTodos, elList);
});

elBtnUncompleted.addEventListener("click", function () {
    const unCompletedTodos = todos.filter(function (todo) {
        return !todo.isCompleted;
    });
    elList.innerHTML = null;
    elList.innerHTML = DOMException
    renderTodos(unCompletedTodos, elList)
})