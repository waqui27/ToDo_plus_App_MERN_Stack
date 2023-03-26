const express = require("express");
const connectToDB = require("./config/db")
const cors = require("cors")
const todoRoute = require("./route/todoRoute")
const userRoute = require("./route/userRoute")
var cookieParser = require('cookie-parser')
const app = express();

connectToDB()

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// const corsOptions = {
//     origin: 'https://todo-plus.vercel.app',
//     credentials: true
// }

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser())

app.use("/", todoRoute, userRoute)

module.exports = app;