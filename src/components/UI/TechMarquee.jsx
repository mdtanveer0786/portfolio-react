import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript } from 'react-icons/si'

const techItems = [
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'Express', icon: <SiExpress />, color: '#000000' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
]

export default function TechMarquee() {
    // Duplicate items to ensure seamless loop
    const items = [...techItems, ...techItems, ...techItems, ...techItems]

    return (
        <div className="relative w-full overflow-hidden bg-black/[0.01] dark:bg-white/[0.01] border-y border-border/30 py-5">
            {/* Edge fades */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden select-none">
                <div className="flex gap-4 items-center w-max animate-marquee">
                    {items.map((tech, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/40 bg-card/50 text-foreground/80 font-medium text-xs sm:text-sm transition-all duration-300 mx-1"
                        >
                            <span style={{ color: tech.color }} className="text-lg sm:text-xl">
                                {tech.icon}
                            </span>
                            <span>{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
