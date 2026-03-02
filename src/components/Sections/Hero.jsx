import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import CodeBlock from '../UI/CodeBlock'
import { socialLinks } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import Magnetic from '../UI/Magnetic'

export default function Hero({ setActiveSection }) {
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
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-20 lg:pt-24 lg:pb-12 px-4 sm:px-6 md:px-10">
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
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.15] sm:leading-[1.1]">
                                <TextReveal text="Hello, I'm" className="justify-center lg:justify-start" />
                                <span className="premium-text-gradient animate-gradient">Md Tanveer Alam</span>, <br />
                                <TextReveal text="I'm a Professional" className="justify-center lg:justify-start" />
                                <span className="text-foreground">Full Stack Developer</span>.
                            </h1>
                            <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                I engineer highly scalable, performance-driven web applications with an obsessive focus on user experience and clean code architecture.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start space-x-5 sm:space-x-6">
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

                        <motion.div variants={itemVariants} className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-4">
                            <Magnetic>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setActiveSection('contact')
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                    className="w-full xs:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold flex items-center justify-center space-x-3 shadow-xl hover:shadow-violet-500/20 transition-all uppercase tracking-wider text-xs sm:text-sm"
                                >
                                    <span>Contact Me</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 h-5" />
                                </motion.button>
                            </Magnetic>
                            
                            <Magnetic>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/resume.pdf"
                                    download="Md_Tanveer_Alam_Resume.pdf"
                                    className="w-full xs:w-auto px-8 py-4 rounded-full border border-violet-600/50 text-foreground font-bold flex items-center justify-center space-x-3 hover:bg-violet-600/10 transition-all uppercase tracking-wider text-xs sm:text-sm block"
                                >
                                    <span>Get Resume</span>
                                    <Download className="w-4 h-4 sm:w-5 h-5" />
                                </motion.a>
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
