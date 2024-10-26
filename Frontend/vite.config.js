import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // No necesitas el proxy si vas a usar la URL de Vercel directamente
  server: {
    // Puedes eliminar la configuración de proxy aquí
  },
  // Si necesitas la configuración del build, puedes agregarla aquí
})
