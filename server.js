//use 'fetch' to get the data from the local storage to find if there is already a data or not
// 3 inputs for the cell number
//'log-in'page when '/' is called
//'sign-up'page

const express = require("express");
const app = express();
const path = require("path");
const port = 3001;
const _ = require("lodash");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

//direct to the welcome page
app.get("/welcome", (req, res) => {
  const name = req.query.name;
  res.render("welcome", { name: name });
});

//direct to the find ID page
app.get("/findID", (req, res) => {
  res.render("findID");
});

//direct to the find PW page
app.get("/findPW", (req, res) => {
  res.render("findPW");
});

app.post("/signup/form", (req, res) => {
  // const signupInfo = req.body;
  res.status(200);
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;
  console.log(`Login attempt: Email=${id}, Password=${password}`);
  res.status(200);
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
