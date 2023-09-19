import { contactService } from "../services/contact.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function ContactEdit() {

    const [contactToEdit, setContactToEdit] = useState(contactService.getEmptyContact())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.contactId) loadContact()
    }, [])

    function loadContact() {
        contactService.getById(params.contactId)
            .then(setContactToEdit)
            .catch(err => {
                console.log('Had issued in contact edit:', err);
                navigate('/contact')
                showErrorMsg('Contact not found!')
            })
    }

    function handleChange({ target }) {
        const value = target.value
        setContactToEdit(prevContact => ({ ...prevContact, txt: value }))
    }

    function onSaveContact(ev) {
        ev.preventDefault()
        contactToEdit.isDone = false
        contactService.save(contactToEdit)
            .then(() => navigate('/contact'))
            .catch(err => {
                showErrorMsg('Cannot save contact', err)
            })
    }

    const { txt } = contactToEdit

    return (
        <section className="contact-edit">
            <h2>Edit Contact</h2>

            <form onSubmit={onSaveContact}>
                <input
                    type="text"
                    value={txt}
                    onChange={handleChange}
                />
                <button>Save</button>
                {/* <button onClick={onAddContact}>Add Contact</button> */}
            </form>
        </section>
    )
}