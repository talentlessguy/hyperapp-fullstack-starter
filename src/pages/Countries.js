import html from 'hyperlit'
import { Http } from '../fx/Http.js'

const GetCountries = (state) => {
  return [
    state,
    Http({
      url: '/api/countries',
      action: (state, { data }) => {
        const newState = { ...state, ...data, hello: false }

        return newState
      }
    })
  ]
}

const Countries = (state) => {
  return html`<main>
    ${state.hello &&
    html`<div id="info">
      <h1>Countries info</h1>
      <button onclick=${GetCountries}>${state.hello}</button>
    </div>`}

    <div id="grid">
      ${state.countries &&
      state.countries.map(
        (country) => html`<div>
          <h2>${country.emoji} ${country.name}</h2>
          <p>Capital: ${country.capital}</p>
        </div>`
      )}
    </div>
  </main>`
}

export default Countries
