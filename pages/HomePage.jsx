import { contactService } from "../services/contact.service.js";

export function HomePage() {
    return (
        <section className="home-page">
            <h1>Contacts App</h1>
            {contactService}
        </section >
    )
}