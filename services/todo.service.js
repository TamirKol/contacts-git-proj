import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'
const PAGE_SIZE = 4

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}, sortBy) {
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            const todosData = {
                todoCount: todos.length,
                doneCount: todos.filter(todo => todo.isDone).length,
                todosToDisplay: []
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }
            if (filterBy.isDone) {
                if (filterBy.isDone === 'false') {
                    todos = todos.filter(todo => todo.isDone === false)
                } else {
                    todos = todos.filter(todo => todo.isDone === true)
                }
            }
            todos = getSortedTodos(todos, sortBy)
            if (filterBy.pageIdx != - undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                todos = todos.slice(startIdx, PAGE_SIZE + startIdx)
            }
            todosData.todosToDisplay = todos
            return todosData
        })
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getSortedTodos(todosToDisplay, sortBy) {
    if (sortBy.type === 'txt') {
        todosToDisplay.sort((b1, b2) => {
            const title1 = b1.txt.toLowerCase()
            const title2 = b2.txt.toLowerCase()
            return sortBy.desc * title2.localeCompare(title1)
        })
    } else {
        todosToDisplay.sort(
            (b1, b2) => sortBy.desc * (b2[sortBy.type] - b1[sortBy.type])
        )
    }
    return todosToDisplay
}

function getDefaultFilter() {
    return { txt: '', isDone: '', pageIdx: 0 }
}

function getDefaultSort() {
    return { type: '', desc: -1 }
}

function getEmptyTodo() {
    return {
        _id: '',
        txt: '',
        isDone: false,
        createdAt: Date.now()
    }
}