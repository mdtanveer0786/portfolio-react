import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Loader from "./components/UI/Loader";
import SmoothScroll from "./components/UI/SmoothScroll";

import Hero from "./components/Sections/Hero";

const TechMarquee = lazy(() => import("./components/UI/TechMarquee"));
const About = lazy(() => import("./components/Sections/About"));
const Services = lazy(() => import("./components/Sections/Services"));
const Experience = lazy(() => import("./components/Sections/Experience"));
const Education = lazy(() => import("./components/Sections/Education"));
const Skills = lazy(() => import("./components/Sections/Skills"));
const Projects = lazy(() => import("./components/Sections/Projects"));
const Contact = lazy(() => import("./components/Sections/Contact"));
const ChatBot = lazy(() => import("./components/UI/ChatBot"));

const ScrollProgress = lazy(() => import("./components/UI/ScrollProgress"));
const ScrollToTopBtn = lazy(() => import("./components/UI/ScrollToTopBtn"));
const ParticlesBackground = lazy(() => import("./components/UI/ParticlesBackground"));

import { SECTIONS, LOADING_DURATION } from "./utils/constants";
import { useScroll } from "./hooks/useScroll";

const ScrollToTop = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (document.body) document.body.scrollTop = 0;
        if (document.documentElement) document.documentElement.scrollTop = 0;
    }, []);
    return null;
};

const getSafeSessionStorage = (key, fallback = null) => {
    try {
        return sessionStorage.getItem(key) || fallback;
    } catch (e) {
        return fallback;
    }
};

const setSafeSessionStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, value);
    } catch (e) {
        // ignore
    }
};

function App() {
    const [loading, setLoading] = useState(() => {
        if (typeof window !== 'undefined' && getSafeSessionStorage('loader-seen')) {
            return false;
        }
        return true;
    });
    
    // Track if we started with the loader to determine if we should fade in
    const [wasLoading] = useState(loading);

    const { activeSection, setActiveSection } = useScroll();

    useLayoutEffect(() => {
        if (loading) {
            document.documentElement.classList.add('loading');
            document.body.classList.add('no-scroll');
            window.scrollTo(0, 0);
        }

        return () => {
            document.documentElement.classList.remove('loading');
            document.body.classList.remove('no-scroll');
        };
    }, [loading]);

    useEffect(() => {
        if (!loading) {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('loading');

            const hash = window.location.hash.substring(1);
            if (hash && SECTIONS.includes(hash)) {
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(hash);
                    }
                }, 100);
            }
        }
    }, [loading, setActiveSection]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash && SECTIONS.includes(hash)) {
                setActiveSection(hash);
            }
        };

        const handleVisibilityChange = () => {
            document.title = document.hidden
                ? "Come back! 👋 | Md Tanveer Alam"
                : "Md Tanveer Alam | Full Stack Developer";
        };

        window.addEventListener("hashchange", handleHashChange);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        let handleLoad;

        if (getSafeSessionStorage('loader-seen')) {
            setLoading(false);
        } else {
            const startTime = Date.now();
            handleLoad = () => {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, LOADING_DURATION - elapsedTime);

                setTimeout(() => {
                    setLoading(false);
                    setSafeSessionStorage('loader-seen', 'true');
                }, remainingTime);
            };

            if (document.readyState === "complete") {
                handleLoad();
            } else {
                window.addEventListener("load", handleLoad);
            }
        }

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            if (handleLoad) {
                window.removeEventListener("load", handleLoad);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [setActiveSection]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <SmoothScroll>
                <ScrollToTop />

                <AnimatePresence>
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
                            initial={{ opacity: wasLoading ? 0 : 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: wasLoading ? 0.6 : 0 }}
                            className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary relative"
                        >
                            <Suspense fallback={null}>
                                <ScrollProgress />
                                <ScrollToTopBtn />
                                <ParticlesBackground />
                            </Suspense>

                            <Suspense fallback={null}>
                                <ChatBot />
                            </Suspense>

                            <Header
                                activeSection={activeSection}
                                setActiveSection={setActiveSection}
                            />

                            <main className="relative overflow-hidden">
                                <Hero setActiveSection={setActiveSection} />
                                <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
                                    <TechMarquee />
                                    <About />
                                    <Services />
                                    <Experience />
                                    <Skills />
                                    <Projects />
                                    <Education />
                                    <Contact />
                                </Suspense>
                            </main>

                            <Footer />
                        </motion.div>
                    )}
                </AnimatePresence>
            </SmoothScroll>
            <Analytics />
        </ThemeProvider>
    );
}

export default App;