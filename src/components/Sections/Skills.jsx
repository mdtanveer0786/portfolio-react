import { motion } from 'framer-motion'
import { skillCategories } from '../../utils/constants'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import { cn } from '../../utils/cn'

const SkillCard = ({ skill, index }) => {
    const getFormattedName = (n) => {
        const lower = n.toLowerCase();
        if (lower === 'react.js') return 'react';
        if (lower === 'express.js') return 'express';
        if (lower === 'node.js') return 'nodejs';
        if (lower === 'tailwind css') return 'tailwindcss';
        return lower.replace('.js', '').replace(' ', '');
    };
    
    const formattedName = getFormattedName(skill.name);
    const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${formattedName}/${formattedName}-original.svg`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.02,
                ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-white/5 dark:bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.05] shadow-lg shadow-black/5"
        >
            {/* Always-on Premium Glow (Subtle) */}
            <div 
                className="absolute inset-0 rounded-2xl opacity-10 blur-xl pointer-events-none group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: skill.color }}
            />

            {/* Moving Border Gradient (Premium Effect) */}
            <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:from-primary/50 transition-all duration-500" />

            <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 mb-2 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <img 
                    src={iconUrl} 
                    alt={skill.name}
                    className="w-full h-full object-contain filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${skill.name}&background=6366f1&color=fff&bold=true&size=64`;
                    }}
                />
            </div>
            
            <span className="relative z-10 text-[10px] sm:text-xs font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors text-center truncate w-full px-1">
                {skill.name}
            </span>

            {/* Mini Progress Dot */}
            <div className="absolute bottom-1 right-2 flex items-center gap-1">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: skill.color }} />
            </div>
        </motion.div>
    );
};

export default function Skills() {
    const allSkills = skillCategories.flatMap(category => category.skills);

    return (
        <section id="skills" className="section-container relative overflow-hidden">
            {/* Ultra-Premium Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-0 left-1/4 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent blur-[120px]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Background Text */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
               SKILLS
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Minimalist Premium Header */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "40px" }}
                        className="h-1 bg-primary rounded-full mb-6" 
                    />
                    <TextReveal 
                        text="Technical Stack" 
                        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4" 
                    />
                    <p className="text-muted-foreground font-medium text-xs sm:text-sm tracking-[0.2em] uppercase opacity-60">
                        Professional Skillset & Tools
                    </p>
                </div>

                {/* Compact Unified Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 max-w-6xl mx-auto">
                    {allSkills.map((skill, index) => (
                        <SkillCard 
                            key={`${skill.name}-${index}`} 
                            skill={skill} 
                            index={index} 
                        />
                    ))}
                </div>

                {/* Elegant Footer Line */}
                <div className="mt-20 flex justify-center">
                    <div className="flex items-center gap-4 opacity-20">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-foreground" />
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-foreground" />
                    </div>
                </div>
            </div>
        </section>
    )
}
