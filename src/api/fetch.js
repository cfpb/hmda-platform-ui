import isomorphicFetch from 'isomorphic-fetch'
import createQueryString from './createQueryString.js'
import makeUrl from './makeUrl.js'
import * as AccessToken from './AccessToken.js'
import { login } from '../utils/keycloak.js'
import log, { error } from '../utils/log.js'

//Once the store is intialized, save a reference to it here
//This is currently done in index.js
let store = null
export function setStore(s) {
  store = s
}

export function getFilingData() {
  const appState = store.getState().app
  return {
    lei: appState.lei,
    filing: appState.filingPeriod,
    submission: appState.submission.id && appState.submission.id.sequenceNumber,
    year: appState.year
  }
}

export function fetch(options = { method: 'GET' }) {
  const accessToken = AccessToken.get()
  const pathname = options.pathname
  const filingData = pathname ? {} : getFilingData()
  const isFormData =
    options.body && options.body.toString() === '[object FormData]'

  options = Object.assign({}, filingData, options)

  if (options.params) {
    options.querystring = createQueryString(options.params)
  }

  const url = makeUrl(options)
  if (typeof options.body === 'object' && !isFormData)
    options.body = JSON.stringify(options.body)

  let headers = { Accept: 'application/json' }

  if (options.method === 'POST' && !isFormData) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  if (options.params && options.params.format === 'csv') {
    headers = {
      'Content-Type': 'text/csv',
      Accept: 'text/csv'
    }
  }

  if (accessToken) headers.Authorization = 'Bearer ' + accessToken

  if(options.noCache || options.method === 'POST') {
    headers['Cache-Control'] = 'no-cache, no-store'
  }

  var fetchOptions = {
    method: options.method || 'GET',
    body: options.body,
    headers: headers
  }

  return isomorphicFetch(url, fetchOptions)
    .then(response => {
      return new Promise(resolve => {
        log('got res', response, response.status)
        if (response.status === 401 || response.status === 403) login()
        if (response.status > 399) return resolve(response)
        if (options.params && options.params.format === 'csv') {
          return resolve(response.text())
        }
        resolve(response.json())
      })
    })
    .catch(err => {
      error(err)
    })
}
