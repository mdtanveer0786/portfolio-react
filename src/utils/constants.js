import {
    Code2,
    Server,
    Database,
    Github,
    Linkedin,
    Twitter,
    Mail,
    Layout,
    Home,
    User,
    GraduationCap,
    MessageSquare,
    Rocket,
    Palette,
    Settings,
    Smartphone,
    Cloud,
    Briefcase
} from 'lucide-react'

// Import Project Images
import realestateImg from '../assets/projects/realestate.webp'
import tradeImg from '../assets/projects/trade.webp'
import financeImg from '../assets/projects/finance.webp'
import eduearnImg from '../assets/projects/eduearn.webp'
import bikesImg from '../assets/projects/bikes.webp'
import ecommerceImg from '../assets/projects/ecommerce.webp'
import safedropImg from '../assets/projects/safedrop.png'
import parkflowImg from '../assets/projects/parkflow.png'

export const LOADING_DURATION = 800;

export const SECTIONS = ['home', 'about', 'services', 'experience', 'skills', 'projects', 'education', 'contact'];

export const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Services', href: '#services', icon: Server },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Skills', href: '#skills', icon: Code2 },
    { label: 'Projects', href: '#projects', icon: Layout },
    { label: 'Education', href: '#education', icon: GraduationCap },
    { label: 'Contact', href: '#contact', icon: MessageSquare },
]

export const socialLinks = [
    {
        icon: Github,
        href: 'https://github.com/mdtanveer0786',
        label: 'GitHub',
        color: '#181717'
    },
    {
        icon: Linkedin,
        href: 'https://linkedin.com/in/md-tanveer-alam-b7a134219/',
        label: 'LinkedIn',
        color: '#0A66C2'
    },
    {
        icon: Twitter,
        href: 'https://x.com/tanveertoofan01',
        label: 'Twitter',
        color: '#1DA1F2'
    },
    {
        icon: Mail,
        href: 'mailto:tanveerdev14@gmail.com',
        label: 'Email',
        color: '#EA4335'
    },
]

export const services = [
    {
        title: 'Full Stack Web Development',
        icon: Rocket,
        description: 'Building end-to-end web applications with modern technologies, ensuring scalability and performance.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'PHP', 'MySQL'],
        gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
        title: 'Frontend Development',
        icon: Palette,
        description: 'Creating visually stunning and highly interactive user interfaces with a focus on UX/UI.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap'],
        gradient: 'from-pink-500/20 to-orange-500/20'
    },
    {
        title: 'Backend Development',
        icon: Settings,
        description: 'Developing robust server-side logic, REST APIs, and secure authentication systems.',
        technologies: ['Node.js', 'Express.js', 'PHP', 'REST APIs', 'Auth Systems'],
        gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
        title: 'Database Development',
        icon: Database,
        description: 'Designing efficient database schemas and optimizing queries for high-performance applications.',
        technologies: ['MongoDB', 'MySQL', 'Database Design', 'Optimization'],
        gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
        title: 'Android App Development',
        icon: Smartphone,
        description: 'Crafting cross-platform mobile applications and converting websites into native-like APKs.',
        technologies: ['React Native', 'Android Apps', 'Web2APK', 'API Integration'],
        gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
        title: 'Deployment & Hosting',
        icon: Cloud,
        description: 'Managing production deployments and ensuring 24/7 availability on modern cloud platforms.',
        technologies: ['Vercel', 'Render', 'GitHub', 'Production'],
        gradient: 'from-indigo-500/20 to-blue-500/20'
    }
];


export const skillCategories = [
    {
        title: 'Frontend Development',
        icon: Code2,
        skills: [
            { name: 'HTML5', level: 95, color: '#E34F26' },
            { name: 'CSS3', level: 90, color: '#1572B6' },
            { name: 'JavaScript', level: 92, color: '#F7DF1E' },
            { name: 'React.js', level: 88, color: '#61DAFB' },
            { name: 'Tailwind CSS', level: 90, color: '#06B6D4' },
            { name: 'Bootstrap', level: 85, color: '#7952B3' },
        ]
    },
    {
        title: 'Backend Development',
        icon: Server,
        skills: [
            { name: 'Node.js', level: 85, color: '#339933' },
            { name: 'Express.js', level: 85, color: '#000000' },
            { name: 'REST APIs', level: 90, color: '#FF6C37' },
            { name: 'PHP', level: 80, color: '#777BB4' },
        ]
    },
    {
        title: 'DevOps & Cloud',
        icon: Cloud,
        skills: [
            { name: 'Git', level: 90, color: '#F05032' },
            { name: 'Vercel', level: 90, color: '#000000' },
            { name: 'Render', level: 85, color: '#46E3B7' },
        ]
    },
    {
        title: 'Tools & Databases',
        icon: Settings,
        skills: [
            { name: 'MongoDB', level: 85, color: '#47A248' },
            { name: 'MySQL', level: 82, color: '#4479A1' },
            { name: 'Postman', level: 88, color: '#FF6C37' },
        ]
    }
]

