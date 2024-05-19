const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", async (req, res) => {
    let { user } = req.body;
    let isExistUser = await User.findOne({ username: user.name });

    if(!isExistUser) {
        return res.send(`User doesn't exist with this username - ${user.name}`);
    }

    bcrypt.compare(user.password, isExistUser.password, (err, result) => {
        if(err) {
            res.send("Something went wrong");
        }
        if(result) {
            let token = jwt.sign({ email: isExistUser.email }, "shhhhhhhhh");
            res.cookie("token", token);
            res.send("Login");
        } else {
            res.send("Wrong Password");
        }
    })
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", validateUser, async (req, res) => {
    let { user } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
            user.password = hash;
            const newUser = new User(user);
            await newUser.save();

            let token = jwt.sign({ email: newUser.email }, "shhhhhhhhh");
            res.cookie("token", token);

            res.redirect("/");
        });
    });
});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

app.get("/academic/9th", (req, res) => {
    res.send("This route for 9th");
});

app.get("/academic/10th", (req, res) => {
    res.send("This route for 10th");
});

app.get("/academic/11th", (req, res) => {
    res.send("This route for 11th");
});

app.get("/academic/12th", (req, res) => {
    res.send("This route for 12th");
});

app.get("/competitive/ssc", (req, res) => {
    res.send("This route for SSC");
});

app.get("/competitive/upsc", (req, res) => {
    res.send("This route for UPSC");
});

app.get("/competitive/bank", (req, res) => {
    res.send("This route for BANK");
});

app.get("/competitive/other", (req, res) => {
    res.send("This route for OTHER");
});

app.get("/notes", (req, res) => {
    res.send("This route for NOTES");
});

app.get("/services", (req, res) => {
    res.send("This route for SERVICES");
});

app.listen("8080", (err, res) => {
    console.log("Server is running on port 8080");
});