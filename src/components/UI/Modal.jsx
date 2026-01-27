import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Modal({
    isOpen,
    onClose,
    children,
    title,
    className
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className={cn(
                            'relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-primary/20',
                            className
                        )}>
                            {/* Header */}
                            {title && (
                                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold">{title}</h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}