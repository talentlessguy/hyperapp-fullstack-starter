/**
 * Parse a query string into object
 * @param {string} qs
 */
const parseQueryString = (qs) => (qs ? Object.fromEntries(new URLSearchParams(qs)) : {})

/**
 * Parse URL and return path with query object
 * @param {string} url
 */
const parseUrl = (url) => {
  const [path, queryString] = url.split('?')
  return {
    path,
    query: parseQueryString(queryString)
  }
}

/**
 * Push a new location to history and dispatch hyperapp event
 * @param {*} _
 * @param {string} pathname
 */
const navigateTo = (_, pathname) => {
  history.pushState({}, '', pathname)
  dispatchEvent(new CustomEvent('hyperapp-location'))
}

const toSub = (func, parsing) => (...args) => [func, parsing(args)]

export { toSub, parseQueryString, navigateTo, parseUrl }
