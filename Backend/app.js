const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToDb = require("./db/db.js")
connectToDb();
app.use(cors());


app.get("/", (req, res) => {
  res.send("hello world");
  console.log("Hello World");
});

module.exports = app;
