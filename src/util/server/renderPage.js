import { template } from './template.js'
import { Router } from '../../router.js'
import { initialStates } from '../../init.js'
import { renderToString } from 'hyperapp-render'

/**
 * Render a single view into an HTML page
 * @param {string} path
 */
export const renderPage = (path) => async (_, res) => {
  const prerender = renderToString(
    Router({
      location: { path },
      ...initialStates[path]
    })
  )

  res.send(await template(prerender))
}
