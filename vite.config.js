import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', 
  },  // <-- Missing comma was here

  server: {
    host: "0.0.0.0",  // Allow external connections
    port: process.env.PORT || 4173,  // Use Render's PORT if available
  },

  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 4173,
  },
})
