import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep Tauri's Rust build messages visible in the terminal.
  clearScreen: false,
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true, // fail instead of silently switching to another port (Tauri expects 5173)
    open: false,
    watch: {
      // Don't reload the page when Rust files change.
      ignored: ['**/src-tauri/**'],
    },
  },
  preview: {
    host: 'localhost',
    port: 4173,
  },
})
