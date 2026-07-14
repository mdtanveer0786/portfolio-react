import { motion } from 'framer-motion'
import { Code2, Rocket, MapPin, Briefcase, Heart, Download } from 'lucide-react'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'

export default function About() {
    const stats = [
        { value: '10+', label: 'Projects Built', icon: Heart },
        { value: '2+', label: 'Years Coding', icon: Code2 },
        { value: '8+', label: 'Tech Stack', icon: Rocket },
    ]

    const techStack = [
        { icon: FaReact, name: 'React', color: '#61DAFB' },
        { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
        { icon: SiExpress, name: 'Express', color: null },
        { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
        { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    ]

    return (
        <section id="about" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="lines" />

            {/* Ambient Glow Background Effects */}
            <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <Code2 size={14} />
                            About Me
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display leading-tight">
                            Turning Ideas Into{' '}
                            <span className="premium-text-gradient">Reality</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle max-w-3xl text-base sm:text-lg leading-relaxed mt-4">
                            I am a Full Stack Developer based in India, driven by a passion for engineering high-performance web applications. My mission is to architect exceptional digital experiences that are robust, intuitive, and visually compelling.
                        </p>
                    </SectionReveal>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto mt-6">
                    {/* Main Story Card — 7 cols */}
                    <div className="md:col-span-7 h-full">
                        <SectionReveal delay={0.1} className="h-full">
                            <div className="glass-card p-6 sm:p-8 md:p-10 space-y-6 h-full relative overflow-hidden group flex flex-col justify-between">
                                {/* Corner Glow */}
                                <div className="absolute -right-16 -top-16 w-40 h-40 bg-gradient-to-br from-primary/10 to-fuchsia-500/5 rounded-full blur-2xl transition-opacity duration-700 group-hover:opacity-70" />
                                
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-3.5">
                                        <div className="p-3 rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">My Story</h3>
                                    </div>
                                    
                                    <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                                        <p className="text-foreground font-medium text-lg sm:text-xl leading-relaxed">
                                            As a dedicated software engineer specializing in the <span className="text-primary font-bold">MERN stack</span>, I thrive at the intersection of complex backend architecture and refined user interface design.
                                        </p>
                                        <p>
                                            My approach goes beyond simply writing clean code. I am deeply committed to building scalable, real-world solutions that deliver a <span className="text-foreground font-semibold">seamless and intuitive</span> user experience, ensuring reliability under the hood and elegance on the surface.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 relative z-10">
                                    <motion.a
                                        href="./resume.pdf"
                                        download="Md_Tanveer_Alam_Resume.pdf"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-primary inline-flex text-xs sm:text-sm px-7 py-3.5 font-bold rounded-xl shadow-lg hover:shadow-primary/25"
                                        aria-label="Download Resume"
                                    >
                                        <Download size={20} className="mr-2" /> Download Resume
                                    </motion.a>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Profile Image Card — 5 cols */}
                    <div className="md:col-span-5 h-full">
                        <SectionReveal delay={0.2} className="h-full">
                            <div className="glass-card p-4 h-full relative group flex flex-col">
                                <div className="relative rounded-2xl overflow-hidden flex-grow min-h-[320px] md:min-h-full shadow-md">
                                    <img
                                        src="./about_avatar.jpeg"
                                        alt="Md Tanveer Alam"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = "./profile.jpg"
                                        }}
                                    />
                                    
                                    {/* Elegant Overlay with fine gradients */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                                    
                                    {/* Name & Location Tag */}
                                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary/80 text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-2 backdrop-blur-md shadow-lg shadow-primary/20">
                                            Available
                                        </span>
                                        <h4 className="text-white font-display font-extrabold text-xl sm:text-2xl tracking-tight shadow-sm">Md Tanveer Alam</h4>
                                        <div className="flex items-center gap-2 mt-1.5 text-white/75">
                                            <MapPin size={14} className="text-primary-foreground" />
                                            <p className="text-xs sm:text-sm font-medium">Delhi, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Stats Card — 5 cols */}
                    <div className="md:col-span-5 h-full">
                        <SectionReveal delay={0.3} className="h-full">
                            <div className="glass-card p-4 xs:p-6 sm:p-8 h-full flex flex-col justify-between relative group">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">Metrics</h3>
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Rocket className="w-4 h-4" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4">
                                    {stats.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            whileHover={{ y: -4 }}
                                            className="text-center py-3 px-1 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] shadow-sm transition-all duration-300 cursor-default group/statItem flex flex-col justify-center min-w-0 overflow-hidden"
                                        >
                                            <p className="text-xl sm:text-3xl font-display font-extrabold text-primary mb-0.5 group-hover/statItem:scale-105 transition-transform origin-center leading-none">{stat.value}</p>
                                            <p className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] leading-tight text-muted-foreground font-bold uppercase tracking-wider break-words w-full">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Tech Stack Card — 7 cols */}
                    <div className="md:col-span-7 h-full">
                        <SectionReveal delay={0.4} className="h-full">
                            <div className="glass-card p-4 xs:p-6 sm:p-8 h-full flex flex-col justify-between group relative overflow-hidden">
                                <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none group-hover:opacity-80 transition-opacity" />
                                
                                <div className="mb-6">
                                    <h3 className="text-sm sm:text-base font-display font-bold text-foreground tracking-widest uppercase opacity-75">Stack Expertise</h3>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {techStack.map((tech) => (
                                        <motion.div
                                            key={tech.name}
                                            whileHover={{ y: -5, scale: 1.04 }}
                                            className="flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/10 transition-all duration-300 cursor-default group/techItem"
                                        >
                                            <tech.icon 
                                                className="text-lg sm:text-xl transition-transform duration-300 group-hover/techItem:scale-110" 
                                                style={{ color: tech.color || 'hsl(var(--muted-foreground))' }} 
                                            />
                                            <span className="text-xs sm:text-sm font-semibold text-foreground">{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
