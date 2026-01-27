import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({
    children,
    defaultTheme = 'dark',
    storageKey = 'vite-ui-theme'
}) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem(storageKey, theme)
    }, [theme, storageKey])

    const value = {
        theme,
        setTheme: (theme) => setTheme(theme),
        toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}