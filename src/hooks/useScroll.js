import { useState, useEffect } from 'react'
import { SECTIONS } from '../utils/constants'

export function useScroll() {
    const [scrollY, setScrollY] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('down')
    const [lastScrollY, setLastScrollY] = useState(0)
    const [activeSection, setActiveSection] = useState('home')

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

            // Update active section
            const scrollPosition = currentScrollY + 150
            for (const section of SECTIONS) {
                const element = document.getElementById(section)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return { scrollY, scrollDirection, activeSection, setActiveSection }
}