const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { ContactDetails } from "./pages/ContactDetails.jsx"
import { ContactIndex } from "./pages/ContactIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { store } from './store/store.js'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ContactIndex />} path="/contact/index" />
                            <Route element={<ContactDetails />}  path="/contact/:contactId" />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}