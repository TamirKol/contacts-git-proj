import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    todoCount: 0,
    doneCount: 0,
    filterBy: todoService.getDefaultFilter(),
    isLoading: false
}

export function todoReducer(state = initialState, action = {}) {
    let todos
    let doneCount

    // Todos
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos, todoCount: action.todoCount, doneCount: action.doneCount }

        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            doneCount = todos.filter(todo => todo.isDone).length
            return { ...state, todos, doneCount }

        // Filter
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        // Is Loading
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}