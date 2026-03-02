import { motion } from 'framer-motion';

export default function SectionReveal({ children, delay = 0, x = 0, y = 40 }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: x, y: y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    );
}
