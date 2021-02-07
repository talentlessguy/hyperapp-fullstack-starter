import { App } from '@tinyhttp/app'
import { renderToString } from 'hyperapp-render'
import { view } from './src/view.js'
import serve from 'serve-static'
import Bundler from 'parcel'

const app = new App()

const isProd = process.env.NODE_ENV === 'production'

app.use(serve('dist')).get('/', (_, res) => {
  const prerender = renderToString(view({ version: process.version }))

  const markup = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">${prerender}</div>
  <script src="/index.js"></script>
</body>
</html>
  `

  res.send(markup)
})

if (isProd) {
  app.listen(3000)
} else {
  const bundler = new Bundler('./index.html')

  bundler.bundle().then(() => app.listen(3000, () => console.log(`Started`)))
}
