import { contactService } from "../../services/contact.service.js"
import { userService } from "../../services/user.service.js"
import { ADD_CONTACT, REMOVE_CONTACT, SET_FILTER_BY, SET_IS_LOADING, SET_CONTACTS, UPDATE_CONTACT } from "../reducers/contact.reducer.js"
import { store } from '../store.js'

export function loadContacts(sortBy) {
    const { filterBy } = store.getState().contactModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return contactService.query(filterBy, sortBy)
        .then(contacts => {
            store.dispatch({ type: SET_CONTACTS, contacts: contacts.contactsToDisplay, contactCount: contacts.contactCount, doneCount: contacts.doneCount })
        })
        .catch(err => {
            console.log('car action -> Cannot load contacts', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeContact(contactId) {
    return contactService.remove(contactId)
        .then(() => {
            store.dispatch({ type: REMOVE_CONTACT, contactId })
        })
        .catch(err => {
            console.log('car action -> Cannot remove contact', err)
            throw err
        })
}

export function toggleContact(contactToToggle) {
    return contactService.save(contactToToggle)
        .then((savedContact) => {
            store.dispatch({ type: UPDATE_CONTACT, contact: savedContact })
        })
        .catch(err => {
            console.log('Cannot toggle contact', err)
            throw err
        })
}

export function addContact(contactToAdd, loggedinUser) {
    return contactService.save(contactToAdd)
        .then(savedContact => {
            store.dispatch({ type: ADD_CONTACT, contact: savedContact })
            if (loggedinUser) {
                userService.addActivity(loggedinUser._id, contactToAdd)
                    .catch(err => {
                        console.error('Error adding activity:', err)
                    })
            }
        })
        .catch(err => {
            console.log('Cannot add contact', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}