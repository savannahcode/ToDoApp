//import "styles.css"

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoCategory: 0,
    todoDueDate: "12/16/2023",
    todoComplete: false,
    todoDeleted: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoCategory: 0,
    todoDueDate: "12/16/2023",
    todoComplete: true,
    todoDeleted: false,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoCategory: 0,
    todoDueDate: "12/16/2023",
    todoComplete: false,
    todoDeleted: false,
  },
]
// oct 11 @ 11:38
let categories = [
  {
    id: 0,
    categoryName: "School",
  },
  {
    id: 1,
    categoryName: "Work",
  },
  {
    id: 2,
    categoryName: "Home",
  },
]

/* if someone types into "Enter new class" text field
and hits enter or the + button the addToDo function should be called. */
const inputVal = document.querySelector(".inputCheck")
inputVal.addEventListener("keydown", checkEnter)
const toDoList = document.querySelector(".todoList")
let plusButton = document.getElementById("plus")
const clearDoneButton = document.getElementById("clearDone")
let tasksLeft = document.getElementById("tasksLeft")
let editBtn = document.querySelector(".editBtn")
// MODAL items
// Get the modal
let modal = document.getElementById("myModal")
// Get the button that opens the modal
let btn = document.getElementById("myBtn")
// Get the <span> element that closes the modal
let close = document.getElementsByClassName("close")[0]
let adjustInput = document.querySelector(".adjustToDo")
let saveChanges = document.querySelector(".saveChanges")
let markDone = document.querySelector(".markDone")
const modalBackground = modal.getElementsByClassName("modal-content")[0]
// Store the index of the todo being edited
let editingTodoIndex = -1

function checkEnter(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addToDo(inputVal.value)
  }
}

/* Click handler for + icon */

plusButton.addEventListener("click", function handleClick() {
  addToDo(inputVal.value)
})

clearDoneButton.addEventListener("click", function handleClick() {
  todos = todos.filter((todo) => !todo.todoComplete)
  toDoList.innerHTML = "" // Clears the toDoList
  renderToDos(todos)
})

// delete & edit btns functionality
toDoList.addEventListener("click", function (event) {
  console.log("Event target:", event.target)
  // Check if the clicked element has the "deleteBtn" class
  if (
    event.target.classList.contains("deleteBtn") ||
    event.target.parentElement.classList.contains("deleteBtn")
  ) {
    // Your delete functionality here
    // You can access the clicked element with event.target
    if (event.target.classList.contains("deleteBtn")) {
      // for if span was clicked
      searchToDo = event.target.parentElement.textContent.trim()
    } else if (event.target.parentElement.classList.contains("deleteBtn")) {
      // for if i tag icon was clicked
      searchToDo = event.target.parentElement.parentElement.textContent.trim()
    }
    // searchToDoID = 0
    todos.forEach((todo) => {
      if (todo.todoText === searchToDo) {
        todo.todoDeleted = true
      }
    })
    // render todos again to deleting one
    toDoList.innerHTML = "" // Clears the toDoList so the new one can be added
    renderToDos(todos)
  }
  // Check if the clicked element has the "editBtn" class
  if (
    event.target.classList.contains("editBtn") ||
    event.target.parentElement.classList.contains("editBtn")
  ) {
    console.log("edit btn pushed")
    // Edit Functionality here
    // When the user clicks on the button, open the modal
    modal.style.display = "block"
    if (event.target.classList.contains("editBtn")) {
      // for if span was clicked
      adjustInput.value = event.target.parentElement.textContent.trim()
      searchToDo = adjustInput.value
    } else if (event.target.parentElement.classList.contains("editBtn")) {
      // for if i tag icon was clicked
      adjustInput.value =
        event.target.parentElement.parentElement.textContent.trim()
      searchToDo = adjustInput.value
    }
    // Store the index of the todo being edited
    console.log(searchToDo)
    editingTodoIndex = todos.findIndex((todo) => todo.todoText === searchToDo)
    console.log(editingTodoIndex)
  }
}) // FIX HERE

// CLOSE MODAL
// When the user clicks on <span> (x), close the modal
close.onclick = function () {
  modal.style.display = "none"
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
}

// saveChanges click
saveChanges.onclick = function () {
  console.log("save changes")
  modal.style.display = "none"
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      adjustInput.value
      modal.style.display = "none"
    }
  }
  // Check if there is a todo being edited
  if (editingTodoIndex !== -1) {
    // Update the text of the editing todo
    todos[editingTodoIndex].todoText = adjustInput.value

    // Reset the editingTodoIndex
    editingTodoIndex = -1

    // Render the updated to-do list
    toDoList.innerHTML = ""
    renderToDos(todos)
  }
}

// Close the modal when clicking the modal's background
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    modal.style.display = "none"
  }
})

// markDone click
markDone.onclick = function () {
  modal.style.display = "none"
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
    // Check if there is a todo being edited
    if (editingTodoIndex !== -1) {
      // Mark the editing todo as done
      todos[editingTodoIndex].todoComplete = true

      // Reset the editingTodoIndex
      editingTodoIndex = -1

      // Render the updated to-do list
      toDoList.innerHTML = ""
      renderToDos(todos)
    }
  }
}

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
    sideBtn.classList.add("deleteBtn")
    sideBtnIcon.classList.add("fa-trash")
  } else {
    sideBtn.classList.add("editBtn")
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

  let tasksLeftNum = 0
  array.forEach((task) => {
    if (!task.todoComplete) {
      tasksLeftNum++
    }
  })
  tasksLeft.textContent = `You have ${tasksLeftNum} pending tasks.`
}

renderToDos(todos)
