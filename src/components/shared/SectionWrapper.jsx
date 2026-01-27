import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function SectionWrapper({
    children,
    id,
    className,
    delay = 0,
    withPadding = true
}) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                withPadding && 'py-20',
                className
            )}
        >
            {children}
        </motion.section>
    )
}

export const SectionTitle = ({
    children,
    subtitle,
    className,
    align = 'center'
}) => {
    const alignment = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }

    return (
        <div className={cn('mb-12', alignment[align], className)}>
            {subtitle && (
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                    {subtitle}
                </span>
            )}
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {children}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-600 mx-auto" />
        </div>
    )
}