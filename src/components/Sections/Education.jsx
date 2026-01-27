import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../shared/SectionWrapper'
import { education } from '../../utils/constants'

export default function Education() {
    return (
        <SectionWrapper id="education">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Academic Background">
                    Education & <span className="gradient-text">Qualifications</span>
                </SectionTitle>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm font-medium">{edu.period}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                            <p className="text-lg text-primary font-medium mb-3">{edu.institution}</p>

                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Award className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">{edu.grade}</span>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">{edu.description}</p>

                            <div className="flex items-center space-x-2 text-sm text-primary">
                                <BookOpen className="h-4 w-4" />
                                <span>View Credentials</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 glass rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-6">Certifications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            'AWS Certified Developer',
                            'React Professional',
                            'Node.js Expert',
                            'MongoDB Specialist'
                        ].map((cert, index) => (
                            <motion.div
                                key={cert}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                            >
                                <div className="text-lg font-bold gradient-text">{cert}</div>
                                <div className="text-xs text-muted-foreground mt-1">Verified</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}