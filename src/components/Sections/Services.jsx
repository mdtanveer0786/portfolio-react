import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import { services } from '../../utils/constants';
import SectionReveal from '../UI/SectionReveal';
import AnimatedBackground from '../UI/AnimatedBackground';

const Services = () => {
    return (
        <section id="services" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="glow" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <Server size={14} />
                            Services
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display">
                            My Expert{' '}
                            <span className="premium-text-gradient">Services</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            Delivering high-quality, scalable, and user-centric solutions tailored to your business needs.
                        </p>
                    </SectionReveal>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <SectionReveal key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="glass-card p-6 sm:p-8 relative overflow-hidden group flex flex-col h-full"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 p-4 rounded-xl bg-primary/[0.08] w-fit group-hover:bg-primary/15 transition-colors duration-300 text-primary">
                                        <service.icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {service.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-primary/5 border border-primary/10 group-hover:border-primary/20 group-hover:bg-primary/[0.08] transition-all duration-300 text-foreground/80"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Animated Border Effect */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
