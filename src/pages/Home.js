import html from 'hyperlit'

const Home = () => html`
  <main id="mainContainer">
    <div id="mainPage">
      <img
        src="https://github.com/jorgebucaran/hyperapp/raw/80984b4d649dcf3191cdf80d6ffc9c74da50ef88/docs/favicon.png"
      />
      <h1>Fullstack Hyperapp web app</h1>
      <div id="body">
        <h3>Pages</h3>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/countries">Countries</a></li>
        </ul>
      </div>
    </div>
  </main>
`

export default Home
