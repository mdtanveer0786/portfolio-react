import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen, MapPin } from 'lucide-react'
import { education } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import { cn } from '../../utils/cn'

const EducationCard = ({ edu, index }) => {
    const isEven = index % 2 === 0

    return (
        <div className={cn(
            "relative flex flex-col md:flex-row items-center justify-between mb-10 md:mb-24 last:mb-0",
            isEven ? "md:flex-row-reverse" : "md:flex-row"
        )}>
            {/* Timeline Connector Dot - Responsive positioning */}
            <div className="absolute left-0 md:left-1/2 top-0 md:top-10 -translate-x-1/2 md:-translate-x-1/2 z-20">
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-background border-2 border-primary flex items-center justify-center shadow-xl shadow-primary/20 z-10 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <GraduationCap className="w-5 h-5 md:w-7 md:h-7 text-primary relative z-10" />
                </motion.div>
            </div>

            {/* Content Card Side */}
            <div className="w-full md:w-[45%] pl-10 md:pl-0 mt-2 md:mt-0">
                <SectionReveal delay={0.1} direction={isEven ? "left" : "right"}>
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="group relative glass-card p-6 md:p-10 rounded-3xl border border-border/50 overflow-hidden shadow-2xl shadow-black/5"
                    >
                        {/* Subtle Background Glow */}
                        <div className="absolute -right-16 -top-16 w-32 h-32 md:w-48 md:h-48 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                        
                        <div className="relative z-10 space-y-4 md:space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest">
                                    <Calendar size={12} />
                                    {edu.period}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                                    <Award size={12} />
                                    {edu.grade}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl md:text-3xl font-black text-foreground group-hover:text-primary transition-colors duration-500 leading-tight">
                                    {edu.degree}
                                </h3>
                                <div className="flex items-center gap-2.5 text-muted-foreground/80 font-bold text-sm md:text-lg">
                                    <div className="p-2 rounded-lg bg-secondary/50 text-primary">
                                        <BookOpen size={18} />
                                    </div>
                                    <span className="flex-1">{edu.institution}</span>
                                </div>
                            </div>

                            <p className="text-muted-foreground/70 text-sm md:text-base leading-relaxed font-medium border-l-2 border-primary/20 pl-4 py-1 italic">
                                &quot;{edu.description}&quot;
                            </p>

                            <div className="pt-2 flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground/40 font-black uppercase tracking-[0.3em]">
                                <MapPin size={14} className="text-primary/50" />
                                <span>India</span>
                            </div>
                        </div>
                    </motion.div>
                </SectionReveal>
            </div>

            {/* Desktop Period Indicator */}
            <div className={cn(
                "hidden md:flex w-[45%] items-center",
                isEven ? "justify-end pr-12" : "justify-start pl-12"
            )}>
                <motion.div 
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={cn("text-right", !isEven && "text-left")}
                >
                    <span className="text-5xl lg:text-7xl font-black text-foreground/5 dark:text-white/5 uppercase tracking-tighter select-none block leading-none">
                        {edu.period.split('-')[1] || edu.period.split(' ')[1] || edu.period}
                    </span>
                    <div className={cn(
                        "h-1 bg-gradient-to-r from-primary to-transparent w-16 rounded-full mt-2",
                        isEven ? "ml-auto" : "mr-auto rotate-180"
                    )}></div>
                </motion.div>
            </div>
        </div>
    )
}

export default function Education() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <section id="education" ref={containerRef} className="section-container relative overflow-hidden">
            {/* Background Text - Improved visibility and positioning */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                EDUCATION
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header - Fixed mobile padding/margin */}
                <div className="text-center mb-16 md:mb-28 space-y-4 md:space-y-6">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "5rem" }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-primary to-fuchsia-500 mx-auto rounded-full shadow-sm shadow-primary/20" 
                    />
                    <div className="px-2">
                        <TextReveal 
                            text="Academic Journey" 
                            className="text-3xl xs:text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight" 
                        />
                    </div>
                    <p className="text-muted-foreground font-medium max-w-lg mx-auto text-sm md:text-lg px-4 leading-relaxed">
                        My educational foundation that fueled my passion for development and problem solving.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto md:px-4">
                    {/* Animated Timeline Line - Responsive */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/50 md:-translate-x-1/2">
                        <motion.div 
                            style={{ scaleY, originY: 0 }}
                            className="w-full h-full bg-gradient-to-b from-primary via-fuchsia-500 to-cyan-500 shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                        />
                    </div>

                    <div className="space-y-6 md:space-y-0">
                        {education.map((edu, index) => (
                            <EducationCard key={edu.id || index} edu={edu} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-1/3 -right-20 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/3 -left-20 w-48 md:w-96 h-48 md:h-96 bg-fuchsia-500/5 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse delay-700" />
        </section>
    )
}
