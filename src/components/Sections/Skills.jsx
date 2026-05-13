import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { skillCategories } from '../../utils/constants'
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

const SkillCard = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
            style={{
                background: 'hsla(var(--card), 0.5)',
                border: '1px solid transparent',
            }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl pointer-events-none transition-opacity duration-500"
                style={{ backgroundColor: skill.color }}
            />



            {/* Icon */}
            <div
                className="relative z-10 text-2xl sm:text-3xl mb-2.5 transition-transform duration-500 group-hover:scale-110"
                style={{ color: skill.color }}
            >
                {getIcon(skill.name)}
            </div>

            {/* Label */}
            <span className="relative z-10 text-[11px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {skill.name}
            </span>
        </motion.div>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="grid" />

            <div className="container mx-auto relative z-10">
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

                {/* Categorized Grid */}
                <div className="space-y-12 max-w-4xl mx-auto">
                    {skillCategories.map((category, catIndex) => (
                        <SectionReveal key={category.title} delay={catIndex * 0.1}>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <category.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="text-sm font-display font-semibold text-foreground uppercase tracking-wider">
                                        {category.title}
                                    </h3>
                                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                    {category.skills.map((skill, index) => (
                                        <SkillCard
                                            key={`${skill.name}-${index}`}
                                            skill={skill}
                                            index={index + (catIndex * 5)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
