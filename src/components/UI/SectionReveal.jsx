import { motion, useReducedMotion } from 'framer-motion';

export default function SectionReveal({ children, delay = 0, x = 0, y = 30, className = "" }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: x, y: y }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: shouldReduceMotion ? 0.3 : 0.7,
                delay: shouldReduceMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
}
