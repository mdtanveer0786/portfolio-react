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
    Layers,
    MessageSquare
} from 'lucide-react'

// Import Project Images
import realestateImg from '../assets/projects/realestate.webp'
import tradeImg from '../assets/projects/trade.webp'
import financeImg from '../assets/projects/finance.webp'
import eduearnImg from '../assets/projects/eduearn.webp'
import bikesImg from '../assets/projects/bikes.webp'
import ecommerceImg from '../assets/projects/ecommerce.webp'

export const LOADING_DURATION = 1000;

export const SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

export const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Education', href: '#education', icon: GraduationCap },
    { label: 'Skills', href: '#skills', icon: Layers },
    { label: 'Projects', href: '#projects', icon: Layout },
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
        ]
    },
    {
        title: 'Backend Development',
        icon: Server,
        skills: [
            { name: 'Node.js', level: 85, color: '#339933' },
            { name: 'Express.js', level: 85, color: '#000000' },
            { name: 'REST APIs', level: 90, color: '#FF6C37' },
        ]
    },
    {
        title: 'Cloud & Tools',
        icon: Database,
        skills: [
            { name: 'MongoDB', level: 85, color: '#47A248' },
            { name: 'MySQL', level: 82, color: '#4479A1' },
            { name: 'Vercel', level: 90, color: '#000000' },
            { name: 'Render', level: 85, color: '#46E3B7' },
            { name: 'Git', level: 90, color: '#F05032' },
            { name: 'Postman', level: 88, color: '#FF6C37' },
        ]
    }
]

export const projects = [
    {
        id: 1,
        title: 'Real Estate Elite',
        description: 'Full-stack MERN real estate platform with JWT authentication, secure REST APIs, MongoDB database, admin dashboard, and full CRUD operations for property listings.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'REST API'],
        image: realestateImg,
        github: 'https://github.com/mdtanveer0786/real-estate-app',
        live: 'https://real-estateelite.vercel.app/',
        featured: true,
        category: 'fullstack',
        date: '2025-08-10'
    },

    {
        id: 2,
        title: 'Trade Analyzer Pro',
        description: 'Full-stack MERN trading analytics platform with JWT authentication, REST APIs, MongoDB database, admin dashboard, and complete CRUD operations to track trades and performance.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'REST API'],
        image: tradeImg,
        github: 'https://github.com/mdtanveer0786/Trade-Analyzer-Pro',
        live: 'https://trade-analyzer-proo.vercel.app/',
        featured: true,
        category: 'fullstack',
        date: '2025-10-18'
    },

    {
        id: 3,
        title: 'Finance Dashboard',
        description: 'Interactive finance analytics dashboard with charts, statistics, and financial insights.',
        tags: ['React', 'Tailwind', 'Charts'],
        image: financeImg,
        github: 'https://github.com/mdtanveer0786/finance-dashboard',
        live: 'https://financee-dashboard.netlify.app/',
        featured: true,
        category: 'frontend',
        date: '2024-12-05'
    },

    {
        id: 4,
        title: 'EduEarn India',
        description: 'Educational platform providing information about earning opportunities and online learning.',
        tags: ['React', 'JavaScript', 'CSS'],
        image: eduearnImg,
        github: 'https://github.com/mdtanveer0786/EduEarn-India',
        live: 'https://edu-earn-india.vercel.app/',
        featured: false,
        category: 'frontend',
        date: '2024-11-20'
    },

    {
        id: 5,
        title: 'Delhi Bikes Hub',
        description: 'Bike selling and listing platform where users can explore bikes and contact sellers.',
        tags: ['React', 'Tailwind', 'JavaScript'],
        image: bikesImg,
        github: 'https://github.com/mdtanveer0786/DelhiBikesHub',
        live: 'https://delhi-bikes-hub.vercel.app/',
        featured: false,
        category: 'frontend',
        date: '2024-10-15'
    },

    {
        id: 6,
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with authentication, product management, and payment integration.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        image: ecommerceImg,
        github: '',
        live: '',
        featured: true,
        category: 'fullstack',
        date: '2024-02-15'
    },
]

export const experience = [
    {
        id: 1,
        title: 'Full Stack Developer',
        company: 'Freelance / Projects',
        period: '2023 - Present',
        location: 'Delhi, India',
        description: 'Developing modern web applications using the MERN stack and other cutting-edge technologies.',
        achievements: [
            'Built and deployed 10+ web applications',
            'Optimized application performance and SEO',
            'Implemented secure authentication and real-time features'
        ]
    },
]

export const education = [
    {
        id: 1,
        degree: 'Computer Science Engineering (B.Tech)',
        institution: 'Bikaner Technical University',
        period: '2020 - 2024',
        grade: 'CGPA: 7/10',
        description: 'Specialized in software development, database management, and web technologies.'
    },
    {
        id: 2,
        degree: 'Full Stack Web Development Certification',
        institution: 'AccioJob / Udemy',
        period: '2023 - 2025',
        grade: 'Grade: A',
        description: 'Comprehensive training in modern web development technologies including HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB.'
    },
    {
        id: 3,
        degree: 'Senior Secondary Education (12th)',
        institution: 'Bihar Board',
        period: '2018 - 2020',
        grade: 'Percentage: 65%',
        description: 'Completed senior secondary education with focus on Computer Science and Mathematics.'
    },
]

