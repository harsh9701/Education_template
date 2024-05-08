const express = require("express");
const app = express();
const path = require("path");

// middleware
app.use(express.static(path.join(__dirname, "/public/bootstrap/css")));
app.use(express.static(path.join(__dirname, "/public/bootstrap/js")));
app.use(express.static(path.join(__dirname, "/public/assets")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.send("this route will work");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.listen("8080", (err, res) => {
    console.log("Server is running on port 8080");
})









