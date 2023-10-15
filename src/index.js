//import "styles.css"

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoCategory: "TBD",
    todoDueDate: "12/16/2023",
    todoComplete: false,
    todoDeleted: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoCategory: "TBD",
    todoDueDate: "12/16/2023",
    todoComplete: true,
    todoDeleted: false,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoCategory: "TBD",
    todoDueDate: "12/16/2023",
    todoComplete: false,
    todoDeleted: false,
  },
]

/* if someone types into "Enter new class" text field
and hits enter or the + button the addToDo function should be called. */
const inputVal = document.querySelector(".inputCheck")
inputVal.addEventListener("keydown", checkEnter)
inputVal.addEventListener("keydown", checkEnter)
const toDoList = document.querySelector(".todoList")
let plusButton = document.getElementById("plus")

function checkEnter(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addToDo(inputVal.value)
  }
}

/* Click handler for + icon */

/*plusButton.addEventListener("click", function handleClick() {
  addToDo(inputVal.value)
  console.log(inputVal.value)
})
*/
plusButton.addEventListener("click", function handleClick() {
  addToDo(inputVal.value)
})

/*
The function addToDo() should create a new object in the toDos array and should
create an li item in the toDoList class.
Have the toDoID be set to one more than the last item in the array.
toDoComlete should automatically be set to false.
toDoText should be whatever the user input is.
*/

function addToDo(newToDo) {
  let toDoObject = {
    todoID: todos.length,
    todoText: newToDo,
    todoCategory: "TBD",
    todoDueDate: "TBD",
    todoComplete: false,
    todoDeleted: false,
  }
  todos.push(toDoObject)
  console.log(todos)
  toDoList.innerHTML = "" // Clears the toDoList so the new one can be added
  renderToDos(todos)
}

function renderToDo(todoItem) {
  const sideBtn = document.createElement("span")
  const sideBtnIcon = document.createElement("i")
  const newLi = document.createElement("li")
  sideBtnIcon.classList.add("fa-solid")
  newLi.textContent = todoItem.todoText
  if (todoItem.todoComplete) {
    newLi.classList.add("done") //add done class if completed
    sideBtnIcon.classList.add("fa-trash")
  } else {
    sideBtnIcon.classList.add("fa-pen-to-square")
  }
  toDoList.appendChild(newLi)
  newLi.appendChild(sideBtn)
  sideBtn.appendChild(sideBtnIcon)
}

function renderToDos(array) {
  // removed the deleted toDos from the displayed toDos
  const nonDeletedToDos = array.filter((toDo) => toDo.todoDeleted === false)

  nonDeletedToDos.forEach((todo) => {
    renderToDo(todo)
  })
}

renderToDos(todos)
