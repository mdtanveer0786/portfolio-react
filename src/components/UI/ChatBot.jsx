import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles, Phone, Mail, ExternalLink, ArrowRight, Download, Briefcase, Clock, CheckCircle2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../utils/cn';
import { projects, skillCategories } from '../../utils/constants';
import emailjs from '@emailjs/browser';

const CHAT_RULES = [
    {
        category: 'greeting',
        keywords: ['hi', 'hello', 'hey', 'namaste', 'greeting', 'good morning', 'good afternoon', 'good evening', 'start', 'online', 'anybody'],
        response: "Hello! I am **TanveerAI**, the official assistant of Md Tanveer Alam. I am here to provide information about Tanveer's skills, projects, and professional background. How can I help you today?"
    },
    {
        category: 'location',
        keywords: ['where', 'location', 'live', 'place', 'city', 'based', 'address', 'stay', 'delhi', 'india', 'reside', 'home'],
        response: "Md Tanveer Alam is currently based in **Delhi, India**. He is available for local opportunities and open to **Remote Work** worldwide."
    },
    {
        category: 'education',
        keywords: ['education', 'degree', 'college', 'university', 'btech', 'study', 'qualification', 'graduated', 'cse', 'b.tech', 'school', 'marks', 'cgpa'],
        response: "Tanveer holds a **Bachelor of Technology (B.Tech)** in Computer Science Engineering from Bikaner Technical University (2020-2024) with a CGPA of 7.0. He also maintains an **A+ certification** in Full Stack Development."
    },
    {
        category: 'experience',
        keywords: ['experience', 'work', 'job', 'vinnpro', 'current', 'role', 'seniority', 'years', 'history', 'background', 'career', 'employment'],
        response: "Tanveer is currently a **Full Stack Developer** at **Vinnpro Web Solutions**. He has specialized experience in the MERN stack, PHP, and Android development, focusing on high-performance business applications."
    },
    {
        category: 'skills',
        keywords: ['skills', 'tech', 'stack', 'languages', 'programming', 'tools', 'database', 'frontend', 'backend', 'expertise', 'proficiency', 'technologies'],
        response: "Tanveer specializes in the following technologies:\n\n* **Frontend:** React.js, Next.js, Tailwind CSS\n* **Backend:** Node.js, PHP, Express.js\n* **Databases:** MongoDB, MySQL\n* **Mobile:** React Native, Android App Development\n* **AI:** OpenAI API, RAG Applications\n\nWhich of these would you like to discuss for your next project?"
    },
    {
        category: 'services',
        keywords: ['service', 'offer', 'build', 'website', 'app', 'development', 'developer', 'expert', 'solutions', 'cost', 'price', 'software', 'management system', 'ecommerce'],
        response: "Md Tanveer Alam offers a variety of premium development services:\n\n* **Full Stack & MERN Development**\n* **AI Chatbots & RAG Applications**\n* **Management Systems** (School, Hotel, Coaching)\n* **Custom E-Commerce & Business Platforms**\n\nAre you looking for a custom solution for your business?"
    },
    {
        category: 'contact',
        keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'social', 'linkedin', 'github', 'talk', 'message', 'call', 'whatsapp', 'meet'],
        response: "You can reach Md Tanveer Alam through these official channels:\n\n* **Email:** tanveerdev14@gmail.com\n* **LinkedIn:** [Professional Profile](https://linkedin.com/in/md-tanveer-alam-b7a134219/)\n* **GitHub:** [Code Repositories](https://github.com/mdtanveer0786)\n\nYou may also use the contact form at the bottom of this page."
    },
    {
        category: 'ai',
        keywords: ['ai', 'chatbot', 'rag', 'openai', 'assistant', 'automation', 'pdf chat', 'gpt', 'llm', 'intelligence', 'artificial'],
        response: "Tanveer is an expert in **AI Development**, particularly in building RAG (Retrieval-Augmented Generation) applications, OpenAI integrations, and smart assistants that automate business workflows."
    },
    {
        category: 'availability',
        keywords: ['hire', 'availability', 'freelance', 'fulltime', 'full-time', 'opportunity', 'job', 'vacancy', 'open to work', 'available', 'contract'],
        response: "Tanveer is currently **Available for Freelance Projects, Remote Work, and Full-Time Opportunities**. He is ready to help you build scalable and user-centric applications immediately."
    }
];

