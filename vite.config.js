import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. Importujemy naszą nową wtyczkę
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Pamiętaj o SWOJEJ nazwie repozytorium na GitHubie!
  base: '/Czat-react/', 
  plugins: [
    react(),
    // 2. Dodajemy i konfigurujemy wtyczkę PWA
    VitePWA({
      registerType: 'autoUpdate', // Aplikacja sama się zaktualizuje u użytkownika
      manifest: {
        name: 'Szkolny Shoutbox PRO',
        short_name: 'Shoutbox',
        description: 'Klasowy komunikator czasu rzeczywistego',
        theme_color: '#8e44ad',
        background_color: '#f4f7f6',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})