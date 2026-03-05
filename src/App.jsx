import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeProvider } from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Loader from "./components/UI/Loader";

// 1. PROFESSIONAL FIX: Remove lazy loading for layout-critical sections.
// Lazy loading these caused the DOM height to be 0 for a split second,
// which confused the browser's scroll restoration and caused jumps to the footer.
import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import Education from "./components/Sections/Education";
import Skills from "./components/Sections/Skills";
import Projects from "./components/Sections/Projects";
import Contact from "./components/Sections/Contact";

// Non-layout critical components can still be lazy loaded
const ParticlesBackground = lazy(() => import("./components/UI/ParticlesBackground"));
const ScrollProgress = lazy(() => import("./components/UI/ScrollProgress"));
const CustomCursor = lazy(() => import("./components/UI/CustomCursor"));

import { SECTIONS, LOADING_DURATION } from "./utils/constants";
import { useScroll } from "./hooks/useScroll";

/**
 * ROCK SOLID SCROLL-TO-TOP
 * Runs synchronously before browser paints to lock position at 0,0
 */
const ScrollToTop = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (document.body) document.body.scrollTop = 0;
        if (document.documentElement) document.documentElement.scrollTop = 0;
    }, []);
    return null;
};

function App() {
    const [loading, setLoading] = useState(true);
    const { activeSection, setActiveSection } = useScroll();

    // STRICT SCROLL LOCKING ON MOUNT
    useLayoutEffect(() => {
        // Disable smooth scrolling and physically lock the body height to prevent jump
        document.documentElement.classList.add('loading');
        document.body.classList.add('no-scroll');
        window.scrollTo(0, 0);

        return () => {
            document.documentElement.classList.remove('loading');
            document.body.classList.remove('no-scroll');
        };
    }, []);

    // HANDLE NAVIGATION AFTER LOADING
    useEffect(() => {
        if (!loading) {
            // Unlock scroll
            document.body.classList.remove('no-scroll');
            
            // Short delay to allow DOM to paint before restoring smooth scroll
            setTimeout(() => {
                document.documentElement.classList.remove('loading');
                
                const hash = window.location.hash.substring(1);
                if (hash && SECTIONS.includes(hash)) {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(hash);
                    }
                } else {
                    window.scrollTo(0, 0);
                    setActiveSection('home');
                }
            }, 50);
        }
    }, [loading, setActiveSection]);

    // ASSETS LOADING AND HASH LISTENER
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash && SECTIONS.includes(hash)) {
                setActiveSection(hash);
            }
        };

        window.addEventListener("hashchange", handleHashChange);

        const startTime = Date.now();
        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, LOADING_DURATION - elapsedTime);
            
            setTimeout(() => {
                setLoading(false);
            }, remainingTime);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("load", handleLoad);
        };
    }, [setActiveSection]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <ScrollToTop />
            
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <Loader />
                    </motion.div>
                ) : (
                    <motion.div 
                        key="main-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary relative"
                    >
                        <Suspense fallback={null}>
                            <ScrollProgress />
                            <CustomCursor />
                            <ParticlesBackground />
                        </Suspense>
                        
                        <Header
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />

                        {/* Since we removed lazy(), these render instantly, preventing layout shifts */}
                        <main className="relative overflow-hidden">
                            <Hero setActiveSection={setActiveSection} />
                            <About />
                            <Education />
                            <Skills />
                            <Projects />
                            <Contact />
                        </main>

                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default App;