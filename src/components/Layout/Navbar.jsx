import { motion } from 'framer-motion'
import {
    Home,
    User,
    Code2,
    Briefcase,
    GraduationCap,
    Mail,
    Trophy
} from 'lucide-react'
import { cn } from '../../utils/cn'

const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Code2, label: 'Skills', href: '#skills' },
    { icon: Briefcase, label: 'Projects', href: '#projects' },
    { icon: Trophy, label: 'Experience', href: '#experience' },
    { icon: GraduationCap, label: 'Education', href: '#education' },
    { icon: Mail, label: 'Contact', href: '#contact' },
]

export default function Navbar({ activeSection, setActiveSection }) {
    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        >
            <div className="flex items-center space-x-2 glass px-4 py-3 rounded-full backdrop-blur-xl shadow-lg">
                {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActiveSection(item.href.substring(1))}
                            className={cn(
                                'p-3 rounded-full transition-all duration-300 relative',
                                activeSection === item.href.substring(1)
                                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                            )}
                            aria-label={item.label}
                        >
                            <Icon className="h-5 w-5" />
                            {activeSection === item.href.substring(1) && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                                />
                            )}
                        </motion.a>
                    )
                })}
            </div>
        </motion.nav>
    )
}