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
        page:path.resolve(__dirname, 'login/index.html'),
        page2:path.resolve(__dirname, 'myounEon/index.html'),
        page3:path.resolve(__dirname, 'calender/index.html'),
      }
    },
    outDir:path.resolve(__dirname, '..', '..', 'jisu-d.github.io')
  },
  server:{
    port:3000,
    proxy:{
      '/api': {
        target: 'https://weschedule.kro.kr',
        //target: 'http://0.0.0.0:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure:true,
        changeOrigin:true,
        ws:true
      }
    }
  }
})
