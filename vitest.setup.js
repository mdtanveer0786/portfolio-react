import '@testing-library/jest-dom';

// Mock requestAnimationFrame for react-type-animation
window.requestAnimationFrame = window.requestAnimationFrame || function(callback) {
    return setTimeout(callback, 0);
};
window.cancelAnimationFrame = window.cancelAnimationFrame || function(id) {
    clearTimeout(id);
};
