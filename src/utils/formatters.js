/**
 * Format a price with currency and thousands separator
 * @param {number} price - The price to format
 * @param {string} [currency='TND'] - The currency symbol
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'TND') => {
  if (price === null || price === undefined || isNaN(price)) {
    return `0 ${currency}`;
  }
  
  // Format number with thousands separator
  const formattedPrice = Number(price).toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  return `${formattedPrice} ${currency}`;
};

/**
 * Format a number with thousands separator
 * @param {number} number - The number to format
 * @param {number} [decimals=0] - Number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }
  
  return Number(number).toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} [locale='fr-FR'] - The locale to use
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'fr-FR') => {
  if (!date) return '';
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, options);
};

/**
 * Format a duration in seconds to a human-readable string (e.g., "2h 30m")
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
  if (seconds < 60) parts.push(`${remainingSeconds}s`);
  
  return parts.join(' ') || '0s';
};

export default {
  formatPrice,
  formatNumber,
  formatDate,
  formatDuration
};
