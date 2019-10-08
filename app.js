const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/movies", (req, res) => {
    res.send("Movies")
})

app.get("/action", (req, res) => {
    res.send("Action")
})

app.listen(PORT, () => {
    console.log(`Express has started on Port ${PORT}`)
})