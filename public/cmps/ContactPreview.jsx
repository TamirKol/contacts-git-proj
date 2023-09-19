export function ContactPreview({ contact, onToggleContact }) {
    const { firstName, lastName, email, phone } = contact
    return (
        <article
            className="contact-preview"
        >
            <span
                onClick={() => onToggleContact(contact)}
            // className={(contact.isDone) ? 'done' : ''}
            >
                <h1>Full Name: {firstName + " " + lastName}</h1>
                <h1>email: {email}</h1>
                <h1>phone: {phone}</h1>
            </span>
            {/* {contact.owner && <p>Owner: {contact.owner && contact.owner.fullname}</p>} */}
        </article>
    )
}