//import "styles.css"

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoComplete: true,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoComplete: false,
  },
]

/* if someone types into "Enter new class" text field
and hits enter or the + button the addToDo function should be called. */
const inputVal = document.querySelector(".inputCheck")
inputVal.addEventListener("keydown", checkEnter)
function checkEnter(event) {
  if (event.key === "Enter" || event.keyCode === "13") {
    console.log(inputVal.value)
  }
}

/*
The function addToDo() should create a new object in the toDos array and should
create an li item in the toDoList class.
Have the toDoID be set to one more than the last item in the array.
toDoComlete should automatically be set to false.
toDoText should be whatever the user input is.
*/

function addToDo() {}
