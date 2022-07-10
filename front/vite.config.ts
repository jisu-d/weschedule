import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    target: "esnext",
    rollupOptions:{
      input:{
        index:path.resolve(__dirname, 'index.html'),
        page:path.resolve(__dirname, 'page/index.html')
      }
    },
    outDir:path.resolve(__dirname, '..', 'dist')
  },
  server:{
    port:4000,
    proxy:{
      '/api': {
        target: 'http://18.216.49.251:3000/',
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure:false,
        changeOrigin:true,
        ws:true
      }
    }
  }
})
