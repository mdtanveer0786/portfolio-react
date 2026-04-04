import { useState, useEffect } from 'react'
import { ArrowUp, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { navItems } from '../../utils/constants'

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
        <footer className="bg-background border-t border-border/40 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6 lg:col-span-2">
                        <div>
                            <h3 className="text-3xl font-black tracking-tighter uppercase">Md Tanveer</h3>
                            <p className="text-base font-medium text-muted-foreground mt-3 max-w-sm leading-relaxed">
                                Full Stack Developer specializing in building exceptional digital experiences.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </div>
                            <span className="text-sm font-semibold text-foreground">Available for new opportunities</span>
                        </div>
                        <a 
                            href="mailto:tanveerdev14@gmail.com"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/50 hover:bg-primary text-foreground hover:text-white transition-colors duration-300 font-bold text-sm border border-border/50"
                        >
                            <Mail size={16} />
                            tanveerdev14@gmail.com
                        </a>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Navigation</h4>
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a 
                                        href={item.href}
                                        className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Location */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Connect</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://github.com/mdtanveer0786" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <Github size={18} /> 
                                    </div>
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/md-tanveer-alam-b7a134219/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <Linkedin size={18} /> 
                                    </div>
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/tanveertoofan01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <Twitter size={18} /> 
                                    </div>
                                    Twitter
                                </a>
                            </li>
                        </ul>
                        <div className="pt-4 space-y-1 border-t border-border/20">
                            <p className="text-sm font-medium text-muted-foreground">Delhi, India</p>
                            <p className="text-sm font-medium text-muted-foreground">{formatTime(time)} Local Time</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                        &copy; {new Date().getFullYear()} Md Tanveer Alam. All rights reserved.
                    </p>
                    
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
                    >
                        Back to Top
                        <div className="p-1.5 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors">
                            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    )
}
