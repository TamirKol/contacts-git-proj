const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { addContact, loadContacts, removeContact, setFilterBy, toggleContact } from '../store/actions/contact.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { contactService } from '../services/contact.service.js'
import { ContactFilter } from '../cmps/ContactFilter.jsx'
import { ContactSort } from '../cmps/ContactSort.jsx'
import { ContactList } from '../cmps/ContactList.jsx'

export function ContactIndex() {

    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)
    const isLoading = useSelector(storeState => storeState.contactModule.isLoading)
    const [contactToAdd, setContactToAdd] = useState(contactService.getEmptyContact())
    const [sortBy, setSortBy] = useState({ type: '', desc: -1 })

    useEffect(() => {
        loadContacts(sortBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load contacts')
            })
    }, [filterBy, sortBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onToggleContact(contact) {
        const contactToToggle = contact
        contactToToggle.isDone = !contactToToggle.isDone
        toggleContact(contactToToggle)
            .then(() => {
                showSuccessMsg('Contact toggled')
            })
            .catch(err => {
                console.log('Cannot toggle contact', err)
                showErrorMsg('Cannot toggle contact')
            })
    }

    function onRemoveContact(contactId) {
        removeContact(contactId)
            .then(() => {
                showSuccessMsg('Contact removed')
            })
            .catch(err => {
                console.log('Cannot remove contact', err)
                showErrorMsg('Cannot remove contact')
            })
    }

    function handleChange({ target }) {
        const value = target.value
        setContactToAdd(prevContact => ({ ...prevContact, txt: value }))
    }

    function onAddContact(ev) {
        ev.preventDefault()
        addContact(contactToAdd)
            .then(() => {
                showSuccessMsg('Contact added')
                setContactToAdd(contactService.getEmptyContact())
            })
            .catch(err => {
                console.log('Cannot add contact', err)
                showErrorMsg('Cannot add contact')
            })
    }

    return (
        <section className='contact-index'>
            {/* <h3>Contacts App</h3> */}
            <main>
                <ContactFilter
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy}
                />
                {/* <form onSubmit={onAddContact}>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        onChange={handleChange}
                        value={contactToAdd.firstName}
                    />
                </form> */}
                <button><Link to={`/contact/edit`}>Add new contact</Link></button>
                <ContactSort sortBy={sortBy} setSortBy={setSortBy} />
                {!isLoading && <ContactList
                    contacts={contacts}
                    onRemoveContact={onRemoveContact}
                    onToggleContact={onToggleContact}
                />}
                {isLoading && <div>Loading...</div>}
            </main>
        </section>
    )
}