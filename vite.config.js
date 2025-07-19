import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
