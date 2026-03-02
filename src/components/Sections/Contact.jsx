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
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-black text-foreground/[0.05] dark:text-white/[0.05] uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                CONTACT
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />
                    <TextReveal 
                        text="Let's Start a Project" 
                        className="text-4xl md:text-6xl font-black uppercase tracking-wider" 
                    />
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
                        Have an idea? Let&apos;s turn it into a reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Contact Info Card */}
                    <div className="lg:col-span-5">
                        <SectionReveal x={-30}>
                            <div className="glass-card p-8 space-y-8 relative overflow-hidden border-border">
                                <div className="absolute -right-4 -top-4 p-8 opacity-5">
                                    <MessageSquare className="w-32 h-32" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold">Connect With Me</h3>
                                    <p className="text-muted-foreground leading-relaxed font-medium">
                                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { icon: Mail, label: 'Email', value: 'tanveerdev14@gmail.com', href: 'mailto:tanveerdev14@gmail.com' },
                                        { icon: Phone, label: 'Phone', value: '+91 8252574386', href: 'tel:+918252574386' },
                                        { icon: MapPin, label: 'Location', value: 'Delhi, India • Remote', href: null },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-4 group">
                                            <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform border border-primary/20">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-lg font-bold hover:text-primary transition-colors text-foreground">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-lg font-bold text-foreground">{item.value}</p>
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
                            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-6 border-border">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1 text-foreground">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-background glass border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-foreground"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1 text-foreground">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-background glass border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-foreground"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1 text-foreground">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-background glass border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all text-foreground"
                                        placeholder="Project Opportunity"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1 text-foreground">Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-background glass border-black/10 dark:border-white/10 focus:border-violet-500 outline-none transition-all resize-none text-foreground"
                                        placeholder="Tell me more about your project..."
                                    />
                                </div>

                                <Magnetic>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-violet-500/40 transition-all disabled:opacity-50 uppercase tracking-widest"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </Magnetic>
                                
                                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
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
