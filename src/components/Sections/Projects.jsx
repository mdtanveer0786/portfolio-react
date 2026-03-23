import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'
import { projects } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import ProjectCard from '../UI/ProjectCard'
import { cn } from '../../utils/cn'

const CATEGORIES = ['all', 'fullstack', 'frontend']

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'all') return projects
        return projects.filter(project => project.category === activeCategory)
    }, [activeCategory])

    return (
        <section id="projects" className="section-container relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-1/3 -right-20 w-48 md:w-96 h-48 md:h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/3 -left-20 w-48 md:w-96 h-48 md:h-96 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse delay-1000" />
            </div>

            {/* Background Text - Matched style */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                PROJECTS
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-16 space-y-4 md:space-y-6">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "5rem" }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-primary via-violet-500 to-cyan-400 rounded-full" 
                    />
                    <div className="px-2">
                        <TextReveal 
                            text="Featured Projects" 
                            className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight" 
                        />
                    </div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-muted-foreground font-medium max-w-2xl mx-auto text-sm md:text-lg px-4 leading-relaxed"
                    >
                        A selection of my recent works where design meets code to create meaningful digital experiences.
                    </motion.p>
                </div>

                {/* Filter Controls */}
                <SectionReveal y={20}>
                    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-12 md:mb-20">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "relative px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300",
                                    activeCategory === cat 
                                        ? "text-white" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                )}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </SectionReveal>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                index={index} 
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 md:mt-28 flex flex-col items-center gap-6"
                >
                    <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-border to-transparent" />
                    <p className="text-muted-foreground font-medium text-sm md:text-base">
                        Want to see more of my work?
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05, gap: "1rem" }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/mdtanveer0786"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground text-background font-bold text-sm md:text-base transition-all hover:bg-primary hover:text-white"
                    >
                        <Github size={20} />
                        View All on GitHub
                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
