/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

const getSafeStorage = (key, fallback) => {
    try {
        return localStorage.getItem(key) || fallback
    } catch (e) {
        console.warn("Storage access failed, using fallback:", e)
        return fallback
    }
}

const setSafeStorage = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch (e) {
        console.warn("Storage write failed:", e)
    }
}

export function ThemeProvider({
    children,
    defaultTheme = 'dark',
    storageKey = 'portfolio-theme'
}) {
    const [theme, setTheme] = useState(
        () => getSafeStorage(storageKey, defaultTheme)
    )

    useLayoutEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        setSafeStorage(storageKey, theme)
        
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