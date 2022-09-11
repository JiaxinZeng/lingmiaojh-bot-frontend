import path from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import eslint from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'

const SRC_DIR = path.resolve(__dirname, './src')
const PUBLIC_DIR = path.resolve(__dirname, './public')
const BUILD_DIR = path.resolve(__dirname, './www')

export default {
  plugins: [
    svelte(),
    eslint({
      exclude: ['node_modules/**', 'www/**']
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all',
        'es.object.assign'
      ]
    })
  ],
  root: SRC_DIR,
  base: '',
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          lodash: ['lodash'],
          framework7: ['framework7'],
          'framework7-lite-bundle': ['framework7/lite-bundle'],
          dom7: ['dom7'],
          svrollbar: ['svrollbar'],
          'clamp-js': ['clamp-js'],
          prismjs: ['prismjs'],
          'prismjs/components': ['prismjs/components/prism-log']
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
