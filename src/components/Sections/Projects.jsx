import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ExternalLink,
    Github,
    ArrowRight,
    Star,
    Users,
    TrendingUp,
    Globe,
    Lock,
    Zap
} from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../shared/SectionWrapper'
import ProjectCard from '../UI/ProjectCard'
import Button from '../UI/Button'
import { projects } from '../../utils/constants'

const categories = [
    { id: 'all', label: 'All Projects', count: 12 },
    { id: 'enterprise', label: 'Enterprise', count: 4 },
    { id: 'saas', label: 'SaaS Platforms', count: 3 },
    { id: 'ecommerce', label: 'E-commerce', count: 3 },
    { id: 'dashboard', label: 'Dashboards', count: 2 },
]

const filters = [
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'recent', label: 'Most Recent', icon: TrendingUp },
    { id: 'popular', label: 'Most Popular', icon: Users },
]

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [activeFilter, setActiveFilter] = useState('featured')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

    const filteredProjects = projects.filter(project => {
        if (activeCategory === 'all') return true
        return project.category === activeCategory
    })

    // Sort based on filter
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        switch (activeFilter) {
            case 'recent':
                return new Date(b.date) - new Date(a.date)
            case 'popular':
                return b.stars - a.stars
            default:
                return a.featured ? -1 : 1
        }
    })

    return (
        <SectionWrapper id="projects" className="bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <SectionTitle
                        subtitle="Portfolio Showcase"
                        align="center"
                    >
                        Enterprise <span className="gradient-text">Projects</span>
                    </SectionTitle>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                        A curated selection of professional projects demonstrating expertise in
                        scalable architecture, modern technologies, and business impact.
                    </p>
                </div>

                {/* Filters and Controls */}
                <div className="mb-12">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span>{category.label}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === category.id
                                        ? 'bg-white/20'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}>
                                    {category.count}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Sort by:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {filters.map((filter) => {
                                    const Icon = filter.icon
                                    return (
                                        <button
                                            key={filter.id}
                                            onClick={() => setActiveFilter(filter.id)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeFilter === filter.id
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="text-sm font-medium">{filter.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                aria-label="Grid view"
                            >
                                <div className="w-5 h-5 grid grid-cols-2 gap-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="bg-current rounded-sm" />
                                    ))}
                                </div>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                aria-label="List view"
                            >
                                <div className="w-5 h-5 flex flex-col gap-1">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-1 bg-current rounded-full" />
                                    ))}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Projects Grid/List */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${activeFilter}-${viewMode}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={viewMode === 'grid'
                            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                            : 'space-y-6'
                        }
                    >
                        {sortedProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                layout
                            >
                                <ProjectCard
                                    project={project}
                                    viewMode={viewMode}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { icon: Globe, value: '99.9%', label: 'Uptime' },
                        { icon: Zap, value: '<100ms', label: 'Response Time' },
                        { icon: Users, value: '10K+', label: 'Active Users' },
                        { icon: Lock, value: '100%', label: 'Security Score' },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center"
                        >
                            <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="primary"
                            size="lg"
                            href="https://github.com/mdtanveer0786"
                            target="_blank"
                            icon={<Github className="h-5 w-5" />}
                            className="group"
                        >
                            View All on GitHub
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            href="#contact"
                            icon={<ExternalLink className="h-5 w-5" />}
                        >
                            Request Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}