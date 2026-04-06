import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiMongodb, SiExpress } from 'react-icons/si'

export default function About() {
    return (
        <section id="about" className="section-container relative overflow-hidden">
            {/* Background Text - Improved visibility and positioning */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                ABOUT
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-8 md:mb-10 space-y-4">
                    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />
                    <TextReveal
                        text="Who I am"
                        className="text-3xl md:text-5xl font-black uppercase tracking-wider"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Story Content */}
                    <div className="md:col-span-7 order-2 md:order-1">
                        <SectionReveal>
                            <div className="space-y-4 md:space-y-6 text-center md:text-left">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-primary">
                                    A Dedicated Coder from India
                                </h3>
                                <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                                    <p>
                                        I am a passionate <span className="text-foreground font-bold">Full Stack Developer</span> specializing in building modern, scalable web apps with the <span className="text-primary font-bold">MERN Stack</span>.
                                    </p>
                                    <p>
                                        I craft intuitive interfaces with <span className="text-primary font-bold">React</span> and robust backend systems with <span className="text-primary font-bold">Node.js</span>, transforming complex problems into seamless experiences.
                                    </p>
                                    <p>
                                        Driven by curiosity and excellence, I write clean, maintainable code to deliver high-performance solutions that delight users and businesses alike.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                                    {[
                                        { label: 'Projects Completed', value: '10', suffix: '+' },
                                        { label: 'Happy Clients', value: '05', suffix: '+' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="flex items-baseline gap-1">
                                                <motion.span
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                                    className="text-3xl md:text-4xl font-black text-primary tracking-tighter"
                                                >
                                                    {stat.value}
                                                </motion.span>
                                                <span className="text-xl font-bold text-primary/60">{stat.suffix}</span>
                                            </div>
                                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-tight">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                                    {/* Download CV Button in About Section */}
                                    <motion.a
                                        href="/resume.pdf"
                                        download="Md_Tanveer_Alam_Resume.pdf"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all mb-4 md:mb-0"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                        Download CV
                                    </motion.a>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                                    {/* Tech Stack Pills */}
                                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        <FaReact className="text-[#61DAFB] text-xl" />
                                        <span className="text-sm font-semibold text-foreground">React</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        <FaNodeJs className="text-[#339933] text-xl" />
                                        <span className="text-sm font-semibold text-foreground">Node.js</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        <SiExpress className="text-muted-foreground text-xl" />
                                        <span className="text-sm font-semibold text-foreground">Express</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        <SiMongodb className="text-[#47A248] text-xl" />
                                        <span className="text-sm font-semibold text-foreground">MongoDB</span>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Premium Animated Profile Card */}
                    <div className="md:col-span-5 order-1 md:order-2 flex justify-center mt-10 md:mt-0">
                        <SectionReveal delay={0.2}>
                            <div className="relative group max-w-[280px] sm:max-w-[320px] w-full">
                                {/* Intense Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>

                                {/* Card Container */}
                                <div className="relative bg-card/80 backdrop-blur-xl p-2 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-2xl overflow-visible group-hover:border-primary/50 transition-colors duration-500">

                                    {/* Moving Gradient Border - NEW PREMIUM EFFECT */}
                                    <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-gradient-xy"></div>

                                    {/* Premium 3D Avatar Wrapper */}
                                    <div className="relative rounded-[1.8rem] overflow-hidden">
                                        <img
                                            src="/about_avatar.png"
                                            alt="Md Tanveer Alam - 3D Avatar"
                                            loading="lazy"
                                            className="w-full aspect-[4/5] object-cover rounded-[1.8rem] transition-all duration-700 group-hover:scale-105 shadow-inner"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "/profile.jpg" // Fallback to original photo
                                            }}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                                    </div>

                                    {/* Floating Badges */}
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="absolute -right-8 top-16 bg-[#161b22]/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl z-20 hidden sm:block"
                                    >
                                        <FaReact className="w-8 h-8 text-[#61DAFB] animate-[spin_10s_linear_infinite]" />
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 15, 0] }}
                                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                        className="absolute -left-8 bottom-32 bg-[#161b22]/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl z-20 hidden sm:block"
                                    >
                                        <FaNodeJs className="w-8 h-8 text-[#339933]" />
                                    </motion.div>

                                    {/* Hover Details Card */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-gradient-to-r from-secondary to-card border border-black/10 dark:border-white/10 p-4 rounded-2xl shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-inner">
                                                <SiMongodb className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-bold text-sm tracking-wide">MERN Stack Expert</h4>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    <p className="text-muted-foreground text-xs font-medium">Available for Work</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
