import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { navItems, socialLinks } from '../../utils/constants'
import { cn } from '../../utils/cn'

export default function Header({ activeSection, setActiveSection }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href) => {
        setActiveSection(href.substring(1))
        setMobileMenuOpen(false)
        document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4',
                scrolled ? 'py-4' : 'py-6 md:py-8'
            )}
        >
            <nav className={cn(
                "flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-500 border",
                scrolled 
                    ? "bg-white/60 dark:bg-black/60 border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-2xl w-full max-w-5xl" 
                    : "bg-transparent border-transparent w-full max-w-6xl"
            )}>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => handleNavClick('#home')}
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        MD
                    </div>
                    <span className="text-lg md:text-xl font-black tracking-tighter text-foreground uppercase hidden xs:block">
                        Tanveer<span className="text-primary"></span>
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5 mx-4">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item.href)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all relative group",
                                    isActive 
                                        ? "text-white" 
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-foreground hover:text-primary transition-all"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-white/10 text-foreground"
                    >
                        {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed inset-x-6 top-24 z-50 lg:hidden"
                    >
                        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-3xl p-6 rounded-[2.5rem] shadow-2xl border border-black/5 dark:border-white/10 overflow-y-auto max-h-[80vh] relative custom-scrollbar">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/10 blur-3xl -z-10" />
                            
                            <div className="grid grid-cols-1 gap-2">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.href.substring(1);
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.label}
                                            onClick={() => handleNavClick(item.href)}
                                            className={cn(
                                                "flex items-center gap-4 p-4 rounded-2xl transition-all group",
                                                isActive
                                                    ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-foreground border border-violet-500/20"
                                                    : "hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2 rounded-xl transition-all",
                                                isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" : "bg-black/10 dark:bg-white/10 group-hover:scale-110"
                                            )}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
                                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-center gap-4">
                                {socialLinks.map((social, i) => {
                                    const Icon = social.icon
                                    return (
                                        <motion.a
                                            key={i}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
