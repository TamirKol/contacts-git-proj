export function ContactPreview({ contact, onToggleContact }) {
    console.log(contact);
    return (
        <article
            className="contact-preview"
        >
            <span
                onClick={() => onToggleContact(contact)}
                className={(contact.isDone) ? 'done' : ''}
            >
                {contact.txt}
            </span>
            {contact.owner && <p>Owner: {contact.owner && contact.owner.fullname}</p>}
        </article>
    )
}