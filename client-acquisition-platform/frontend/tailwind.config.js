export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
      },
      colors: {
        bg: 'var(--bg-primary)',
        bg2: 'var(--bg-secondary)',
        surface: 'var(--surface)',
        elevated: 'var(--surface-elevated)',
        accent: 'var(--accent-blue)',
        indigo: 'var(--accent-indigo)',
        text: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        subtle: 'var(--text-secondary)',
        border: 'var(--border-subtle)'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(0,0,0,.22)'
      }
    }
  },
  plugins: []
};
