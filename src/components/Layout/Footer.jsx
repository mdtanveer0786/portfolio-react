import { motion } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'
import { socialLinks } from '../../utils/constants'

export default function Footer() {
    return (
        <footer className="relative bg-background pt-10 pb-8 overflow-hidden border-t border-border/40">
            {/* Subtle premium background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary/5 to-transparent blur-[100px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-border/20">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            MD
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase">Tanveer<span className="text-primary"></span></span>
                    </div>

                    {/* Quick Contact & Socials */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <a href="mailto:tanveerdev14@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-bold group">
                            <Mail className="w-4 h-4" />
                            tanveerdev14@gmail.com
                        </a>
                        
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={i}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all border border-transparent hover:border-primary/20"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-xs font-bold tracking-wider">
                        &copy; {new Date().getFullYear()} MD TANVEER ALAM. ALL RIGHTS RESERVED.
                    </p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
                        <span>HANDCRAFTED WITH</span>
                        <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" />
                        <span>BY MD TANVEER</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
