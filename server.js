// Oct 16 recording
const express = require("express")
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
