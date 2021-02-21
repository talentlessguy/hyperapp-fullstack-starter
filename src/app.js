import { app } from 'hyperapp'
import { Router } from './router.js'
import '../styles/global.css'
import { parseUrl, navigateTo } from './util/url.js'
import { onUrlChange, onUrlRequest } from './subs/navigation.js'

const urlChanged = (state, location) => {
  return { ...state, location }
}
const linkClicked = (state, pathname) => {
  return [state, [navigateTo, pathname]]
}

app({
  init: {
    location: parseUrl(window.location.pathname + window.location.search)
  },
  view: Router,
  node: document.getElementById('app'),
  subscriptions: () => [onUrlChange(urlChanged), onUrlRequest(linkClicked)]
})
