import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'
import Magnetic from '../UI/Magnetic'
import { cn } from '../../utils/cn'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Initialize EmailJS
if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY)
}

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields')
            return
        }

        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address')
            return
        }

        if (formData.message.length < 10) {
            toast.error('Message is too short (min 10 characters)')
            return
        }

        setIsSubmitting(true)

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                from_name: formData.name,
                from_email: formData.email,
                reply_to: formData.email
            }

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            )
            
            toast.success('Message sent! I will get back to you soon.')

            if (AUTOREPLY_TEMPLATE_ID) {
                try {
                    await emailjs.send(
                        SERVICE_ID,
                        AUTOREPLY_TEMPLATE_ID,
                        {
                            name: formData.name,
                            email: formData.email,
                            message: formData.message,
                            from_name: 'Tanveer',
                            reply_to: 'tanveerdev14@gmail.com'
                        },
                        PUBLIC_KEY
                    )
                } catch (autoReplyError) {
                    console.warn('Auto-reply failed:', autoReplyError.text || autoReplyError)
                }
            }

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })

        } catch (error) {
            console.error('EmailJS Error:', error.text || error)
            toast.error('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="section-container relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-violet-500/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse delay-700" />
            </div>

            {/* Background Text - Consistent with other sections */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                CONTACT
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "5rem" }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-primary via-violet-500 to-cyan-400 rounded-full shadow-sm shadow-primary/20" 
                    />
                    <div className="px-2">
                        <TextReveal 
                            text="Let's Build Something Great" 
                            className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight" 
                        />
                    </div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-muted-foreground font-medium max-w-2xl mx-auto text-sm md:text-lg px-4 leading-relaxed"
                    >
                        Have a project in mind or just want to say hi? My inbox is always open.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
                    {/* Contact Info Side */}
                    <div className="lg:col-span-5 space-y-10">
                        <SectionReveal x={-30}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Contact Information</h3>
                                    <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
                                        I&apos;m currently looking for new opportunities. Whether you have a question or just want to connect, I&apos;ll try my best to get back to you!
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { 
                                            icon: Mail, 
                                            label: 'Email Me', 
                                            value: 'tanveerdev14@gmail.com', 
                                            href: 'mailto:tanveerdev14@gmail.com',
                                            color: 'bg-blue-500/10 text-blue-500'
                                        },
                                        { 
                                            icon: Phone, 
                                            label: 'Call Me', 
                                            value: '+91 8252574386', 
                                            href: 'tel:+918252574386',
                                            color: 'bg-emerald-500/10 text-emerald-500'
                                        },
                                        { 
                                            icon: MapPin, 
                                            label: 'Location', 
                                            value: 'Delhi, India • Remote', 
                                            href: null,
                                            color: 'bg-rose-500/10 text-rose-500'
                                        },
                                    ].map((item) => (
                                        <div key={item.label} className="group flex items-center gap-5 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300">
                                            <div className={cn("p-4 rounded-xl transition-transform group-hover:scale-110 duration-300", item.color)}>
                                                <item.icon size={20} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                                                    {item.label}
                                                </p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-sm md:text-base font-bold hover:text-primary transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm md:text-base font-bold">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Follow My Journey</p>
                                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                                    </div>
                                    <div className="flex justify-center md:justify-start gap-4">
                                        {[
                                            { icon: Github, href: 'https://github.com/mdtanveer0786', label: 'GitHub', color: 'hover:bg-[#24292e] hover:text-white hover:shadow-[#24292e]/20' },
                                            { icon: Linkedin, href: 'https://linkedin.com/in/md-tanveer-alam-b7a134219/', label: 'LinkedIn', color: 'hover:bg-[#0077b5] hover:text-white hover:shadow-[#0077b5]/20' },
                                            { icon: Twitter, href: 'https://x.com/tanveertoofan01', label: 'Twitter', color: 'hover:bg-[#1da1f2] hover:text-white hover:shadow-[#1da1f2]/20' },
                                        ].map((social, i) => (
                                            <Magnetic key={i}>
                                                <motion.a 
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ y: -5 }}
                                                    className={cn(
                                                        "group relative p-5 rounded-2xl bg-secondary/30 border border-border/50 transition-all duration-500 overflow-hidden shadow-sm",
                                                        social.color
                                                    )}
                                                    aria-label={social.label}
                                                >
                                                    {/* Hover Glow Effect */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-white" />
                                                    
                                                    <social.icon size={22} className="relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                    
                                                    {/* Tooltip */}
                                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                                        {social.label}
                                                    </span>
                                                </motion.a>
                                            </Magnetic>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7">
                        <SectionReveal x={30}>
                            <div className="relative group">
                                {/* Glow Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-500/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                
                                <form onSubmit={handleSubmit} className="relative glass-card p-6 md:p-12 space-y-6 md:space-y-8 rounded-3xl border-border/50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1 flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="Full Name"
                                                className={cn(
                                                    "w-full px-6 py-4 rounded-2xl bg-secondary/30 border transition-all duration-500 outline-none placeholder:text-muted-foreground/30 font-medium",
                                                    focusedField === 'name' ? "border-primary bg-background shadow-lg shadow-primary/5" : "border-border/50 hover:border-primary/20"
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1 flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="email@example.com"
                                                className={cn(
                                                    "w-full px-6 py-4 rounded-2xl bg-secondary/30 border transition-all duration-500 outline-none placeholder:text-muted-foreground/30 font-medium",
                                                    focusedField === 'email' ? "border-primary bg-background shadow-lg shadow-primary/5" : "border-border/50 hover:border-primary/20"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-primary" />
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('subject')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Project Inquiry"
                                            className={cn(
                                                "w-full px-6 py-4 rounded-2xl bg-secondary/30 border transition-all duration-500 outline-none placeholder:text-muted-foreground/30 font-medium",
                                                focusedField === 'subject' ? "border-primary bg-background shadow-lg shadow-primary/5" : "border-border/50 hover:border-primary/20"
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-primary" />
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="How can I help you?"
                                            className={cn(
                                                "w-full px-6 py-4 rounded-2xl bg-secondary/30 border transition-all duration-500 outline-none resize-none placeholder:text-muted-foreground/30 font-medium",
                                                focusedField === 'message' ? "border-primary bg-background shadow-lg shadow-primary/5" : "border-border/50 hover:border-primary/20"
                                            )}
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 bg-secondary/30 px-5 py-2.5 rounded-full border border-border/50">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span>Fast response guaranteed</span>
                                        </div>

                                        <Magnetic>
                                            <motion.button
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isSubmitting}
                                                className="w-full sm:w-auto group relative px-12 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <span>Send Proposal</span>
                                                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            </motion.button>
                                        </Magnetic>
                                    </div>
                                </form>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
