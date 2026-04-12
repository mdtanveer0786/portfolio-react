import { forwardRef, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'
import Magnetic from '../UI/Magnetic'

const ProjectCard = forwardRef(({ project, index }, ref) => {
    const cardRef = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100
        
        cardRef.current.style.setProperty('--mouse-x', `${mouseX}%`)
        cardRef.current.style.setProperty('--mouse-y', `${mouseY}%`)
        
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group perspective-1000"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
                className="relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500"
                whileHover={{ borderColor: 'hsla(var(--primary), 0.2)' }}
            >
                {/* Card background */}
                <div className="absolute inset-0 bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl group-hover:border-primary/15 transition-colors" />

                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {project.featured && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/90 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wide shadow-lg">
                                <Star size={10} fill="currentColor" />
                                Featured
                            </div>
                        )}
                        <div className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wide border border-white/20">
                            {project.category}
                        </div>
                    </div>

                    {/* Status badge */}
                    {project.status === 'coming-soon' && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Coming Soon
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="relative flex flex-col flex-grow p-5 md:p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg md:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                            {project.title}
                        </h3>
                        <span className="text-[10px] font-mono text-muted-foreground/50 shrink-0 mt-1">
                            {project.date?.split('-')[0]}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-primary/5 text-primary/80 text-[10px] font-medium border border-primary/8"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 4 && (
                            <span className="text-[10px] text-muted-foreground/40 self-center">
                                +{project.tags.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 mt-auto">
                        {project.live && (
                            <Magnetic>
                                <motion.a
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-xs"
                                >
                                    <ExternalLink size={13} />
                                    Live Demo
                                </motion.a>
                            </Magnetic>
                        )}
                        {project.github && (
                            <Magnetic>
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-foreground border border-border/30 hover:border-primary/20 transition-all"
                                    title="View Source"
                                >
                                    <Github size={16} />
                                </motion.a>
                            </Magnetic>
                        )}
                        {!project.live && !project.github && (
                            <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-border/30 text-muted-foreground text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                Coming Soon
                            </div>
                        )}
                    </div>
                </div>

                {/* Spotlight effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                        background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsla(var(--primary), 0.04), transparent 60%)'
                    }}
                />
            </motion.div>
        </motion.div>
    )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
