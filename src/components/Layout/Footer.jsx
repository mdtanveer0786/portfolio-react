import { useState, useEffect } from 'react'
import { 
    Mail, 
    MapPin, 
    Clock, 
    ChevronRight
} from 'lucide-react'
import { socialLinks } from '../../utils/constants'
import logo from '../../assets/logo.png'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const [localTime, setLocalTime] = useState(() => {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        })
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            }))
        }, 1000)
        
        return () => clearInterval(timer)
    }, [])

    const footerLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <footer className="relative pt-24 pb-12 border-t border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden" aria-label="Site Footer">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-600/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 overflow-hidden shrink-0">
                                <img src={logo} alt="MTA Logo" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1 sm:space-y-1.5">
                                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
                                    <span className="premium-text-gradient">Md Tanveer Alam</span>
                                </h3>
                                <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">
                                    Full Stack Developer
                                </p>
                            </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed max-w-md">
                            Full Stack Developer crafting high-performance, scalable, and visually engaging digital experiences using modern web technologies.
                        </p>

                        <div className="flex flex-col gap-4 pt-2">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] xs:text-xs sm:text-sm font-medium w-fit shadow-[0_0_15px_rgba(16,185,129,0.02)] hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] backdrop-blur-sm hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group/status cursor-default">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 group-hover/status:scale-110 transition-transform"></span>
                                </span>
                                Available for freelance & full-time
                            </div>
                            <a 
                                href="mailto:tanveerdev14@gmail.com" 
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-border/40 text-muted-foreground hover:text-primary text-[11px] xs:text-xs sm:text-sm font-medium w-fit shadow-sm backdrop-blur-sm hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 group/email"
                            >
                                <div className="p-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] group-hover/email:bg-primary/10 text-muted-foreground group-hover/email:text-primary transition-all duration-300 flex items-center justify-center">
                                    <Mail className="w-3.5 h-3.5 group-hover/email:scale-110 transition-transform" />
                                </div>
                                <span>tanveerdev14@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                            Navigation
                        </h4>
                        <nav aria-label="Footer navigation">
                            <ul className="space-y-3">
                                {footerLinks.map((link) => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href}
                                            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm"
                                        >
                                            <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Location & Time Section */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                            Location & Status
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-primary/5 text-primary mt-0.5">
                                    <MapPin size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-foreground font-medium">Delhi, India</p>
                                    <p className="text-xs text-muted-foreground">Open to remote worldwide</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-primary/5 text-primary mt-0.5">
                                    <Clock size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-foreground font-mono font-medium tabular-nums tracking-tight">
                                        {localTime} IST
                                    </p>
                                    <p className="text-xs text-muted-foreground">Local Time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                            Connect
                        </h4>
                        <div className="flex flex-col gap-3">
                            {socialLinks.map((link) => {
                                const getHoverColors = (label) => {
                                    switch (label) {
                                        case 'GitHub': return 'group-hover:text-black dark:group-hover:text-white';
                                        case 'LinkedIn': return 'group-hover:text-[#0A66C2]';
                                        case 'Twitter': return 'group-hover:text-[#1DA1F2]';
                                        case 'Email': return 'group-hover:text-[#EA4335]';
                                        case 'WhatsApp': return 'group-hover:text-[#25D366]';
                                        default: return 'group-hover:text-primary';
                                    }
                                };
                                const getBgHoverColors = (label) => {
                                    switch (label) {
                                        case 'GitHub': return 'group-hover:bg-black/10 dark:group-hover:bg-white/10';
                                        case 'LinkedIn': return 'group-hover:bg-[#0A66C2]/10';
                                        case 'Twitter': return 'group-hover:bg-[#1DA1F2]/10';
                                        case 'Email': return 'group-hover:bg-[#EA4335]/10';
                                        case 'WhatsApp': return 'group-hover:bg-[#25D366]/10';
                                        default: return 'group-hover:bg-primary/10';
                                    }
                                };
                                
                                return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 group text-muted-foreground transition-colors text-sm"
                                >
                                    <div className={`p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${getBgHoverColors(link.label)}`}>
                                        <link.icon size={16} className={`transition-colors duration-300 ${getHoverColors(link.label)}`} />
                                    </div>
                                    <span className={`group-hover:translate-x-1 transition-all duration-300 ${getHoverColors(link.label)}`}>
                                        {link.label}
                                    </span>
                                </a>
                            )})}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-[11px] sm:text-xs text-muted-foreground/60 font-medium">
                        © {currentYear} Md Tanveer Alam. All rights reserved.
                    </p>
                    
                    {/* Crafted with love */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground/60 font-medium bg-black/[0.02] dark:bg-white/[0.02] px-4 py-2 rounded-full border border-border/40 backdrop-blur-sm">
                        <span>Crafted with</span>
                        <svg className="w-3.5 h-3.5 text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>in India</span>
                    </div>
                </div>
            </div>
            
            {/* Ambient glows */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/5 blur-[100px] rounded-full -z-10 pointer-events-none opacity-50" />
        </footer>
    )
}
