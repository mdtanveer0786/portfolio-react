import { motion } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full bg-card/30 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-primary/5"
        >
            {/* Image Section with Overlay */}
            <div className="relative aspect-[16/9] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {project.featured && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                            <Star size={12} fill="currentColor" />
                            Featured
                        </div>
                    )}
                    <div className="px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                        {project.category}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6 md:p-8 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                            {project.date?.split('-')[0]}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="px-3 py-1 rounded-lg bg-secondary/50 text-muted-foreground text-[10px] md:text-xs font-semibold border border-border group-hover:border-primary/20 transition-colors duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 mt-auto">
                    {project.live && (
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                        >
                            <ExternalLink size={16} />
                            Live Demo
                        </motion.a>
                    )}
                    {project.github && (
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all"
                            title="View Source"
                        >
                            <Github size={20} />
                        </motion.a>
                    )}
                </div>
            </div>

            {/* Subtle Hover Glow */}
            <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 pointer-events-none transition-all duration-1000 opacity-0 group-hover:opacity-100" />
        </motion.div>
    )
}
