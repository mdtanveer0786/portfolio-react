import { motion } from 'framer-motion'

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center justify-center"
            >
                {/* Outer ring */}
                <div className="w-20 h-20 rounded-full border-2 border-primary/10 animate-spin-slow" />
                {/* Inner spinning ring */}
                <div className="absolute w-20 h-20 rounded-full border-2 border-transparent border-t-primary animate-spin" 
                     style={{ animationDuration: '1s' }} />
                {/* Logo center */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-fuchsia-600 shadow-lg shadow-primary/30"
                >
                    <span className="text-white font-display font-bold text-sm">MD</span>
                </motion.div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-sm font-mono text-muted-foreground tracking-widest uppercase"
            >
                Loading...
            </motion.p>
        </div>
    )
}
