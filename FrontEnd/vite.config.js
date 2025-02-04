import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8000",
//         changeOrigin: true,
//         secure: false, // Use only if the target server uses self-signed certificates
//       },
//     },
//   },
//   plugins: [react()],
// })
