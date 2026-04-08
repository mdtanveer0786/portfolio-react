import { useEffect, useRef } from 'react'

export default function MeshGradient() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window
            const x = (clientX / innerWidth) * 100
            const y = (clientY / innerHeight) * 100
            container.style.setProperty('--mouse-x', `${x}%`)
            container.style.setProperty('--mouse-y', `${y}%`)
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden -z-10" style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}>
            {/* Primary orb — violet (Interactive) */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-[0.45] dark:opacity-[0.22] transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, hsl(263 75% 60%), transparent 80%)',
                    top: 'calc(var(--mouse-y, 50%) - 400px)',
                    left: 'calc(var(--mouse-x, 50%) - 400px)',
                    transition: 'top 1.2s cubic-bezier(0.23, 1, 0.32, 1), left 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.7s ease-in-out',
                }}
            />
            
            {/* Secondary orb — pink/fuchsia */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.35] dark:opacity-[0.15] transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, hsl(322 85% 60%), transparent 80%)',
                    top: '15%',
                    right: '-5%',
                    animation: 'mesh-move 28s ease-in-out infinite reverse',
                }}
            />
            
            {/* Tertiary orb — cyan/sky */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.35] dark:opacity-[0.15] transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, hsl(192 95% 55%), transparent 80%)',
                    bottom: '5%',
                    left: '5%',
                    animation: 'mesh-move 32s ease-in-out infinite 3s',
                }}
            />
        </div>
    )
}
