export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}
export function getInitialTheme() { return localStorage.getItem('theme') || 'dark'; }
