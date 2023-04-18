import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`current path: ${path}`)
          const p = path.replace(/^\/api/, '')
          console.log(`new path: ${p}`)
          return p;
        },
      },
    },
  },
});
