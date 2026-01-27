import { motion } from 'framer-motion'
import {
    Code2,
    Server,
    Database,
    Palette,
    Cpu,
    Globe
} from 'lucide-react'
import SkillCard from '../UI/SkillCard'
import { skillCategories } from '../../utils/constants'

export default function Skills({ setActiveSection }) {
    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                        Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Technical{' '}
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Continuously learning and mastering cutting-edge technologies to deliver
                        exceptional solutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    {category.icon === Code2 && <Code2 className="h-6 w-6 text-primary" />}
                                    {category.icon === Server && <Server className="h-6 w-6 text-primary" />}
                                    {category.icon === Database && <Database className="h-6 w-6 text-primary" />}
                                    {category.icon === Cpu && <Cpu className="h-6 w-6 text-primary" />}
                                </div>
                                <h3 className="text-xl font-bold">{category.title}</h3>
                            </div>

                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                                    >
                                        <SkillCard
                                            skill={skill.name}
                                            level={skill.level}
                                            color={skill.color}
                                            showPercentage={true}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 glass rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Additional Skills</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            'Problem Solving', 'Team Leadership', 'Agile Methodologies',
                            'Code Review', 'Technical Documentation', 'Performance Optimization',
                            'Security Best Practices', 'UI/UX Principles', 'Testing & Debugging',
                            'System Design', 'Microservices', 'GraphQL', 'WebSockets', 'PWA'
                        ].map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 transition-colors cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}