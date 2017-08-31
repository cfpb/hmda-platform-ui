import isomorphicFetch from 'isomorphic-fetch'
import createQueryString from './createQueryString.js'
import parseLocation from './parseLocation.js'
import makeUrl from './makeUrl.js'
import * as AccessToken from './AccessToken.js'
import { signinRedirect } from '../utils/redirect.js'

export function fetch(options = {method: 'GET'}){
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

  return isomorphicFetch(url, fetchOptions)
    .then(response => {
      return new Promise(resolve => {
        if(process.env.NODE_ENV !== 'production') console.log('got res', response, response.status)
        if(response.status === 401) signinRedirect()
        if(response.status > 399) resolve(response)
        if(options.params && options.params.format === 'csv') {
          resolve(response.text())
        }
        setTimeout(()=>resolve(response.json()), 0)
      })
    })
    .catch(err => {
      console.log(err)
    })
}
