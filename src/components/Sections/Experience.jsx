import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '../../utils/constants';
import SectionReveal from '../UI/SectionReveal';
import AnimatedBackground from '../UI/AnimatedBackground';
import { Briefcase, Calendar, MapPin, CheckCircle2, Code2 } from 'lucide-react';

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <section id="experience" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="lines" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <Briefcase size={14} />
                            Experience
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display">
                            Professional{' '}
                            <span className="premium-text-gradient">Experience</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            My journey in the tech industry, building impactful solutions and growing with every challenge.
                        </p>
                    </SectionReveal>
                </div>

                {/* Experience Cards */}
                <div ref={containerRef} className="relative max-w-4xl mx-auto mt-12">
                    {/* Background Vertical Line (Dimmed) */}
                    <div className="absolute left-4 md:left-8 top-4 bottom-0 w-[2px] bg-border/50" />
                    
                    {/* Animated Progress Vertical Line */}
                    <motion.div 
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-4 md:left-8 top-4 bottom-0 w-[2px] bg-gradient-to-b from-primary via-fuchsia-500 to-primary shadow-[0_0_15px_rgba(var(--glow-color),0.5)] z-10" 
                    />
                    
                    <div className="space-y-10 sm:space-y-12">
                        {experience.map((exp, index) => (
                            <SectionReveal key={exp.id || index} delay={index * 0.1}>
                                <div className="relative pl-12 md:pl-24 group">
                                    {/* Timeline Node */}
                                    <div className="absolute left-4 md:left-8 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-primary/10 group-hover:ring-primary/30 group-hover:bg-primary transition-all duration-500 z-10" />
                                    
                                    {/* Glowing Pulse behind node */}
                                    <div className="absolute left-4 md:left-8 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 blur-sm group-hover:bg-primary/40 group-hover:blur-md transition-all duration-500 scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100" />
                                    
                                    <div className="glass-card p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 border border-border/40 hover:border-primary/20">
                                        {/* Corner Glow */}
                                        <div className="absolute -right-24 -top-24 w-72 h-72 bg-gradient-to-br from-primary/10 to-fuchsia-500/5 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-40 pointer-events-none" />
                                        
                                        <div className="relative z-10">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/40">
                                                <div>
                                                    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                                        {exp.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-y-3 gap-x-4 text-[11px] sm:text-xs">
                                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                                                            <Briefcase className="w-3.5 h-3.5" />
                                                            <span className="font-bold tracking-wide uppercase">{exp.company}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] text-muted-foreground border border-border/50">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span className="font-semibold tracking-wide uppercase">{exp.period}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] text-muted-foreground border border-border/50">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span className="font-semibold tracking-wide uppercase">{exp.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {Array.isArray(exp.description) ? (
                                                <ul className="space-y-4">
                                                    {exp.description.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed group/item">
                                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary group-hover/item:scale-150 transition-all duration-300 shrink-0 shadow-none group-hover/item:shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                                                            <span className="group-hover/item:text-foreground/90 transition-colors duration-300">{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            )}

                                            {/* Projects Sub-section */}
                                            {exp.projects && exp.projects.length > 0 && (
                                                <div className="mt-8 pt-6 border-t border-border/40">
                                                    <h4 className="text-base sm:text-lg font-display font-bold mb-5 flex items-center gap-2 text-foreground/90">
                                                        <Code2 className="w-5 h-5 text-primary" />
                                                        Key Projects
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        {exp.projects.map((project, pIdx) => (
                                                            <motion.div
                                                                key={pIdx}
                                                                whileHover={{ y: -3 }}
                                                                className="p-5 sm:p-6 rounded-2xl border border-primary/10 bg-primary/5 hover:border-primary/20 hover:bg-primary/[0.08] transition-all duration-300"
                                                            >
                                                                <h5 className="text-base sm:text-lg font-display font-bold mb-1.5 text-primary">{project.name}</h5>
                                                                <p className="text-xs sm:text-sm text-muted-foreground mb-4 font-mono leading-tight">
                                                                    <span className="font-semibold text-foreground/70 font-sans">Stack:</span> {project.tech}
                                                                </p>
                                                                <ul className="space-y-2">
                                                                    {project.features.map((feature, fIdx) => (
                                                                        <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                                                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                                                                            <span>{feature}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