const QUICK_ACTIONS = [
    { label: 'View Projects', icon: Briefcase, value: 'Show me your projects' },
    { label: 'Skills', icon: Sparkles, value: 'What are your skills?' },
    { label: 'Hire Tanveer', icon: User, value: 'I want to hire Tanveer' },
    { label: 'Resume', icon: Download, value: 'Download resume' },
];

const LEAD_STEPS = [
    { key: 'name', question: "I'd love to help you connect with Tanveer! First, may I know your **name**?" },
    { key: 'email', question: "Nice to meet you! Could you please provide your **email address** so we can reach out?" },
    { key: 'project', question: "What kind of **project** are you looking for? (e.g., Website, App, AI Bot, etc.)" },
    { key: 'final', question: "Thank you! I've prepared a project summary. Tanveer will review this and get back to you shortly.\n\n**Next Step:** You can also send a direct message in the Contact section below!" }
];

const SOUNDS = {
    pop: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
    send: 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
        const saved = sessionStorage.getItem('tanveer_chat_history');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        }
        return [
            { 
                id: 1, 
                type: 'bot', 
                text: "Hi there! I'm **TanveerAI**. I'm here to help you learn more about Md Tanveer Alam's work and expertise. What's on your mind?",
                timestamp: new Date()
            }
        ];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [leadData, setLeadData] = useState({ step: -1, data: {} });
    const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const [isListening, setIsListening] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const messagesEndRef = useRef(null);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const timer = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('tanveer_chat_history', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messages.length === 1 && !isOpen) {
                setShowTooltip(true);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [messages.length, isOpen]);

    const playSound = (type) => {
        if (!soundEnabled) return;
        audioRef.current.src = SOUNDS[type];
        audioRef.current.play().catch(() => {});
    };

    const scrollToBottom = (behavior = 'smooth') => {
        if (messagesEndRef.current) {
            const container = messagesEndRef.current.parentElement;
            if (container) {
                requestAnimationFrame(() => {
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior
                    });
                });
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => scrollToBottom(messages.length <= 1 ? 'auto' : 'smooth'), 100);
            return () => clearTimeout(timer);
        }
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        playSound('send');
        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: text.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setShowTooltip(false);

        if (leadData.step !== -1) {
            processLeadStep(text);
            return;
        }

        setTimeout(() => {
            const botResponse = getBotResponse(text.toLowerCase());
            playSound('pop');
            
            if (typeof botResponse === 'string') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: botResponse,
                    timestamp: new Date()
                }]);
            } else if (botResponse.type === 'projects') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "Here are some of Tanveer's featured projects. These showcase his ability to build scalable and high-performance applications:",
                    timestamp: new Date(),
                    content: projects.slice(0, 3)
                }]);
            } else if (botResponse.type === 'skills') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "Tanveer has expertise across the full stack. Click a category to explore his technical proficiency:",
                    timestamp: new Date(),
                    isSkills: true
                }]);
            } else if (botResponse.type === 'nav') {
                const section = botResponse.section;
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: `Sure! I've scrolled you to the **${section}** section. Let me know if you have any questions about it!`,
                    timestamp: new Date()
                }]);
            } else if (botResponse.type === 'lead') {
                setLeadData({ step: 0, data: {} });
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: LEAD_STEPS[0].question,
                    timestamp: new Date()
                }]);
            } else if (botResponse.type === 'resume') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "You can download Md Tanveer Alam's professional resume to review his full career history and certifications:",
                    timestamp: new Date(),
                    hasResume: true
                }]);
            }

            setIsTyping(false);
        }, 800 + Math.random() * 400);
    };

    const processLeadStep = (text) => {
        const currentStep = leadData.step;
        const key = LEAD_STEPS[currentStep].key;
        const newData = { ...leadData.data, [key]: text };

        setTimeout(() => {
            playSound('pop');
            if (currentStep < LEAD_STEPS.length - 2) {
                const nextStep = currentStep + 1;
                setLeadData({ step: nextStep, data: newData });
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: LEAD_STEPS[nextStep].question,
                    timestamp: new Date()
                }]);
            } else {
                setLeadData({ step: -1, data: newData });
                sendLeadEmail(newData);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: LEAD_STEPS[LEAD_STEPS.length - 1].question,
                    timestamp: new Date(),
                    leadSummary: newData
                }]);
            }
            setIsTyping(false);
        }, 800);
    };

    const sendLeadEmail = (data) => {
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            message: `Project Type: ${data.project}`,
            to_name: 'Md Tanveer Alam'
        };

        // 1. Send Lead Notification to Tanveer
        emailjs.send(
            'service_l4si2hh', 
            'service_l4si2hh', 
            templateParams, 
            '8bsxLGyHrYJHyR_P0'
        ).then(() => {
            console.log('Lead notification sent');
        }).catch((err) => {
            console.error('Lead notification failed', err);
        });

        // 2. Send Auto-Reply to User
        emailjs.send(
            'service_l4si2hh', 
            'template_y7v9m5b', 
            templateParams, 
            '8bsxLGyHrYJHyR_P0'
        ).then(() => {
            console.log('Auto-reply sent successfully');
        }).catch((err) => {
            console.error('Auto-reply failed', err);
        });
    };

    const getBotResponse = (input) => {
        // 1. Check for specific high-priority intents first
        if (input.includes('resume') || input.includes('cv') || input.includes('download')) return { type: 'resume' };
        if ((input.includes('hire') || input.includes('vacancy') || input.includes('opportunity')) && !input.includes('experience')) return { type: 'lead' };
        if (input.includes('project') || input.includes('showcase') || input.includes('portfolio') || input.includes('demo')) return { type: 'projects' };
        if (input.includes('skill') && !input.includes('about')) return { type: 'skills' };

        // 2. Navigation Intent
        const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
        for (const s of sections) {
            if (input.includes(`go to ${s}`) || input.includes(`show ${s}`) || input.includes(`scroll to ${s}`)) {
                return { type: 'nav', section: s };
            }
        }

        // 3. Rule-based Scoring System
        let bestMatch = null;
        let highestScore = 0;

        for (const rule of CHAT_RULES) {
            let score = 0;
            for (const keyword of rule.keywords) {
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                if (regex.test(input)) {
                    score += 1;
                }
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = rule;
            }
        }

        if (bestMatch && highestScore > 0) {
            return bestMatch.response;
        }
        
        // 4. Fallback with context
        if (input.length > 3) {
            return "I'm still learning to answer that specific question! However, I can tell you about Tanveer's **skills**, **projects**, **education**, or **how to contact him**. Which would you prefer?";
        }
        
        return "I'm not sure I caught that. Could you please rephrase your question? You can ask about my **experience**, **services**, or **projects**.";
    };

    const toggleListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            handleSendMessage(transcript);
        };
        recognition.start();
    };

    const formatMessage = (text) => {
        if (typeof text !== 'string') return text;
        const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-primary font-bold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('[') && part.includes('](')) {
                const labelMatch = part.match(/\[(.*?)\]/);
                const urlMatch = part.match(/\((.*?)\)/);
                if (labelMatch && urlMatch) {
                    return (
                        <a key={index} href={urlMatch[1]} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/30 hover:decoration-accent transition-all inline-flex items-center gap-1 font-medium">
                            {labelMatch[1]} <ExternalLink size={10} />
                        </a>
                    );
                }
            }
            return part;
        });
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[min(calc(100vh-12rem),700px)] glass-card flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-primary/20 pointer-events-auto"
                    >
                        {/* Premium Header */}
                        <div className="p-5 bg-gradient-to-r from-primary via-fuchsia-600 to-accent text-white flex items-center justify-between shadow-lg relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                                        <Bot size={24} className="text-white drop-shadow-sm" />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-primary rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base leading-none tracking-tight">TanveerAI</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            <Clock size={10} /> {localTime}
                                        </p>
                                        <p className="text-[9px] font-bold text-emerald-300 uppercase tracking-[0.1em] flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 size={10} /> Active
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-90 text-white/80">
                                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-90">
                                    <X size={22} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-dot-grid" data-lenis-prevent>
                            {messages.map((msg) => (
                                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-3 max-w-[92%]", msg.type === 'user' ? "ml-auto flex-row-reverse" : "")}>
                                    <div className={cn("w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm", msg.type === 'bot' ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20")}>
                                        {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className={cn("p-4 rounded-2xl text-[13.5px] leading-relaxed shadow-sm", msg.type === 'bot' ? "bg-white dark:bg-neutral-900/95 border border-border text-foreground rounded-tl-none backdrop-blur-sm" : "bg-primary text-white rounded-tr-none shadow-md shadow-primary/20")}>
                                            {formatMessage(msg.text)}
                                            
                                            {msg.leadSummary && (
                                                <div className="mt-4 p-3 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 space-y-2 text-[12px]">
                                                    <p className="font-bold text-primary uppercase tracking-wider text-[10px]">Project Inquiry Summary</p>
                                                    <p><strong>Name:</strong> {msg.leadSummary.name}</p>
                                                    <p><strong>Email:</strong> {msg.leadSummary.email}</p>
                                                    <p><strong>Project:</strong> {msg.leadSummary.project}</p>
                                                </div>
                                            )}

                                            {msg.hasResume && (
                                                <a href="/resume.pdf" download className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                                    <Download size={14} /> Download PDF Resume
                                                </a>
                                            )}

                                            {msg.isSkills && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {skillCategories.map((cat, i) => (
                                                        <button key={i} onClick={() => handleSendMessage(`Tell me more about ${cat.title}`)} className="px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-primary text-[11px] font-bold hover:bg-primary hover:text-white transition-all">
                                                            {cat.title}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {msg.content && (
                                            <div className="flex flex-col gap-3 mt-1">
                                                {msg.content.map((project, i) => (
                                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-neutral-900 border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                                        <div className="h-24 w-full relative overflow-hidden">
                                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                            <p className="absolute bottom-2 left-3 text-white font-bold text-xs">{project.title}</p>
                                                        </div>
                                                        <div className="p-3">
                                                            <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                                                            <div className="flex gap-2">
                                                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-primary/10 text-primary rounded-lg font-bold text-[10px] hover:bg-primary text-primary hover:text-white transition-all">
                                                                    Live <ExternalLink size={10} />
                                                                </a>
                                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-foreground rounded-lg font-bold text-[10px] hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
                                                                    Code <ArrowRight size={10} />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[85%]">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center"><Bot size={16} /></div>
                                    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-border p-3.5 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions Bar */}
                        <div className="px-4 py-3 flex flex-nowrap overflow-x-auto gap-2 scrollbar-none bg-black/[0.02] dark:bg-white/[0.02] border-t border-border/50">
                            {QUICK_ACTIONS.map((action, i) => (
                                <button key={i} onClick={() => handleSendMessage(action.value)} className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-border bg-background hover:border-primary hover:text-primary transition-all flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95">
                                    <action.icon size={13} /> {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <div className="p-4 sm:p-5 border-t border-border bg-background/80 backdrop-blur-xl">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex items-center gap-2">
                                <button type="button" onClick={toggleListening} className={cn("p-2.5 rounded-xl transition-all", isListening ? "bg-red-500 text-white animate-pulse" : "bg-muted/50 text-muted-foreground hover:bg-muted")}>
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                                <div className="relative flex-1 group">
                                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={leadData.step !== -1 ? "Type your answer..." : "Ask TanveerAI anything..."} className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10" />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none group-focus-within:text-primary/30 transition-colors"><ArrowRight size={16} /></div>
                                </div>
                                <button type="submit" disabled={!inputValue.trim()} className="p-3.5 rounded-xl bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-90 flex-shrink-0">
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative pointer-events-auto">
                <AnimatePresence>
                    {(showTooltip && !isOpen) && (
                        <motion.div initial={{ opacity: 0, x: 20, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.8 }} className="absolute bottom-[110%] right-0 mb-2 px-4 py-2 rounded-2xl bg-neutral-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl flex items-center gap-2 border border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Hey! Have a question for Tanveer?
                            <div className="absolute top-full right-6 w-3 h-3 bg-neutral-900 rotate-45 -translate-y-1/2" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); playSound('pop'); }}
                    className={cn("w-16 h-16 rounded-[2rem] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-500 relative overflow-hidden group border-2 border-white/20", isOpen ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl rotate-90" : "bg-primary")}
                >
                    {!isOpen && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}><X size={28} strokeWidth={2.5} /></motion.div>
                        ) : (
                            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} className="relative"><MessageSquare size={28} strokeWidth={2.5} /></motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default ChatBot;
