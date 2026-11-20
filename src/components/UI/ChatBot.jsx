import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles, ExternalLink, ArrowRight, Download, Briefcase, Clock, CheckCircle2, Mic, MicOff, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '../../utils/cn';
import { projects, skillCategories } from '../../utils/constants';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_a1t9llr';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_z822koe';
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_v7g26yn';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'awlLONry0frHvucq0';

if (PUBLIC_KEY) {
    try {
        emailjs.init(PUBLIC_KEY);
    } catch (e) {
        // Fallback silently
    }
}

// Web Audio API synthesizer for zero latency & offline capability
const playSynthesizedSound = (type) => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const now = ctx.currentTime;
        if (type === 'pop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'send') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.06);
            gain.gain.setValueAtTime(0.10, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now);
            osc.stop(now + 0.06);
        }
    } catch (e) {
        // Fallback silently
    }
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
        keywords: [
            'hi', 'hello', 'hey', 'namaste', 'greeting', 'good morning', 'good afternoon', 'good evening',
            'start', 'online', 'anybody', 'howdy', 'kaise ho', 'kya hal hai', 'kya haal hai', 'suno',
            'bhai', 'helo', 'namaskar', 'halo', 'salaam', 'kaisa hai', 'sun'
        ],
        response: "Hello! I am **Md Tanveer Alam AI Assistant**. I can answer any questions about his skills, enterprise projects, experience, and services. How can I help you today? / Aap mujhse Tanveer ke baare me kuch bhi pooch sakte hain!",
        suggestions: ['View Projects', 'What are your skills?', 'Hire Tanveer', 'Chat on WhatsApp']
    },
    {
        category: 'who',
        keywords: [
            'who', 'tanveer', 'bio', 'who are you', 'who is tanveer', 'about tanveer', 'introduce',
            'yourself', 'your name', 'tell me about', 'developer name', 'what is your name',
            'kaun ho', 'tum kaun ho', 'tanveer kaun hai', 'koun ho', 'kiske baare me', 'intro', 'parichay', 'kaun'
        ],
        response: "**Md Tanveer Alam** is a highly skilled **Full Stack Developer** specializing in the MERN stack, PHP, WordPress/Elementor, and Android App Development. He builds scalable, high-performance web applications and enterprise SaaS products like vGrow CRM & SafeDrop AI.",
        suggestions: ['What are your skills?', 'View Projects', 'Download Resume', 'Hire Tanveer']
    },
    {
        category: 'experience',
        keywords: [
            'experience', 'work', 'job', 'vinnpro', 'current', 'role', 'seniority', 'years', 'history',
            'background', 'career', 'employment', 'company', 'kaha kaam karte ho', 'kaha kaam krte ho',
            'kitna experience hai', 'kya job karte ho', 'work experience', 'company name', 'anubhav'
        ],
        response: "Tanveer is currently working as a **Full Stack Developer & WordPress Developer** at **VinnPro Web Solutions** (Ghaziabad). He handles complex enterprise applications, REST APIs, dynamic WordPress themes/plugins, and database architecture using React, Node.js, and MySQL.",
        suggestions: ['What are your skills?', 'View Projects', 'Download Resume']
    },
    {
        category: 'skills',
        keywords: [
            'skills', 'tech', 'stack', 'languages', 'programming', 'tools', 'database', 'frontend',
            'backend', 'expertise', 'proficiency', 'technologies', 'frameworks', 'wordpress', 'elementor',
            'kya aata hai', 'kya skills hai', 'konsi language', 'kya jante ho', 'technology', 'tech stack', 'hunaar'
        ],
        response: "Tanveer's technical arsenal includes:\n\n* **Frontend:** React.js, Tailwind CSS, JavaScript, WordPress, Elementor\n* **Backend:** Node.js, Express.js, PHP, REST APIs\n* **Databases:** MongoDB, MySQL, Prisma\n* **Mobile & Cloud:** Web2APK Android Apps, Vercel, Render, Socket.io\n\nHe is well-equipped to handle end-to-end development!",
        suggestions: ['Show React Projects', 'Show SaaS Projects', 'Download Resume', 'Hire Tanveer']
    },
    {
        category: 'projects',
        keywords: [
            'projects', 'portfolio', 'work', 'built', 'showcase', 'examples', 'past work', 'live',
            'demo', 'safedrop', 'parkflow', 'crm', 'vgrow', 'project dikhao', 'kya banaya hai',
            'kaam dikhao', 'demo dikhao', 'live link', 'apps', 'project'
        ],
        response: "Tanveer has built several impressive enterprise projects:\n\n* **vGrow CRM:** Multi-tenant enterprise CRM SaaS with AI Copilot & RBAC/ABAC.\n* **ParkFlow SaaS:** Real-time parking management system with Socket.io & Android APK.\n* **SafeDrop AI:** Smart luggage tracking & locker SaaS.\n* **Real Estate Elite:** Full-stack property platform with JWT auth.\n\nCheck out the interactive cards below with live links!",
        suggestions: ['Show SaaS Projects', 'Show React Projects', 'Hire Tanveer', 'Chat on WhatsApp']
    },
    {
        category: 'services',
        keywords: [
            'service', 'offer', 'build', 'website', 'app', 'development', 'developer', 'expert',
            'solutions', 'software', 'management system', 'ecommerce', 'freelance', 'wordpress', 'elementor',
            'kya bana sakte ho', 'kya kaam karte ho', 'kya service dete ho', 'website banwana hai', 'app banwana hai', 'software banwana hai', 'service'
        ],
        response: "Tanveer provides premium development services:\n\n* **Custom Full Stack Web Apps**\n* **WordPress & Elementor Dynamic Websites**\n* **Enterprise SaaS & Management Systems**\n* **Real-Time Dashboards (Socket.io)**\n* **Website to Android APK Conversion**\n\nNeed a custom solution built? Let's discuss your requirements!",
        suggestions: ['Hire Tanveer', 'View Projects', 'Chat on WhatsApp']
    },
    {
        category: 'pricing',
        keywords: [
            'cost', 'price', 'pricing', 'budget', 'charge', 'money', 'rates', 'affordable', 'expensive',
            'fee', 'kitna charge', 'kitna paisa', 'kitna kharcha', 'kya rate hai', 'rate list', 'quotation',
            'fees', 'kitne me banega', 'charges', 'paisa'
        ],
        response: "Project costs vary depending on the scope, complexity, and features required. Tanveer offers highly competitive rates for premium quality work.\n\nClick **Hire Tanveer** below to submit your project requirements, or connect directly on WhatsApp for an instant custom quote!",
        hasWhatsApp: true,
        suggestions: ['Hire Tanveer', 'Chat on WhatsApp', 'View Projects']
    },
    {
        category: 'education',
        keywords: [
            'education', 'degree', 'college', 'university', 'btech', 'study', 'qualification', 'graduated',
            'cse', 'b.tech', 'school', 'marks', 'cgpa', 'padhai', 'kaha se padhe ho', 'degree kya hai', 'college name', 'shiksha'
        ],
        response: "Tanveer holds a **B.Tech in Computer Science Engineering** (2020-2024) from Bikaner Technical University. He also possesses an **A+ Certification in Full Stack Development** from AccioJob/Udemy.",
        suggestions: ['What are your skills?', 'Experience', 'Download Resume']
    },
    {
        category: 'location',
        keywords: [
            'where', 'location', 'live', 'place', 'city', 'based', 'address', 'stay', 'ghaziabad',
            'delhi', 'india', 'reside', 'home', 'uttar pradesh', 'remote', 'relocate', 'kaha rehte ho',
            'ghar kaha hai', 'kaha ke ho', 'location kya hai', 'pata'
        ],
        response: "Tanveer is based in **Delhi/NCR (Ghaziabad), India**. He is fully equipped for **Remote Work** globally and is open to discussing freelance and contract opportunities.",
        suggestions: ['Hire Tanveer', 'Chat on WhatsApp', 'View Projects']
    },
    {
        category: 'contact',
        keywords: [
            'contact', 'email', 'phone', 'reach', 'connect', 'social', 'linkedin', 'github', 'talk',
            'message', 'call', 'whatsapp', 'meet', 'baat karni hai', 'number do', 'phone number',
            'contact kaise kare', 'call karo', 'whatsapp number', 'sampark', 'baat', 'call me'
        ],
        response: "You can reach Tanveer instantly via:\n\n* **WhatsApp:** +91 7482946610 (Direct instant reply)\n* **Email:** tanveerdev14@gmail.com\n* **LinkedIn:** [Tanveer Profile](https://linkedin.com/in/md-tanveer-alam-b7a134219/)\n\nClick the button below to message him directly on WhatsApp!",
        hasWhatsApp: true,
        suggestions: ['Chat on WhatsApp', 'Hire Tanveer', 'Download Resume']
    },
    {
        category: 'resume',
        keywords: [
            'resume', 'cv', 'download', 'pdf', 'document', 'curriculum vitae', 'resume chahiye',
            'cv download', 'cv do', 'resume do'
        ],
        response: "You can download Tanveer's professional resume to review his full career history, technical stack, and certifications:",
        suggestions: ['Hire Tanveer', 'View Projects', 'Chat on WhatsApp']
    },
    {
        category: 'ai',
        keywords: [
            'ai', 'chatbot', 'rag', 'openai', 'assistant', 'automation', 'pdf chat', 'gpt', 'llm',
            'intelligence', 'artificial'
        ],
        response: "Yes! Tanveer has extensive experience building intelligent AI assistants, Chatbots (just like me!), and AI Copilots (integrated inside vGrow CRM and SafeDrop AI) using React, Node.js, and modern AI APIs.",
        suggestions: ['Show SaaS Projects', 'What are your skills?', 'Hire Tanveer']
    },
    {
        category: 'availability',
        keywords: [
            'hire', 'availability', 'opportunity', 'job', 'vacancy', 'open to work', 'available',
            'contract', 'freelance', 'recruit', 'hire karna hai', 'kaam karwana hai', 'freelancer chahiye', 'developer chahiye'
        ],
        response: "Tanveer is currently **Open to New Opportunities**! Whether you need a dedicated Freelance Engineer or a skilled developer for a complex SaaS project, he is ready to deliver. Click **Hire Tanveer** to open the quick inquiry card.",
        suggestions: ['Hire Tanveer', 'Chat on WhatsApp', 'View Projects', 'Download Resume']
    },
    {
        category: 'thanks',
        keywords: [
            'thank', 'thanks', 'cool', 'awesome', 'great', 'nice', 'ok', 'okay', 'perfect', 'bye',
            'goodbye', 'amazing', 'wow', 'dhanyawad', 'shukriya', 'theek hai', 'thik hai', 'accha hai', 'badhiya'
        ],
        response: "You're very welcome! Feel free to explore the portfolio, test out the live project links, or download the resume. Have a fantastic day! 🚀",
        suggestions: ['View Projects', 'Hire Tanveer', 'Chat on WhatsApp']
    }
];

