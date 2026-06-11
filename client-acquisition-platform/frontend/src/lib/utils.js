export function cn(...classes) { return classes.filter(Boolean).join(' '); }
export function formatCurrency(value) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0); }
export const mockDelay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));
