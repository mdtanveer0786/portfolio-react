# 🚀 Md Tanveer Alam - Premium Portfolio

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Premium-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF)
![License](https://img.shields.io/badge/License-MIT-green)

A stunning, modern, and fully responsive portfolio website built with cutting-edge technologies. This portfolio features glass morphism effects, particle animations, dark/light theme, and smooth animations.

## ✨ Features

### 🎨 **Design & UI/UX**
- **Glass Morphism Effects** - Modern frosted glass design
- **Particle Background** - Interactive particle animations
- **Dark/Light Theme** - Toggle between themes
- **Gradient Animations** - Smooth gradient transitions
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion powered

### ⚡ **Performance**
- **Lightning Fast** - Built with Vite for instant HMR
- **Code Splitting** - Optimized bundle size
- **Lazy Loading** - Images and components
- **SEO Optimized** - Meta tags and structured data
- **Accessibility** - WCAG 2.1 compliant

### 🔧 **Technical**
- **React 18** - Latest React features
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **TypeScript Ready** - Full TypeScript support
- **Modular Architecture** - Clean component structure

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-FF6B6B)](https://your-portfolio-link.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-181717)](https://yourusername.github.io)

## 📸 Screenshots

| Light Theme | Dark Theme |
|-------------|------------|
| ![Light Theme](screenshots/light.png) | ![Dark Theme](screenshots/dark.png) |

| Mobile View | Projects Section |
|-------------|------------------|
| ![Mobile](screenshots/mobile.png) | ![Projects](screenshots/projects.png) |

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/mdtanveer0786/portfolio-premium.git
cd portfolio-premium
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Add Your Assets
1. Place your `profile.jpg` in `/public/` folder
2. Place your `resume.pdf` in `/public/` folder
3. Update `favicon.ico` in `/public/`

### Step 4: Customize Content
Edit `src/utils/constants.js` with your information:
```javascript
export const socialLinks = [
  { 
    icon: Github, 
    href: 'https://github.com/YOUR_USERNAME', 
    label: 'GitHub'
  },
  // ... update other social links
]

export const projects = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    // ... update project details
  },
  // ... add your projects
]
```

### Step 5: Run Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 6: Build for Production
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
portfolio-premium/
├── public/                 # Static assets
│   ├── profile.jpg        # Your profile image
│   ├── resume.pdf         # Your resume
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # React components
│   │   ├── Layout/       # Layout components
│   │   ├── Sections/     # Page sections
│   │   ├── UI/          # Reusable UI components
│   │   └── shared/      # Shared components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🎯 Sections

1. **Hero Section** - Introduction with typewriter effect
2. **About Section** - Personal information and stats
3. **Skills Section** - Technical skills with progress bars
4. **Projects Section** - Portfolio projects with filtering
5. **Experience Section** - Work experience timeline
6. **Education Section** - Academic background
7. **Contact Section** - Contact form with validation

## 🚀 Deployment

### Deploy to Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mdtanveer0786/portfolio-premium)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mdtanveer0786/portfolio-premium)

### Deploy to GitHub Pages
```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

## 🛠️ Customization

### Change Colors
Edit `src/styles/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue */
  /* Customize other colors */
}
```

### Update Animations
Edit `src/utils/animations.js`:
```javascript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}
```

### Modify Particle Effects
Edit `src/components/UI/ParticlesBackground.jsx`:
```javascript
const options = {
  particles: {
    number: {
      value: 60, // Change particle count
    },
    // ... other particle options
  }
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Technologies Used

- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon Library
- **Lucide React** - Modern Icons
- **EmailJS** - Contact Form
- **React Hot Toast** - Notifications
- **React Intersection Observer** - Scroll Animations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Md Tanveer Alam**
- GitHub: [@mdtanveer0786](https://github.com/mdtanveer0786)
- LinkedIn: [Md Tanveer Alam](https://linkedin.com/in/md-tanveer-alam)
- Twitter: [@tanveertoofan01](https://twitter.com/tanveertoofan01)
- Email: tanveerdev14@gmail.com

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 🐛 Bug Reports

If you encounter any bugs, please open an issue [here](https://github.com/mdtanveer0786/portfolio-premium/issues).

## 📞 Contact

For any queries or suggestions, feel free to reach out:

- **Email**: tanveerdev14@gmail.com
- **Twitter**: [@tanveertoofan01](https://twitter.com/tanveertoofan01)
- **LinkedIn**: [Md Tanveer Alam](https://linkedin.com/in/md-tanveer-alam)

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Theme Customization

The portfolio comes with built-in dark/light theme. To customize:

1. **Change primary color**: Edit CSS variables in `globals.css`
2. **Modify glass effect**: Adjust backdrop-filter values
3. **Update gradients**: Change gradient stops in components
4. **Customize animations**: Modify Framer Motion variants

## 🔒 Environment Variables

Create a `.env` file for sensitive data:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
VITE_GA_TRACKING_ID=your_ga_id
```

## 📊 Performance Metrics

This portfolio achieves:
- ✅ Lighthouse Score: 95+
- ✅ First Contentful Paint: < 1s
- ✅ Time to Interactive: < 2s
- ✅ Bundle Size: < 100KB (gzipped)

## 🔄 Updates & Maintenance

To keep the portfolio updated:

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Run tests (if added)
npm test
```

---

**Built with ❤️ by Md Tanveer Alam**