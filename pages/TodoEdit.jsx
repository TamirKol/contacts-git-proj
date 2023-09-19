import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.getById(params.todoId)
            .then(setTodoToEdit)
            .catch(err => {
                console.log('Had issued in todo edit:', err);
                navigate('/todo')
                showErrorMsg('Todo not found!')
            })
    }

    function handleChange({ target }) {
        const value = target.value
        setTodoToEdit(prevTodo => ({ ...prevTodo, txt: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        todoToEdit.isDone = false
        todoService.save(todoToEdit)
            .then(() => navigate('/todo'))
            .catch(err => {
                showErrorMsg('Cannot save todo', err)
            })
    }

    const { txt } = todoToEdit

    return (
        <section className="todo-edit">
            <h2>Edit Todo</h2>

            <form onSubmit={onSaveTodo}>
                <input
                    type="text"
                    value={txt}
                    onChange={handleChange}
                />
                <button>Save</button>
                {/* <button onClick={onAddTodo}>Add Todo</button> */}
            </form>
        </section>
    )
}