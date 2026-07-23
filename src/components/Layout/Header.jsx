import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { navItems, socialLinks } from '../../utils/constants'
import { cn } from '../../utils/cn'
import logo from '../../assets/logo.png'

export default function Header({ activeSection, setActiveSection }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        const handlePopState = () => setMobileMenuOpen(false)
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('popstate', handlePopState)
        
        // Check initial scroll position
        handleScroll()
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    useEffect(() => {
        document.body.classList.toggle('no-scroll', mobileMenuOpen)
        return () => document.body.classList.remove('no-scroll')
    }, [mobileMenuOpen])

    const handleNavClick = (href) => {
        const id = href.substring(1)
        setActiveSection(id)
        setMobileMenuOpen(false)
        
        // Defer scroll slightly to let the body unlock from no-scroll state
        setTimeout(() => {
            if (id === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                window.history.pushState(null, null, ' ')
            } else {
                window.history.pushState(null, null, href)
                const element = document.getElementById(id)
                if (element) {
                    const yOffset = -80; // Offset for fixed header
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        }, 120);
    }

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 transition-all duration-300 flex justify-center px-4',
                scrolled ? 'py-3' : 'py-5',
                mobileMenuOpen ? 'z-[100]' : 'z-50'
            )}
        >
            <nav className={cn(
                "flex items-center justify-between px-4 md:px-5 py-2 rounded-2xl transition-all duration-300 border w-full max-w-5xl relative z-10",
                scrolled
                    ? "bg-white/80 dark:bg-neutral-950/80 border-black/[0.08] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-black/30 backdrop-blur-xl"
                    : "bg-white/40 dark:bg-neutral-950/40 border-transparent backdrop-blur-md"
            )}>

                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 cursor-pointer group px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                    onClick={() => {
                        handleNavClick('#home')
                        setMobileMenuOpen(false)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleNavClick('#home')
                            setMobileMenuOpen(false)
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Go to home section"
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-600/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow overflow-hidden">
                        <img src={logo} alt="MTA Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-display font-bold tracking-tight text-foreground hidden xs:block">
                        Md Tanveer Alam
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.04]">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1)
                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item.href)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-medium transition-all relative",
                                    isActive
                                        ? "text-foreground font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-black/[0.08] dark:bg-white/[0.12] rounded-lg"
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        style={{ perspective: "800px" }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-b from-black/[0.02] to-black/[0.06] dark:from-white/[0.06] dark:to-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] text-foreground hover:text-primary transition-colors flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] drop-shadow-sm"
                    >
                        <motion.div
                            animate={{ rotateY: theme === 'dark' ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            {/* Light Mode (Sun) */}
                            <div 
                                className="absolute inset-0 flex items-center justify-center" 
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <Sun className="w-[18px] h-[18px] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                            </div>
                            
                            {/* Dark Mode (Moon) */}
                            <div 
                                className="absolute inset-0 flex items-center justify-center" 
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                                <Moon className="w-[18px] h-[18px] text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]" />
                            </div>
                        </motion.div>
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className={cn(
                            "lg:hidden p-2.5 rounded-xl transition-all duration-300 border",
                            mobileMenuOpen
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-black/[0.04] dark:bg-white/[0.04] border-black/[0.04] dark:border-white/[0.06] text-foreground"
                        )}
                    >
                        {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 lg:hidden z-50">
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            key="sidebar"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 28, stiffness: 220, mass: 1 }}
                            className="absolute right-0 top-0 bottom-0 w-[min(85%,380px)] bg-white dark:bg-neutral-950 border-l border-border shadow-2xl flex flex-col"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-border/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-600/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 overflow-hidden">
                                        <img src={logo} alt="MTA Logo" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-display font-bold text-foreground">Md Tanveer Alam</span>
                                        <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Portfolio</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] text-foreground hover:text-primary transition-all border border-transparent hover:border-primary/20"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
                                <div className="space-y-2">
                                    {navItems.map((item, idx) => {
                                        const isActive = activeSection === item.href.substring(1)
                                        const Icon = item.icon
                                        return (
                                            <motion.button
                                                key={item.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ 
                                                    delay: 0.1 + idx * 0.05,
                                                    duration: 0.3,
                                                    ease: "easeOut"
                                                }}
                                                onClick={() => handleNavClick(item.href)}
                                                className={cn(
                                                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                                                    isActive
                                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                        : "text-muted-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-foreground"
                                                )}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-all",
                                                    isActive
                                                        ? "bg-white/20"
                                                        : "bg-black/[0.04] dark:bg-white/[0.04]"
                                                )}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-semibold text-sm">{item.label}</span>
                                                {isActive && (
                                                    <motion.div 
                                                        layoutId="active-indicator"
                                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white" 
                                                    />
                                                )}
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="p-8 border-t border-border bg-black/[0.01] dark:bg-white/[0.01] space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">Let&apos;s Connect</p>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social, i) => {
                                            const Icon = social.icon
                                            const getHoverColors = (label) => {
                                                switch (label) {
                                                    case 'GitHub': return 'hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5';
                                                    case 'LinkedIn': return 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5';
                                                    case 'Twitter': return 'hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/5';
                                                    case 'Email': return 'hover:text-[#EA4335] hover:border-[#EA4335]/40 hover:bg-[#EA4335]/5';
                                                    default: return 'hover:text-primary hover:border-primary/40 hover:bg-primary/5';
                                                }
                                            };
                                            return (
                                                <a
                                                    key={i}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-900 text-foreground border border-border transition-all shadow-sm ${getHoverColors(social.label)}`}
                                                    aria-label={social.label}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-[10px] min-[350px]:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 w-full shadow-[0_0_15px_rgba(16,185,129,0.02)] backdrop-blur-sm">
                                    <span className="relative flex h-2 w-2 flex-shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span>Available for freelance & full-time</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    )
}
