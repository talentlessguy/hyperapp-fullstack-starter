import { h, text } from 'hyperapp'
import Countries from './pages/Countries.js'
import Home from './pages/Home.js'

export const Router = (state) => {
  const { path } = state.location

  switch (path) {
    case '/':
      return h('div', {}, Home(state))
    case '/countries':
      return h('div', {}, Countries(state))
    default:
      return h('div', {}, text('Not Found'))
  }
}
