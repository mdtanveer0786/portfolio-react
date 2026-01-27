import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../shared/SectionWrapper'
import { experience } from '../../utils/constants'

export default function Experience() {
    return (
        <SectionWrapper id="experience">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Career Journey">
                    Work <span className="gradient-text">Experience</span>
                </SectionTitle>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-600 to-primary/20" />

                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                } items-center mb-12`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 z-10">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-purple-600 border-4 border-background" />
                            </div>

                            {/* Content */}
                            <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                }`}>
                                <div className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                                            <p className="text-lg text-primary font-medium">{exp.company}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm font-medium">{exp.period}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Award className="h-4 w-4 text-primary" />
                                            <span className="font-medium">Key Achievements:</span>
                                        </div>
                                        <ul className="space-y-2 ml-6">
                                            {exp.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start space-x-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                                    <span className="text-sm">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}