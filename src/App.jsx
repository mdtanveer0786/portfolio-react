import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeProvider } from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Loader from "./components/UI/Loader";
import SmoothScroll from "./components/UI/SmoothScroll";

import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import Education from "./components/Sections/Education";
import Skills from "./components/Sections/Skills";
import Projects from "./components/Sections/Projects";
import Contact from "./components/Sections/Contact";
import ChatBot from "./components/UI/ChatBot";

const ScrollProgress = lazy(() => import("./components/UI/ScrollProgress"));
const ScrollToTopBtn = lazy(() => import("./components/UI/ScrollToTopBtn"));

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

function App() {
    const [loading, setLoading] = useState(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('loader-seen')) {
            return false;
        }
        return true;
    });

    const { activeSection, setActiveSection } = useScroll();

    useLayoutEffect(() => {
        document.documentElement.classList.add('loading');
        document.body.classList.add('no-scroll');
        window.scrollTo(0, 0);

        return () => {
            document.documentElement.classList.remove('loading');
            document.body.classList.remove('no-scroll');
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            document.body.classList.remove('no-scroll');

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

        if (sessionStorage.getItem('loader-seen')) {
            setLoading(false);
            return;
        }

        const startTime = Date.now();
        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, LOADING_DURATION - elapsedTime);

            setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('loader-seen', 'true');
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
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [setActiveSection]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <SmoothScroll>
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
                                <ScrollToTopBtn />
                            </Suspense>

                            <ChatBot />

                            <Header
                                activeSection={activeSection}
                                setActiveSection={setActiveSection}
                            />

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
            </SmoothScroll>
        </ThemeProvider>
    );
}

export default App;