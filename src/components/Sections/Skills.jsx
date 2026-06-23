import { Layers } from 'lucide-react'
import { skillCategories } from '../../utils/constants'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaGitAlt, FaBootstrap, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiExpress, SiMongodb, SiPostman, SiVercel, SiMysql, SiRender } from 'react-icons/si'
import { motion, useReducedMotion } from 'framer-motion'

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

const SkillItem = ({ skill, index }) => {
    const shouldReduceMotion = useReducedMotion()

    const itemVariants = {
        hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: shouldReduceMotion ? 0 : index * 0.05
            }
        }
    }

    return (
        <motion.div
            variants={itemVariants}
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-black/[0.01] dark:bg-white/[0.01] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
        >
            {/* Glow on hover */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 blur-md pointer-events-none transition-opacity duration-300"
                style={{ backgroundColor: skill.color }}
            />

            {/* Icon */}
            <div
                className="relative z-10 text-xl transition-transform duration-300 group-hover:scale-110"
                style={{ color: skill.color }}
            >
                {getIcon(skill.name)}
            </div>

            {/* Label */}
            <span className="relative z-10 text-xs sm:text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap">
                {skill.name}
            </span>
        </motion.div>
    )
}

export default function Skills() {
    const shouldReduceMotion = useReducedMotion()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.15
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15
            }
        }
    }

    return (
        <section id="skills" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="grid" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="section-header mb-16">
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

                {/* Grouped Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {skillCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.title}
                                variants={cardVariants}
                                className="glass-card p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] border-primary/5 hover:border-primary/10 transition-all duration-500"
                            >
                                {/* Subtle card border glow on hover */}
                                <div className="absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                                {/* Category Header */}
                                <div className="flex items-center gap-4 border-b border-border/40 pb-4 relative z-10">
                                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-foreground/90 tracking-tight">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills Badges List */}
                                <div className="flex flex-wrap gap-3 relative z-10">
                                    {category.skills.map((skill, index) => (
                                        <SkillItem
                                            key={skill.name}
                                            skill={skill}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}
