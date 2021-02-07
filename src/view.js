import { h, text } from 'hyperapp'

export const view = (state) => h('h1', {}, text(`Hello world from node v${state.version}`))
