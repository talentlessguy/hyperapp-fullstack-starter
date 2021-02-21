import { app } from 'hyperapp'
import { Router } from './router.js'
import '../styles/global.css'
import { parseUrl, navigateTo } from './util/client/url.js'
import { onUrlChange, onUrlRequest } from './subs/navigation.js'
import { initialStates } from './init.js'

const urlChanged = (state, location) => ({ ...state, location })

const linkClicked = (state, pathname) => {
  const initial = initialStates[pathname] || {}
  const newState = { ...initial, ...state }

  return [newState, [navigateTo, pathname]]
}

// Hyperapp entrypoint
app({
  init: {
    // Get location from browser and put it to initial state
    location: parseUrl(location.pathname + location.search),
    // Add initial state for the current page
    ...initialStates[location.pathname]
  },
  view: Router,
  node: document.getElementById('app'),
  // Subscribe on router events
  subscriptions: () => [onUrlChange(urlChanged), onUrlRequest(linkClicked)]
})
