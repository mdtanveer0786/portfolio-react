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

        let observedCount = 0;
        
        const observeElements = () => {
            SECTIONS.forEach((id) => {
                const element = document.getElementById(id);
                if (element && !element.dataset.scrollObserved) {
                    observer.observe(element);
                    element.dataset.scrollObserved = 'true';
                    observedCount++;
                }
            });
        };

        // Initial observation
        observeElements();

        // Since components are lazy-loaded, they might not be in the DOM immediately.
        // We use a short interval to check and observe them once they mount.
        const interval = setInterval(() => {
            if (observedCount < SECTIONS.length) {
                observeElements();
            } else {
                clearInterval(interval); // All sections found, stop checking
            }
        }, 500);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        }
    }, [])

    return { scrollY, scrollDirection, activeSection, setActiveSection }
}