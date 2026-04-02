import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy:{
      "/api":{
        target: "http://3.235.187.99:5000",
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      // use polling for reliable refresh on Windows / WSL / network drives
      usePolling: true,
    },
  },
});
