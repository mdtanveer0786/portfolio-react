import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen, MapPin } from 'lucide-react'
import { education } from '../../utils/constants'
import { cn } from '../../utils/cn'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'

const EducationCard = ({ edu, index }) => {
    const isEven = index % 2 === 0
    const icons = [GraduationCap, BookOpen, Award]
    const Icon = icons[index % icons.length]

    return (
        <div className={cn(
            "relative flex gap-6 md:gap-0 md:items-center group pb-20 md:pb-32 last:pb-0",
            !isEven ? "md:flex-row-reverse" : "md:flex-row"
        )}>
            {/* Timeline Indicator */}
            {/* Mobile: Part of the flow | Desktop: Centered */}
            <div className="flex-shrink-0 w-8 md:w-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-20 flex justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/30 bg-background shadow-[0_0_15px_rgba(var(--glow-color),0.3)] group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(var(--glow-color),0.6)] transition-all duration-300"
                >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </motion.div>
            </div>

            {/* Content Card */}
            <div className={cn(
                "flex-1 md:w-[calc(50%-2.5rem)] md:flex-none",
                !isEven ? "md:mr-auto" : "md:ml-auto"
            )}>
                <SectionReveal delay={0.1} y={30}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-6 sm:p-8 relative transition-all duration-500 shadow-xl shadow-primary/5 w-full group overflow-hidden"
                    >
                        {/* Glow Behind Card */}
                        <div className="absolute -inset-10 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            {/* Period Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4 border border-primary/10">
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
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                    <Award size={14} className="text-emerald-500" />
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{edu.grade}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Subtle Card Accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-fuchsia-500 rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                </SectionReveal>
            </div>
        </div>
    )
}

export default function Education() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

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
                <div ref={containerRef} className="relative max-w-5xl mx-auto mt-16 px-4">
                    {/* Background Vertical Line (Dimmed) */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-border/50" />
                    
                    {/* Animated Progress Vertical Line */}
                    <motion.div 
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-fuchsia-500 to-primary shadow-[0_0_15px_rgba(var(--glow-color),0.5)] z-10" 
                    />

                    {/* Education Milestones */}
                    <div className="relative">
                        {education.map((edu, index) => (
                            <EducationCard key={edu.id || index} edu={edu} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
