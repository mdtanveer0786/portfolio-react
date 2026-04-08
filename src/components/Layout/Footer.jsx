import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react'
import { navItems } from '../../utils/constants'
import Magnetic from '../UI/Magnetic'

export default function Footer() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative border-t border-border/40 bg-background">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-5 lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-fuchsia-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-primary/20">
                                MD
                            </div>
                            <h3 className="text-xl font-display font-bold tracking-tight">Md Tanveer Alam</h3>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            Full Stack Developer crafting exceptional digital experiences with modern web technologies.
                        </p>
                        <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-sm font-medium text-foreground">Available for hire</span>
                        </div>
                        <a
                            href="mailto:tanveerdev14@gmail.com"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border/50 hover:border-primary/20"
                        >
                            <Mail size={14} />
                            tanveerdev14@gmail.com
                        </a>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-5">
                        <h4 className="text-sm font-display font-semibold text-foreground">Navigation</h4>
                        <ul className="space-y-3">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-5">
                        <h4 className="text-sm font-display font-semibold text-foreground">Connect</h4>
                        <div className="flex gap-2">
                            {[
                                { icon: Github, href: 'https://github.com/mdtanveer0786', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://linkedin.com/in/md-tanveer-alam-b7a134219/', label: 'LinkedIn' },
                                { icon: Twitter, href: 'https://x.com/tanveertoofan01', label: 'Twitter' },
                            ].map((social) => (
                                <Magnetic key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] text-muted-foreground hover:text-primary border border-border/30 hover:border-primary/20 transition-all"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={16} />
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                        <div className="space-y-1 pt-2">
                            <p className="text-sm font-medium text-muted-foreground">Delhi, India</p>
                            <p className="text-sm font-mono text-muted-foreground/70">{formatTime(time)} IST</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        &copy; {new Date().getFullYear()} Md Tanveer Alam. Crafted with
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <Heart size={14} className="text-pink-500 fill-pink-500" />
                        </motion.span>
                    </p>

                    <Magnetic>
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg"
                        >
                            Back to Top
                            <div className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] group-hover:bg-primary/10 transition-colors">
                                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </button>
                    </Magnetic>
                </div>
            </div>
        </footer>
    )
}
