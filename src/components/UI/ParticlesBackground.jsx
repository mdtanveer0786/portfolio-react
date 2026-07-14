import { useEffect, useState, useCallback } from 'react'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import { useTheme } from '../Layout/ThemeProvider'

export default function ParticlesBackground() {
    const { theme } = useTheme()
    const [particleCount, setParticleCount] = useState(60)
    const [isMobile, setIsMobile] = useState(false)
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
            
            setReduceMotion(motionQuery.matches)
            
            if (width < 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
                if (width >= 768 && width <= 1024) {
                    setParticleCount(30)
                } else {
                    setParticleCount(60)
                }
            }
        }

        checkDevice()

        const resizeListener = () => checkDevice()
        window.addEventListener('resize', resizeListener, { passive: true })
        
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const motionListener = (e) => setReduceMotion(e.matches)
        motionQuery.addEventListener('change', motionListener)

        return () => {
            window.removeEventListener('resize', resizeListener)
            motionQuery.removeEventListener('change', motionListener)
        }
    }, [])

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine)
    }, [])

    if (isMobile) {
        // Subtle purple gradient background fallback for mobile
        return (
            <div 
                className="absolute inset-0 -z-10 bg-gradient-to-br from-[#8b5cf6]/5 via-background to-background" 
                aria-hidden="true" 
            />
        )
    }

    return (
        <Particles
            key={theme}
            id="tsparticles"
            init={particlesInit}
            className="absolute inset-0 -z-10 text-muted-foreground/20"
            options={{
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: !reduceMotion,
                            mode: 'push',
                        },
                        onHover: {
                            enable: !reduceMotion,
                            mode: 'repulse',
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: 'currentColor',
                    },
                    links: {
                        color: 'currentColor',
                        distance: 150,
                        enable: !reduceMotion,
                        opacity: 0.1,
                        width: 1,
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        direction: 'none',
                        enable: !reduceMotion,
                        outModes: {
                            default: 'bounce',
                        },
                        random: false,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: particleCount,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
    )
}
