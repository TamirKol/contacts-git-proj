const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from "./cmps/AppHeader.jsx"
import { ContactDetails } from "./pages/ContactDetails.jsx"
import { ContactEdit } from "./pages/ContactEdit.jsx"
import { ContactIndex } from "./pages/ContactIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { store } from './store/store.js'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ContactIndex />} path="/contact" />
                            <Route element={<ContactDetails />} path="/contact/:contactId" />
                            <Route element={<ContactEdit />} path="/contact/edit/:contactId" />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}