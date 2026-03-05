import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import Magnetic from '../UI/Magnetic'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields')
            return
        }
        setIsSubmitting(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            toast.success('Message sent! I will get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="section-container relative overflow-hidden">
            {/* Background Text */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
               CONTACT
            </div>

            <div className="container mx-auto relative z-10">
               <div className="text-center mb-8 md:mb-10 space-y-4">
                   <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />                    <TextReveal 
                        text="Let's Start a Project" 
                        className="text-3xl md:text-5xl font-black uppercase tracking-wider" 
                    />
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium">
                        Have an idea? Let&apos;s turn it into a reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
                    {/* Contact Info Card */}
                    <div className="lg:col-span-5">
                        <SectionReveal x={-30}>
                            <div className="glass-card p-6 md:p-8 space-y-8 relative overflow-hidden border-border/50">
                                <div className="absolute -right-4 -top-4 p-8 opacity-5">
                                    <MessageSquare className="w-24 h-24" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold">Connect With Me</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    {[
                                        { icon: Mail, label: 'Email', value: 'tanveerdev14@gmail.com', href: 'mailto:tanveerdev14@gmail.com' },
                                        { icon: Phone, label: 'Phone', value: '+91 8252574386', href: 'tel:+918252574386' },
                                        { icon: MapPin, label: 'Location', value: 'Delhi, India • Remote', href: null },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-4 group">
                                            <div className="p-3.5 rounded-xl bg-primary/5 text-primary group-hover:scale-105 transition-transform border border-primary/10">
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">{item.label}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-base font-bold hover:text-primary transition-colors text-foreground">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-base font-bold text-foreground">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Form Card */}
                    <div className="lg:col-span-7">
                        <SectionReveal x={30}>
                            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 space-y-5 border-border/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold ml-1 text-muted-foreground uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-sm text-foreground"
                                            placeholder="your name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold ml-1 text-muted-foreground uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-sm text-foreground"
                                            placeholder="your email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold ml-1 text-muted-foreground uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-sm text-foreground"
                                        placeholder="Project Opportunity"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold ml-1 text-muted-foreground uppercase tracking-wider">Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-sm resize-none text-foreground"
                                        placeholder="Tell me more about your project..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <Magnetic>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isSubmitting}
                                            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-2.5 shadow-lg hover:shadow-violet-500/30 transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send className="w-3.5 h-3.5" />
                                                </>
                                            )}
                                        </motion.button>
                                    </Magnetic>
                                </div>
                                
                                <p className="text-xs text-muted-foreground flex items-center gap-2 opacity-70">
                                    <Sparkles className="w-3 h-3 text-primary" />
                                    Usually responds within 24 hours
                                </p>
                            </form>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
