import { motion } from 'framer-motion'
import { Code2, Rocket, MapPin, Briefcase } from 'lucide-react'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'

export default function About() {
    const stats = [
        { value: '10+', label: 'Projects Built' },
        { value: '2+', label: 'Years Coding' },
        { value: '8+', label: 'Technologies' },
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
                        <h2 className="section-title font-display">
                            Turning Ideas Into{' '}
                            <span className="premium-text-gradient">Reality</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            A passionate developer from India, dedicated to crafting modern web experiences.
                        </p>
                    </SectionReveal>
                </div>

                {/* Bento Grid — Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 max-w-5xl mx-auto">
                    {/* Main Story Card — 7 cols */}
                    <div className="md:col-span-7">
                        <SectionReveal delay={0.1}>
                            <div className="glass-card p-6 md:p-8 space-y-5 h-full">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-primary/10">
                                        <Briefcase className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-foreground">My Story</h3>
                                </div>
                                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    <p>
                                        I&apos;m a <span className="text-foreground font-semibold">Full Stack Developer</span> who fell in love with coding during my Computer Science degree. What started as curiosity quickly became a passion for building things that live on the internet.
                                    </p>
                                    <p>
                                        I specialize in the <span className="text-primary font-semibold">MERN Stack</span> — crafting intuitive frontend interfaces with React and robust backend systems with Node.js. I believe great software is invisible: it just works beautifully.
                                    </p>
                                    <p>
                                        When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, or helping fellow developers grow.
                                    </p>
                                </div>
                                <motion.a
                                    href="/resume.pdf"
                                    download="Md_Tanveer_Alam_Resume.pdf"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary inline-flex text-xs px-6 py-3"
                                >
                                    Download Resume
                                </motion.a>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Profile Image Card — 5 cols */}
                    <div className="md:col-span-5">
                        <SectionReveal delay={0.2}>
                            <div className="glass-card p-3 h-full">
                                <div className="relative rounded-xl overflow-hidden h-full min-h-[300px] md:min-h-[380px]">
                                    <img
                                        src="/about_avatar.png"
                                        alt="Md Tanveer Alam"
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = "/profile.jpg"
                                        }}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    {/* Name tag */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="text-white font-display font-bold text-lg">Md Tanveer Alam</h4>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <MapPin size={12} className="text-white/60" />
                                            <p className="text-white/60 text-xs font-medium">Delhi, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Stats Card — 5 cols */}
                    <div className="md:col-span-5">
                        <SectionReveal delay={0.3}>
                            <div className="glass-card p-6 h-full">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2.5 rounded-xl bg-primary/10">
                                        <Rocket className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-foreground">Quick Stats</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {stats.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className="text-center p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.03]"
                                        >
                                            <p className="text-2xl font-display font-bold text-primary">{stat.value}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Tech Stack Card — 7 cols */}
                    <div className="md:col-span-7">
                        <SectionReveal delay={0.4}>
                            <div className="glass-card p-6 h-full">
                                <h3 className="text-sm font-display font-semibold text-foreground mb-4">Core Technologies</h3>
                                <div className="flex flex-wrap gap-3">
                                    {techStack.map((tech) => (
                                        <motion.div
                                            key={tech.name}
                                            whileHover={{ y: -3, scale: 1.05 }}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] hover:border-primary/20 transition-all cursor-default"
                                        >
                                            <tech.icon className="text-lg" style={{ color: tech.color || 'hsl(var(--muted-foreground))' }} />
                                            <span className="text-sm font-medium text-foreground">{tech.name}</span>
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
