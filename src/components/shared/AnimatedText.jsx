import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function AnimatedText({
    text,
    className,
    delay = 0,
    stagger = 0.05,
    once = true
}) {
    const letters = Array.from(text)

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay * i },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    }

    return (
        <motion.div
            style={{ display: 'flex', overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span key={index} variants={child}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    )
}