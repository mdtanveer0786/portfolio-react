import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const Button = forwardRef(({
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-xl hover:shadow-primary/25 active:scale-95',
        secondary: 'glass border border-primary/20 hover:bg-primary/10 active:scale-95',
        ghost: 'hover:bg-accent active:scale-95',
        destructive: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    }

    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                loading && 'cursor-wait',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <div className="mr-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {!loading && icon && iconPosition === 'left' && (
                <span className="mr-2">{icon}</span>
            )}

            {children}

            {!loading && icon && iconPosition === 'right' && (
                <span className="ml-2">{icon}</span>
            )}
        </motion.button>
    )
})

Button.displayName = 'Button'

export default Button