import { forwardRef, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

const ProjectCard = forwardRef(({ project, index }, ref) => {
    const cardRef = useRef(null);
    
    // Motion values for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);

        // Update spotlight position
        const spotlight = cardRef.current.querySelector('.card-spotlight');
        if (spotlight) {
            spotlight.style.opacity = '1';
            spotlight.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.15), transparent 80%)`;
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        const spotlight = cardRef.current.querySelector('.card-spotlight');
        if (spotlight) {
            spotlight.style.opacity = '0';
        }
    };

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group perspective-1000"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                className="relative flex flex-col h-full bg-card/30 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-primary/5"
            >
                {/* Image Section with Overlay */}
                <div 
                    style={{ transform: "translateZ(50px)" }}
                    className="relative aspect-[16/9] overflow-hidden project-image-container cursor-none"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {project.featured && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                                <Star size={12} fill="currentColor" />
                                Featured
                            </div>
                        )}
                        <div className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                            {project.category}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div 
                    style={{ transform: "translateZ(30px)" }}
                    className="flex flex-col flex-grow p-6 md:p-8 space-y-4"
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                                {project.title}
                            </h3>
                            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                                {project.date?.split('-')[0]}
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2">
                            {project.description}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span 
                                key={tag} 
                                className="px-2.5 py-1 rounded-md bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/10"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 4 && (
                            <span className="text-[10px] font-bold text-muted-foreground/40 self-center">
                                +{project.tags.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 mt-auto">
                        {project.live && (
                            <motion.a
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                            >
                                <ExternalLink size={14} />
                                <span>Live Demo</span>
                            </motion.a>
                        )}
                        {project.github && (
                            <motion.a
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-3 rounded-xl bg-secondary text-foreground border border-border transition-all hover:bg-secondary/80"
                                title="View Source"
                            >
                                <Github size={18} />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Dynamic Spotlight */}
                <div className="card-spotlight absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none" />

                {/* Subtle Hover Glow */}
                <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 pointer-events-none transition-all duration-1000 opacity-0 group-hover:opacity-100" />
            </motion.div>
        </motion.div>
    )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
