import { motion } from 'framer-motion'
import { User, Award, Target, Globe } from 'lucide-react'

export default function About({ setActiveSection }) {
    const stats = [
        { icon: User, value: '2+', label: 'Years Experience' },
        { icon: Award, value: '50+', label: 'Projects Completed' },
        { icon: Target, value: '30+', label: 'Happy Clients' },
        { icon: Globe, value: '10+', label: 'Countries Served' },
    ]

    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                        About Me
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get to{' '}
                        <span className="gradient-text">
                            Know Me
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Passionate developer with a focus on creating exceptional digital experiences
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-lg mx-auto">
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl" />
                            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
                                <img
                                    src="/profile.jpg"
                                    alt="Md Md Tanveer Alam"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                            </div>

                            {/* Experience Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -top-4 -right-4 glass px-6 py-3 rounded-full"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="font-semibold">Available for work</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold">
                            Full Stack Developer & Problem Solver
                        </h3>

                        <p className="text-lg text-muted-foreground">
                            I'm a passionate Full Stack Developer with expertise in modern web technologies.
                            I specialize in building scalable, performant applications that deliver exceptional
                            user experiences.
                        </p>

                        <p className="text-lg text-muted-foreground">
                            My journey in web development started with a curiosity about how things work,
                            which has evolved into a career dedicated to crafting digital solutions that
                            make a real impact.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 rounded-xl glass hover:bg-primary/5 transition-colors"
                                >
                                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <a
                                href="#contact"
                                onClick={() => setActiveSection('contact')}
                                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-center"
                            >
                                Hire Me
                            </a>
                            <a
                                href="#projects"
                                onClick={() => setActiveSection('projects')}
                                className="px-8 py-3 rounded-full glass border border-primary/20 font-medium hover:bg-primary/5 transition-all duration-300 text-center"
                            >
                                View Projects
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}