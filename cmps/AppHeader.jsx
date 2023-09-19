const { NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignUp.jsx'

export function AppHeader() {
    const contactCount = useSelector(storeState => storeState.contactModule.contactCount)
    const doneCount = useSelector(storeState => storeState.contactModule.doneCount)
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

    function getFinishedContacts() {
        // const doneContact = contacts.reduce((acc, contact) => {
        //     if (contact.isDone) acc++
        //     return acc
        // }, 0)
        if (!contactCount) return 0
        return (doneCount / contactCount) * 100
    }

    const progress = getFinishedContacts().toFixed(2);

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/contact">Contacts</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
            <h1>Contacts App</h1>
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