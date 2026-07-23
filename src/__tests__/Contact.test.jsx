import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '../components/Sections/Contact';
import { ThemeProvider } from '../components/Layout/ThemeProvider';

// Mock matchMedia for Framer Motion
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

class MockIntersectionObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}
window.IntersectionObserver = MockIntersectionObserver;

describe('Contact Component', () => {
    it('renders the contact form fields', () => {
        render(
            <ThemeProvider>
                <Contact />
            </ThemeProvider>
        );
        
        expect(screen.getByPlaceholderText(/Enter your full name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your email address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Tell me about your project/i)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
        render(
            <ThemeProvider>
                <Contact />
            </ThemeProvider>
        );
        
        const submitBtn = screen.getByRole('button', { name: /Send Message/i });
        expect(submitBtn).toBeInTheDocument();
    });
});
