import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../../utils/constants'

export default function Projects() {
    return (
        <section id="projects" className="section-container relative overflow-hidden">
            {/* Background Text */}
             <div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-black text-foreground/[0.05] dark:text-white/[0.05] uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                PROJECTS
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider">
                        Featured Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass-card border-border rounded-xl overflow-hidden hover:border-violet-500/50 transition-all"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-white text-black hover:bg-primary transition-colors"
                                    >
                                        <Github className="w-5 h-5" />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-white text-black hover:bg-primary transition-colors"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </motion.a>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 font-medium">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border border-primary/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
