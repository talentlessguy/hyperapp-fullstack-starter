import jsdom from 'jsdom'
import fs from 'fs/promises'
import path from 'path'

/**
 * Render a hyperapp view into an HTML page
 * @param {*} prerender Hyperapp prerendered view
 * @param {string} title Page title
 */
export const template = async (prerender, title = 'Fullstack Hyperapp template') => {
  const htmlFile = await fs.readFile(path.resolve('dist/index.html'))

  // Create DOM abstraction from HTML file
  const dom = new jsdom.JSDOM(htmlFile.toString())

  dom.window.document.title = title

  // Inject prerendered view to #app
  dom.window.document.getElementById('app').innerHTML = prerender

  return dom.serialize()
}
