const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const User = require("./models/user.js");
const { userSchema } = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/education";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// middleware function to validate listing schema using JOI (Error handling on the server side)
validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        console.log(errMsg);
        res.send(errMsg);
        // throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/assets")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", validateUser, async (req, res) => {
    let { user } = req.body;
    const newUser = new User(user);
    await newUser.save();
    res.send("User Created");
});

app.listen("8080", (err, res) => {
    console.log("Server is running on port 8080");
});