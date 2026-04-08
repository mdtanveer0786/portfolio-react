/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({
    children,
    defaultTheme = 'dark',
    storageKey = 'portfolio-theme'
}) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem(storageKey, theme)
        
        // Update meta theme color
        const meta = document.querySelector('meta[name="theme-color"]')
        if (meta) {
            meta.setAttribute('content', theme === 'dark' ? '#050505' : '#fafaf9')
        }
    }, [theme, storageKey])

    const value = {
        theme,
        setTheme: (t) => setTheme(t),
        toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}