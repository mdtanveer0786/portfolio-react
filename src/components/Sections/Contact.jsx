import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import SectionReveal from '../UI/SectionReveal'
import AnimatedBackground from '../UI/AnimatedBackground'
import { cn } from '../../utils/cn'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_l4si2hh'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_d4jwvxr'
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_y7v9m5b'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8bsxLGyHrYJHyR_P0'

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
        setFormData({ ...formData, [e.target.name]: e.target.value })
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

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            toast.success('Message sent! I will get back to you soon.')

            if (AUTOREPLY_TEMPLATE_ID) {
                try {
                    await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        from_name: 'Md Tanveer Alam',
                        reply_to: 'tanveerdev14@gmail.com'
                    }, PUBLIC_KEY)
                } catch (err) {
                    console.warn('Auto-reply failed:', err.text || err)
                }
            }

            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            console.error('EmailJS Error:', error.text || error)
            toast.error('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'tanveerdev14@gmail.com',
            href: 'mailto:tanveerdev14@gmail.com',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91 8252574386',
            href: 'tel:+918252574386',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Delhi, India',
            href: null,
        },
    ]

    const socials = [
        { icon: Github, href: 'https://github.com/mdtanveer0786', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com/in/md-tanveer-alam-b7a134219/', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://x.com/tanveertoofan01', label: 'Twitter' },
    ]

    const inputClasses = (field) => cn(
        "w-full px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 outline-none placeholder:text-muted-foreground/30",
        "bg-black/[0.02] dark:bg-white/[0.02] border",
        focusedField === field
            ? "border-primary bg-background shadow-lg shadow-primary/5"
            : "border-border/30 hover:border-primary/15"
    )

    return (
        <section id="contact" className="section-container relative overflow-hidden">
            <AnimatedBackground variant="glow" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="section-header">
                    <SectionReveal>
                        <div className="section-badge">
                            <MessageSquare size={14} />
                            Contact
                        </div>
                    </SectionReveal>
                    <SectionReveal delay={0.1}>
                        <h2 className="section-title font-display">
                            Let&apos;s Build Something{' '}
                            <span className="premium-text-gradient">Great</span>
                        </h2>
                    </SectionReveal>
                    <SectionReveal delay={0.2}>
                        <p className="section-subtitle">
                            Have a project in mind or just want to say hi? My inbox is always open.
                        </p>
                    </SectionReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
                    {/* Contact Info Side */}
                    <div className="lg:col-span-5 space-y-6">
                        <SectionReveal x={-20}>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-display font-bold">Get in Touch</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        I&apos;m currently looking for new opportunities. Whether you have a question or just want to connect, I&apos;ll try my best to get back to you!
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {contactInfo.map((item) => (
                                        <div key={item.label}
                                            className="group flex items-center gap-4 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-border/20 hover:border-primary/15 transition-all"
                                        >
                                            <div className="p-2.5 rounded-lg bg-primary/8 text-primary group-hover:bg-primary/12 transition-colors">
                                                <item.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50 mb-0.5">
                                                    {item.label}
                                                </p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="pt-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                                        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">Connect</span>
                                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                                    </div>
                                    <div className="flex gap-3">
                                        {socials.map((social) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shrink-0"
                                                aria-label={`Follow me on ${social.label}`}
                                                >                                                <social.icon size={18} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7">
                        <SectionReveal x={20}>
                            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 ml-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Enter your full name"
                                            className={inputClasses('name')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 ml-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Enter your email address"
                                            className={inputClasses('email')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 ml-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('subject')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="What is this regarding? (e.g. Project, Job Opportunity)"
                                        className={inputClasses('subject')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 ml-1">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Tell me about your project, idea, or requirement..."
                                        className={cn(inputClasses('message'), 'resize-none')}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground/40">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Fast response guaranteed
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto btn-primary px-8 py-3.5 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={14} />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
