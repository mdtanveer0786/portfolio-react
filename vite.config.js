import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: './',
    plugins: [react()],
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