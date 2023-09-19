import { contactService } from "../services/contact.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function ContactEdit() {

    const [contactToEdit, setContactToEdit] = useState(contactService.getEmptyContact())
    const navigate = useNavigate()
    const params = useParams()
    console.log('params:', params)

    useEffect(() => {
        if (params.contactId) loadContact()
    }, [])

    function loadContact() {
        contactService.getById(+params.contactId)
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
        contactService.save(contactToEdit)
            .then(() => {
                showSuccessMsg('Contact added!')
                navigate('/contact')
        })
            .catch(err => {
                showErrorMsg('Cannot save contact', err)
            })
    }

    const { firstName, lastName, email, phone, desc } = contactToEdit
    return (
        <section className="contact-edit">
            {params.contactId ? <h2>Edit Contact</h2> : <h2>Add Contact</h2>}

            <form onSubmit={onSaveContact}>
                <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="desc"
                    value={desc}
                    onChange={handleChange}
                />
                <button>Save</button>
                {/* <button onClick={onAddContact}>Add Contact</button> */}
            </form>
        </section>
    )
}