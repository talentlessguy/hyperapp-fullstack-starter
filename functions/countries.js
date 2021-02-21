import fetch from 'node-fetch'

export const getCountries = async (_, res) => {
  const req = await fetch('https://countries.trevorblades.com/', {
    credentials: 'omit',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'content-type': 'application/json',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache'
    },
    referrer: 'https://countries.trevorblades.com/',
    body:
      '{"operationName":null,"variables":{},"query":"{\\n  countries {\\n    name\\n    capital\\n    emoji\\n  }\\n}\\n"}',
    method: 'POST',
    mode: 'cors'
  })

  if (req.status !== 200) {
    const err = await req.text()

    res.send(err)
  } else {
    const json = await req.json()

    res.json(json)
  }
}
