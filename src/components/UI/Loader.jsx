import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                    }}
                    className="relative"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 blur-xl animate-pulse" />
                    <div className="relative p-8 rounded-full bg-gradient-to-r from-primary to-purple-600">
                        <Code2 className="h-16 w-16 text-white" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                >
                    <div className="text-2xl font-bold gradient-text">
                        Md Tanveer Alam
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Loading Portfolio...</div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        className="mt-4 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                    />
                </motion.div>

                {/* Dots Animation */}
                <div className="flex justify-center space-x-2 mt-6">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}