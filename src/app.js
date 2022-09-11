import Framework7Svelte from 'framework7-svelte'
import framework7Bundle from 'framework7/lite-bundle'
import framework7 from 'framework7'

import 'framework7/css/bundle'

import '@/css/icons.css'
import '@/css/app.scss'

import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-log'

import App from '@/app.svelte'

framework7.request.setup({
  headers: {
    'access-token': framework7.utils.parseUrlQuery(window.location.href)?.accessToken
  }
})

framework7Bundle.use(Framework7Svelte)
const app = new App({
  target: document.getElementById('app')
})

navigator?.serviceWorker.register('/service-worker.js')

export default app
