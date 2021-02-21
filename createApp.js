import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import serve from 'serve-static'
import Bundler from 'parcel'
import { getCountries } from './functions/countries.js'
import { renderPage } from './src/util/server/renderPage.js'

export const createApp = async () => {
  const app = new App()

  const isProd = process.env.NODE_ENV === 'production'

  // API functions
  app.get('/api/countries', getCountries)

  if (isProd) {
    const routes = ['/', '/countries', '/about']

    // Prerender each page in production
    routes.forEach((route) => app.get(route, renderPage(route)))

    return app.use(serve('dist'))
  } else {
    const bundler = new Bundler('./index.html')

    app
      .use(logger())
      .use(serve('dist'))
      .get('*', (_, res) => {
        // Use a single index.html file in production
        res.sendFile(`${process.cwd()}/dist/index.html`)
      })

    console.log(`Bundling frontend with Parcel...`)

    // Bundle pages, then start an app
    await bundler.bundle()

    return app
  }
}
