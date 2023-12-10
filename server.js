const express = require("express")
const app = express()
app.use(express.json())

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

/// GET TODOS
app.get("/todos", (req, res) => {
  res.json(todos)
})

// GET SINGLE TODO
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id)
  const todo = todos.find((t) => t.todoID === todoId)

  if (todo) {
    res.json(todo)
  } else {
    res.status(404).json({ error: "Todo not found" })
  }
})

// POST TODO
app.post("/todos", (req, res) => {
  const newTodo = req.body
  newTodo.todoID = todos.length
  todos.push(newTodo)
  res.json(newTodo)
})

// PUT TODO (update)
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id)
  const updatedTodo = req.body
  const index = todos.findIndex((t) => t.todoID === todoId)

  if (index !== -1) {
    // Merge existing TODO with updated properties
    todos[index] = { ...todos[index], ...updatedTodo }
    res.json(todos[index])
  } else {
    res.status(404).json({ error: "Todo not found" })
  }
})

// PUT CATEGORY (update)
app.put("/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id)
  const updatedCategory = req.body
  const index = categories.findIndex((c) => c.id === categoryId)

  if (index !== -1) {
    // Merge existing category with updated properties
    categories[index] = { ...categories[index], ...updatedCategory }
    res.json(categories[index])
  } else {
    res.status(404).json({ error: "Category not found" })
  }
})

// DELETE TODO
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id)
  todos = todos.filter((t) => t.todoID !== todoId)
  res.json({ id: todoId })
})

// GET ALL TODOS for a CATEGORY
app.get("/categories/:id/todos", (req, res) => {
  const categoryId = parseInt(req.params.id)
  const todosForCategory = todos.filter(
    (todo) => todo.todoCategory === categoryId
  )
  res.json(todosForCategory)
})

// GET CATEGORIES
app.get("/categories", (req, res) => {
  res.json(categories)
})

// GET SINGLE CATEGORY
app.get("/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id)
  const category = categories.find((c) => c.id === categoryId)

  if (category) {
    res.json(category)
  } else {
    res.status(404).json({ error: "Category not found" })
  }
})

// POST CATEGORIES
app.post("/categories", (req, res) => {
  const newCategory = req.body
  newCategory.id = categories.length + 1
  categories.push(newCategory)
  res.json(newCategory)
})

// DELETE CATEGORIES
app.delete("/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id)
  todos = todos.filter((todo) => todo.todoCategory !== categoryId)
  categories = categories.filter((category) => category.id !== categoryId)
  res.json({ id: categoryId })
})

app.listen(3000, () => console.log("Server running on port 3000"))

// Oct 16 recording - example code for api server
/*const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World! This is Sav")
})

app.get("/about", (req, res) => {
  res.send("About Page. This is a new route")
})

app.post("/", (req, res) => {
  res.send("Got a POST request")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/
