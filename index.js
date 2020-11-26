const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const compression = require("compression");
let rawdata = fs.readFileSync("hnData.json");
var session = require("express-session");
let hnData = JSON.parse(rawdata);

const { PORT = 4000, APP_SECRET = "stupid default" } = process.env;

const app = express();

// CROSS-ORIGIN RESOURCE SHARING
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
  })
);

app.use(
  session({
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// logging middleware
app.use(morgan("common"));

app.use(compression());

//TODO: error middleware
app.use((error, req, res, next) => {
  res.send(error.message);
});

app.get("/", (req, res) => {
  if (!req.session.userId) {
    req.session.userId = 1292387213;
    res.send("<h1>welcome!</h1>");
  } else {
    res.send("<h1>welcome back!</h1>");
  }
});

app.get("/login", (req, res) => {
  req.session.favouriteProduct = "xbox";
  res.send("logged in without you knowing because im a cookie");
});

app.get("/hello", (req, res) => {
  res.send("Hello to you to!");
});

app.listen(PORT, () =>
  console.log("server successfully running on port " + PORT)
);
