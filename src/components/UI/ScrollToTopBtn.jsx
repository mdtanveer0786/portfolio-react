import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopBtn() {
    const [visible, setVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.3, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, y: 40 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/80 dark:bg-background/80 backdrop-blur-xl border border-primary/20 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden group hover:shadow-[0_8px_30px_rgba(139,92,246,0.3)] transition-all"
                    aria-label="Scroll to top"
                >
                    {/* SVG Circular Progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 50 50">
                        {/* Track */}
                        <circle 
                            cx="25" cy="25" r="22" 
                            className="stroke-primary/10" 
                            strokeWidth="2" fill="none" 
                        />
                        {/* Progress */}
                        <motion.circle 
                            cx="25" cy="25" r="22" 
                            className="stroke-primary" 
                            strokeWidth="2" fill="none"
                            strokeLinecap="round"
                            style={{ pathLength: scaleX }}
                        />
                    </svg>

                    {/* Gradient BG hover overlay */}
                    <div className="absolute inset-1.5 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary via-fuchsia-600 to-accent rounded-full transition-opacity duration-300 ease-out -z-10" />

                    {/* Icon layer */}
                    <ArrowUp size={20} className="relative z-10 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
