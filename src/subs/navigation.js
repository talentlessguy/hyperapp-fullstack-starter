import { parseUrl, toSub } from '../util/client/url.js'

/**
 * Subscribe to URL change
 * @param {*} dispatch
 * @param {*} param1
 */
const urlChange = (dispatch, { action }) => {
  const handler = (_) => {
    const path = location.pathname + location.search
    dispatch(action, parseUrl(path))
  }

  addEventListener('popstate', handler)
  addEventListener('hyperapp-location', handler)

  return () => ['popstate', 'hyperapp-location'].map((el) => removeEventListener(el, handler))
}

/**
 * Subscribe to link element click
 * @param {*} dispatch
 * @param {*} param1
 */
const urlRequest = (dispatch, { action }) => {
  const clicks = (event) => {
    if (event.target.matches('a') && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault()
      const href = event.target.getAttribute('href')
      dispatch(action, href)
    }
  }

  addEventListener('click', clicks)

  return () => removeEventListener('click', clicks)
}

const parseAction = ([action]) => ({ action })

export const onUrlChange = toSub(urlChange, parseAction)

export const onUrlRequest = toSub(urlRequest, parseAction)
