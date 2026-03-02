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
    Briefcase,
    MessageSquare
} from 'lucide-react'

export const LOADING_DURATION = 2000;

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
            { name: 'PHP', level: 80, color: '#777BB4' },
            { name: 'Python', level: 75, color: '#3776AB' },
            { name: 'REST APIs', level: 90, color: '#FF6C37' },
        ]
    },
    {
        title: 'Database & Tools',
        icon: Database,
        skills: [
            { name: 'MongoDB', level: 85, color: '#47A248' },
            { name: 'MySQL', level: 82, color: '#4479A1' },
            { name: 'Git', level: 90, color: '#F05032' },
            { name: 'Postman', level: 88, color: '#FF6C37' },
        ]
    }
]

export const projects = [
    {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with user authentication, product management, and payment integration.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/ecommerce-platform',
        live: 'https://ecommerce-demo-mdtanveer.netlify.app',
        featured: true,
        category: 'fullstack',
        date: '2024-02-15'
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'Interactive task management application with drag-drop functionality and local storage.',
        tags: ['React', 'JavaScript', 'CSS3'],
        image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/task-manager',
        live: 'https://taskmanager-mdtanveer.netlify.app',
        featured: true,
        category: 'frontend',
        date: '2023-11-10'
    },
    {
        id: 3,
        title: 'REST API Service',
        description: 'Secure RESTful API with JWT authentication, CRUD operations, and database integration.',
        tags: ['Node.js', 'Express', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/rest-api',
        live: 'https://api-mdtanveer.herokuapp.com',
        featured: false,
        category: 'backend',
        date: '2023-09-20'
    },
    {
        id: 4,
        title: 'Weather Application',
        description: 'Real-time weather application with location detection and 5-day forecast.',
        tags: ['JavaScript', 'API', 'CSS3'],
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/weather-app',
        live: 'https://weatherapp-mdtanveer.netlify.app',
        featured: false,
        category: 'frontend',
        date: '2023-07-05'
    },
    {
        id: 5,
        title: 'Social Media Dashboard',
        description: 'Real-time social media dashboard with analytics, notifications, and user management.',
        tags: ['React', 'Node.js', 'Socket.io'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/social-dashboard',
        live: 'https://social-dashboard-demo.netlify.app',
        featured: false,
        category: 'fullstack',
        date: '2023-12-15'
    },
    {
        id: 6,
        title: 'Blog CMS',
        description: 'Full-featured blog CMS with rich text editor, user roles, and comment system.',
        tags: ['Node.js', 'Express', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/blog-cms',
        live: 'https://blog-cms-api.herokuapp.com',
        featured: false,
        category: 'backend',
        date: '2023-10-12'
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
        period: '2021 - 2025',
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

