import { useState, useEffect } from 'react';

export default function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setProgress((currentScroll / scrollHeight) * 100);
            } else {
                setProgress(0);
            }
        };

        // Run once on mount to get initial scroll position
        updateScrollProgress();

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
            window.removeEventListener('resize', updateScrollProgress);
        };
    }, []);

    return progress;
}
