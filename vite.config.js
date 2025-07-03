import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Flight Attendant Alarm',
        short_name: 'FlightAlarm',
        description: 'Calculator pentru trezire rapidă, pentru însoțitori de bord',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: '/favicon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/',
})
