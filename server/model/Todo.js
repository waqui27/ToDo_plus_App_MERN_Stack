const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: {
        type: String,
        require: [true, "Title is required"],
        trim: true,
        unique: true,
    },
    tasks: [{
        task: String,
        status: {
            type: Boolean,
            default: false
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
})

module.exports = mongoose.model("Todo", TodoSchema)