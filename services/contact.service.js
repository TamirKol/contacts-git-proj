import fs from 'fs'
import { utilService } from './util.service.js'
let gContacts = utilService.readJsonFile('data/contact.json')
const PAGE_SIZE = 4

export const contactService = {
    query,
    // get,
    // remove,
    // save,
}

function query(filterBy, sortBy) {
    let contactsToDisplay = gContacts
    console.log('in server service', contactsToDisplay)

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        contactsToDisplay = contactsToDisplay.filter(todo => regExp.test(todo.txt))
    }
   
    contactsToDisplay = getSortedContacts(contactsToDisplay, sortBy)
    return Promise.resolve(contactsToDisplay)
}

 
function getSortedContacts(contactsToDisplay, sortBy) {
    if (sortBy.type === 'firstName') {
        contactsToDisplay.sort((b1, b2) => {
            const title1 = b1.firstName.toLowerCase()
            const title2 = b2.firstName.toLowerCase()
            return sortBy.desc * title2.localeCompare(title1)
        })
    } else {
        contactsToDisplay.sort(
            (b1, b2) => sortBy.desc * (b2[sortBy.type] - b1[sortBy.type])
        )
    }
    return contactsToDisplay
}