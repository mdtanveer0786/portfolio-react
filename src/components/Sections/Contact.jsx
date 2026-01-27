import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact({ setActiveSection }) {
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

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields')
            return
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address')
            return
        }

        setIsSubmitting(true)

        try {
            // Using EmailJS or your backend
            // const response = await emailjs.send(
            //   'service_id',
            //   'template_id',
            //   formData,
            //   'user_id'
            // )

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            toast.success('Message sent successfully! I will get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            toast.error('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Let's{' '}
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Work Together
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind? Let's discuss how we can bring your ideas to life.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="text-muted-foreground mb-8">
                                Feel free to reach out through any of the following channels.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <a
                                        href="mailto:tanveerdev14@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        tanveerdev14@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Phone</h4>
                                    <a
                                        href="tel:+918252574386"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        +91 8252574386
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Location</h4>
                                    <p className="text-muted-foreground">
                                        Delhi, India • Remote Available
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="p-6 rounded-2xl glass">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                <h4 className="font-semibold">Currently Available</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                I'm actively seeking new opportunities and available for freelance projects.
                                Response time: Within 24 hours.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="glass rounded-2xl p-6 md:p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}