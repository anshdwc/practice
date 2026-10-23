import { useTheme } from "./ThemeContext"

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
            {theme === "light" ? "Switch to dark" : " Switch to light"}
        </button>
    )
}

export default ThemeToggle