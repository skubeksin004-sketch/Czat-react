import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // WAŻNE: Zmień 'shoutbox-react' na DOKŁADNĄ nazwę Twojego repozytorium na GitHub!
  // Musi się zaczynać i kończyć ukośnikiem /
  base: '/Czat-react/'
})