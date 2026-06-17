import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopBtn() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Using a threshold of 400px scroll height to reveal the button
            if (window.pageYOffset > 400) {
                setVisible(true)
            } else {
                setVisible(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true })
        // Perform immediate check in case page is loaded scrolled down
        handleScroll()
        
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.3, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, y: 40 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-7 sm:bottom-28 sm:right-10 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-white/80 dark:bg-[#0c0c14]/80 backdrop-blur-md border border-primary/20 text-primary hover:text-white overflow-hidden group cursor-pointer"
                    aria-label="Scroll to top"
                >
                    {/* Premium Gradient BG hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 transition-opacity duration-500 ease-out" />

                    {/* Icon layer (keeps it on top) */}
                    <span className="relative z-10">
                        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
                    </span>

                    {/* Animated glowing ring border on hover */}
                    <div className="absolute -inset-px rounded-full border border-primary/30 group-hover:border-white/30 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
