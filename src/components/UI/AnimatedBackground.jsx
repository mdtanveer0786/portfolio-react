export default function AnimatedBackground({ variant = 'dots' }) {
    if (variant === 'dots') {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Dot grid — uses dark dots in light mode, light dots in dark mode */}
                <div className="absolute inset-0 opacity-100"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.12) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                {/* Glow orbs */}
                <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.15]"
                    style={{ background: 'hsl(263 70% 58%)' }} />
                <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.12]"
                    style={{ background: 'hsl(192 91% 46%)' }} />
            </div>
        )
    }

    if (variant === 'lines') {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Diagonal lines */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 40px,
                            rgba(139,92,246,0.06) 40px,
                            rgba(139,92,246,0.06) 41px
                        )`,
                    }}
                />
                {/* Center glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-[0.12]"
                    style={{ background: 'linear-gradient(135deg, hsl(263 70% 58%), hsl(192 91% 46%))' }} />
            </div>
        )
    }

    if (variant === 'grid') {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Grid lines */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
                    }}
                />
                {/* Glow orb */}
                <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.1]"
                    style={{ background: 'hsl(263 70% 58%)' }} />
            </div>
        )
    }

    if (variant === 'glow') {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px] opacity-[0.12] animate-glow-pulse"
                    style={{ background: 'linear-gradient(135deg, hsl(263 70% 58%), hsl(322 80% 55%), hsl(192 91% 46%))' }} />
            </div>
        )
    }

    return null
}
