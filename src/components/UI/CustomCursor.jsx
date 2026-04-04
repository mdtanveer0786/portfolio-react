import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [cursorType, setCursorType] = useState('default');
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    // Refs for smooth movement tracking
    const cursorRef = useRef(null);

    // Main cursor (Glow/Spotlight) - Very smooth & trailing
    const mainX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
    const mainY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });

    // Inner dot - Quick & Responsive
    const dotX = useSpring(0, { stiffness: 800, damping: 30 });
    const dotY = useSpring(0, { stiffness: 800, damping: 30 });

    const moveMouse = useCallback((e) => {
        const { clientX, clientY } = e;
        mainX.set(clientX);
        mainY.set(clientY);
        dotX.set(clientX);
        dotY.set(clientY);
        if (!isVisible) setIsVisible(true);
    }, [mainX, mainY, dotX, dotY, isVisible]);

    useEffect(() => {
        const handleHover = (e) => {
            const target = e.target;
            const isClickable = target.closest('a, button, .magnetic-wrap, .clickable');
            const isProjectImage = target.closest('.project-image-container');
            const isHeading = target.closest('h1, h2, h3, h4');
            const isText = target.closest('p, span, .text-reveal');

            if (isClickable) {
                setCursorType('pointer');
            } else if (isProjectImage) {
                setCursorType('view');
                setIsHoveringImage(true);
            } else if (isHeading) {
                setCursorType('heading');
            } else if (isText) {
                setCursorType('text');
            } else {
                setCursorType('default');
                setIsHoveringImage(false);
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        
        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [moveMouse]);

    // Shape/Size variants for the outer glow
    const glowVariants = {
        default: {
            width: 40,
            height: 40,
            backgroundColor: "rgba(139, 92, 246, 0.15)", // Subtle violet
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "50%",
            rotate: 0
        },
        pointer: {
            width: 70,
            height: 70,
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "2px solid rgba(139, 92, 246, 0.5)",
            borderRadius: "50%",
            rotate: 45
        },
        heading: {
            width: 120,
            height: 120,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            mixBlendMode: "difference"
        },
        text: {
            width: 24,
            height: 24,
            backgroundColor: "rgba(139, 92, 246, 0.4)",
            border: "none",
            borderRadius: "2px", // Square/Boxy look
            rotate: 90
        },
        view: {
            width: 110,
            height: 110,
            backgroundColor: "rgba(139, 92, 246, 0.9)",
            border: "none",
            borderRadius: "50%",
            scale: 1.1
        }
    };

    if (typeof window === 'undefined') return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            
            {/* 1. Subtle Background Glow (The Spotlight) */}
            <motion.div
                className="fixed top-0 left-0 rounded-full blur-2xl opacity-40 pointer-events-none"
                style={{
                    x: mainX,
                    y: mainY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHoveringImage ? 300 : 150,
                    height: isHoveringImage ? 300 : 150,
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                }}
            />

            {/* 2. Main Morphing Ring */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
                animate={{
                    ...glowVariants[cursorType],
                    scale: isClicked ? 0.8 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                style={{
                    x: mainX,
                    y: mainY,
                    translateX: '-50%',
                    translateY: '-50%',
                    backdropFilter: cursorType === 'heading' ? 'blur(4px)' : 'none'
                }}
            >
                <AnimatePresence>
                    {cursorType === 'view' && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0, rotate: 45 }}
                            className="flex flex-col items-center justify-center text-white"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Explore</span>
                            <div className="w-8 h-[1px] bg-white/50" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* 3. The Precision Core (Trailing Dot) */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                animate={{
                    scale: isClicked ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: cursorType === 'view' ? '#ffffff' : '#8b5cf6'
                }}
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* 4. Trailing Particle Effect (on Click) */}
            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-primary/50"
                        style={{
                            x: dotX,
                            y: dotY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}
