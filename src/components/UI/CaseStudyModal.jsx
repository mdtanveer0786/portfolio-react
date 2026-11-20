import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, ShieldCheck, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function CaseStudyModal({ project, isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose]);

    if (!project || !project.caseStudy) return null;

    const { caseStudy } = project;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
                        aria-hidden="true"
                    />

                    {/* Modal Container */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="case-study-title"
                        initial={{ opacity: 0, scale: 0.93, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] bg-card dark:bg-[#0c0c16] border border-primary/30 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col z-10 my-auto"
                    >
                        {/* Header Banner */}
                        <div className="relative p-4 xs:p-6 sm:p-8 bg-gradient-to-r from-primary/15 via-purple-600/10 to-accent/15 border-b border-border/60">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 xs:top-4 xs:right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-foreground transition-all active:scale-95"
                                aria-label="Close case study"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>

                            <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap pr-8">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 shadow-sm">
                                    <Layers size={12} /> {caseStudy.badge || 'Architecture Deep Dive'}
                                </span>
                                {project.featured && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                        Production Platform
                                    </span>
                                )}
                            </div>

                            <h2 id="case-study-title" className="text-lg xs:text-xl sm:text-3xl font-display font-bold text-foreground tracking-tight leading-snug">
                                {project.title}
                            </h2>

                            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl">
                                {caseStudy.subtitle}
                            </p>

                            {/* Quick Action Links */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-5">
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl btn-primary text-xs font-semibold shadow-md active:scale-95 transition-all w-full xs:w-auto"
                                    >
                                        <ExternalLink size={13} /> Open Live Platform
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-foreground border border-border text-xs font-semibold transition-all active:scale-95 w-full xs:w-auto"
                                    >
                                        <Github size={13} /> View Repository
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 xs:p-6 sm:p-8 overflow-y-auto space-y-5 sm:space-y-7 custom-scrollbar flex-1">
                            {/* Executive Overview */}
                            <div>
                                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                                    <Cpu size={14} /> Architectural Overview
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-2xl border border-border/50">
                                    {caseStudy.overview}
                                </p>
                            </div>

                            {/* Metrics Grid */}
                            {caseStudy.metrics && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {caseStudy.metrics.map((m, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 text-center">
                                            <p className="text-xs sm:text-sm font-bold text-foreground">{m.value}</p>
                                            <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mt-0.5">{m.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Core Engineering Highlights */}
                            <div>
                                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <Zap size={14} /> Core Engineering Highlights
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {caseStudy.highlights.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border hover:border-primary/30 transition-all space-y-1.5"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                    <CheckCircle2 size={13} />
                                                </div>
                                                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                                                    {item.title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Architecture Tech Stack */}
                            {caseStudy.techStack && (
                                <div>
                                    <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                        <ShieldCheck size={14} /> Technology Ecosystem
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-black/[0.03] dark:bg-white/[0.04] text-foreground border border-border"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Banner */}
                        <div className="p-4 sm:p-5 bg-black/[0.03] dark:bg-white/[0.02] border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-xs text-muted-foreground text-center sm:text-left">
                                Need a custom multi-tenant SaaS or real-time architecture built?
                            </p>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <a
                                    href="https://wa.me/917482946610?text=Hi%20Tanveer!%20I%20reviewed%20your%20architecture%20case%20study%20and%20would%20like%20to%20discuss%20a%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                                >
                                    <FaWhatsapp size={14} /> Discuss on WhatsApp
                                </a>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] hover:bg-black/[0.1] text-foreground text-xs font-semibold transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
