import { createApp } from './createApp.js'
import { startApp } from './src/util/server/startApp.js'

createApp().then(startApp)
