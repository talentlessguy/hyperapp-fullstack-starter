import html from 'hyperlit'
import { Http } from '../fx/Http.js'

const GetCountries = (state) => [
  state,
  Http({
    url: '/api/countries',
    action: (_, { data }) => data
  })
]

export const view = ({ data, hello }) =>
  html`<main>
    ${hello &&
    html`<div id="info">
      <h1>Countries info</h1>
      <button onclick=${GetCountries}>${hello}</button>
    </div>`}

    <div id="grid">
      ${data?.countries?.map(
        (country) => html`<div>
          <h2>${country.emoji} ${country.name}</h2>
          <p>Capital: ${country.capital}</p>
        </div>`
      )}
    </div>
  </main>`
