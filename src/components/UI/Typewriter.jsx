import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Typewriter({ texts, className = '' }) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [typingSpeed, setTypingSpeed] = useState(150)

    useEffect(() => {
        const handleTyping = () => {
            const fullText = texts[currentTextIndex]

            if (!isDeleting && currentText === fullText) {
                // Wait before starting to delete
                setTimeout(() => setIsDeleting(true), 1500)
                return
            }

            if (isDeleting && currentText === '') {
                setIsDeleting(false)
                setCurrentTextIndex((prev) => (prev + 1) % texts.length)
                return
            }

            const nextText = isDeleting
                ? fullText.substring(0, currentText.length - 1)
                : fullText.substring(0, currentText.length + 1)

            setCurrentText(nextText)
            setTypingSpeed(isDeleting ? 75 : 150)
        }

        const timer = setTimeout(handleTyping, typingSpeed)
        return () => clearTimeout(timer)
    }, [currentText, isDeleting, texts, currentTextIndex, typingSpeed])

    return (
        <div className={`${className} min-h-[1.5em]`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentText}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="inline-block"
                >
                    {currentText}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="ml-1"
                    >
                        |
                    </motion.span>
                </motion.span>
            </AnimatePresence>
        </div>
    )
}