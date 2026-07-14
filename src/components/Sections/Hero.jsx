import { motion } from 'framer-motion'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { socialLinks } from '../../utils/constants'
import MeshGradient from '../UI/MeshGradient'

export default function Hero({ setActiveSection }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        }
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10">
            {/* Mesh Gradient Background */}
            <MeshGradient />

            {/* Noise overlay */}
            <div className="absolute inset-0 noise-overlay -z-10 pointer-events-none" />

            <div className="container mx-auto relative z-10 py-20 sm:py-24 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20">
                    {/* Left — Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-3/5 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start"
                    >

                        {/* Headline */}
                        <motion.div variants={itemVariants} className="space-y-4 w-full">
                            <p className="text-muted-foreground text-base sm:text-lg font-medium">
                                Hi, I&apos;m <span className="text-primary font-semibold">Md Tanveer Alam</span>
                            </p>
                            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[1.05]">
                                Full Stack{' '}
                                <span className="premium-text-gradient">
                                    Developer
                                </span>
                            </h1>
                            <p className="text-xl sm:text-2xl font-medium text-foreground/90 max-w-2xl mx-auto lg:mx-0">
                                crafting fast, scalable, and visually stunning digital products.
                            </p>
                        </motion.div>

                        {/* Typewriter */}
                        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3">
                            <div className="h-8 w-[3px] rounded-full bg-primary/40" />
                            <div className="text-lg sm:text-xl md:text-2xl font-mono font-medium text-foreground/80">
                                <TypeAnimation
                                    sequence={[
                                        'MERN Stack Expert', 2500,
                                        'React Specialist', 2500,
                                        'UI/UX Enthusiast', 2500,
                                        'Production-Ready Apps', 2500,
                                    ]}
                                    wrapper="span"
                                    speed={40}
                                    repeat={Infinity}
                                    className="text-primary"
                                />
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            I specialize in the <span className="text-foreground font-semibold">MERN stack</span> and build production-ready applications that combine clean code, modern design, and real-world performance.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                onClick={() => {
                                    setActiveSection('contact')
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                className="btn-primary w-full xs:w-auto"
                            >
                                <span>Let&apos;s Talk</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>

                            <motion.a
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                href="./resume.pdf"
                                download="Md_Tanveer_Alam_Resume.pdf"
                                className="btn-secondary w-full xs:w-auto"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Resume</span>
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shrink-0"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                )
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right — Code Editor Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:w-2/5 flex justify-center"
                    >
                        <div className="relative w-full max-w-[420px]">
                            {/* Glow behind card */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-cyan-400/20 rounded-3xl blur-[60px] animate-glow-pulse" />

                            {/* Code Editor Card */}
                            <div className="relative rounded-2xl border border-black/10 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c14]/80 backdrop-blur-xl shadow-2xl dark:shadow-black/50 overflow-hidden">
                                {/* Title bar */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                    </div>
                                    <span className="text-[11px] font-mono text-muted-foreground ml-2">developer.jsx</span>
                                </div>

                                {/* Code content */}
                                <div className="p-5 font-mono text-[12px] leading-relaxed space-y-0.5">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <span className="text-fuchsia-500 dark:text-fuchsia-400">const</span>{' '}
                                        <span className="text-cyan-600 dark:text-cyan-400">developer</span>{' '}
                                        <span className="text-foreground/50">=</span>{' '}
                                        <span className="text-foreground/50">{'{'}</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pl-4">
                                        <span className="text-foreground/70">name:</span>{' '}
                                        <span className="text-emerald-600 dark:text-emerald-400">&quot;Md Tanveer Alam&quot;</span><span className="text-foreground/30">,</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pl-4">
                                        <span className="text-foreground/70">role:</span>{' '}
                                        <span className="text-emerald-600 dark:text-emerald-400">&quot;Full Stack Developer&quot;</span><span className="text-foreground/30">,</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="pl-4">
                                        <span className="text-foreground/70">focus:</span>{' '}
                                        <span className="text-emerald-600 dark:text-emerald-400">&quot;MERN Stack &amp; Modern Web Apps&quot;</span><span className="text-foreground/30">,</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="pl-4">
                                        <span className="text-foreground/70">skills:</span>{' '}
                                        <span className="text-foreground/50">[</span>
                                        <span className="text-amber-600 dark:text-amber-400">&quot;React.js&quot;</span><span className="text-foreground/30">, </span>
                                        <span className="text-amber-600 dark:text-amber-400">&quot;Node.js&quot;</span><span className="text-foreground/30">, </span>
                                        <span className="text-amber-600 dark:text-amber-400">&quot;Express.js&quot;</span><span className="text-foreground/30">, </span>
                                        <span className="text-amber-600 dark:text-amber-400">&quot;MongoDB&quot;</span>
                                        <span className="text-foreground/50">]</span><span className="text-foreground/30">,</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="pl-4">
                                        <span className="text-foreground/70">mindset:</span>{' '}
                                        <span className="text-emerald-600 dark:text-emerald-400">&quot;Problem solver &amp; continuous learner&quot;</span><span className="text-foreground/30">,</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="pl-4">
                                        <span className="text-foreground/70">availability:</span>{' '}
                                        <span className="text-emerald-600 dark:text-emerald-400">&quot;Open to freelance &amp; full-time roles&quot;</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                                        <span className="text-foreground/50">{'}'}</span><span className="text-foreground/30">;</span>
                                        <span className="inline-block w-[2px] h-3.5 bg-primary ml-1 animate-typing-cursor" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Floating tech badges */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-border/50 shadow-lg text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hidden sm:block"
                            >
                                <span role="img" aria-label="React.js">⚛️</span> React.js
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-border/50 shadow-lg text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hidden sm:block"
                            >
                                <span role="img" aria-label="Node.js">🟢</span> Node.js
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                href="#about"
                onClick={(e) => {
                    e.preventDefault()
                    setActiveSection('about')
                    const element = document.getElementById('about')
                    if (element) {
                        const yOffset = -80 // Match header offset
                        const y = element.getBoundingClientRect().top + window.scrollY + yOffset
                        window.scrollTo({ top: y, behavior: 'smooth' })
                    }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 select-none group"
                aria-label="Scroll to About section"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-muted-foreground/40 group-hover:text-primary/70 transition-colors"
                >
                    <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">Scroll</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:scale-110" />
                </motion.div>
            </motion.a>
        </section>
    )
}
