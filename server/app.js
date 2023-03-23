const express = require("express");
const connectToDB = require("./config/db")
const todoRoute = require("./route/todoRoute")
const userRoute = require("./route/userRoute")
var cookieParser = require('cookie-parser')
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser())

connectToDB()

app.use("/", todoRoute, userRoute)

module.exports = app;