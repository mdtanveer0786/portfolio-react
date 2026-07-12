import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            style={{ scaleX, transformOrigin: '0%' }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-[#8b5cf6] z-[100] shadow-[0_0_8px_rgba(139,92,246,0.5)]"
            role="progressbar"
            aria-label="Page scroll progress"
        />
    );
}
