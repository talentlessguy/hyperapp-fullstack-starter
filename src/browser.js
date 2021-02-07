import { app, h } from 'hyperapp'
import { view } from './view.js'

app({
  init: { version: 'browser' },
  view: view,
  node: document.getElementById('app')
})
