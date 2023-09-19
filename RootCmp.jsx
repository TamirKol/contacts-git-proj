const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
import { HomePage } from "./pages/HomePage.jsx"

export function App() {
    return (
 
            <Router>
                <section className="main-layout app">
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                           
                        </Routes>
                    </main>
                </section>
            </Router>
 
    )
}