import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const lastUpdated = execSync('git log -1 --format="%cd" --date=format:"%B %d, %Y"')
  .toString()
  .trim()

export default defineConfig({
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': '/src' },
  },
})
