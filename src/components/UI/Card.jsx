import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const Card = ({
    children,
    className,
    hoverable = true,
    glass = true,
    padding = 'p-6',
    ...props
}) => {
    return (
        <motion.div
            whileHover={hoverable ? { y: -10, transition: { duration: 0.2 } } : {}}
            className={cn(
                'rounded-2xl transition-all duration-300',
                glass && 'glass border border-primary/20',
                padding,
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export const CardHeader = ({ children, className }) => (
    <div className={cn('mb-4', className)}>
        {children}
    </div>
)

export const CardTitle = ({ children, className }) => (
    <h3 className={cn('text-xl font-bold mb-2', className)}>
        {children}
    </h3>
)

export const CardDescription = ({ children, className }) => (
    <p className={cn('text-sm text-muted-foreground', className)}>
        {children}
    </p>
)

export const CardContent = ({ children, className }) => (
    <div className={cn('', className)}>
        {children}
    </div>
)

export const CardFooter = ({ children, className }) => (
    <div className={cn('mt-6', className)}>
        {children}
    </div>
)

export default Card