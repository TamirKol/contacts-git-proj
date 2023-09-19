import { contactService } from "../../services/contact.service.js"

export const SET_CONTACTS = 'SET_CONTACTS'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    contacts: [],
    // contactCount: 0,
    // doneCount: 0,
    filterBy: contactService.getDefaultFilter(),
    isLoading: false
}

export function contactReducer(state = initialState, action = {}) {
    let contacts
    let doneCount

    // Contacts
    switch (action.type) {
        case SET_CONTACTS:
            return { ...state, contacts: action.contacts }

        case REMOVE_CONTACT:
            contacts = state.contacts.filter(contact => contact._id !== action.contactId)
            return { ...state, contacts }

        case ADD_CONTACT:
            contacts = [...state.contacts, action.contact]
            return { ...state, contacts }

        case UPDATE_CONTACT:
            contacts = state.contacts.map(contact => contact._id === action.contact._id ? action.contact : contact)
            doneCount = contacts.filter(contact => contact.isDone).length
            return { ...state, contacts, doneCount }

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