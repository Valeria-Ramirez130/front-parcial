import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // La URL donde corre tu backend
        changeOrigin: true, // Cambia el origen de la solicitud al destino
        secure: false, // Si estás usando HTTP sin SSL
      },
    },
  },
})
