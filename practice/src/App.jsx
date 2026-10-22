import UserList from "./components/UserList"
import ContactForm from './components/ContactForm'

function App() {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Users Directory</h1>
            <UserList />
            <h2 className="mb-4 mt-12 text-2xl font-bold">Contact us</h2>
            <ContactForm />
        </main>
    )
}

export default App