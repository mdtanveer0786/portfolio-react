import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import Typewriter from '../UI/Typewriter'
import FloatingElements from '../UI/FloatingElements'

export default function Hero({ setActiveSection }) {
    const socialLinks = [
        {
            icon: Github,
            href: 'https://github.com/mdtanveer0786',
            label: 'GitHub'
        },
        {
            icon: Linkedin,
            href: 'https://linkedin.com/in/md-tanveer-alam',
            label: 'LinkedIn'
        },
        {
            icon: Twitter,
            href: 'https://twitter.com/tanveertoofan01',
            label: 'Twitter'
        },
        {
            icon: Mail,
            href: 'mailto:tanveerdev14@gmail.com',
            label: 'Email'
        },
    ]

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <FloatingElements />

            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full glass"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium">Available for opportunities</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
                        >
                            Hi, I'm{' '}
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                Tanveer
                            </span>
                        </motion.h1>

                        <div className="h-20 mb-6">
                            <Typewriter
                                texts={[
                                    'Full Stack Developer',
                                    'React Specialist',
                                    'Problem Solver',
                                    'Tech Enthusiast',
                                ]}
                                className="text-xl sm:text-2xl md:text-3xl text-muted-foreground"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl"
                        >
                            I craft exceptional digital experiences with modern web technologies.
                            Passionate about building scalable applications that solve real-world problems.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setActiveSection('contact')
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium text-base sm:text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            >
                                Get In Touch
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setActiveSection('projects')
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full glass border border-primary/20 font-medium text-base sm:text-lg hover:bg-primary/5 transition-all duration-300"
                            >
                                View Projects
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <span className="text-sm text-muted-foreground">Follow me:</span>
                            <div className="flex space-x-2">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon
                                    return (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
                                            aria-label={social.label}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            delay: 0.3
                        }}
                        className="relative order-first lg:order-last"
                    >
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                            {/* Outer Glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 blur-3xl animate-pulse" />

                            {/* Gradient Border */}
                            <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-primary via-purple-500 to-primary">
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                                    {/* Profile Image */}
                                    <img
                                        src="/profile.jpg"
                                        alt="Md Md Tanveer Alam"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto"
                        >
                            {[
                                { value: '2+', label: 'Years Experience' },
                                { value: '50+', label: 'Projects' },
                                { value: '100%', label: 'Satisfaction' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 rounded-xl glass hover:bg-primary/5 transition-colors"
                                >
                                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault()
                        setActiveSection('about')
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex flex-col items-center space-y-2 group"
                >
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        Scroll Down
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1"
                    >
                        <div className="w-1 h-3 rounded-full bg-primary" />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    )
}