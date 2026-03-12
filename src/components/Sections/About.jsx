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
                                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                                    {/* Tech Stack Pills */}
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                                        <FaReact className="text-[#61DAFB] text-xl" />
                                        <span className="text-sm font-semibold text-gray-200">React</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                                        <FaNodeJs className="text-[#339933] text-xl" />
                                        <span className="text-sm font-semibold text-gray-200">Node.js</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                                        <SiExpress className="text-gray-300 text-xl" />
                                        <span className="text-sm font-semibold text-gray-200">Express</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                                        <SiMongodb className="text-[#47A248] text-xl" />
                                        <span className="text-sm font-semibold text-gray-200">MongoDB</span>
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
                                <div className="relative bg-[#0d1117]/80 backdrop-blur-xl p-3 rounded-[2rem] border border-white/10 shadow-2xl overflow-visible">
                                    
                                    {/* Profile Image Wrapper */}
                                    <div className="relative rounded-3xl overflow-hidden">
                                        <img
                                            src="/profile.jpg"
                                            alt="Md Tanveer Alam"
                                            loading="lazy"
                                            className="w-full aspect-[4/5] object-cover rounded-3xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 filter grayscale-[20%] group-hover:grayscale-0"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800"
                                            }}
                                        />
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80"></div>
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
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-gradient-to-r from-[#1a1f2e] to-[#121620] border border-white/10 p-4 rounded-2xl shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-inner">
                                                <SiMongodb className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm tracking-wide">MERN Stack Expert</h4>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="relative flex h-2 w-2">
                                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    <p className="text-gray-400 text-xs font-medium">Available for Work</p>
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
