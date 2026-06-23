import useScrollProgress from '../../hooks/useScrollProgress'

export default function ScrollProgress() {
    const progress = useScrollProgress()

    return (
        <div
            style={{ 
                width: `${progress}%`,
                transition: 'width 100ms ease-out'
            }}
            className="fixed top-0 left-0 h-[3px] bg-[#8b5cf6] z-[100] shadow-[0_0_8px_rgba(139,92,246,0.5)]"
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
        />
    )
}
