import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function MeshGradient() {
    const containerRef = useRef(null)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        const container = containerRef.current
        if (!container || shouldReduceMotion) return

        let ticking = false
        const handleMouseMove = (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const { clientX, clientY } = e
                    container.style.setProperty('--mouse-x', `${clientX}px`)
                    container.style.setProperty('--mouse-y', `${clientY}px`)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [shouldReduceMotion])

    return (
        <div 
            ref={containerRef} 
            className="absolute inset-0 overflow-hidden -z-10" 
            style={{ '--mouse-x': '50vw', '--mouse-y': '50vh' }}
            aria-hidden="true"
        >
            {/* Primary orb — violet (Interactive) */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-[0.45] dark:opacity-[0.22] transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, hsl(263 75% 60%), transparent 80%)',
                    top: '-400px',
                    left: '-400px',
                    transform: 'translate3d(var(--mouse-x), var(--mouse-y), 0)',
                    transition: shouldReduceMotion 
                        ? 'opacity 0.7s ease-in-out' 
                        : 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.7s ease-in-out',
                }}
            />
            
            {/* Secondary orb — pink/fuchsia */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.35] dark:opacity-[0.15] transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, hsl(322 85% 60%), transparent 80%)',
                    top: '15%',
                    right: '-5%',
                    animation: shouldReduceMotion ? 'none' : 'mesh-move 28s ease-in-out infinite reverse',
                }}
            />
            
            {/* Tertiary orb — cyan/sky */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.35] dark:opacity-[0.15] transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, hsl(192 95% 55%), transparent 80%)',
                    bottom: '5%',
                    left: '5%',
                    animation: shouldReduceMotion ? 'none' : 'mesh-move 32s ease-in-out infinite 3s',
                }}
            />
        </div>
    )
}
