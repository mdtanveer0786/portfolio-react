import { useState, useEffect } from 'react'

export function useScroll() {
    const [scrollY, setScrollY] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('down')
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrollY(currentScrollY)

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down')
            } else {
                setScrollDirection('up')
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return { scrollY, scrollDirection }
}