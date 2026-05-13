import { 
    Mail, 
    ArrowUp, 
    MapPin, 
    Clock, 
    Heart,
    ChevronRight
} from 'lucide-react'
import { socialLinks } from '../../utils/constants'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const footerLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <footer className="relative pt-24 pb-12 border-t border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">
                                Md <span className="premium-text-gradient">Tanveer Alam</span>
                            </h3>
                            <p className="text-sm font-medium text-primary uppercase tracking-widest">
                                Full Stack Developer
                            </p>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed max-w-md">
                            Full Stack Developer crafting high-performance, scalable, and visually engaging digital experiences using modern web technologies.
                        </p>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Available for freelance & full-time opportunities
                            </div>
                            <a 
                                href="mailto:tanveerdev14@gmail.com" 
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                            >
                                <Mail size={16} />
                                tanveerdev14@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                            Navigation
                        </h4>
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
                                    <p className="text-sm text-foreground font-medium">
                                        {new Date().toLocaleTimeString('en-US', { 
                                            hour: '2-digit', 
                                            minute: '2-digit',
                                            hour12: true,
                                            timeZone: 'Asia/Kolkata'
                                        })} IST
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
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 group text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    <div className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] group-hover:bg-primary/10 transition-colors">
                                        <link.icon size={16} />
                                    </div>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-border/30 flex items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            Building scalable products. Designing seamless experiences.
                        </div>
                        <div className="text-[11px] sm:text-xs text-muted-foreground/60 flex flex-col gap-1.5">
                            <p>© {currentYear} Md Tanveer Alam. All rights reserved.</p>
                            <p className="flex items-center gap-1.5">
                                Crafted with <Heart size={12} className="text-red-500 fill-red-500" /> using React & Tailwind CSS
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-500 shadow-lg shadow-primary/5"
                        aria-label="Back to Top"
                    >
                        <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
            
            {/* Ambient glows */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </footer>
    )
}
