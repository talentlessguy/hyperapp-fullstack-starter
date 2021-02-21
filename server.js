import { App } from '@tinyhttp/app'
import { renderToString } from 'hyperapp-render'
import serve from 'serve-static'
import Bundler from 'parcel'
import { getCountries } from './api/countries.js'
import { template } from './src/util/template.js'
import { Router } from './src/router.js'

const app = new App()

const isProd = process.env.NODE_ENV === 'production'

const PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || 'localhost'

app
  .get('/api/countries', getCountries)
  .use(serve('dist'))
  .get('*', (req, res) => {
    res.sendFile(`${process.cwd()}/dist/index.html`)
  })

if (isProd) {
  const routes = ['/', '/countries']
  const renderPage = (path) => (_, res) => {
    const prerender = renderToString(
      Router({
        location: {
          path
        }
      })
    )

    res.send(template(prerender))
  }

  routes.forEach((route) => app.get(route, renderPage(route)))
  app.listen(PORT, () => console.log(`Started a prod server on http://${HOST}:${PORT}`))
} else {
  const bundler = new Bundler('./index.html')

  console.log(`Bundling frontend with Parcel...`)

  bundler.bundle().then(() => app.listen(PORT, () => console.log(`Started a dev server on http://${HOST}:${PORT}`)))
}
