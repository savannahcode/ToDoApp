const express = require("express")
const app = express()
app.use(express.json())

let todos = []
let categories = []

// GET TODOS
app.get("/todos", (req, res) => {
  res.json(todos)
})

// POST TODO
app.post("/todos", (req, res) => {
  todos.push(req.body)
  res.json(req.body)
})

// PUT TODO (update)
app.put("/todos/:id", (req, res) => {
  const id = req.params.id
  const todo = todos.find((t) => t.id === id)
  if (todo) {
    Object.assign(todo, req.body)
    res.json(todo)
  } else {
    res.status(404).json({ error: "Todo not found" })
  }
})

// DELETE TODO
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id
  todos = todos.filter((t) => t.id !== id)
  res.json({ id })
})

// GET ALL TODOS for a CATEGORY
app.get("/categories/:id/todos", (req, res) => {
  const id = req.params.id
  const todosForCategory = todos.filter((t) => t.categoryId === id)
  res.json(todosForCategory)
})

// GET CATEGORIES
app.get("/categories", (req, res) => {
  res.json(categories)
})

// POST CATEGORIES
app.post("/categories", (req, res) => {
  categories.push(req.body)
  res.json(req.body)
})

// PUT CATEGORIES (update)
app.put("/categories/:id", (req, res) => {
  const id = req.params.id
  const category = categories.find((c) => c.id === id)
  if (category) {
    Object.assign(category, req.body)
    res.json(category)
  } else {
    res.status(404).json({ error: "Category not found" })
  }
})

// DELETE CATEGORIES
app.delete("/categories/:id", (req, res) => {
  const id = req.params.id
  todos = todos.filter((t) => t.categoryId !== id) // remove todos in this category
  categories = categories.filter((c) => c.id !== id)
  res.json({ id })
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
