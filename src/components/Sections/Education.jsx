import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react'
import { education } from '../../utils/constants'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'

const EducationCard = ({ edu, index }) => {
    const icons = [GraduationCap, BookOpen, Award]
    const Icon = icons[index % icons.length]

    return (
        <SectionReveal delay={index * 0.15}>
            <motion.div
                whileHover={{ y: -4 }}
                className="glass-card p-6 md:p-8 h-full flex flex-col relative group"
            >
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Icon & Period */}
                <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/10 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.04]">
                        <Calendar size={11} className="text-muted-foreground" />
                        <span className="text-[11px] font-mono font-medium text-muted-foreground">{edu.period}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-3">
                    <h3 className="text-lg md:text-xl font-display font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">{edu.description}</p>
                </div>

                {/* Grade Badge */}
                <div className="mt-5 pt-4 border-t border-border/30">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
                        <Award size={13} className="text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{edu.grade}</span>
                    </div>
                </div>
            </motion.div>
        </SectionReveal>
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

                {/* Compact horizontal cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {education.map((edu, index) => (
                        <EducationCard key={edu.id || index} edu={edu} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
