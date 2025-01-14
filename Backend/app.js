const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToDb = require("./db/db.js")
connectToDb();
const userRoutes = require("./routes/user.route.js")
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/users',userRoutes)

module.exports = app;
