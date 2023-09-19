export function TodoPreview({ todo, onToggleTodo }) {
    return (
        <article
            className="todo-preview"
        >
            <span
                onClick={() => onToggleTodo(todo)}
                className={(todo.isDone) ? 'done' : ''}
            >
                {todo.txt}
            </span>
            {todo.owner && <p>Owner: {todo.owner && todo.owner.fullname}</p>}
        </article>
    )
}