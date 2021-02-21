import html from 'hyperlit'

const Home = () => html`
  <main>
    <h1>Full-stack Hyperapp + Node.js application</h1>
    <h2>Pages</h2>
    <a href="/countries">Countries</a>
    <h2>Features</h2>
    <ul>
      <li>⚡ SSR</li>
      <li>🔄 Routing (client and server)</li>
      <li>Client-side data fetching</li>
    </ul>
  </main>
`

export default Home
