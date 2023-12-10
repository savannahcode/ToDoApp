//import "styles.css"

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoCategory: 1,
    todoDueDate: "12/16/2023",
    todoComplete: false,
    todoDeleted: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoCategory: 3,
    todoDueDate: "12/16/2023",
    todoComplete: true,
    todoDeleted: false,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoCategory: 3,
    todoDueDate: "12/16/2023",
    todoComplete: false,
    todoDeleted: false,
  },
]
// oct 11 @ 11:38
let categories = [
  {
    id: 0,
    categoryName: "All To Dos",
  },
  {
    id: 1,
    categoryName: "School",
  },
  {
    id: 2,
    categoryName: "Work",
  },
  {
    id: 3,
    categoryName: "Home",
  },
  {
    id: 4,
    categoryName: "Other",
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
// EDIT TO DO MODAL items
// Get the edit to do modal
let editModal = document.getElementById("editModal")
// Get the button that opens the modal
let btn = document.getElementById("myBtn")
// Get the <span> element that closes the modal
let close = document.getElementsByClassName("close")
let adjustInput = document.querySelector(".adjustToDo")
let saveChanges = document.querySelector(".saveChanges")
let markDone = document.querySelector(".markDone")
const allModals = document.getElementsByClassName("modal")
const modalBackground = editModal.getElementsByClassName("modal-content")[0]
// Store the index of the todo being edited
let editingTodoIndex = -1
// category modal stuff
let categoryEditBtn = document.querySelector("#catEditBtn")
let categoriesModal = document.querySelector("#categoriesModal")
// view categories Stuff
let viewBtn = document.querySelector("#viewBtn")
let viewSelect = document.getElementsByClassName("viewSelect")
let categoryMenuSelect = document.getElementById("categoryMenuSelect")
// new to do category stuff
let newToDoCatSelect = document.querySelector("#newToDoCatSelect")
let newToDoCatSelectBtn = document.querySelector("#newToDoCatSelectBtn")

// Populate viewSelect with categories
function populateViewSelect() {
  categories.forEach(function (category) {
    // Create a new option element
    const option = document.createElement("option")
    option.value = category.id
    option.text = category.categoryName

    // Append the option to each viewSelect
    for (let i = 0; i < viewSelect.length; i++) {
      // Clone the option for each select
      let optionClone = option.cloneNode(true)
      viewSelect[i].appendChild(optionClone)
    }
  })
}
populateViewSelect()

// find id of the selected category via text
function getCategoryId(categories, selectedText) {
  // Loop through the categories array
  for (let i = 0; i < categories.length; i++) {
    // Check if the text of the current category matches the selected text
    if (categories[i].categoryName === selectedText) {
      // If it does, return the id of the current category
      return categories[i].id
    }
  }
  // If no matching category is found, return null
  return null
}

// hitting View Btn shows to dos by category
viewBtn.addEventListener("click", function () {
  console.log("view btn pushed")
  // get selected category name
  const selectedCategoryName =
    categoryMenuSelect.options[categoryMenuSelect.selectedIndex].text
  console.log(selectedCategoryName)
  // get the id of the selected category
  const selectedCategoryId = getCategoryId(
    categories,
    selectedCategoryName.trim()
  )
  // run render toDos, but updating the function to only render the correct todos by the category
  if (selectedCategoryName === "All To Dos") {
    toDoList.innerHTML = "" // Clears the toDoList
    renderToDos(todos)
  } else {
    toDoList.innerHTML = "" // Clears the toDoList
    renderToDos(
      todos.filter((todo) => todo.todoCategory === selectedCategoryId)
    )
  }
  console.log(todos)
})

// May be addressed in the addToDo function
/*
newToDoCatSelectBtn.addEventListener("click", function () {
  const selectedCategoryName =
  newToDoCatSelect.options[newToDoCatSelect.selectedIndex].text
  console.log(selectedCategoryName)
  getCategoryId(categories, selectedCategoryName.trim())
})
*/

// Click handler for + icon
function checkEnter(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addToDo(inputVal.value)
  }
}

categoryEditBtn.onclick = function () {
  // open The Categories Modal
  categoriesModal.style.display = "block"
}

// Click handler for edit category button
plusButton.addEventListener("click", function handleClick() {
  addToDo(inputVal.value)
})

// Click handler for clear done button
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
    editModal.style.display = "block"
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
for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function () {
    for (let j = 0; j < allModals.length; j++) {
      allModals[j].style.display = "none"
    }
  })
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none"
  } else if (event.target == categoriesModal) {
    categoriesModal.style.display = "none"
  }
}

// Close the modal when clicking the modal's background
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    categoriesModal.style.display = "none"
  }
})

// saveChanges click
saveChanges.onclick = function () {
  console.log("save changes")
  editModal.style.display = "none"
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editModal) {
      adjustInput.value
      editModal.style.display = "none"
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
    editModal.style.display = "none"
  }
})

// markDone click
markDone.onclick = function () {
  editModal.style.display = "none"
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editModal) {
      editModal.style.display = "none"
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
  // call the modal to select the category
  selectCategoryModal.style.display = "block"
  // Once "Select Category" button is clicked in modal, the category is selected for the new ToDo
  newToDoCatSelectBtn.onclick = function () {
    const selectedCategoryName =
      newToDoCatSelect.options[newToDoCatSelect.selectedIndex].text
    console.log(selectedCategoryName)
    const selectedCategoryId = getCategoryId(
      categories,
      selectedCategoryName.trim()
    )
    // newToDoCatSelect is the select for this modal
    let toDoObject = {
      todoID: todos.length,
      todoText: newToDo,
      todoCategory: selectedCategoryId,
      todoDueDate: "TBD",
      todoComplete: false,
      todoDeleted: false,
    }
    todos.push(toDoObject)
    console.log(todos)
    toDoList.innerHTML = "" // Clears the toDoList so the new one can be added
    renderToDos(todos)
    selectCategoryModal.style.display = "none"
  }
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
