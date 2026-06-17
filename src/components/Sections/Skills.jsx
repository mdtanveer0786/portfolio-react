import { Layers } from 'lucide-react'
import { skillCategories } from '../../utils/constants'
import { cn } from '../../utils/cn'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaGitAlt, FaBootstrap, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiExpress, SiMongodb, SiPostman, SiVercel, SiMysql, SiRender } from 'react-icons/si'

const getIcon = (name) => {
    const iconMap = {
        'HTML5': <FaHtml5 />,
        'CSS3': <FaCss3Alt />,
        'JavaScript': <FaJs />,
        'React.js': <FaReact />,
        'Tailwind CSS': <SiTailwindcss />,
        'Bootstrap': <FaBootstrap />,
        'Node.js': <FaNodeJs />,
        'Express.js': <SiExpress />,
        'PHP': <FaPhp />,
        'REST APIs': <FaDatabase />,
        'MongoDB': <SiMongodb />,
        'MySQL': <SiMysql />,
        'Vercel': <SiVercel />,
        'Render': <SiRender />,
        'Git': <FaGitAlt />,
        'Postman': <SiPostman />,
    }
    return iconMap[name] || <FaDatabase />
}

const SkillItem = ({ skill }) => {
    return (
        <div
            className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all duration-300 cursor-default shadow-sm hover:shadow-md flex-shrink-0"
            style={{
                background: 'hsla(var(--card), 0.6)',
                border: '1px solid hsla(var(--foreground), 0.05)',
            }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl pointer-events-none transition-opacity duration-500"
                style={{ backgroundColor: skill.color }}
            />

            {/* Icon */}
            <div
                className="relative z-10 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                style={{ color: skill.color }}
            >
                {getIcon(skill.name)}
            </div>

            {/* Label */}
            <span className="relative z-10 text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap">
                {skill.name}
            </span>
        </div>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="grid" />

            <div className="container mx-auto relative z-10 mb-12">
                {/* Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <Layers size={14} />
                            Skills
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display">
                            Technical{' '}
                            <span className="premium-text-gradient">Stack</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            Technologies and tools I use to bring ideas to life.
                        </p>
                    </SectionReveal>
                </div>
            </div>

            {/* Infinite Marquees */}
            <div className="relative w-full max-w-[100vw] mx-auto pb-10 flex flex-col gap-6">
                {/* Edge fade masks */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                {skillCategories.map((category, rowIndex) => {
                    const isReverse = rowIndex % 2 !== 0;
                    
                    // We duplicate the items enough times to fill the screen seamlessly
                    // E.g., repeating 4 times per row guarantees it's wide enough for ultra-wide screens.
                    const repeatedSkills = [...category.skills, ...category.skills, ...category.skills, ...category.skills];

                    return (
                        <div key={category.title} className="relative flex overflow-hidden pause-marquee">
                            {/* Two identical flex containers side-by-side that will translate */}
                            <div className={cn(
                                "flex gap-4 items-center w-max",
                                isReverse ? "animate-marquee-reverse" : "animate-marquee"
                            )}>
                                {repeatedSkills.map((skill, index) => (
                                    <SkillItem
                                        key={`${category.title}-${skill.name}-${index}`}
                                        skill={skill}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

