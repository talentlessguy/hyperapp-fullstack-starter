const parseQueryString = (qs) => (qs ? Object.fromEntries(new URLSearchParams(qs)) : {})

const parseUrl = (url) => {
  const [path, queryString] = url.split('?')
  return {
    path,
    query: parseQueryString(queryString)
  }
}

const navigateTo = (_, pathname) => {
  history.pushState({}, '', pathname)
  dispatchEvent(new CustomEvent('hyperapp-location'))
}

const toSub = (func, parsing) => (...args) => [func, parsing(args)]

export { toSub, parseQueryString, navigateTo, parseUrl }
