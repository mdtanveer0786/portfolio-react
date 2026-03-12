import TextReveal from '../UI/TextReveal'
import SectionReveal from '../UI/SectionReveal'

export default function About() {
    return (
        <section id="about" className="section-container relative overflow-hidden">
            {/* Background Text - Improved visibility and positioning */}
            <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground/5 dark:text-white/5 uppercase tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -z-10">
                ABOUT
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-8 md:mb-10 space-y-4">
                    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto rounded-full" />
                    <TextReveal
                        text="Who I am"
                        className="text-3xl md:text-5xl font-black uppercase tracking-wider"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Story Content */}
                    <div className="md:col-span-7 order-2 md:order-1">
                        <SectionReveal>
                            <div className="space-y-4 md:space-y-6 text-center md:text-left">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-primary">
                                    A Dedicated Coder from India
                                </h3>
                                <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                                    <p>
                                        I am a passionate <span className="text-foreground font-bold">Full Stack Developer</span> specializing in building modern, scalable web apps with the <span className="text-primary font-bold">MERN Stack</span>.
                                    </p>
                                    <p>
                                        I craft intuitive interfaces with <span className="text-primary font-bold">React</span> and robust backend systems with <span className="text-primary font-bold">Node.js</span>, transforming complex problems into seamless experiences.
                                    </p>
                                    <p>
                                        Driven by curiosity and excellence, I write clean, maintainable code to deliver high-performance solutions that delight users and businesses alike.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                                    {/* React */}
                                    <span
                                        className="text-white px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ backgroundColor: '#61DAFB' }}
                                    >
                                        React
                                    </span>

                                    {/* Node.js */}
                                    <span
                                        className="text-white px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ backgroundColor: '#339933' }}
                                    >
                                        Node.js
                                    </span>

                                    {/* Express */}
                                    <span
                                        className="text-white px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ backgroundColor: '#000000' }}
                                    >
                                        Express
                                    </span>

                                    {/* MongoDB */}
                                    <span
                                        className="text-white px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ backgroundColor: '#47A248' }}
                                    >
                                        MongoDB
                                    </span>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Image / Stats Card */}
                    <div className="md:col-span-5 order-1 md:order-2">
                        <SectionReveal delay={0.2}>
                            <div className="relative group max-w-xs sm:max-w-sm mx-auto">
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative glass-card p-2 rounded-2xl border-border overflow-hidden">
                                    <img
                                        src="/profile.jpg"
                                        alt="Md Tanveer Alam"
                                        loading="lazy"
                                        className="w-full rounded-xl transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800"
                                        }}
                                    />
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
