import Framework7 from 'framework7/lite-bundle'
import Framework7Svelte from 'framework7-svelte'

import 'framework7/css/bundle'

import '@/css/icons.css'
import '@/css/app.scss'
import '@/css/highlight.scss'

import App from '@/app.svelte'

Framework7.use(Framework7Svelte)
const app = new App({
  target: document.getElementById('app')
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

export default app
