import { contactReducer } from "./reducers/contact.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({
    contactModule: contactReducer,
    userModule: userReducer
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

export const store = createStore(rootReducer, middleware)

window.gStore = store
