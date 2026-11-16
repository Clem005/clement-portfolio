import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever React asks for /api, Vite forwards it to the Python server locally
      '/api': {
        // Set API_TARGET (e.g. https://clement.digital) to use live data without the local backend
        target: process.env.API_TARGET || 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
})