import jsdom from 'jsdom'
import fs from 'fs/promises'

export const template = async (prerender, title = 'Fullstack Hyperapp template') => {
  const htmlFile = await fs.readFile('dist/index.html')

  const dom = new jsdom.JSDOM(htmlFile.toString())

  dom.window.document.title = title

  dom.window.document.getElementById('app').innerHTML = prerender

  return dom.serialize()
}
