import { motion } from 'framer-motion'
import { Heart, Mail, ArrowUp, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'
import { socialLinks, navItems } from '../../utils/constants'
import Magnetic from '../UI/Magnetic'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative bg-background pt-20 pb-10 overflow-hidden border-t border-border/40">
            {/* Ultra-Premium background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
                    
                    {/* Brand & Bio */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-violet-500/20">
                                MD
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter uppercase leading-none">Tanveer</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mt-1">Full Stack Developer</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm font-medium">
                            Engineering high-performance web applications with a focus on clean code, scalability, and exceptional user experiences.
                        </p>
                        
                        {/* Availability Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.15em]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Available for New Projects
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Navigation</h4>
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a 
                                        href={item.href} 
                                        className="text-muted-foreground hover:text-primary transition-all text-sm font-bold flex items-center gap-2 group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Contact */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Connect with me</h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon
                                return (
                                    <Magnetic key={i}>
                                        <motion.a
                                            whileHover={{ scale: 1.1, y: -4 }}
                                            whileTap={{ scale: 0.9 }}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-2xl bg-secondary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all border border-border/50 hover:border-primary/30 flex items-center justify-center group"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </motion.a>
                                    </Magnetic>
                                )
                            })}
                        </div>
                        <div className="pt-4 space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Say Hello</p>
                            <a href="mailto:tanveerdev14@gmail.com" className="text-lg font-black tracking-tight hover:text-primary transition-colors flex items-center gap-3 group">
                                tanveerdev14@gmail.com
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                            &copy; {new Date().getFullYear()} MD TANVEER ALAM
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                            <span>BUILT WITH</span>
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                            <span>USING REACT</span>
                        </div>
                    </div>

                    {/* Back to Top */}
                    <Magnetic>
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-foreground text-background font-bold text-xs uppercase tracking-widest transition-all hover:bg-primary hover:text-white"
                        >
                            <span>Back to Top</span>
                            <div className="p-1 rounded-lg bg-background/20 group-hover:bg-white/20 transition-colors">
                                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </motion.button>
                    </Magnetic>
                </div>
            </div>

            {/* Subtle bottom line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 mt-10 opacity-50" />
        </footer>
    )
}
