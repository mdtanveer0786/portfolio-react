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
        
        // Close menu on back button
        const handlePopState = () => {
            setMobileMenuOpen(false)
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('popstate', handlePopState)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [mobileMenuOpen])

    const handleNavClick = (href) => {
        const id = href.substring(1)
        setActiveSection(id)
        setMobileMenuOpen(false)
        
        // Update hash in URL without jumping
        window.history.pushState(null, null, href)
        
        // Small delay for a smoother feel after the menu starts closing
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4',
                scrolled ? 'py-4' : 'py-6'
            )}
        >
            <nav className={cn(
                "flex items-center justify-between px-4 md:px-6 py-2 rounded-full transition-all duration-500 border w-full max-w-5xl",
                scrolled 
                    ? "bg-white/70 dark:bg-black/70 border-black/5 dark:border-white/10 shadow-lg backdrop-blur-xl" 
                    : "bg-white/40 dark:bg-black/40 border-black/5 dark:border-white/5 backdrop-blur-md"
            )}>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => handleNavClick('#home')}
                >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg">
                        MD
                    </div>
                    <span className="text-base md:text-lg font-bold tracking-tight text-foreground uppercase hidden xs:block">
                        Tanveer
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item.href)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all relative group",
                                    isActive 
                                        ? "text-white" 
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-violet-600 rounded-full shadow-md"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
                        className={cn(
                            "lg:hidden p-2.5 rounded-full transition-all duration-300 border shadow-sm",
                            mobileMenuOpen 
                                ? "bg-primary text-white border-primary shadow-primary/20" 
                                : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-foreground"
                        )}
                    >
                        {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </motion.button>
                </div>
            </nav>

            {/* Ultimate Premium Glass Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        {/* Backdrop with heavy blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md"
                        />
                        
                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-3xl border-l border-white/20 dark:border-white/10 shadow-2xl flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-8 pb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-500/20">
                                        MD
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black uppercase tracking-widest text-foreground">Tanveer</span>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Portfolio</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Main Navigation */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
                                <div className="space-y-2">
                                    {navItems.map((item, idx) => {
                                        const isActive = activeSection === item.href.substring(1);
                                        const Icon = item.icon;
                                        return (
                                            <motion.button
                                                key={item.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => handleNavClick(item.href)}
                                                className={cn(
                                                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative group",
                                                    isActive 
                                                        ? "bg-primary/10 text-primary" 
                                                        : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                                                )}
                                            >
                                                {/* Active Pill Indicator */}
                                                {isActive && (
                                                    <motion.div 
                                                        layoutId="sidebar-active-pill"
                                                        className="absolute inset-0 bg-primary/10 rounded-2xl border border-primary/20"
                                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}

                                                <div className={cn(
                                                    "p-2.5 rounded-xl transition-all duration-500 relative z-10",
                                                    isActive 
                                                        ? "bg-primary text-white shadow-lg shadow-primary/30" 
                                                        : "bg-black/5 dark:bg-white/5 group-hover:scale-110"
                                                )}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                
                                                <div className="flex flex-col items-start relative z-10">
                                                    <span className="font-black text-xs uppercase tracking-[0.2em]">{item.label}</span>
                                                    <span className="text-[9px] font-medium opacity-60 uppercase tracking-widest">Explore Section</span>
                                                </div>

                                                {isActive && (
                                                    <motion.div 
                                                        animate={{ scale: [1, 1.5, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary relative z-10"
                                                    />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-8 border-t border-black/5 dark:border-white/10 space-y-6 bg-black/5 dark:bg-white/5">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Connect</p>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social, i) => {
                                            const Icon = social.icon
                                            return (
                                                <motion.a
                                                    key={i}
                                                    whileHover={{ scale: 1.1, y: -3 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 rounded-xl bg-white dark:bg-neutral-800 text-foreground hover:text-primary shadow-sm border border-black/5 dark:border-white/10 transition-all"
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </motion.a>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <p className="text-[9px] font-medium text-muted-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Available for new projects
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    )
}
