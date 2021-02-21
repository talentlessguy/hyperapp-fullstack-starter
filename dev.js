import { createApp } from './server.js'
import { startApp } from './src/util/server/startApp.js'

createApp().then(startApp)
