import { motion } from 'framer-motion'
import { skillCategories } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'

export default function Skills() {
    // Flatten skills for a marquee or simpler grid
    const allSkills = skillCategories.flatMap(cat => cat.skills);

    return (
        <section id="skills" className="section-container relative overflow-hidden">
            {/* Background Text */}
             <div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-black text-foreground/[0.05] dark:text-white/[0.05] uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                SKILLS
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />
                    <TextReveal 
                        text="Technical Expertise" 
                        className="text-3xl md:text-5xl font-black uppercase tracking-wider" 
                    />
                </div>

                {/* Marquee effect for skills */}
                <SectionReveal>
                    <div className="relative flex overflow-x-hidden group py-10">
                        <div className="animate-wave flex whitespace-nowrap">
                            {[...allSkills, ...allSkills].map((skill, index) => (
                                <div
                                key={`${skill.name}-${index}`}
                                className="mx-4 flex flex-col items-center justify-center p-6 min-w-[140px] glass-card border-border rounded-xl hover:border-primary/50 transition-all"
                                >                                <div className="h-12 w-12 flex items-center justify-center mb-4">
                                        <img 
                                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name.toLowerCase().replace('.js', 'js').replace(' ', '')}/${skill.name.toLowerCase().replace('.js', 'js').replace(' ', '')}-original.svg`} 
                                            alt={skill.name}
                                            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${skill.name}&background=1b2c68&color=fff&bold=true`;
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-bold tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
                    {allSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center justify-center p-6 glass-card border-border rounded-xl hover:border-primary/50 transition-all group"
                        >
                            <div className="h-10 w-10 flex items-center justify-center mb-3">
                                <img 
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name.toLowerCase().replace('.js', 'js').replace(' ', '')}/${skill.name.toLowerCase().replace('.js', 'js').replace(' ', '')}-original.svg`} 
                                    alt={skill.name}
                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${skill.name}&background=1b2c68&color=fff&bold=true`;
                                    }}
                                />
                            </div>
                            <span className="text-xs font-bold tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
