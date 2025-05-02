// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/top100-music-visual/',  // 注意前后有斜杠

  plugins: [react()]
})
