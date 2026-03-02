import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeProvider } from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import Education from "./components/Sections/Education";
import Skills from "./components/Sections/Skills";
import Projects from "./components/Sections/Projects";
import Contact from "./components/Sections/Contact";

import Loader from "./components/UI/Loader";
import ParticlesBackground from "./components/UI/ParticlesBackground";

import { SECTIONS, LOADING_DURATION } from "./utils/constants";
import { useScroll } from "./hooks/useScroll";

function App() {
    const [loading, setLoading] = useState(true);
    const { activeSection, setActiveSection } = useScroll();

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash && SECTIONS.includes(hash)) {
                setActiveSection(hash);
            }
        };

        window.addEventListener("hashchange", handleHashChange);

        const hash = window.location.hash.substring(1);
        if (hash && SECTIONS.includes(hash)) {
            setActiveSection(hash);
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, LOADING_DURATION);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [setActiveSection]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Loader />
                    </motion.div>
                ) : (
                    <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
                        <ParticlesBackground />
                        <Header
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />

                        <main className="relative overflow-hidden">
                            <Hero />
                            <About />
                            <Education />
                            <Skills />
                            <Projects />
                            <Contact />
                        </main>

                        <Footer />
                    </div>
                )}
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default App;