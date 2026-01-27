import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { navItems } from '../../utils/constants'
import { cn } from '../../utils/cn'

export default function Header({ activeSection, setActiveSection }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false)
            }
        }

        handleResize() // Initial check
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleNavClick = (href) => {
        setActiveSection(href.substring(1))
        setMobileMenuOpen(false)
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'glass py-3 shadow-lg backdrop-blur-xl'
                    : 'py-6'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-2"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-75 blur" />
                            <div className="relative rounded-full bg-gradient-to-r from-primary to-purple-600 p-3">
                                <span className="text-xl font-bold text-white">MD</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            Md Tanveer Alam
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleNavClick(item.href)}
                                className={cn(
                                    'text-sm font-medium transition-all duration-300 relative group',
                                    activeSection === item.href.substring(1)
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                {activeSection === item.href.substring(1) && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />
                                )}
                            </motion.a>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full glass hover:bg-accent transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </motion.button>

                        {/* Download CV Button */}
                        <motion.a
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/resume.pdf"
                            download
                            className="hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                        >
                            Download CV
                        </motion.a>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg glass"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 overflow-hidden glass rounded-xl"
                    >
                        <div className="py-4 space-y-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={cn(
                                        'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                        activeSection === item.href.substring(1)
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-accent'
                                    )}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                download
                                className="block px-4 py-3 text-sm font-medium text-center rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white"
                            >
                                Download CV
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.header>
    )
}