import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import serve from 'serve-static'
import Nollup from 'nollup/lib/dev-middleware.js'
import { getCountries } from './functions/countries.js'
import { render } from './src/util/server/renderPage.js'
import resolve from '@rollup/plugin-node-resolve'

const app = new App()

const isProd = process.env.NODE_ENV === 'production'

// API functions
app.get('/api/countries', getCountries)

if (isProd) {
  const routes = ['/', '/countries', '/about']

  // Prerender each page in production
  routes.forEach((route) => app.get(route, (_, res) => res.send(render(route))))

  app.use(serve('dist'))
} else {
  // app.use(
  //   Nollup(
  //     app,
  //     {
  //       input: 'src/app.js',
  //       output: {
  //         dir: 'dist',
  //         format: 'esm',
  //         entryFileNames: '[name].[hash].js',
  //         assetFileNames: '[name].[hash][extname]'
  //       },
  //       plugins: [resolve()]
  //     },
  //     {
  //       hot: true,
  //       contentBase: './public'
  //     }
  //   )
  // )

  app.use(serve('public'))

  app.use(logger())
}

const PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, () => console.log(`Started a ${process.env.NODE_ENV || 'dev'} server on http://${HOST}:${PORT}`))
