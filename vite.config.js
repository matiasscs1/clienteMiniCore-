import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    // Otros plugins si los tienes
  ],
  build: {
    rollupOptions: {
      external: ['react-apexcharts'] // Si necesitas externalizar algún módulo
    }
  }
});
