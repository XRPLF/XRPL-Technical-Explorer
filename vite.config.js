import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import inject from '@rollup/plugin-inject'


export default defineConfig({
  plugins: [mkcert(), vue(), nodePolyfills()],
  server: {
    https: true,
    strictPort: true,
    port: 4001,
  },
  define: {
    'process.env': {}
  },
//   build: {
//     rollupOptions: {
//         plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
//     },
//   },
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