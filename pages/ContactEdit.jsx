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
        const field = target.name
        setContactToEdit(prevContact => ({ ...prevContact, [field]: value }))
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

    const { _id, firstName, lastName, email, phone, desc } = contactToEdit
    return (
        <section className="contact-edit">
            <h2>Edit Contact</h2>

            <form onSubmit={onSaveContact}>
                <input
                    type="text"
                    placeholder="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="description"
                    name="description"
                    value={desc}
                    onChange={handleChange}
                />
                <button>Save</button>
                {/* <button onClick={onAddContact}>Add Contact</button> */}
            </form>
        </section>
    )
}