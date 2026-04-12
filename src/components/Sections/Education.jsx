import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen, MapPin } from 'lucide-react'
import { education } from '../../utils/constants'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'

const EducationCard = ({ edu, index }) => {
    const isEven = index % 2 === 0
    const icons = [GraduationCap, BookOpen, Award]
    const Icon = icons[index % icons.length]

    return (
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 last:mb-0">
            {/* Dot Indicator */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background shadow-lg shadow-primary/10 z-10 absolute left-0 md:left-1/2 md:-translate-x-1/2 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                <Icon className="w-5 h-5 text-primary" />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0">
                <SectionReveal delay={index * 0.1}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-6 sm:p-8 relative border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-xl shadow-primary/5"
                    >
                        {/* Period Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                            <Calendar size={12} className="text-primary" />
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{edu.period}</span>
                        </div>

                        {/* Title & Institution */}
                        <div className="space-y-2 mb-4">
                            <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                {edu.degree}
                            </h3>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin size={14} className="text-primary/60" />
                                <p className="text-sm font-medium">{edu.institution}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                            {edu.description}
                        </p>

                        {/* Grade Badge */}
                        <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                                <Award size={14} className="text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{edu.grade}</span>
                            </div>
                        </div>
                        
                        {/* Subtle Card Accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 rounded-l-2xl" />
                    </motion.div>
                </SectionReveal>
            </div>
        </div>
    )
}

export default function Education() {
    return (
        <section id="education" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="dots" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <GraduationCap size={14} />
                            Education
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display">
                            Academic{' '}
                            <span className="premium-text-gradient">Journey</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            The foundation that fueled my passion for development and problem solving.
                        </p>
                    </SectionReveal>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto mt-16 px-4">
                    {/* Vertical Center Line (Desktop) */}
                    <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

                    {/* Education Milestones */}
                    <div className="space-y-0">
                        {education.map((edu, index) => (
                            <EducationCard key={edu.id || index} edu={edu} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
