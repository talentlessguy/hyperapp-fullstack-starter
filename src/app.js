import { app } from 'hyperapp'
import { Router } from './router.js'
import '../styles/global.css'
import { parseUrl, navigateTo } from './util/url.js'
import { onUrlChange, onUrlRequest } from './subs/navigation.js'
import { initialStates } from './init.js'

const urlChanged = (state, location) => {
  return { ...state, location }
}
const linkClicked = (state, pathname) => {
  const initial = initialStates[pathname] || {}
  const newState = { ...initial, ...state }

  return [newState, [navigateTo, pathname]]
}

app({
  init: {
    location: parseUrl(location.pathname + location.search),
    ...initialStates[location.pathname]
  },
  view: Router,
  node: document.getElementById('app'),
  subscriptions: () => [onUrlChange(urlChanged), onUrlRequest(linkClicked)]
})
