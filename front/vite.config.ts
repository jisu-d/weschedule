import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      input:{
        index:path.resolve(__dirname, 'index.html'),
        page:path.resolve(__dirname, 'page/index.html')
      }
    }
  },
  server:{
    port:443,
    proxy:{
      '/api': {
        target: 'http://0.0.0.0:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure:false,
        changeOrigin:true,
        ws:true
      }
    }
  },
  base:'',
})
