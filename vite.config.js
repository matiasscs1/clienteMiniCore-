import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Añadir este plugin
    // Otros plugins si los tienes
  ],
});
