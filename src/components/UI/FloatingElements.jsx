import { motion } from 'framer-motion'
import { 
  Zap, 
  Cpu, 
  Database, 
  Code, 
  Cloud, 
  Server,
  Globe,
  Shield
} from 'lucide-react'

const elements = [
  { Icon: Zap, color: '#F59E0B', size: 'w-8 h-8' },
  { Icon: Cpu, color: '#10B981', size: 'w-10 h-10' },
  { Icon: Database, color: '#3B82F6', size: 'w-12 h-12' },
  { Icon: Code, color: '#8B5CF6', size: 'w-9 h-9' },
  { Icon: Cloud, color: '#EC4899', size: 'w-11 h-11' },
  { Icon: Server, color: '#EF4444', size: 'w-10 h-10' },
  { Icon: Globe, color: '#06B6D4', size: 'w-8 h-8' },
  { Icon: Shield, color: '#84CC16', size: 'w-9 h-9' },
]

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {elements.map(({ Icon, color, size }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${(index * 12.5) % 100}%`,
            top: `${(index * 15) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(index) * 20, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`${size} rounded-xl glass flex items-center justify-center opacity-20 hover:opacity-40 transition-opacity`}>
            <Icon style={{ color }} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}