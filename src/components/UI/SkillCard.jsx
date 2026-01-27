import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function SkillCard({
    skill,
    level,
    color = '#3B82F6',
    showPercentage = true
}) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{skill}</span>
                {showPercentage && (
                    <span className="text-xs text-muted-foreground">{level}%</span>
                )}
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={cn('h-full rounded-full')}
                    style={{
                        background: `linear-gradient(90deg, ${color}88, ${color})`
                    }}
                />
            </div>
        </div>
    )
}