import isomorphicFetch from 'isomorphic-fetch'
import createQueryString from './createQueryString.js'
import makeUrl from './makeUrl.js'
import * as AccessToken from './AccessToken.js'
import { signinRedirect } from '../utils/redirect.js'
import log, { error } from '../utils/log.js'

let store = null
export function setStore(s) {
  store = s
}

export function getFilingData() {
  const appState = store.getState().app
  return {
    id: appState.institutionId,
    filing: appState.filingPeriod,
    submission: appState.submission.id && appState.submission.id.sequenceNumber
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

  let headers = {}

  if (options.method === 'POST' && !isFormData) {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  if (options.params && options.params.format === 'csv') {
    headers = {
      'Content-Type': 'text/csv'
    }
  }

  if (accessToken) headers.Authorization = 'Bearer ' + accessToken
  var fetchOptions = {
    method: options.method || 'GET',
    body: options.body,
    headers: headers
  }

  return isomorphicFetch(url, fetchOptions)
    .then(response => {
      return new Promise(resolve => {
        log('got res', response, response.status)
        if (response.status === 401) signinRedirect()
        if (response.status > 399) resolve(response)
        if (options.params && options.params.format === 'csv') {
          return resolve(response.text())
        }
        setTimeout(() => resolve(response.json()), 0)
      })
    })
    .catch(err => {
      error(err)
    })
}
