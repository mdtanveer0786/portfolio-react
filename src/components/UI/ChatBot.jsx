import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles, ExternalLink, ArrowRight, Download, Briefcase, Clock, CheckCircle2, Mic, MicOff, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { projects, skillCategories } from '../../utils/constants';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOUNDS = {
    pop: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
    send: 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'
};

// Preloaded audio elements for zero latency
const audioCache = {
    pop: typeof Audio !== 'undefined' ? new Audio(SOUNDS.pop) : null,
    send: typeof Audio !== 'undefined' ? new Audio(SOUNDS.send) : null
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

const CHAT_RULES = [
    {
        category: 'greeting',
        keywords: ['hi', 'hello', 'hey', 'namaste', 'greeting', 'good morning', 'good afternoon', 'good evening', 'start', 'online', 'anybody', 'howdy'],
        response: "Hello! I am **Md Tanveer Alam AI Assistant**. I can answer any questions about his skills, projects, experience, and services. How can I help you today?"
    },
    {
        category: 'who',
        keywords: ['who', 'tanveer', 'bio', 'who are you', 'who is tanveer', 'about tanveer', 'introduce', 'yourself', 'your name', 'tell me about', 'developer name', 'what is your name'],
        response: "**Md Tanveer Alam** is a highly skilled **Full Stack Developer** specializing in the MERN stack, PHP, and Android App Development. He builds scalable, high-performance web applications and enterprise SaaS products."
    },
    {
        category: 'experience',
        keywords: ['experience', 'work', 'job', 'vinnpro', 'current', 'role', 'seniority', 'years', 'history', 'background', 'career', 'employment', 'company'],
        response: "Tanveer is currently working as a **Full Stack Developer** at **Vinnpro Web Solutions** (Ghaziabad). He handles complex enterprise applications, REST APIs, and database architecture using React, Node.js, and MongoDB."
    },
    {
        category: 'skills',
        keywords: ['skills', 'tech', 'stack', 'languages', 'programming', 'tools', 'database', 'frontend', 'backend', 'expertise', 'proficiency', 'technologies', 'frameworks'],
        response: "Tanveer technical arsenal includes:\n\n* **Frontend:** React.js, Tailwind CSS, JavaScript\n* **Backend:** Node.js, Express.js, PHP\n* **Databases:** MongoDB, MySQL\n* **Mobile & Cloud:** Web2APK Android Apps, Vercel, Render, Socket.io\n\nHe is well-equipped to handle end-to-end development!"
    },
    {
        category: 'projects',
        keywords: ['projects', 'portfolio', 'work', 'built', 'showcase', 'examples', 'past work', 'live', 'demo', 'safedrop', 'parkflow'],
        response: "Tanveer has built several impressive enterprise projects:\n\n* **ParkFlow SaaS:** Real-time parking management system.\n* **SafeDrop AI:** Smart luggage tracking & locker SaaS.\n* **Real Estate Elite:** Full-stack property platform.\n\nYou can click the **Projects** button in the chat or scroll down to see them all!"
    },
    {
        category: 'services',
        keywords: ['service', 'offer', 'build', 'website', 'app', 'development', 'developer', 'expert', 'solutions', 'software', 'management system', 'ecommerce', 'freelance'],
        response: "Tanveer provides premium development services:\n\n* **Custom Full Stack Web Apps**\n* **Enterprise SaaS & Management Systems**\n* **Real-Time Dashboards (Socket.io)**\n* **Website to Android APK Conversion**\n\nNeed a custom solution built? Let's discuss your requirements!"
    },
    {
        category: 'pricing',
        keywords: ['cost', 'price', 'pricing', 'budget', 'charge', 'money', 'rates', 'affordable', 'expensive', 'fee'],
        response: "Project costs vary depending on the scope, complexity, and features required. Tanveer offers highly competitive rates for premium quality work. Please provide your project details via the **Hire Tanveer** button for a custom quote!"
    },
    {
        category: 'education',
        keywords: ['education', 'degree', 'college', 'university', 'btech', 'study', 'qualification', 'graduated', 'cse', 'b.tech', 'school', 'marks', 'cgpa'],
        response: "Tanveer holds a **B.Tech in Computer Science Engineering** (2020-2024) from Bikaner Technical University. He also possesses an **A+ Certification in Full Stack Development** from AccioJob/Udemy."
    },
    {
        category: 'location',
        keywords: ['where', 'location', 'live', 'place', 'city', 'based', 'address', 'stay', 'ghaziabad', 'delhi', 'india', 'reside', 'home', 'uttar pradesh', 'remote', 'relocate'],
        response: "Tanveer is based in **Delhi/NCR, India**. He is fully equipped for **Remote Work** globally and is open to discussing relocation opportunities for the right full-time role."
    },
    {
        category: 'contact',
        keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'social', 'linkedin', 'github', 'talk', 'message', 'call', 'whatsapp', 'meet'],
        response: "You can reach him instantly via:\n\n* **Email:** tanveerdev14@gmail.com\n* **WhatsApp:** Click the floating green icon on the screen\n* **LinkedIn:** [Tanveer Profile](https://linkedin.com/in/md-tanveer-alam-b7a134219/)\n\nOr just use the form in the Contact section!"
    },
    {
        category: 'resume',
        keywords: ['resume', 'cv', 'download', 'pdf', 'document', 'curriculum vitae'],
        response: "You can download Tanveer latest professional resume by clicking the **Download Resume** button in our quick actions below, or by visiting the Hero section of this website!"
    },
    {
        category: 'ai',
        keywords: ['ai', 'chatbot', 'rag', 'openai', 'assistant', 'automation', 'pdf chat', 'gpt', 'llm', 'intelligence', 'artificial'],
        response: "Yes! Tanveer has experience building intelligent AI assistants and Chatbots (just like me!) using React, Node.js, and AI APIs to automate workflows and enhance user engagement."
    },
    {
        category: 'availability',
        keywords: ['hire', 'availability', 'fulltime', 'full-time', 'opportunity', 'job', 'vacancy', 'open to work', 'available', 'contract', 'recruit'],
        response: "Tanveer is currently **Open to New Opportunities**! Whether you need a dedicated Full-Time Engineer or a reliable Freelancer for a complex project, he is ready to deliver. Click **Hire Tanveer** to start the conversation."
    },
    {
        category: 'thanks',
        keywords: ['thank', 'thanks', 'cool', 'awesome', 'great', 'nice', 'ok', 'okay', 'perfect', 'bye', 'goodbye', 'amazing', 'wow'],
        response: "You're very welcome! Feel free to explore the portfolio, test out the live project links, or download the resume. Have a fantastic day! 🚀"
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
    { key: 'final', question: "Thank you! I've prepared a project summary. Tanveer will review this and get back to you shortly.\n\nI have also sent a confirmation email to your inbox.\n\n**Next Step:** You can also send a direct message via the [Contact Section](#contact)!" }
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
        const saved = getSafeSessionStorage('tanveer_chat_history');
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
                text: "Hi there! I'm Md Tanveer Alam **AI Assistant**. I'm here to help you learn more about his work and expertise. Ask me anything!",
                timestamp: new Date()
            }
        ];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [leadData, setLeadData] = useState(() => {
        const saved = getSafeSessionStorage('tanveer_chat_lead_data');
        if (saved) {
            try { 
                return JSON.parse(saved); 
            } catch (e) {
                console.warn("Failed to parse chatbot session storage:", e);
            }
        }
        return { step: -1, data: {} };
    });
    const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        setSafeSessionStorage('tanveer_chat_lead_data', JSON.stringify(leadData));
    }, [leadData]);
    const [isListening, setIsListening] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 300);
        } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }, [isOpen]);

    useEffect(() => {
        const timer = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 60000);
        return () => {
            clearInterval(timer);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    useEffect(() => {
        setSafeSessionStorage('tanveer_chat_history', JSON.stringify(messages));
    }, [messages]);

    const playSound = (type) => {
        if (!soundEnabled) return;
        try {
            const sound = audioCache[type];
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(() => {});
            }
        } catch (e) {
            console.error('Audio play error', e);
        }
    };

    const speakText = (text) => {
        if (!soundEnabled || !('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel();
            
            // Clean up markdown syntax for voice synthesis
            const cleanText = text
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/\* /g, '');
                
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            console.error('Speech synthesis error:', e);
        }
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

    const clearChat = () => {
        setMessages([{ id: Date.now(), type: 'bot', text: "Chat history cleared! I am **Md Tanveer Alam AI Assistant**. How can I help you today?", timestamp: new Date() }]);
        setLeadData({ step: -1, data: {} });
        playSound('pop');
    };

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

        // Get response immediately to calculate typing delay
        const botResponse = getBotResponse(text, messages);
        const responseLength = typeof botResponse === 'string' ? botResponse.length : 60;
        const typingDelay = 500 + Math.min(responseLength * 12, 2000); // Dynamic delay between 0.5s and 2.5s

        setTimeout(() => {
            playSound('pop');
            
            if (typeof botResponse === 'string') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: botResponse,
                    timestamp: new Date()
                }]);
                speakText(botResponse);
            } else if (botResponse.type === 'projects') {
                const msgText = "Here are some of Tanveer featured projects. These showcase his ability to build scalable and high-performance applications:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    content: projects.slice(0, 3)
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'skills') {
                const msgText = "Tanveer has expertise across the full stack. Click a category to explore his technical proficiency:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    isSkills: true
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'nav') {
                const section = botResponse.section;
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                const msgText = `Sure! I've scrolled you to the ${section} section. Let me know if you have any questions about it!`;
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: `Sure! I've scrolled you to the **${section}** section. Let me know if you have any questions about it!`,
                    timestamp: new Date()
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'lead') {
                setLeadData({ step: 0, data: {} });
                const msgText = LEAD_STEPS[0].question;
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date()
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'resume') {
                const msgText = "You can download Md Tanveer Alam professional resume to review his full career history and certifications:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    hasResume: true
                }]);
                speakText(msgText);
            }

            setIsTyping(false);
        }, typingDelay);
    };

    const processLeadStep = (text) => {
        const currentStep = leadData.step;
        const key = LEAD_STEPS[currentStep].key;

        // Cancel command
        if (text.toLowerCase() === 'cancel' || text.toLowerCase() === 'stop') {
            setLeadData({ step: -1, data: {} });
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'bot',
                text: "No problem! I've cancelled the form. What else can I help you with?",
                timestamp: new Date()
            }]);
            setIsTyping(false);
            return;
        }

        // Email validation
        if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            setTimeout(() => {
                playSound('pop');
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: "That doesn't look like a valid email address. Could you please provide a valid one? (or type 'cancel' to stop)",
                    timestamp: new Date()
                }]);
                setIsTyping(false);
            }, 800);
            return;
        }

        const newData = { ...leadData.data, [key]: text };

        setTimeout(() => {
            playSound('pop');
            if (currentStep < LEAD_STEPS.length - 2) {
                const nextStep = currentStep + 1;
                setLeadData({ step: nextStep, data: newData });
                const nextQuestion = LEAD_STEPS[nextStep].question;
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: nextQuestion,
                    timestamp: new Date()
                }]);
                speakText(nextQuestion);
            } else {
                setLeadData({ step: -1, data: newData });
                sendLeadEmail(newData);
                const finalQuestion = LEAD_STEPS[LEAD_STEPS.length - 1].question;
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: finalQuestion,
                    timestamp: new Date(),
                    leadSummary: newData
                }]);
                speakText(finalQuestion);
            }
            setIsTyping(false);
        }, 800);
    };

    const sendLeadEmail = (data) => {
        const templateParams = {
            name: data.name,
            email: data.email,
            subject: 'ChatBot Lead - New Project Inquiry',
            message: `Project Details: ${data.project}`,
            from_name: data.name,
            from_email: data.email,
            reply_to: data.email,
            to_name: 'Md Tanveer Alam'
        };

        const toastId = toast.loading('Sending your inquiry...');

        // 1. Send Lead Notification to Tanveer
        emailjs.send(
            SERVICE_ID, 
            TEMPLATE_ID, 
            templateParams, 
            PUBLIC_KEY
        ).then(() => {
            toast.success('Inquiry sent successfully!', { id: toastId });
            console.log('Lead notification sent');
        }).catch((err) => {
            toast.error('Failed to send inquiry. Please try the contact form instead.', { id: toastId });
            console.error('Lead notification failed', err);
        });

        // 2. Send Auto-Reply to User
        emailjs.send(
            SERVICE_ID, 
            AUTOREPLY_TEMPLATE_ID, 
            {
                name: data.name,
                email: data.email,
                subject: 'ChatBot Inquiry',
                message: `Project Details: ${data.project}`,
                from_name: 'Md Tanveer Alam',
                reply_to: 'tanveerdev14@gmail.com'
            }, 
            PUBLIC_KEY
        ).catch((err) => {
            console.error('Auto-reply failed', err);
        });
    };

    const getBotResponse = (input, currentMessages) => {
        const normalizedInput = input.toLowerCase().trim().replace(/[?.,!]/g, '');

        // Context Awareness: Check if user is saying 'yes' to a previous bot question
        const isAffirmative = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'of course', 'show me', 'please'].includes(normalizedInput);
        if (isAffirmative && currentMessages && currentMessages.length > 0) {
            const lastBotMsg = currentMessages.slice().reverse().find(m => m.type === 'bot')?.text?.toLowerCase() || '';
            if (lastBotMsg.includes('project')) return { type: 'projects' };
            if (lastBotMsg.includes('skill')) return { type: 'skills' };
            if (lastBotMsg.includes('hire') || lastBotMsg.includes('contact')) return { type: 'lead' };
        }

        // 1. Check for specific high-priority intents first
        if (normalizedInput.includes('resume') || normalizedInput.includes('cv') || normalizedInput.includes('download')) return { type: 'resume' };
        if ((normalizedInput.includes('hire') || normalizedInput.includes('vacancy') || normalizedInput.includes('opportunity')) && !normalizedInput.includes('experience')) return { type: 'lead' };
        if (normalizedInput.includes('project') || normalizedInput.includes('showcase') || normalizedInput.includes('portfolio') || normalizedInput.includes('demo')) return { type: 'projects' };

        // Check if query is about a specific skill category (Frontend, Backend, etc.)
        for (const cat of skillCategories) {
            const catTitle = cat.title.toLowerCase();
            if (
                normalizedInput.includes(catTitle) || 
                (normalizedInput.includes('frontend') && catTitle.includes('frontend')) || 
                (normalizedInput.includes('backend') && catTitle.includes('backend')) || 
                (normalizedInput.includes('tools') && catTitle.includes('tools')) || 
                (normalizedInput.includes('cloud') && catTitle.includes('cloud'))
            ) {
                const skillList = cat.skills.map(s => `* **${s.name}**`).join('\n');
                return `Here are Tanveer **${cat.title}** skills:\n\n${skillList}\n\nWould you like to know about his projects built with these?`;
            }
        }

        if (normalizedInput.includes('skill') && !normalizedInput.includes('about')) return { type: 'skills' };

        // 2. Navigation Intent
        const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
        for (const s of sections) {
            if (normalizedInput.includes(`go to ${s}`) || normalizedInput.includes(`show ${s}`) || normalizedInput.includes(`scroll to ${s}`)) {
                return { type: 'nav', section: s };
            }
        }

        // Tokenize user input to match word boundaries
        const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 0);

        // 3. Rule-based Scoring System
        let bestMatch = null;
        let highestScore = 0;

        for (const rule of CHAT_RULES) {
            let score = 0;
            for (const keyword of rule.keywords) {
                const lowerKeyword = keyword.toLowerCase();
                if (lowerKeyword.includes(' ')) {
                    // Phrase match
                    if (normalizedInput.includes(lowerKeyword)) {
                        score += 5;
                    }
                } else {
                    // Token-based word match
                    for (const word of inputWords) {
                        if (word === lowerKeyword) {
                            score += 3; // Perfect word boundary match
                        } else if (word.length > 3 && (word.startsWith(lowerKeyword) || lowerKeyword.startsWith(word))) {
                            score += 1.5; // Fuzzy prefix/partial match for longer words
                        }
                    }
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
        if (normalizedInput.length > 3) {
            return "I'm still learning to answer that specific question! However, I can tell you about Tanveer **skills**, **projects**, **education**, or **how to contact him**. Which would you prefer?";
        }
        
        return "I'm not sure I caught that. Could you please rephrase your question? You can ask about my **experience**, **services**, or **projects**.";
    };

    const toggleListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };
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
                    const isInternal = urlMatch[1].startsWith('#');
                    return (
                        <a 
                            key={index} 
                            href={urlMatch[1]} 
                            target={isInternal ? "_self" : "_blank"} 
                            rel={isInternal ? undefined : "noopener noreferrer"} 
                            onClick={() => {
                                if (isInternal) {
                                    setIsOpen(false);
                                }
                            }}
                            className="text-accent underline decoration-accent/30 hover:decoration-accent transition-all inline-flex items-center gap-1 font-medium"
                        >
                            {labelMatch[1]} {!isInternal && <ExternalLink size={10} />}
                        </a>
                    );
                }
            }
            return part;
        });
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] sm:hidden pointer-events-auto"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-end pointer-events-none">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:absolute sm:bottom-full sm:right-0 sm:mb-4 w-full sm:w-[420px] h-[85dvh] sm:h-[min(calc(100dvh-12rem),700px)] glass-card rounded-t-[2rem] sm:rounded-2xl border-t sm:border border-primary/30 flex flex-col overflow-hidden shadow-[0_-10px_50px_rgba(0,0,0,0.5)] pointer-events-auto"
                        >
                        {/* Premium Header */}
                        <div className="p-4 xs:p-5 bg-gradient-to-r from-primary via-fuchsia-600 to-accent text-white flex items-center justify-between shadow-lg relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner overflow-hidden">
                                        <img src="./about_avatar.jpeg" alt="Md Tanveer Alam" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 xs:w-4 xs:h-4 bg-emerald-400 border-2 border-primary rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm xs:text-base leading-none tracking-tight">Md Tanveer Alam</h3>
                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            <Clock size={10} /> {localTime}
                                        </p>
                                        <p className="text-[9px] font-bold text-emerald-300 uppercase tracking-[0.1em] flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 size={10} /> Online
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5 xs:gap-1">
                                <button onClick={clearChat} className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-90 text-white/80" title="Clear chat history" aria-label="Clear chat">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-90 text-white/80" title={soundEnabled ? 'Mute sound' : 'Enable sound'} aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}>
                                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-90" aria-label="Close chat">
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
                                                <a href="./resume.pdf" download="Md_Tanveer_Alam_Resume.pdf" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                                    <Download size={14} /> Download Resume
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
                                                                {project.live ? (
                                                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-primary/10 text-primary rounded-lg font-bold text-[10px] hover:bg-primary hover:text-white transition-all">
                                                                        Live <ExternalLink size={10} />
                                                                    </a>
                                                                ) : (
                                                                    <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-black/[0.03] dark:bg-white/[0.03] text-muted-foreground rounded-lg font-bold text-[10px] border border-border/30">
                                                                        Soon
                                                                    </div>
                                                                )}
                                                                {project.github ? (
                                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-foreground rounded-lg font-bold text-[10px] hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
                                                                        Code <ArrowRight size={10} />
                                                                    </a>
                                                                ) : null}
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
                            {leadData.step !== -1 ? (
                                <button onClick={() => { setLeadData({ step: -1, data: {} }); setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: 'Inquiry cancelled. How else can I assist you?', timestamp: new Date() }]); playSound('pop'); speakText('Inquiry cancelled.'); }} className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 whitespace-nowrap shadow-sm active:scale-95">
                                    <X size={13} /> Cancel Inquiry
                                </button>
                            ) : QUICK_ACTIONS.map((action, i) => (
                                <button key={i} onClick={() => handleSendMessage(action.value)} className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-border bg-background hover:border-primary hover:text-primary transition-all flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95">
                                    <action.icon size={13} /> {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <div className="p-3 xs:p-4 sm:p-5 border-t border-border bg-background/80 backdrop-blur-xl">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex items-center gap-2">
                                <button type="button" onClick={toggleListening} className={cn("p-2.5 rounded-xl transition-all", isListening ? "bg-red-500 text-white animate-pulse" : "bg-muted/50 text-muted-foreground hover:bg-muted")} aria-label={isListening ? 'Stop listening' : 'Start voice input'}>
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                                <div className="relative flex-1 group">
                                    <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={leadData.step !== -1 ? "Type your answer..." : "Ask me anything..."} className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10" aria-label="Chat message input" />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none group-focus-within:text-primary/30 transition-colors"><ArrowRight size={16} /></div>
                                </div>
                                <button type="submit" disabled={!inputValue.trim()} className="p-3.5 rounded-xl bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-90 flex-shrink-0" aria-label="Send message">
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
                        <motion.div initial={{ opacity: 0, x: 20, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.8 }} className="absolute bottom-[110%] right-0 mb-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-neutral-900 text-white text-[10px] sm:text-xs font-bold whitespace-nowrap shadow-2xl flex items-center gap-2 border border-white/10">
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
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (isOpen) {
                            setIsOpen(false);
                            playSound('pop');
                        } else {
                            setIsOpen(true);
                            setShowTooltip(false);
                            playSound('pop');
                        }
                    }}
                    aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
                    className={cn(
                        "w-14 h-14 sm:w-16 sm:h-16 rounded-[1.75rem] sm:rounded-[2rem] items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-500 relative overflow-hidden group border-2 border-white/20 bg-primary",
                        isOpen ? "hidden sm:flex" : "flex"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="relative flex items-center justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center justify-center"
                                >
                                    <X size={28} className="sm:w-8 sm:h-8" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center justify-center"
                                >
                                    <MessageSquare size={24} className="sm:w-7 sm:h-7" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-primary rounded-full animate-pulse" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.button>
            </div>
        </div>

        {/* WhatsApp Floating Button — Bottom Left */}
        <AnimatePresence>
            {!isOpen && (
                <motion.a
                    href="https://wa.me/917482946610?text=Hi%20Tanveer!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    transition={{ delay: 2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Chat on WhatsApp"
                    className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-shadow duration-300 group"
                >
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </motion.a>
            )}
        </AnimatePresence>
        </>
    );
};

export default ChatBot;
