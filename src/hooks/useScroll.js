import { useState, useEffect, useRef } from 'react'
import { SECTIONS } from '../utils/constants'

export function useScroll() {
    const [scrollY, setScrollY] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('down')
    const lastScrollY = useRef(0)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrollY(currentScrollY)
            setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observerCallback = (entries) => {
            // Get all sections currently visible
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            
            if (visibleEntries.length > 0) {
                // Find the one most visible (highest intersection ratio)
                const mostVisible = visibleEntries.reduce((prev, current) => 
                    (prev.intersectionRatio > current.intersectionRatio) ? prev : current
                );

                // Update only if we're not currently doing a manual smooth scroll from header
                setActiveSection(mostVisible.target.id);
            }
        }

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '-25% 0px -25% 0px', // Smaller area for more precise activation
            threshold: [0.1, 0.5, 0.8]
        })

        SECTIONS.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    return { scrollY, scrollDirection, activeSection, setActiveSection }
}