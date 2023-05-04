import React, {useState, useEffect} from "react"
import axios from "axios";

const BASE_URL = "https://todoplusappmernstack-production.up.railway.app"

const Todo = () => {
    const [todos, setTodos] = useState()

    // Create Todo
    const handleCreateTodo = async () => {
        const title = prompt("Write what to do")
        const res = await axios.post(`${BASE_URL}/todo/createTodo`, {
            title: title,
        }, {
            withCredentials: true, credentials: 'include'
        })
        if(res.data.success) {
            fetchTodos()
        }
    }

    //Edit Todo
    const handleTodoEdit = async (todo) => {
        try {
            const todoTitle = prompt("Enter you new name", `${todo.title}`)


            if(todoTitle) {
                const resp = await axios.put(`${BASE_URL}/todo/editTitleTodo/${todo._id}`, {
                    title: todoTitle
                });
                if (resp.data.success) {
                    setAtodo(resp.data?.aTodo)
                    fetchTodos()
                }
            }

        } catch (error) {
            console.log(error)
        }

    };

    // Delete Todo
    const handleTodoDelete = async (todo, index) => {
        try {
            const resp = await axios.delete(`${BASE_URL}/todo/deleteTodo/${todo._id}`)
//            console.log(resp);
            if (resp.data.success) {
                document.getElementById(`todo-${index}`).style.border = ``;
                fetchTodosWhenDeleted();

            }
        } catch (error) {
            console.log(error)
        }

    }


    //Getting all todos tasks
    const [tasks, setTasks] = useState();
    const [atodo, setAtodo] = useState();
    const [atodoIndex, setAtodoIndex] = useState();


    const getTasksAtodoIndex = (todo, index) =>{
        setTasks(todo.tasks)
        setAtodo(todo)
        setAtodoIndex(index)

    }

    //Create Tasks
    const handleCreateTask = async (todo) => {
        const text  =  prompt("Write your Task!")
        let res
        if(text) {
            res = await axios.post(`${BASE_URL}/todo/createTaskTodo/${todo._id}`, {
                text: text
            })
        }

        if(res.data.success) {
            fetchTodos()
        }
    }
    // Task edit
    const handleTaskEdit = async (todo, index) => {
        try {
            const taskTitle = prompt("Enter you tasks", `${tasks[index].task}`)


            if(taskTitle) {
                const resp = await axios.put(`${BASE_URL}/todo/editTaskTodo/${todo._id}`, {
                    editText: taskTitle,
                    index: index
                });
//                console.log(resp);
                if (resp.data.success) {
                    fetchTodos();
                }
            }

        } catch (error) {
            console.log(error)
        }

    };

    const handleTaskDelete = async ( tasks ) => {
        try {
            const taskId = tasks._id
            const todoId = atodo._id
            const res = await axios.put(`${BASE_URL}/todo/deleteTaskTodo/`, {
                taskId: taskId,
                todoId: todoId
            })
            console.log(res.data.success)

            if(res.data.success) {
                fetchTodos()
            }

        } catch(error) {
            console.log(error)
        }
    }


    const handleTaskCheck = async (todo, index, checkbox) => {
        const status = checkbox.checked
//        console.log(status)
//        console.log(checkbox)

        const res = await axios.post(`${BASE_URL}/todo/checkUncheckTaskTodo/${todo._id}`, {
            index: index,
            status: status
        })
        console.log(res)

        if(res.data.success) {

            fetchTodos()
        }
    }

    const fetchTodos = async () => {
        const res = await axios.get(`${BASE_URL}/todo/getTodos`, {
            withCredentials: true, credentials: 'include'
        });
        setTodos(res.data.allTodos);
        if (typeof atodoIndex !== "undefined") {
                setTasks(res.data.allTodos[atodoIndex]?.tasks);
        }

    };

    const fetchTodosWhenDeleted = async () => {
        const res = await axios.get(`${BASE_URL}/todo/getTodos`, {
            withCredentials: true, credentials: 'include'
        });
        setAtodo(null)
        setTasks(null)
        setTodos(res.data.allTodos);
//        if (res.data.allTodos[atodoIndex]?.tasks) {
//            setTasks(res.data.allTodos[atodoIndex].tasks);
//        }
//        if((res.data.allTodos?.length === 0) || (res.data.allTodos?.length === atodo.length -1)) {
//            setTasks(res.data.allTodos[atodoIndex - 1]?.tasks);
//        }
//        setTasks(res.data.allTodos[atodoIndex]?.tasks)

    };



    useEffect(() => {
        fetchTodos()
    },[])

    useEffect(() => {
        fetchTodosWhenDeleted()
    },[])

    //Change border of todo list
    const [selectTodo, setSelectTodo] = useState(null)

    function changeBorder(index, color) {
//        console.log(selectTodo)
        if((selectTodo !== todos.length) && (selectTodo !== null)) {
            document.getElementById(`todo-${selectTodo}`).style.border = ''
        }
//        console.log(index)
//        console.log(selectTodo)
        setSelectTodo(index)
//        console.log(selectTodo)
        document.getElementById(`todo-${index}`).style.border = `solid 3px ${color}`;
    }

return(
        <div className="grow italic flex flex-col justify-start items-center md:flex-row md:items-start bg-gray-400">
        <div>
            <button className={"drop-shadow-2xl mt-8 mx-4 md:mt-2 mb-4 rounded-md bg-green-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-green-500"} onClick={() => handleCreateTodo()}>Add What To Do +</button>
        </div>
        <div>
            {todos && todos.map((todo, index) => (
                    <div key={index} id={`todo-${index}`} onClick={() => changeBorder(index, 'black')} className="rounded shadow-xl drop-shadow-md max-w-lg border-t-2 border-gray-200 hover:scale-105 mx-4 my-2">
                        <div onClick={() => getTasksAtodoIndex(todo, index)} className="flex flex-row gap-8 p-2 justify-between cursor-pointer">
                            <h1 className="break-words text-[15px] lg:text-lg font-semibold text-black" >{todo.title}</h1>
                            <div className="flex items-center gap-2">
                                <button className="rounded-md bg-yellow-600 px-2 lg:px-2.5 lg:py-1.5 text-sm lg:text-base font-semibold leading-7 text-white hover:bg-yellow-500" onClick={() => handleTodoEdit(todo)}>Edit</button>
                                <button className="rounded-md bg-gray-600 px-2 lg:px-2.5 lg:py-1.5 text-sm lg:text-base font-semibold leading-7 text-white hover:bg-gray-500" onClick={() => {
                                    if(window.confirm(`DELETE TODO : "${todo.title} from the database"`)) {
                                        handleTodoDelete(todo, index)
                                    }
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>


                    ))}
        </div>

            <div className={"m-6 p-2 rounded-lg p-6 shadow-2xl drop-shadow-md border-t-2 border-gray-200"} >
            {atodo ? (
            <div>
                <h1 className={"break-words text-lg font-semibold text-black max-w-md"}>{atodo.title}</h1>
                <button className={"mt-4 md:mt-2 mb-4 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"} onClick={() => handleCreateTask(atodo)} >Add Task +</button>
            </div>) : (<div><button className={"mt-12 md:mt-2 mb-4 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"}  >Select or Add Todo First</button></div>)}
            {tasks && tasks.map((tasks, index) => (
                <div key={index} className="flex flex-row gap-8 my-4 mx-2 max-w-lg justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 md:h-5 md:w-5">
                            <input className="h-4 w-4 md:h-5 md:w-5 accent-indigo-600" type="checkbox" id={`task-${index}`} name={`task-${index}`} checked= {tasks.status} onChange={(e) => handleTaskCheck(atodo, index, e.target)} />
                        </div>
                        <p className={"break-words text-md font-semibold text-black"}>{tasks.task}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="rounded-md bg-yellow-600 px-1.5 text-xs font-semibold leading-7 text-white hover:bg-yellow-500" onClick={() => handleTaskEdit(atodo, index)}>Edit</button>
                        <button className="rounded-md bg-gray-600 px-1.5 text-xs font-semibold leading-7 text-white hover:bg-gray-500" onClick={() => handleTaskDelete(tasks)}>Delete</button>
                    </div>
                </div>

            ))}
        </div>

    </div>
    )
}


export default Todo