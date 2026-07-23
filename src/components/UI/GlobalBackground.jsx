import { motion } from 'framer-motion';
import { memo } from 'react';

const GlobalBackground = memo(function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background transition-colors duration-500">
            {/* Ambient Glow Orbs - Made MUCH more vibrant */}
            <motion.div
                animate={{
                    x: ['-5%', '10%', '-2%', '-5%'],
                    y: ['-5%', '5%', '10%', '-5%'],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] min-w-[500px] min-h-[500px] rounded-full bg-primary/40 dark:bg-primary/30 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            
            <motion.div
                animate={{
                    x: ['10%', '-5%', '5%', '10%'],
                    y: ['10%', '-10%', '0%', '10%'],
                    scale: [0.8, 1.1, 1, 0.8],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] min-w-[400px] min-h-[400px] rounded-full bg-fuchsia-500/40 dark:bg-fuchsia-600/30 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: ['-10%', '5%', '-10%'],
                    y: ['10%', '-5%', '10%'],
                    scale: [0.9, 1.2, 0.9],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full bg-emerald-400/30 dark:bg-emerald-500/20 blur-[80px] sm:blur-[100px] mix-blend-multiply dark:mix-blend-screen"
            />

            {/* Premium Noise Overlay (Glassmorphism grain) - Increased visibility */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.06] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
                </svg>
            </div>
            
            {/* Subtle Grid Overlay for tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]" />
        </div>
    );
});

export default GlobalBackground;
