const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Todo = require("../model/Todo")
const mongoose = require("mongoose")

exports.home = (_req, res) => {
    res.send("Welcome to my Todo app.")
}

// createTodoController
exports.createTodoController = async (req, res) => {
    try {
        const {title} = req.body
        const decode = req.user
        const id = decode.id
        const newTodo = new Todo({
            title,
            // user: new mongoose.Types.ObjectId({_id:id}),
            user:new mongoose.Types.ObjectId(id)
        })

        if(!title) {
            throw new Error("Todo title required")
        }

        const createdNewTodo = await newTodo.save()
        res.status(200).json({
            success: true,
            message: "Todo created Successfully",
            createdNewTodo
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
    })
}
}

// getTodosController
exports.getTodosController = async (req, res) => {
    try {
        const decode = req.user
        const id = decode.id
        const allTodos = await Todo.find({user:id})
    res.status(200).json({
        success: true,
        message: "All Todos are shown",
        allTodos
    })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// getTodoController
exports.getTodoController = async (req, res) => {
    try {
        const {todoId} = req.params
        const aTodo = await Todo.findById(todoId)
        if(!aTodo) {
            throw new Error("No such Todo found")
        }
        res.status(200).json({
            success: true,
            aTodo
    })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// deleteTodoController
exports.deleteTodoController = async (req, res) => {
    try {
        const {todoId} = req.params
        const aTodo = await Todo.findByIdAndDelete(todoId)

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
    })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// -editTitleTodoController
exports.editTitleTodoController = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const newTitle = req.body.title;

        const aTodo = await Todo.findOneAndUpdate({_id: todoId}, {$set: {title: newTitle}}, {new: true});
        if(!aTodo) {
            throw new Error('Todo not found')
        }
        res.status(200).json({
            success: true,
            message: "Todo title updated successfully",
            aTodo
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// createTaskTodoController
exports.createTaskTodoController = async (req, res) => {
    try {
        const todoId = req.params.todoId
        const aTodo = await Todo.findById(todoId)

        if(!aTodo) return res.status(400).send("No todo exist")

        const {text} = req.body

        const trimText = text.replace(/\s\s+/g, ' ')
        aTodo.tasks.push({task: trimText})
        await aTodo.save()
        res.status(200).json({
            success: true,
            message: "task created successfully",
            aTodo,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

// deleteTaskTodoController
exports.deleteTaskTodoController = async (req, res) => {
    try {
        const {todoId, taskId} = req.body

        Todo.updateOne({_id: todoId}, {$pull: {tasks: {_id: taskId}}}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });


        res.status(200).json({
            success: true,
            message: "task deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
// deleteTaskTodoController
//exports.deleteTaskTodoController = async (req, res) => {
//        const todoId = req.params.todoId
//        const aTodo = await Todo.findById(todoId)
//
//        if(!aTodo) return res.status(400).send("No todo exist")
//
// aTodo.tasks.splice(req.body.index, 1)
//        await aTodo.save()
//        res.status(200).json({
//            success: true,
//            message: "task deleted successfully",
//            aTodo
//        })
//}

// editTaskTodoController
exports.editTaskTodoController = async (req, res) => {
    try {
        const todoId = req.params.todoId
        const aTodo = await Todo.findById(todoId)

        if(!aTodo) return res.status(400).send("No todo exist")

        const {editText} = req.body

        // const trimEditText = editText.replace(/\s\s+/g, ' ')

        aTodo.tasks[req.body.index].task = editText

        await Todo.findByIdAndUpdate(todoId, aTodo)
        res.status(200).json({
            success: true,
            message: "task edited successfully",
            aTodo
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

exports.checkUncheckTaskTodoController = async (req, res) => {
    try {
        const todoId = req.params.todoId
        const taskIndex = req.body.index
        const newStatus = req.body.status

        const aTodo = await Todo.findById(todoId)
        if(!aTodo) {
            throw new Error("Todo not found")
        }
        aTodo.tasks[taskIndex].status = newStatus
        await Todo.findByIdAndUpdate(todoId, aTodo)
        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            aTodo
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}