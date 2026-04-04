import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import CodeBlock from '../UI/CodeBlock'
import { socialLinks } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import Magnetic from '../UI/Magnetic'

export default function Hero({ setActiveSection }) {
    // ... containerVariants and itemVariants remain same
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    }

    return (
        <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-6 sm:pt-32 sm:pb-8 lg:pt-24 lg:pb-6 px-4 sm:px-6 md:px-10">
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20">
                    {/* Left Column: Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-3/5 space-y-8 sm:space-y-10 text-center lg:text-left order-1"
                    >
                        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <TextReveal text="Hello! 👋 I'm" className="justify-center lg:justify-start text-xl sm:text-2xl font-medium text-muted-foreground" />
                                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
                                    <span className="premium-text-gradient animate-gradient bg-clip-text text-transparent">
                                        Md Tanveer Alam
                                    </span>
                                </h1>
                            </div>

                            <div className="h-12 xs:h-16 sm:h-20 flex items-center justify-center lg:justify-start">
                                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/90">
                                    <span className="mr-3">I&apos;m a</span>
                                    <TypeAnimation
                                        sequence={[
                                            'Frontend Developer', 2000,
                                            'Backend Developer', 2000,
                                            'Full Stack Developer', 2000,
                                            'MERN Stack Developer', 2000,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                        className="text-primary underline decoration-primary/30 underline-offset-8"
                                    />
                                </h2>
                            </div>

                            <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Specializing in the <span className="text-primary font-bold">MERN stack</span>, I transform complex ideas into high-performance web applications that drive business growth.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start space-x-6">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <Magnetic key={social.label}>
                                        <motion.a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, y: -4 }}
                                            className="text-muted-foreground hover:text-primary transition-all p-1 block"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </motion.a>
                                    </Magnetic>
                                )
                            })}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-5">
                            <Magnetic>
                                <button
                                    onClick={() => {
                                        setActiveSection('contact')
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                    className="w-full xs:w-auto px-10 py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center space-x-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>Work With Me</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                </button>
                            </Magnetic>

                            <Magnetic>
                                <a
                                    href="/resume.pdf"
                                    download="Md_Tanveer_Alam_Resume.pdf"
                                    className="w-full xs:w-auto px-10 py-4 rounded-full border-2 border-primary/20 text-foreground font-bold flex items-center justify-center space-x-3 hover:bg-primary/5 transition-all uppercase tracking-widest text-xs relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>Download CV</span>
                                        <Download className="w-4 h-4" />
                                    </span>
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                </a>
                            </Magnetic>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: CodeBlock */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full lg:w-2/5 order-2 flex justify-center"
                    >
                        <div className="relative w-full max-w-[500px] lg:max-w-none">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-lg blur opacity-20 transition duration-1000"></div>
                            <CodeBlock />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />
        </section>
    )
}
