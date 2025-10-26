import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    https: {
      key: fs.readFileSync('./certs/localhost+1-key.pem'),
      cert: fs.readFileSync('./certs/localhost+1.pem'),
    }
  }
})
