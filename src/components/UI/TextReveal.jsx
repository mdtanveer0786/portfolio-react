import { motion } from 'framer-motion';

export default function TextReveal({ text, className, charReveal = false }) {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: charReveal ? 0.03 : 0.08, delayChildren: 0.02 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 15,
                stiffness: 150,
            },
        },
        hidden: {
            opacity: 0,
            y: 15,
        },
    };

    if (charReveal) {
        const chars = text.split('');
        return (
            <motion.div
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'inherit' }}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={className}
            >
                {chars.map((char, index) => (
                    <motion.span
                        variants={child}
                        key={index}
                        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'inherit' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: '0.25em' }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
