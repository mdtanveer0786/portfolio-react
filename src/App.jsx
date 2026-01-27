import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './components/Layout/ThemeProvider'
import Header from './components/Layout/Header'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Hero from './components/Sections/Hero'
import About from './components/Sections/About'
import Skills from './components/Sections/Skills'
import Projects from './components/Sections/Projects'
import Experience from './components/Sections/Experience'
import Education from './components/Sections/Education'
import Contact from './components/Sections/Contact'
import Loader from './components/UI/Loader'
import ParticlesBackground from './components/UI/ParticlesBackground'

function App() {
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        // Handle scroll to section
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1)
            if (hash) {
                setActiveSection(hash)
            }
        }

        // Handle scroll events
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('hashchange', handleHashChange)
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Initial load
        const hash = window.location.hash.substring(1)
        if (hash && sections.includes(hash)) {
            setActiveSection(hash)
        }

        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('hashchange', handleHashChange)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <ParticlesBackground />

                <Header activeSection={activeSection} setActiveSection={setActiveSection} />
                <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

                <main className="relative">
                    <Hero setActiveSection={setActiveSection} />
                    <About setActiveSection={setActiveSection} />
                    <Skills setActiveSection={setActiveSection} />
                    <Projects setActiveSection={setActiveSection} />
                    <Experience setActiveSection={setActiveSection} />
                    <Education setActiveSection={setActiveSection} />
                    <Contact setActiveSection={setActiveSection} />
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App