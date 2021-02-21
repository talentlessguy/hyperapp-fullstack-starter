import { App } from '@tinyhttp/app'
import { renderToString } from 'hyperapp-render'
import { view } from './src/shared/view.js'
import serve from 'serve-static'
import Bundler from 'parcel'
import { getCountries } from './api/countries.js'

const app = new App()

const isProd = process.env.NODE_ENV === 'production'

const PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || 'localhost'

app
  .use(serve('dist'))
  .get('/api/countries', getCountries)
  .get('/', (_, res) => {
    const prerender = renderToString(
      view({
        data: {
          countries: []
        },
        hello: 'Click to fetch countries info'
      })
    )

    const markup = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fullstack Hyperapp template</title>
</head>
<body>
  <div id="app">${prerender}</div>
  <script src="/index.js"></script>
</body>
</html>
  `

    res.send(markup)
  })

if (isProd) app.listen(PORT, () => console.log(`Started a prod server on http://${HOST}:${PORT}`))
else {
  const bundler = new Bundler('./index.html')

  console.log(`Bundling frontend with Parcel...`)

  bundler.bundle().then(() => app.listen(PORT, () => console.log(`Started a dev server on http://${HOST}:${PORT}`)))
}
