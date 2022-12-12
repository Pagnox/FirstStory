const express = require("express");
const app = express();
const port = 5555;

const bodyParser = require("body-parser");
const fs = require("fs");

var data = fs.readFileSync("dataJson.json");
var dataJson = JSON.parse(data)
var users = [];

database = () => {
    dataJson = users;
    var x = JSON.stringify(dataJson, null, 2);
    fs.writeFile("dataJson.json", x, () => {

    });
};

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ============== Routes ============== 

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the server!");
});

app.get("/users-form", (req, res) => {
    res.render("form");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    users.push(req.body);
    database();

    res.redirect("/users-list")
});

app.get("/users-list", (req, res) => {
    res.render("list", { users });
});

app.get("/delete/:index", (req, res) => {
    users.splice(req.params.index, 1);
    database();

    res.redirect("/users-list");
});

app.get("/users-edit/:index", (req,res) => {
    const user = users[req.params.index];

    res.render("edit", { user, index: req.params.index });
});

app.post("/edit/:index", (req, res) => {
    users[req.params.index].name = req.body.name;
    users[req.params.index].phone = req.body.phone;
    users[req.params.index].children = req.body.children;
    database();

    res.redirect("/users-list");
});

app.listen(port, () => {
    console.log(`Server successfully initialized! Port: ${port}`)
});