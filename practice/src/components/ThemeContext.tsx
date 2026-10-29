import { createContext, useState, useContext, useEffect } from "react"
import type { ReactNode } from "react"
type Theme = "light" | "dark"

type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getSavedTheme(): Theme {
    return localStorage.getItem('theme') == 'dark' ? "dark" : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getSavedTheme)

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    function toggleTheme() {
        setTheme((current) => (current == 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme muust be used inside ThemeProvider')
    }
    return context
}