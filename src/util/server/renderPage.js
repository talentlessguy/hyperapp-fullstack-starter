import { Router } from '../../router.js'
import { initialStates } from '../../init.js'
import { renderToString } from 'hyperapp-render'

/**
 * Render a single view into an HTML page
 * @param {string} path
 * @returns {string}
 */
export const render = (path) => {
  return renderToString(
    Router({
      location: { path },
      ...initialStates[path]
    })
  )
}
