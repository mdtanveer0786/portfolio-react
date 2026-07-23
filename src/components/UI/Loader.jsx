import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'

export default function Loader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 1800; // Matches LOADING_DURATION
        
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            
            // Cubic ease-out function for natural loading feel (starts fast, slows down)
            const easeOutCubic = 1 - Math.pow(1 - t, 3);
            const currentProgress = Math.floor(easeOutCubic * 100);
            
            setProgress(currentProgress);
            
            if (elapsed >= duration) {
                clearInterval(timer);
            }
        }, 16); // ~60fps for buttery smooth progress

        return () => clearInterval(timer);
    }, []);

    return (
        <div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            role="status"
            aria-live="polite"
            aria-label="Loading Md Tanveer Alam Portfolio"
        >
            <div className="relative flex flex-col items-center">
                {/* Stunning Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative flex items-center justify-center w-24 h-24 mb-10"
                >
                    {/* Glowing Backdrop */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" />
                    
                    {/* Spinning Rings */}
                    <div className="absolute inset-0 rounded-2xl border border-primary/30 rotate-45 animate-[spin_4s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-2xl border border-fuchsia-500/30 -rotate-45 animate-[spin_3s_linear_infinite_reverse]" />
                    
                    {/* Center Core */}
                    <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-600/10 shadow-2xl shadow-primary/40 overflow-hidden">
                        <img src={logo} alt="MTA Logo" className="w-full h-full object-cover" />
                    </div>
                </motion.div>

                {/* Loading Text & Progress */}
                <div className="flex flex-col items-center space-y-5">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-1 text-xl sm:text-2xl font-display font-bold tracking-tight text-foreground"
                    >
                        Initializing
                        <span className="flex gap-0.5">
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                        </span>
                    </motion.div>
                    
                    <div className="flex flex-col items-center gap-2">
                        {/* Progress Bar Track */}
                        <motion.div 
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 200 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="h-1 bg-muted rounded-full overflow-hidden relative"
                        >
                            {/* Progress Fill */}
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-fuchsia-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ ease: "easeOut", duration: 0.2 }}
                            />
                        </motion.div>
                        
                        {/* Percentage Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[11px] font-mono text-muted-foreground/80 tracking-widest"
                        >
                            {Math.min(progress, 100)}%
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    )
}
