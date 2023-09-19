import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'contactDB'
const PAGE_SIZE = 4


export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    getDefaultFilter,
    getDefaultSort
}

const contactsList = [
    {
        "_id": 101,
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "phone": "0521346789",
        "desc": "John is someone who does this and that, lives here and there."
    },
    {
        "_id": 102,
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@example.com",
        "phone": "0559876543",
        "desc": "Alice is a professional in her field, residing in a cozy little town."
    },
    {
        "_id": 104,
        "firstName": "Ella",
        "lastName": "Johnson",
        "email": "ella.johnson@example.com",
        "phone": "0508765432",
        "desc": "Ella loves to travel and explore new places around the world."
    },
    {
        "_id": 110,
        "firstName": "Puki",
        "lastName": "Shmuki",
        "email": "puki.shmuki@example.com",
        "phone": "0569476543",
        "desc": "Puki is a professional in her field, residing in a cozy little town."
    },
    {
        "_id": 106,
        "firstName": "Gezer",
        "lastName": "Katom",
        "email": "gezer.katom@example.com",
        "phone": "0589874543",
        "desc": "Gezer is a professional in her field, residing in a cozy little town."
    }
]
_createContacs()

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
                contacts = contacts.filter(contact =>
                    regExp.test(contact.firstName) ||
                    regExp.test(contact.lastName) ||
                    regExp.test(contact.email) ||
                    regExp.test(contact.phone)
                )
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
        return storageService.post(STORAGE_KEY, contact)
    }
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
    let contacts = utilService.loadFromStorage(STORAGE_KEY)
    if (!contacts || !contacts.length) {
        contacts = contactsList
        utilService.saveToStorage(STORAGE_KEY, contacts)
    }
}