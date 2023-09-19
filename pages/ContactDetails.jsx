const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [currContact, setCurrContact] = useState(null)

    useEffect(() => {
        contactService.getById(params.id)
            .then(contact => {
                if (!contact) return navigate('/contact')
                setCurrContact(contact)
            })
            .catch(err => {
                console.log('Had issues loading contact', err);
            })
    }, [])

    if (!currContact) return <h4>loading</h4>
    const { _id, txt, isDone } = currContact
    return (
        <section className="contact-details">
            <div className="contact-data-container">
                <h1>Id: {_id}</h1>
                <h1>To Do: {txt}</h1>
                <h1>Is done?: {isDone ? 'yes' : 'no'}</h1>
                <button className="back-btn" onClick={() => navigate('/contact')}>
                    Back to contacts
                </button>
            </div>
        </section>
    )
}