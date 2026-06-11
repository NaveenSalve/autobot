import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiProxy = {
  target: 'http://127.0.0.1:8000',
  changeOrigin: true,
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/health': apiProxy,
      '/profile': apiProxy,
      '/leads': apiProxy,
      '/audit': apiProxy,
      '/proposals': apiProxy,
      '/jobs': apiProxy,
      '/crm': apiProxy,
      '/negotiate': apiProxy,
      '/email': apiProxy,
    },
  },
});
