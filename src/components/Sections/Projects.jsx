import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout } from 'lucide-react'
import { projects } from '../../utils/constants'
import SectionReveal from '../UI/SectionReveal'
import ProjectCard from '../UI/ProjectCard'
import AnimatedBackground from '../UI/AnimatedBackground'
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
            <AnimatedBackground variant="grid" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <Layout size={14} />
                            Portfolio
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display">
                            Featured{' '}
                            <span className="premium-text-gradient">Projects</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            A selection of my recent work where design, performance, and scalability come together to build impactful digital products.
                        </p>
                    </SectionReveal>
                </div>

                {/* Filter Controls */}
                <SectionReveal y={15}>
                    <div className="flex justify-center items-center gap-2 mb-12 md:mb-16">
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] shadow-inner" role="tablist" aria-label="Filter projects by category">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    role="tab"
                                    aria-selected={activeCategory === cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "relative px-5 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-300",
                                        activeCategory === cat
                                            ? "text-white"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeProjectCategory"
                                            className="absolute inset-0 bg-primary rounded-lg shadow-md shadow-primary/20 -z-10"
                                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
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
            </div>
        </section>
    )
}
