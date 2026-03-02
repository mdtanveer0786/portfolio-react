import { motion } from 'framer-motion'

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex items-center justify-center"
            >
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-primary rounded-full animate-spin-slow" />
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
            >
                <span className="text-lg font-bold tracking-widest uppercase premium-text-gradient">
                    Tanveer
                </span>
            </motion.div>
        </div>
    )
}
