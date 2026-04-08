import { motion } from 'framer-motion';

export default function SectionReveal({ children, delay = 0, x = 0, y = 30 }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: x, y: y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
}
