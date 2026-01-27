import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'
import { socialLinks } from '../../utils/constants'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative mt-20 pt-12 pb-8">
            {/* Wave Divider */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden">
                <svg
                    className="w-full h-12"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-primary/10"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-purple-600">
                                <span className="text-lg font-bold text-white">MD</span>
                            </div>
                            <span className="text-xl font-bold gradient-text">Md Tanveer Alam</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Crafting exceptional digital experiences with modern web technologies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            {[
                                'Web Development',
                                'Mobile Apps',
                                'UI/UX Design',
                                'Consulting',
                                'Maintenance',
                                'DevOps',
                            ].map((service) => (
                                <li key={service}>
                                    <span className="text-sm text-muted-foreground">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-3 mb-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
                                    aria-label={social.label}
                                >
                                    {/* You would replace this with actual icons */}
                                    <span className="text-sm font-medium">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Let's build something amazing together!
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-primary/20">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Md Tanveer Alam. All rights reserved.
                        </div>

                        <div className="flex items-center space-x-4">
                            <motion.button
                                onClick={scrollToTop}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
                                aria-label="Scroll to top"
                            >
                                <ArrowUp className="h-5 w-5" />
                            </motion.button>

                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>Made with</span>
                                <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
                                <span>in India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}