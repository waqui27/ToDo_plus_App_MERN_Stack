require("dotenv").config();
const mongoose = require("mongoose")
const connectToDB = () => {
    mongoose.set("strictQuery", false);
    mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
        console.log(`Connected to DB: ${conn.connection.host}`)
    })
    .catch((err) => {
        console.log(err.message)
        process.exit(1)
    })
}

module.exports = connectToDB;