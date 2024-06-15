import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // Otros plugins si los tienes
  ],
  build: {
    rollupOptions: {
      external: ['jspdf'],
    },
  },
});
