import { h, text } from 'hyperapp'
import Countries from './pages/Countries.js'
import Home from './pages/Home.js'
import About from './pages/About.js'

/**
 * Base Router component that returns pages based on current location
 * @param {*} state
 */
export const Router = (state) => {
  const { path } = state.location

  const routes = {
    '/': Home(state),
    '/countries': Countries(state),
    '/about': About(state)
  }

  if (Object.keys(routes).includes(path)) return h('div', {}, routes[path])
  else return typeof location !== 'undefined' ? location.reload() : text('Not Found') // Reload page so server responds instead (such as 404)
}
