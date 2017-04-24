import fetch from 'isomorphic-fetch'
import createQueryString from './createQueryString.js'
import parseLocation from './parseLocation.js'
import makeUrl from './makeUrl.js'
import * as AccessToken from './AccessToken.js'

export default function(options = {method: 'GET'}){
  const accessToken = AccessToken.get()
  const pathname = options.pathname
  const locationObj = pathname ? {} : parseLocation(location)

  options = Object.assign({}, locationObj, options)

  if(options.params) {
    options.querystring = createQueryString(options.params)
  }

  const url = makeUrl(options)

  if(typeof options.body === 'object') options.body = JSON.stringify(options.body)

  let headers = {}

  if (options.method === 'POST') {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  if(options.params && options.params.format === 'csv') {
    headers = {
      'Content-Type': 'text/csv'
    }
  }

  if(accessToken) headers.Authorization = 'Bearer ' + accessToken
  var fetchOptions = {
    method: options.method || 'GET',
    body: options.body,
    headers: headers
  }

  console.log('fetching from', url, 'with options', fetchOptions)
  return fetch(url, fetchOptions)
    .then(response => {
      if(options.params && options.params.format === 'csv') {
        return response.text()
      }
      const json = response.json()
      console.log('got api response for', url, json)
      return json
    })
}
