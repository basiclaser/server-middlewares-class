const express = require("express");
const cors = require("cors");
const fs = require("fs");
let rawdata = fs.readFileSync("hnData");
let hnData = JSON.parse(rawdata);

const app = express();
app.use(cors()); // <- middleware

app.get("/", (req, res) => {
  res.json(hnData);
});

app.get("/hello", (req, res) => {
  res.send("Hello to you to!");
});

app.listen("4000", () =>
  console.log("server successfully running on port 4000")
);
