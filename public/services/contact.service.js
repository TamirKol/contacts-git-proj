import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

// const STORAGE_KEY = 'contactDB'
// const PAGE_SIZE = 4
const BASE_URL = '/api/contact/'

export const contactService = {
    query,
    // getById,
    // save,
    // remove,
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
// _createContacs()


function query(filterBy, sortBy) {
    // const filterSortBy = { ...filterBy, ...sortBy }
    return axios.get(BASE_URL)
        .then(res => res.data)
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


function getDefaultFilter() {
    return { txt: '', pageIdx: 0 }
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