import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'contactDB'
const PAGE_SIZE = 4

_createContacs()

const contactsList = [
    {
        "id": 101,
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "phone": "0521346789",
        "desc": "John is someone who does this and that, lives here and there."
    },
    {
        "id": 102,
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@example.com",
        "phone": "0559876543",
        "desc": "Alice is a professional in her field, residing in a cozy little town."
    },
    {
        "id": 104,
        "firstName": "Ella",
        "lastName": "Johnson",
        "email": "ella.johnson@example.com",
        "phone": "0508765432",
        "desc": "Ella loves to travel and explore new places around the world."
    }
]

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}, sortBy) {
    return storageService.query(STORAGE_KEY)
        .then(contacts => {
            const contactsData = {
                contactCount: contacts.length,
                doneCount: contacts.filter(contact => contact.isDone).length,
                contactsToDisplay: []
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                contacts = contacts.filter(contact => regExp.test(contact.txt))
            }
            if (filterBy.isDone) {
                if (filterBy.isDone === 'false') {
                    contacts = contacts.filter(contact => contact.isDone === false)
                } else {
                    contacts = contacts.filter(contact => contact.isDone === true)
                }
            }
            contacts = getSortedContacts(contacts, sortBy)
            if (filterBy.pageIdx != - undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                contacts = contacts.slice(startIdx, PAGE_SIZE + startIdx)
            }
            contactsData.contactsToDisplay = contacts
            return contactsData
        })
}

function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}

function remove(contactId) {
    return storageService.remove(STORAGE_KEY, contactId)
}

function save(contact) {
    if (contact._id) {
        return storageService.put(STORAGE_KEY, contact)
    } else {
        contact.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, contact)
    }
}

function getSortedContacts(contactsToDisplay, sortBy) {
    if (sortBy.type === 'txt') {
        contactsToDisplay.sort((b1, b2) => {
            const title1 = b1.txt.toLowerCase()
            const title2 = b2.txt.toLowerCase()
            return sortBy.desc * title2.localeCompare(title1)
        })
    } else {
        contactsToDisplay.sort(
            (b1, b2) => sortBy.desc * (b2[sortBy.type] - b1[sortBy.type])
        )
    }
    return contactsToDisplay
}

function getDefaultFilter() {
    return { txt: '', isDone: '', pageIdx: 0 }
}

function getDefaultSort() {
    return { type: '', desc: -1 }
}

function getEmptyContact() {
    return {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        desc: ''
    }
}


function _createContacs() {
    let contacts = storageService.loadFromStorage(STORAGE_KEY)
    if (!contacts || !contacts.length) {
        contacts = contactsList
        storageService.saveToStorage(STORAGE_KEY, contacts)
    }
}