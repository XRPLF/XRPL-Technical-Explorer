import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [mkcert(), vue(), nodePolyfills()],
  server: {
    host: '0.0.0.0',
    https: false,
    strictPort: true,
    port: 4001,
  },
  define: {
    'process.env': {}
  },
})


// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     strictPort: true,
//     port: 4001,
//   },
//   define: {
//     'process.env': {}
//   }
// })