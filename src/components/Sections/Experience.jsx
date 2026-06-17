import { motion } from 'framer-motion';
import { experience } from '../../utils/constants';
import SectionReveal from '../UI/SectionReveal';
import AnimatedBackground from '../UI/AnimatedBackground';
import { Briefcase, Calendar, MapPin, CheckCircle2, Code2 } from 'lucide-react';

const Experience = () => {
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
                <div className="space-y-8 max-w-5xl mx-auto">
                    {experience.map((exp, index) => (
                        <SectionReveal key={exp.id || index} delay={index * 0.1}>
                            <div className="glass-card p-6 sm:p-8 md:p-10 relative overflow-hidden group">
                                {/* Corner Glow */}
                                <div className="absolute -right-24 -top-24 w-72 h-72 bg-gradient-to-br from-primary/10 to-fuchsia-500/5 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-75 pointer-events-none" />
                                
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/40">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                                {exp.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <Briefcase className="w-4 h-4 text-primary" />
                                                    <span className="font-semibold text-foreground/80">{exp.company}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    <span>{exp.period}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl">
                                        {exp.description}
                                    </p>

                                    {/* Projects Sub-section */}
                                    {exp.projects && (
                                        <div className="mt-8">
                                            <h4 className="text-base sm:text-lg font-display font-bold mb-5 flex items-center gap-2 text-foreground/90">
                                                <Code2 className="w-4.5 h-4.5 text-primary" />
                                                Key Projects at {exp.company}
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {exp.projects.map((project, pIdx) => (
                                                    <motion.div
                                                        key={pIdx}
                                                        whileHover={{ y: -3 }}
                                                        className="p-5 sm:p-6 rounded-2xl border border-primary/10 bg-primary/5 hover:border-primary/20 hover:bg-primary/8 transition-all duration-300"
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

                                    {/* Achievements Section */}
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/40">
                                            {exp.achievements.map((achievement, aIdx) => (
                                                <div
                                                    key={aIdx}
                                                    className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground hover:bg-primary/10 transition-colors duration-300"
                                                >
                                                    {achievement}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
