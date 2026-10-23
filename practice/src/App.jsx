import UserList from "./components/UserList"
import ContactForm from './components/ContactForm'
import ThemeToggle from "./components/ThemeToggle"
import { useTheme } from "./components/ThemeContext"
function App() {
    const { theme } = useTheme()
    return (
        <div className={`${theme} mih-h-screen bg-white text-gray-900  dark:bg-gray-900 dark:text-gray-100`}>
            <main className="mx-auto max-w-3xl p-6">
                <div className="mb-6 flex items-center justify-between font-bold">
                    <h1 className="text-3xl font-bold">User Directory</h1>
                    <ThemeToggle />
                </div>
                <UserList />
                <h2 className="mb-4 mt-12 text-2xl font-bold">Contact us</h2>
                <ContactForm />
            </main>
        </div>
    )
}

export default App