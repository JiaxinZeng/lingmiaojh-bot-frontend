import path from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import eslint from 'vite-plugin-eslint'

const SRC_DIR = path.resolve(__dirname, './src')
const PUBLIC_DIR = path.resolve(__dirname, './public')
const BUILD_DIR = path.resolve(__dirname, './www')

export default {
  plugins: [
    svelte(),
    eslint({
      exclude: ['node_modules/**', 'www/**']
    })
  ],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core']
  },
  root: SRC_DIR,
  base: '',
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false,
      output: {
        manualChunks: {
          lodash: ['lodash'],
          framework7: ['framework7'],
          dom7: ['dom7']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': SRC_DIR
    }
  },
  server: {
    host: true
  }
}