export const projects = [
    {
        id: 8,
        title: 'ParkFlow SaaS',
        description: 'An enterprise-grade parking management SaaS featuring real-time Socket.io state updates, PWA offline capabilities with Workbox networks, and interactive analytical boards. Packaged into a native Android APK using a Web-to-APK Compiler.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
        image: parkflowImg,
        github: 'https://github.com/mdtanveer0786/ParkFlow_SaaS',
        live: 'https://parkflow.parknpass.com/',
        featured: true,
        category: 'fullstack',
        date: '2026-06-23'
    },
    {
        id: 7,
        title: 'SafeDrop AI',
        description: 'A premium luggage & locker management SaaS for high-traffic hubs. Automates secure drops and tracking with Socket.io real-time updates, multi-tenant branch scoping, and crypto-secure QR tokens.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Razorpay'],
        image: safedropImg,
        github: 'https://github.com/mdtanveer0786/SafeDrop_AI',
        live: 'https://safedrop-ai.vercel.app/',
        featured: true,
        category: 'fullstack',
        date: '2026-06-23'
    },
    {
        id: 1,
        title: 'Real Estate Elite',
        description: 'A scalable real estate platform that allows users to explore, list, and manage properties seamlessly with secure JWT authentication and full CRUD operations.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary'],
        image: realestateImg,
        github: 'https://github.com/mdtanveer0786/real-estate-app',
        live: 'https://real-estateelite.vercel.app/',
        featured: true,
        category: 'fullstack',
        date: '2025-01-01'
    },

    {
        id: 2,
        title: 'Trade Analyzer Pro',
        description: 'A trading analytics platform to track, analyze, and improve trading performance with data visualization and secure authentication.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Chart.js'],
        image: tradeImg,
        github: 'https://github.com/mdtanveer0786/Trade-Analyzer-Pro',
        live: 'https://trade-analyzer-proo.vercel.app/',
        featured: true,
        category: 'fullstack',
        date: '2025-01-01'
    },

    {
        id: 3,
        title: 'Finance Dashboard',
        description: 'An interactive dashboard to visualize financial data with dynamic charts, insights, and a clean modern UI.',
        tags: ['React', 'Tailwind', 'Chart.js'],
        image: financeImg,
        github: 'https://github.com/mdtanveer0786/finance-dashboard',
        live: 'https://wealthwise-finance-dashboard.vercel.app/',
        featured: true,
        category: 'frontend',
        date: '2024-01-01'
    },

    {
        id: 4,
        title: 'EduEarn India',
        description: 'An educational platform focused on online earning and learning resources with a clean UI and responsive layout.',
        tags: ['React', 'JavaScript', 'CSS'],
        image: eduearnImg,
        github: 'https://github.com/mdtanveer0786/EduEarn-India',
        live: 'https://edu-earn-india.vercel.app/',
        featured: false,
        category: 'frontend',
        date: '2024-01-01'
    },

    {
        id: 5,
        title: 'Delhi Bikes Hub',
        description: 'A bike listing platform where users can explore available bikes and connect with sellers via an improved browsing experience.',
        tags: ['React', 'Tailwind', 'JavaScript'],
        image: bikesImg,
        github: 'https://github.com/mdtanveer0786/DelhiBikesHub',
        live: 'https://delhi-bikes-hub.vercel.app/',
        featured: false,
        category: 'frontend',
        date: '2024-01-01'
    },

    {
        id: 6,
        title: 'E-commerce Platform',
        description: 'A complete e-commerce solution focused on performance, scalability, and seamless user experience with Stripe integration.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        image: ecommerceImg,
        github: '',
        live: '',
        featured: false,
        category: 'fullstack',
        date: '2026-01-01',
        status: 'coming-soon'
    },
]

export const experience = [
    {
        id: 1,
        title: 'Full Stack Developer | PHP Developer | Android Developer',
        company: 'Vinnpro Web Solutions',
        period: '2026 - Present',
        location: 'Ghaziabad, Uttar Pradesh',
        description: 'Working on scalable web applications, business solutions, admin dashboards, Android applications, REST APIs, and database-driven systems.',
        projects: [
            {
                name: 'ParkFlow SaaS (Enterprise Parking Platform)',
                tech: 'React 19, Node.js, Express, MongoDB, Socket.io, Vite-PWA, Tailwind CSS',
                features: ['Real-Time WebSockets', 'PWA Offline Workbox Support', 'Analytics Boards', 'Web-to-APK APK Packaging']
            },
            {
                name: 'SafeDrop AI (SaaS Platform)',
                tech: 'React, Node.js, Express, MongoDB Atlas, Socket.io, Razorpay',
                features: ['Multi-Tenant Scoping', 'Real-Time Locker Tracking', 'Crypto-Secure QR Tokens', 'Automated SMS Alerts']
            },
            {
                name: 'Real Estate Elite (Property Platform)',
                tech: 'React, Node.js, Express, MongoDB, Cloudinary',
                features: ['JWT Authentication', 'Full CRUD property management', 'Cloudinary media hosting', 'Client/Agent dashboards']
            },
            {
                name: 'Trade Analyzer Pro (Trading Analytics)',
                tech: 'React, Node.js, Express, MongoDB, Chart.js',
                features: ['Trading performance tracking', 'Interactive chart analytics', 'Detailed profit/loss metrics']
            }
        ],
        achievements: []
    },
]

export const education = [
    {
        id: 1,
        degree: "Bachelor of Technology (B.Tech) in Computer Science Engineering",
        institution: "Bikaner Technical University",
        period: "2020 - 2024",
        grade: "CGPA: 7.0/10",
        description:
            "Studied core computer science subjects including Data Structures, Algorithms, Database Management Systems, and Software Engineering. Built multiple academic and personal projects focused on real-world applications."
    },
    {
        id: 2,
        degree: "Full Stack Web Development Certification",
        institution: "AccioJob / Udemy",
        period: "2022 - 2024",
        grade: "A+",
        description:
            "Completed intensive training in modern web development technologies including React.js, Node.js, Express.js, and MongoDB. Gained hands-on experience by building full-stack projects."
    },
    {
        id: 3,
        degree: "Senior Secondary Education (12th - PCM)",
        institution: "Bihar School Examination Board",
        period: "2018 - 2020",
        grade: "Percentage: 65%",
        description:
            "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics (PCM), building a strong analytical and problem-solving foundation."
    }
];
