import { contactReducer } from "./reducers/contact.reducer.js"

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({
    contactModule: contactReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

export const store = createStore(rootReducer, middleware)

window.gStore = store
