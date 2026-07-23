import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import Hero from '../components/Sections/Hero';

// Mock matchMedia to fix framer-motion tests in jsdom
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe('Hero Component', () => {
    it('renders the Hero component and displays the main heading', () => {
        render(<Hero />);
        // Look for the "Full Stack Developer" text which is the main heading
        const heading = screen.getByText(/Full Stack Developer/i);
        expect(heading).toBeInTheDocument();
    });

    it('renders the contact button', () => {
        render(<Hero />);
        const contactBtn = screen.getByText(/Contact Me/i);
        expect(contactBtn).toBeInTheDocument();
    });
});
