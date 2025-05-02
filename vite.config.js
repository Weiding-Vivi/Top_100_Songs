import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Top_100_Songs/',  // 你的 GitHub 仓库名，注意大小写要完全一致
  plugins: [react()]
})
