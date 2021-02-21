import { App } from '@tinyhttp/app'
import { renderToString } from 'hyperapp-render'
import serve from 'serve-static'
import Bundler from 'parcel'
import { getCountries } from './api/countries.js'
import { template } from './src/util/template.js'
import { Router } from './src/router.js'
import { initialStates } from './src/init.js'

const app = new App()

const isProd = process.env.NODE_ENV === 'production'

const PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || 'localhost'

app.get('/api/countries', getCountries)

if (isProd) {
  const routes = ['/', '/countries']
  const renderPage = (path) => async (_, res) => {
    const prerender = renderToString(
      Router({
        location: {
          path
        },
        ...initialStates[path]
      })
    )

    res.send(await template(prerender))
  }

  routes.forEach((route) => app.get(route, renderPage(route)))
  app.use(serve('dist')).listen(PORT, () => console.log(`Started a prod server on http://${HOST}:${PORT}`))
} else {
  const bundler = new Bundler('./index.html')

  app
    .get('*', (_, res) => {
      res.sendFile(`${process.cwd()}/dist/index.html`)
    })
    .use(serve('dist'))

  console.log(`Bundling frontend with Parcel...`)

  bundler.bundle().then(() => app.listen(PORT, () => console.log(`Started a dev server on http://${HOST}:${PORT}`)))
}
