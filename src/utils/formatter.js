// Format date
export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Format number with commas
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}

// Format duration
export const formatDuration = (months) => {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    } else if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`
    } else {
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    }
}

// Format percentage
export const formatPercentage = (value, decimalPlaces = 1) => {
    return `${value.toFixed(decimalPlaces)}%`
}

// Capitalize first letter
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Generate random ID
export const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Debounce function
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}