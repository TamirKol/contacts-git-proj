import { ContactPreview } from "./ContactPreview.jsx"

const { Link } = ReactRouterDOM

export function ContactList({ contacts, onRemoveContact, onToggleContact }) {
    // if (!contacts.length) return <p>No contacts to show..</p>
    return (
        <section className="contact-list">
            <ul>
                {contacts.length
                    ? contacts.map(contact =>
                        <li key={contact._id}>
                            <ContactPreview
                                contact={contact}
                                onToggleContact={onToggleContact}
                            />
                            <div>
                                
                                <button><Link to={`/contact/edit/${contact._id}`}>Edit</Link></button>
                                <button><Link to={`/contact/${contact._id}`}>Details</Link></button>
                                <button onClick={() => onRemoveContact(contact._id)}>Remove</button>
                            </div>
                        </li>)

                    : <p>No contacts to show..</p>}

            </ul>
        </section>
    )
}