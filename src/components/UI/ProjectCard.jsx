import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ExternalLink,
    Github,
    Star,
    Users,
    TrendingUp,
    Calendar,
    Lock,
    Globe
} from 'lucide-react'

export default function ProjectCard({
    project,
    viewMode = 'grid',
    index
}) {
    const [isHovered, setIsHovered] = useState(false)

    const getStatusColor = (status) => {
        switch (status) {
            case 'production': return 'bg-green-500'
            case 'development': return 'bg-blue-500'
            case 'maintenance': return 'bg-yellow-500'
            default: return 'bg-gray-500'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'production': return 'Live'
            case 'development': return 'In Development'
            case 'maintenance': return 'Maintenance'
            default: return 'Archived'
        }
    }

    if (viewMode === 'list') {
        return (
            <motion.div
                whileHover={{ x: 10 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group bg-card text-card-foreground rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300"
            >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Image */}
                    <div className="lg:w-1/4">
                        <div className="relative aspect-video rounded-xl overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} text-white`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                                    {getStatusText(project.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground line-clamp-2">
                                    {project.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                                {project.stats?.stars && (
                                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{project.stats.stars}</span>
                                    </div>
                                )}
                                {project.stats?.users && (
                                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        <span>{project.stats.users}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Bottom Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{project.date}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>{project.impact}</span>
                                </span>
                            </div>

                            <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                                        aria-label="View code"
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                                        aria-label="View live"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                    </a>
                                )}
                                {project.private && (
                                    <span className="p-2 rounded-lg bg-muted text-muted-foreground opacity-50" title="Private Project">
                                        <Lock className="h-5 w-5" />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    // Grid View
    return (
        <motion.div
            whileHover={{ y: -10 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-2xl bg-card text-card-foreground border border-border hover:shadow-2xl transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Status Indicator */}
            <div className="absolute top-4 left-4 z-10">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} text-white shadow-lg`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                    {getStatusText(project.status)}
                </span>
            </div>

            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Hover Overlay */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20"
                />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                    </h3>

                    {project.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                        </span>
                    )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm">
                        {project.stats && (
                            <>
                                {project.stats.stars && (
                                    <div className="flex items-center space-x-1 text-muted-foreground">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{project.stats.stars}</span>
                                    </div>
                                )}
                                {project.stats.impact && (
                                    <div className="flex items-center space-x-1 text-muted-foreground">
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                        <span>{project.stats.impact}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="text-xs font-medium text-muted-foreground">
                        {project.date}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="h-4 w-4" />
                                <span>Code</span>
                            </a>
                        )}

                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                                <span>Live</span>
                            </a>
                        )}
                    </div>

                    {project.private && (
                        <span className="text-xs text-muted-foreground flex items-center" title="Private Repository">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}