import { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState('default');

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e) => {
            if (e.target.closest('a, button, .magnetic-wrap')) {
                setCursorType('pointer');
            } else if (e.target.closest('.project-image-container')) {
                setCursorType('view');
            } else {
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: 'transparent',
            border: '2px solid var(--primary)',
        },
        pointer: {
            height: 64,
            width: 64,
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.5)',
        },
        view: {
            height: 80,
            width: 80,
            backgroundColor: 'var(--primary)',
            border: 'none',
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden backdrop-blur-[2px]"
                animate={cursorType}
                variants={variants}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <AnimatePresence>
                    {cursorType === 'view' && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="text-[10px] font-black uppercase tracking-widest text-white"
                        >
                            View
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: cursorType === 'default' ? 1 : 0,
                }}
                style={{
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.2 }}
            />
        </>
    );
}
