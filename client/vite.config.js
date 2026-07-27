import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  plugins: [react(), tailwindcss()],
})

=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b
