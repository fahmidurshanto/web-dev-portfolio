import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; // Import path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { // Add resolve alias
    alias: {
      'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel'),
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
})
