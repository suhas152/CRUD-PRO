import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This tells Vite to use relative paths in the built files.
  base: './',
  plugins: [react()],
})
