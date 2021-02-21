import { app } from 'hyperapp'
import { view } from '../shared/view.js'
import '../../styles/global.css'

app({
  init: {
    data: {
      countries: []
    },
    hello: 'Click to fetch countries info'
  },
  view: view,
  node: document.getElementById('app')
})
