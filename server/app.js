const express = require("express");
const connectToDB = require("./config/db")
//const cors = require("cors")
const todoRoute = require("./route/todoRoute")
const userRoute = require("./route/userRoute")
var cookieParser = require('cookie-parser')
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

//const corsOptions = {
//    origin: [
//        'https://todo-plus.vercel.app',
//        'http://localhost:3000'
//    ],
//    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
//    credentials: true,
//    maxAge: 600,
//    exposedHeaders: ['*', 'Authorization', ]
//};
//
//app.use(cors(corsOptions));

app.use(cookieParser())

connectToDB()

app.use("/", todoRoute, userRoute)

module.exports = app;