const { NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignUp.jsx'

export function AppHeader() {
    const todoCount = useSelector(storeState => storeState.todoModule.todoCount)
    const doneCount = useSelector(storeState => storeState.todoModule.doneCount)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot logout')
            })
    }

    function getFinishedTodos() {
        // const doneTodo = todos.reduce((acc, todo) => {
        //     if (todo.isDone) acc++
        //     return acc
        // }, 0)
        if (!todoCount) return 0
        return (doneCount / todoCount) * 100
    }

    const progress = getFinishedTodos().toFixed(2);

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/todo">Todos</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
            <h1>Todos App</h1>
            {user && (
                <section className="user-info">
                    <h3>
                        {user.fullname}, <span>you have finished</span>
                    </h3>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}>
                            <span>{progress}%</span>
                        </div>
                    </div>
                    <button onClick={onLogout}>Logout</button>
                </section>
            )}
            {!user && (
                <section className="user-info">
                    <LoginSignup />
                </section>
            )}
        </header>
    );
}