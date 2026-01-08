import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // O plugin vai ler seu tsconfig.json e criar os aliases sozinho
  plugins: [react(), tsconfigPaths()],
})