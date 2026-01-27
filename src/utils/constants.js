export const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
]

export const socialLinks = [
    {
        icon: 'Github',
        href: 'https://github.com/mdtanveer0786',
        label: 'GitHub',
        color: '#181717'
    },
    {
        icon: 'Linkedin',
        href: 'https://linkedin.com/in/md-tanveer-alam',
        label: 'LinkedIn',
        color: '#0A66C2'
    },
    {
        icon: 'Twitter',
        href: 'https://twitter.com/tanveertoofan01',
        label: 'Twitter',
        color: '#1DA1F2'
    },
    {
        icon: 'Mail',
        href: 'mailto:tanveerdev14@gmail.com',
        label: 'Email',
        color: '#EA4335'
    },
]

export const skillCategories = [
    {
        title: 'Frontend Development',
        skills: [
            { name: 'React.js', level: 95, color: '#61DAFB' },
            { name: 'Next.js', level: 90, color: '#000000' },
            { name: 'TypeScript', level: 85, color: '#3178C6' },
            { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
            { name: 'Redux', level: 88, color: '#764ABC' },
        ]
    },
    {
        title: 'Backend Development',
        skills: [
            { name: 'Node.js', level: 92, color: '#339933' },
            { name: 'Express.js', level: 90, color: '#000000' },
            { name: 'Python', level: 85, color: '#3776AB' },
            { name: 'Java', level: 80, color: '#007396' },
            { name: 'REST APIs', level: 95, color: '#FF6C37' },
        ]
    },
    {
        title: 'Database & Tools',
        skills: [
            { name: 'MongoDB', level: 90, color: '#47A248' },
            { name: 'PostgreSQL', level: 85, color: '#336791' },
            { name: 'Redis', level: 80, color: '#DC382D' },
            { name: 'Docker', level: 85, color: '#2496ED' },
            { name: 'Git', level: 95, color: '#F05032' },
        ]
    },
    {
        title: 'Cloud & DevOps',
        skills: [
            { name: 'AWS', level: 85, color: '#FF9900' },
            { name: 'Vercel', level: 90, color: '#000000' },
            { name: 'Firebase', level: 88, color: '#FFCA28' },
            { name: 'CI/CD', level: 85, color: '#007EC6' },
            { name: 'Nginx', level: 80, color: '#269539' },
        ]
    }
]

export const projects = [
    {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Full-featured e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/ecommerce-platform',
        live: 'https://ecommerce-demo.netlify.app',
        featured: true,
        category: 'fullstack'
    },
    {
        id: 2,
        title: 'Task Management AI',
        description: 'Intelligent task manager with AI-powered suggestions and team collaboration features.',
        tags: ['Next.js', 'TypeScript', 'OpenAI', 'Prisma', 'Tailwind'],
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/task-ai',
        live: 'https://task-ai.vercel.app',
        featured: true,
        category: 'frontend'
    },
    {
        id: 3,
        title: 'Real-time Chat App',
        description: 'Scalable chat application with video calls, file sharing, and end-to-end encryption.',
        tags: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/chat-app',
        live: 'https://chat-app-demo.herokuapp.com',
        featured: false,
        category: 'fullstack'
    },
    {
        id: 4,
        title: 'Analytics Dashboard',
        description: 'Interactive dashboard for data visualization with real-time updates and custom reports.',
        tags: ['React', 'D3.js', 'Express', 'MongoDB', 'Chart.js'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
        github: 'https://github.com/mdtanveer0786/analytics-dashboard',
        live: 'https://analytics-dashboard.netlify.app',
        featured: false,
        category: 'frontend'
    },
]

export const experience = [
    {
        id: 1,
        title: 'Full Stack Developer',
        company: 'Tech Solutions Inc.',
        period: '2023 - Present',
        location: 'Remote',
        description: 'Led development of multiple web applications using React, Node.js, and MongoDB.',
        achievements: [
            'Improved application performance by 40%',
            'Reduced server costs by 30%',
            'Mentored 3 junior developers',
        ]
    },
    {
        id: 2,
        title: 'Frontend Developer',
        company: 'Digital Innovations',
        period: '2022 - 2023',
        location: 'New Delhi, India',
        description: 'Built responsive web interfaces and collaborated with design teams.',
        achievements: [
            'Increased user engagement by 25%',
            'Reduced page load time by 60%',
            'Implemented design system',
        ]
    },
    {
        id: 3,
        title: 'Web Development Intern',
        company: 'StartUp Ventures',
        period: '2021 - 2022',
        location: 'Remote',
        description: 'Assisted in building and maintaining company websites and applications.',
        achievements: [
            'Built 10+ landing pages',
            'Improved SEO rankings',
            'Fixed critical bugs',
        ]
    },
]

export const education = [
    {
        id: 1,
        degree: 'B.Tech in Computer Science',
        institution: 'Bikaner Technical University',
        period: '2021 - 2025',
        grade: 'CGPA: 8.5/10',
        description: 'Specialized in software engineering, web technologies, and database management.'
    },
    {
        id: 2,
        degree: 'Full Stack Web Development',
        institution: 'AccioJob / Udemy',
        period: '2023 - 2025',
        grade: 'Grade: A',
        description: 'Comprehensive training in modern web development technologies.'
    },
    {
        id: 3,
        degree: 'Senior Secondary (12th)',
        institution: 'Bihar Board',
        period: '2018 - 2020',
        grade: 'Percentage: 85%',
        description: 'Focus on Science stream with Computer Science.'
    },
]