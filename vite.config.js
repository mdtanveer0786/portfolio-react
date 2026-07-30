import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: './',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,pdf,jpeg,jpg}']
            },
            manifest: {
                name: "Md Tanveer Alam | Portfolio",
                short_name: "Tanveer",
                description: "Professional Portfolio of Md Tanveer Alam - Full Stack Developer",
                theme_color: "#8b5cf6",
                background_color: "#000000",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "/logo.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable"
                    },
                    {
                        src: "/logo.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],
    server: {
        port: 3000,
        open: true
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.js',
        exclude: ['**/node_modules/**', '**/e2e/**'],
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'vendor-react';
                        if (id.includes('framer-motion')) return 'vendor-framer';
                        if (id.includes('tsparticles') || id.includes('react-particles')) return 'vendor-particles';
                        if (id.includes('lucide-react')) return 'vendor-icons';
                        return 'vendor';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        assetsInlineLimit: 4096
    }
})