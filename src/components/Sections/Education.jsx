import { GraduationCap, Calendar } from 'lucide-react'
import { education } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'

export default function Education() {
    return (
        <section id="education" className="section-container relative overflow-hidden">
             {/* Background Text */}
             <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                EDUCATION
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-8 md:mb-10 space-y-4">
                    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />
                    <TextReveal 
                        text="Academic Background" 
                        className="text-3xl md:text-5xl font-black uppercase tracking-wider" 
                    />
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {education.map((edu, index) => (
                        <SectionReveal key={edu.id} delay={index * 0.1}>
                            <div className="relative pl-8 md:pl-0">
                                {/* Desktop Timeline Line */}
                                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
                                
                                <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}>
                                    {/* Content Card */}
                                    <div className="w-full md:w-[45%]">
                                        <div className="glass-card p-6 md:p-8 border-border hover:border-primary/50 transition-all group">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-primary font-bold flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{edu.period}</span>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                                                        {edu.degree}
                                                    </h3>
                                                    <p className="text-muted-foreground font-medium">{edu.institution}</p>
                                                </div>

                                                <p className="text-muted-foreground text-sm leading-relaxed italic font-medium">
                                                    {edu.description}
                                                </p>

                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit border border-primary/20">
                                                    {edu.grade}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                        <GraduationCap className="w-5 h-5 text-primary" />
                                    </div>

                                    {/* Date for desktop on the other side */}
                                    <div className={`hidden md:flex w-[45%] ${
                                        index % 2 === 0 ? 'justify-start' : 'justify-end'
                                    }`}>
                                        <div className="text-2xl font-black text-foreground/10 uppercase tracking-widest">
                                            {edu.period.split('-')[0]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