const QUICK_ACTIONS = [
    { label: 'View Projects', icon: Briefcase, value: 'Show me your projects' },
    { label: 'Skills', icon: Sparkles, value: 'What are your skills?' },
    { label: 'Hire Tanveer', icon: User, value: 'I want to hire Tanveer' },
    { label: 'WhatsApp', icon: FaWhatsapp, value: 'I want to chat on WhatsApp' },
    { label: 'Resume', icon: Download, value: 'Download resume' },
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
                text: "Hi there! I'm Md Tanveer Alam **AI Assistant**. I'm here to help you learn more about his work, enterprise projects, and expertise. Ask me anything or choose a quick topic below!",
                timestamp: new Date(),
                suggestions: ['View Projects', 'What are your skills?', 'Hire Tanveer', 'Chat on WhatsApp']
            }
        ];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
        playSynthesizedSound(type);
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
        setMessages([{ 
            id: Date.now(), 
            type: 'bot', 
            text: "Chat history cleared! I am **Md Tanveer Alam AI Assistant**. How can I help you today?", 
            timestamp: new Date(),
            suggestions: ['View Projects', 'What are your skills?', 'Hire Tanveer', 'Chat on WhatsApp']
        }]);
        playSound('pop');
    };

    const sendLeadEmail = async (data) => {
        const templateParams = {
            name: data.name,
            email: data.email,
            phone: data.phone || 'Not provided',
            project_type: data.projectType || 'General',
            subject: `ChatBot Lead - ${data.projectType || 'New Project Inquiry'}`,
            message: `Project Type: ${data.projectType || 'General'}\nPhone/WhatsApp: ${data.phone || 'Not provided'}\nDetails: ${data.details || 'N/A'}`,
            from_name: data.name,
            from_email: data.email,
            reply_to: data.email,
            to_name: 'Md Tanveer Alam',
            to_email: 'tanveerdev14@gmail.com'
        };

        const toastId = toast.loading('Sending your project inquiry...');

        try {
            // 1. Send Lead Notification to Tanveer
            await emailjs.send(
                SERVICE_ID, 
                TEMPLATE_ID, 
                templateParams, 
                PUBLIC_KEY
            );
            toast.success('Inquiry sent successfully! Tanveer will reach out soon.', { id: toastId });

            // 2. Send Auto-Reply to User
            if (AUTOREPLY_TEMPLATE_ID) {
                try {
                    await emailjs.send(
                        SERVICE_ID, 
                        AUTOREPLY_TEMPLATE_ID, 
                        {
                            name: data.name,
                            email: data.email,
                            to_email: data.email,
                            recipient_email: data.email,
                            subject: `Project Inquiry Received - Md Tanveer Alam`,
                            message: `Thank you for reaching out regarding your ${data.projectType || 'project'}. I have received your request and will get back to you shortly.`,
                            project_type: data.projectType || 'General',
                            phone: data.phone || 'Not provided',
                            from_name: 'Md Tanveer Alam',
                            reply_to: 'tanveerdev14@gmail.com'
                        }, 
                        PUBLIC_KEY
                    );
                } catch (autoErr) {
                    console.warn('ChatBot Auto-reply warning:', autoErr);
                }
            }
            return true;
        } catch (err) {
            toast.error('Could not send email automatically. Please use the WhatsApp button below!', { id: toastId });
            console.error('Lead notification failed', err);
            return false;
        }
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

        // Get response immediately to calculate typing delay
        const botResponse = getBotResponse(text, messages);
        const responseText = typeof botResponse === 'string' ? botResponse : (botResponse.text || botResponse.title || '');
        const responseLength = responseText.length || 60;
        const typingDelay = 400 + Math.min(responseLength * 10, 1800);

        setTimeout(() => {
            playSound('pop');
            
            if (typeof botResponse === 'string') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: botResponse,
                    timestamp: new Date(),
                    suggestions: ['View Projects', 'What are your skills?', 'Hire Tanveer', 'Chat on WhatsApp']
                }]);
                speakText(botResponse);
            } else if (botResponse.type === 'text') {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: botResponse.text,
                    timestamp: new Date(),
                    hasWhatsApp: botResponse.hasWhatsApp,
                    suggestions: botResponse.suggestions
                }]);
                speakText(botResponse.text);
            } else if (botResponse.type === 'lead_form') {
                const msgText = "Great! Tanveer is currently available for freelance projects, SaaS architecture, and full-stack contracts. Fill out this quick 15-second inquiry card below, or reach out directly on WhatsApp:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    isLeadForm: true,
                    suggestions: ['Chat on WhatsApp', 'View Projects', 'Download Resume']
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'projects') {
                const msgText = botResponse.title || "Here are some of Tanveer's featured projects. These showcase his ability to build scalable and high-performance applications:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    content: botResponse.items || projects.slice(0, 3),
                    suggestions: botResponse.suggestions || ['Show SaaS Projects', 'Show React Projects', 'Hire Tanveer', 'Chat on WhatsApp']
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'skills') {
                const msgText = botResponse.text || "Tanveer has expertise across the full stack. Click a category to explore his technical proficiency:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    isSkills: true,
                    suggestions: botResponse.suggestions || ['Show React Projects', 'Show SaaS Projects', 'Download Resume', 'Hire Tanveer']
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'nav') {
                const section = botResponse.section;
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                const msgText = `Sure! I've scrolled you to the **${section}** section. Let me know if you have any questions about it!`;
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    suggestions: ['View Projects', 'What are your skills?', 'Hire Tanveer']
                }]);
                speakText(msgText);
            } else if (botResponse.type === 'resume') {
                const msgText = "You can download Md Tanveer Alam professional resume to review his full career history and certifications:";
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: msgText,
                    timestamp: new Date(),
                    hasResume: true,
                    suggestions: botResponse.suggestions || ['Hire Tanveer', 'View Projects', 'Chat on WhatsApp']
                }]);
                speakText(msgText);
            }

            setIsTyping(false);
        }, typingDelay);
    };

    const getBotResponse = (input, currentMessages) => {
        const normalizedInput = input.toLowerCase().trim().replace(/[?.,!]/g, '');

        // Context Awareness: Check if user is saying 'yes' / 'haan' to a previous bot question
        const isAffirmative = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'of course', 'show me', 'please', 'haan', 'dikhao', 'batao'].includes(normalizedInput);
        if (isAffirmative && currentMessages && currentMessages.length > 0) {
            const lastBotMsg = currentMessages.slice().reverse().find(m => m.type === 'bot')?.text?.toLowerCase() || '';
            if (lastBotMsg.includes('project')) {
                return { 
                    type: 'projects',
                    title: "Here are Tanveer's featured enterprise projects with live links:",
                    items: projects.slice(0, 3),
                    suggestions: ['Show SaaS Projects', 'Show React Projects', 'Hire Tanveer', 'Chat on WhatsApp']
                };
            }
            if (lastBotMsg.includes('skill')) {
                return { 
                    type: 'skills',
                    suggestions: ['Show React Projects', 'Show SaaS Projects', 'Download Resume', 'Hire Tanveer']
                };
            }
            if (lastBotMsg.includes('hire') || lastBotMsg.includes('contact')) return { type: 'lead_form' };
        }

        // Direct WhatsApp intent
        if (
            normalizedInput.includes('whatsapp') || 
            normalizedInput.includes('wa.me') || 
            normalizedInput.includes('phone') || 
            normalizedInput.includes('number do') || 
            normalizedInput.includes('call') ||
            normalizedInput.includes('baat karni')
        ) {
            return {
                type: 'text',
                text: "You can reach Tanveer directly on **WhatsApp** for instant project discussions, quotes, or fast coordination! 💬\n\n* **WhatsApp Number:** +91 7482946610\n* **Email:** tanveerdev14@gmail.com\n\nClick the button below to start a chat right away:",
                hasWhatsApp: true,
                suggestions: ['Hire Tanveer', 'View Projects', 'Download Resume']
            };
        }

        // 1. High-priority intents
        if (normalizedInput.includes('resume') || normalizedInput.includes('cv') || normalizedInput.includes('download')) {
            return { 
                type: 'resume',
                suggestions: ['Hire Tanveer', 'View Projects', 'Chat on WhatsApp']
            };
        }
        
        // Lead / Hire Intent -> Triggers the Inline Interactive Form!
        if (
            (normalizedInput.includes('hire') || 
             normalizedInput.includes('vacancy') || 
             normalizedInput.includes('opportunity') || 
             normalizedInput.includes('kaam karwana') || 
             normalizedInput.includes('freelancer chahiye') ||
             normalizedInput.includes('project banwana') ||
             normalizedInput.includes('website banwani') ||
             normalizedInput.includes('app banwani')) && 
            !normalizedInput.includes('experience')
        ) {
            return { type: 'lead_form' };
        }

        // Tech-Specific Smart Project Filtering
        if (normalizedInput.includes('react') && (normalizedInput.includes('project') || normalizedInput.includes('work') || normalizedInput.includes('dikhao') || normalizedInput.includes('demo'))) {
            const reactProjects = projects.filter(p => p.tags.some(t => t.toLowerCase().includes('react')));
            return {
                type: 'projects',
                title: "Here are Tanveer's featured **React.js** projects with live interactive demos & source code:",
                items: reactProjects.slice(0, 3),
                suggestions: ['Show SaaS Projects', 'What are your skills?', 'Hire Tanveer']
            };
        }

        if (
            (normalizedInput.includes('saas') || normalizedInput.includes('crm') || normalizedInput.includes('vgrow') || normalizedInput.includes('parkflow') || normalizedInput.includes('safedrop')) && 
            !normalizedInput.includes('hire')
        ) {
            const saasProjects = projects.filter(p => 
                p.title.toLowerCase().includes('saas') || 
                p.title.toLowerCase().includes('crm') || 
                p.title.toLowerCase().includes('safedrop') || 
                p.title.toLowerCase().includes('parkflow') || 
                p.title.toLowerCase().includes('vgrow')
            );
            return {
                type: 'projects',
                title: "Here are Tanveer's production-grade **Enterprise SaaS & Management Platforms** (featuring real-time Socket.io, multi-tenancy, and AI Copilot):",
                items: saasProjects.slice(0, 3),
                suggestions: ['Tell me about vGrow CRM', 'Chat on WhatsApp', 'Hire Tanveer']
            };
        }

        if (normalizedInput.includes('node') && (normalizedInput.includes('project') || normalizedInput.includes('backend') || normalizedInput.includes('api'))) {
            const nodeProjects = projects.filter(p => p.tags.some(t => t.toLowerCase().includes('node') || t.toLowerCase().includes('express')));
            return {
                type: 'projects',
                title: "Here are Tanveer's **Node.js & Backend Architecture** projects:",
                items: nodeProjects.slice(0, 3),
                suggestions: ['Show SaaS Projects', 'What are your skills?', 'Hire Tanveer']
            };
        }

        if (normalizedInput.includes('frontend') && (normalizedInput.includes('project') || normalizedInput.includes('work'))) {
            const feProjects = projects.filter(p => p.category === 'frontend' || p.tags.includes('Tailwind') || p.tags.includes('React'));
            return {
                type: 'projects',
                title: "Here are Tanveer's modern **Frontend & UI/UX** projects:",
                items: feProjects.slice(0, 3),
                suggestions: ['Show SaaS Projects', 'What are your skills?', 'Hire Tanveer']
            };
        }

        if (
            normalizedInput.includes('project') || 
            normalizedInput.includes('showcase') || 
            normalizedInput.includes('portfolio') || 
            normalizedInput.includes('demo') ||
            normalizedInput.includes('kaam dikhao') ||
            normalizedInput.includes('project dikhao')
        ) {
            return { 
                type: 'projects',
                title: "Here are some of Tanveer's top enterprise & full-stack projects with live deployments:",
                items: projects.slice(0, 3),
                suggestions: ['Show SaaS Projects', 'Show React Projects', 'Hire Tanveer', 'Chat on WhatsApp']
            };
        }

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
                return {
                    type: 'text',
                    text: `Here are Tanveer **${cat.title}** skills:\n\n${skillList}\n\nWould you like to know about his projects built with these?`,
                    suggestions: [`Show ${cat.title.split(' ')[0]} Projects`, 'Download Resume', 'Hire Tanveer']
                };
            }
        }

        if (normalizedInput.includes('skill') && !normalizedInput.includes('about')) {
            return { 
                type: 'skills',
                suggestions: ['Show React Projects', 'Show SaaS Projects', 'Download Resume', 'Hire Tanveer']
            };
        }

        // 2. Navigation Intent
        const sections = ['home', 'about', 'services', 'experience', 'skills', 'projects', 'education', 'contact'];
        for (const s of sections) {
            if (
                normalizedInput.includes(`go to ${s}`) || 
                normalizedInput.includes(`show ${s}`) || 
                normalizedInput.includes(`scroll to ${s}`) ||
                normalizedInput.includes(`${s} pe jao`) ||
                normalizedInput.includes(`${s} dikhao`)
            ) {
                return { type: 'nav', section: s };
            }
        }

        // Tokenize user input to match word boundaries
        const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 0);

        // 3. Rule-based Scoring System with Hinglish support
        let bestMatch = null;
        let highestScore = 0;

        for (const rule of CHAT_RULES) {
            let score = 0;
            for (const keyword of rule.keywords) {
                const lowerKeyword = keyword.toLowerCase();
                if (lowerKeyword.includes(' ')) {
                    if (normalizedInput.includes(lowerKeyword)) {
                        score += 5;
                    }
                } else {
                    for (const word of inputWords) {
                        if (word === lowerKeyword) {
                            score += 3;
                        } else if (word.length > 3 && (word.startsWith(lowerKeyword) || lowerKeyword.startsWith(word))) {
                            score += 1.5;
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
            return {
                type: 'text',
                text: bestMatch.response,
                hasWhatsApp: bestMatch.hasWhatsApp || false,
                suggestions: bestMatch.suggestions || ['View Projects', 'What are your skills?', 'Hire Tanveer']
            };
        }
        
        // 4. Fallback with context
        if (normalizedInput.length > 3) {
            return {
                type: 'text',
                text: "I'm still learning to answer that specific question! However, I can tell you about Tanveer's **skills**, **enterprise projects**, **education**, or **how to contact him**. Which would you prefer?",
                suggestions: ['View Projects', 'What are your skills?', 'Chat on WhatsApp', 'Hire Tanveer']
            };
        }
        
        return {
            type: 'text',
            text: "I'm not sure I caught that. Could you please rephrase your question? You can ask about his **skills**, **projects**, or **services**.",
            suggestions: ['View Projects', 'What are your skills?', 'Chat on WhatsApp']
        };
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

            <div id="mta-chatbot" className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-end pointer-events-none">
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
                                        <img src="/about_avatar.jpeg" alt="Md Tanveer Alam" className="w-full h-full object-cover" />
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

                                            {/* Interactive Inline Lead Form (Fast & High Conversion) */}
                                            {msg.isLeadForm && (
                                                <InlineLeadForm
                                                    onSubmitLead={async (data) => {
                                                        const success = await sendLeadEmail(data);
                                                        playSound('pop');
                                                        scrollToBottom('smooth');
                                                        return success;
                                                    }}
                                                />
                                            )}

                                            {msg.hasWhatsApp && (
                                                <a 
                                                    href="https://wa.me/917482946610?text=Hi%20Tanveer!%20I%20contacted%20you%20via%20your%20portfolio%20AI%20Assistant%20and%20would%20like%20to%20discuss%20a%20project." 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-[#25D366]/20 active:scale-95"
                                                >
                                                    <FaWhatsapp size={16} /> Chat on WhatsApp Directly
                                                </a>
                                            )}

                                            {msg.hasResume && (
                                                <a href="/resume.pdf" download="Md_Tanveer_Alam_Resume.pdf" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
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

                                        {/* Dynamic Suggested Follow-up Chips */}
                                        {msg.suggestions && msg.suggestions.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-1 pt-1">
                                                {msg.suggestions.map((suggestion, sIdx) => (
                                                    <button 
                                                        key={sIdx} 
                                                        type="button" 
                                                        onClick={() => handleSendMessage(suggestion)} 
                                                        className="px-2.5 py-1 rounded-lg border border-primary/25 bg-primary/5 hover:bg-primary hover:text-white text-primary text-[11px] font-semibold transition-all active:scale-95 shadow-xs"
                                                    >
                                                        {suggestion} →
                                                    </button>
                                                ))}
                                            </div>
                                        )}

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
                            {QUICK_ACTIONS.map((action, i) => (
                                <button key={i} onClick={() => handleSendMessage(action.value)} className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-border bg-background hover:border-primary hover:text-primary transition-all flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95">
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
                                    <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask me anything (or type in Hindi/English)..." className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10" aria-label="Chat message input" />
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
                    id="mta-whatsapp"
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

// Modern Interactive Inline Lead Form Component
const InlineLeadForm = ({ onSubmitLead }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [projectType, setProjectType] = useState('Full Stack / SaaS');
    const [details, setDetails] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const projectTypes = [
        'Full Stack / SaaS',
        'WordPress & Elementor',
        'Custom Web App',
        'Mobile App (Android)'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Please enter your name');
            return;
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            toast.error('Please enter a valid email address');
            return;
        }

        setSubmitting(true);
        const leadPayload = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            projectType,
            details: details.trim()
        };

        let success = true;
        if (onSubmitLead) {
            success = await onSubmitLead(leadPayload);
        }

        setSubmitting(false);
        if (success !== false) {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2.5 text-left"
            >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 size={16} /> Inquiry Sent to Tanveer!
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                    Thank you, <strong>{name}</strong>! Tanveer will review your <strong>{projectType}</strong> project and email you back at <strong>{email}</strong> shortly.
                </p>
                {phone && (
                    <p className="text-[11px] text-muted-foreground">
                        Phone / WhatsApp noted: <strong>{phone}</strong>
                    </p>
                )}
                <div className="pt-1">
                    <a
                        href={`https://wa.me/917482946610?text=Hi%20Tanveer!%20I%20just%20submitted%20a%20project%20inquiry%20for%20${encodeURIComponent(projectType)}%20(Name:%20${encodeURIComponent(name)}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                        <FaWhatsapp size={15} /> Instant WhatsApp Connect
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-black/[0.04] dark:bg-white/[0.03] border border-primary/25 space-y-2.5 text-left shadow-inner">
            <div className="flex items-center justify-between pb-1 border-b border-border/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <User size={13} /> Project Inquiry Card
                </span>
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
                    Quick Form
                </span>
            </div>

            {/* Name */}
            <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                    Your Name <span className="text-primary">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-base sm:text-xs focus:outline-none focus:border-primary transition-colors text-foreground shadow-xs"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                    Email Address <span className="text-primary">*</span>
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-base sm:text-xs focus:outline-none focus:border-primary transition-colors text-foreground shadow-xs"
                />
            </div>

            {/* Phone / WhatsApp (Optional) */}
            <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1 flex items-center justify-between">
                    <span>Phone / WhatsApp</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <FaWhatsapp size={11} /> Fast Reply
                    </span>
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765... or +1 555..."
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-base sm:text-xs focus:outline-none focus:border-primary transition-colors text-foreground shadow-xs"
                />
            </div>

            {/* Project Type Pills */}
            <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                    Project Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {projectTypes.map((pt) => (
                        <button
                            type="button"
                            key={pt}
                            onClick={() => setProjectType(pt)}
                            className={cn(
                                "px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all border",
                                projectType === pt
                                    ? "bg-primary text-white border-primary shadow-xs"
                                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                            )}
                        >
                            {pt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Brief Scope */}
            <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                    Project Details <span className="text-[10px] text-muted-foreground">(Optional)</span>
                </label>
                <textarea
                    rows={2}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly describe your requirements or timeline..."
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-base sm:text-xs focus:outline-none focus:border-primary transition-colors text-foreground resize-none shadow-xs"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60"
            >
                <Send size={13} />
                {submitting ? 'Sending Inquiry...' : 'Submit Project Inquiry'}
            </button>

            {/* Direct WhatsApp Option */}
            <div className="pt-1">
                <a
                    href="https://wa.me/917482946610?text=Hi%20Tanveer!%20I%20am%20visiting%20your%20portfolio%20and%20would%20like%20to%20hire%20you%20for%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-[11px] font-bold transition-all active:scale-95"
                >
                    <FaWhatsapp size={14} /> Or Message on WhatsApp (+91 7482946610)
                </a>
            </div>
        </form>
    );
};

export default ChatBot;
