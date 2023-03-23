const express = require("express")
const auth = require("../middleware/auth")
const {home, createTodoController, getTodosController, getTodoController, deleteTodoController, createTaskTodoController, deleteTaskTodoController, editTaskTodoController, editTitleTodoController, checkUncheckTaskTodoController} = require("../controller/todoController")

const router = express.Router();

router.get("/", home);
router.post("/todo/createTodo", auth, createTodoController)
router.get("/todo/getTodos", auth, getTodosController)
router.get("/todo/getTodo/:todoId", getTodoController)
router.delete("/todo/deleteTodo/:todoId", deleteTodoController)
router.put("/todo/editTitleTodo/:todoId", editTitleTodoController)
router.post("/todo/createTaskTodo/:todoId", createTaskTodoController)
router.put("/todo/deleteTaskTodo/", deleteTaskTodoController)
router.put("/todo/editTaskTodo/:todoId", editTaskTodoController)
router.post("/todo/checkUncheckTaskTodo/:todoId", checkUncheckTaskTodoController)

module.exports = router;
