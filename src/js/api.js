import fetch from 'isomorphic-fetch'

let accessToken

function createQueryString(suffix, params, length) {
  let newSuffix = `${suffix}?`
  let count = 0
  for(let key of Object.keys(params)) {
    newSuffix = `${newSuffix}${key}=${params[key]}`
    count++
    if(count < length) newSuffix = `${newSuffix}&`
  }
  return newSuffix
}

function sendFetch(suffix, options = {method: 'GET'}){
  var locationObj = options.noParse ? {} : parseLocation(location);
  // check if params exist and update suffix to add them
  if(options.params && Object.keys(options.params).length !== 0) {
    suffix = createQueryString(suffix, options.params, Object.keys(options.params).length)
  }
  console.log(suffix)
  var url = makeUrl(locationObj, suffix);
  if(typeof options.body === 'object') options.body = JSON.stringify(options.body)
  var headers = {}

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
        //console.log(response.text())
        return response.text()
      }
      const json = response.json()
      console.log('respose from fetch', response, json)
      return json
    })
}

export function setAccessToken(token) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken || ''
}

export function makeUrl(obj, suffix){
  var url = process.env.HMDA_API
  if(!url) throw new Error('No url provided for API, unable to fetch data. This is most likely a build issue.')
  if(obj.id) url+= '/institutions/' + obj.id;
  if(obj.filing) url+= '/filings/' + obj.filing;
  if(obj.submission) url+= '/submissions/' + obj.submission;
  if(suffix) url += suffix;
  return url;
}

export function parseLocation(location){
  var pathParts = location.pathname.split('/');
  return {id: pathParts[1], filing: pathParts[2]}
 }

export function getInstitutions(){
  return sendFetch('/institutions', {noParse:1});
}

export function getInstitution(id){
  return sendFetch(`/institutions/${id}`, {noParse:1});
}

export function getUploadUrl(id){
  if(id === undefined) throw new Error('Must provide a submission id when data is uploaded.')
  return makeUrl(parseLocation(location), `/submissions/${id}`)
}

export function getProgress(url, cb){
  return sendFetch(url, cb, '/progress');
}

export function getSubmission(id){
  return sendFetch(`/submissions/${id}`)
}

export function createSubmission(id, filing){
  return sendFetch(`/institutions/${id}/filings/${filing}/submissions`,
      {method:'POST', noParse:1})
}

export function getFiling(id, filing){
  return sendFetch(`/institutions/${id}/filings/${filing}`, {noParse:1})
}

export function getFilingFromUrl(){
  return sendFetch()
}

export function getLatestSubmission(){
  return sendFetch('/submissions/latest')
}

export function getEditsByType(submission, institutionId, period, params){
  if(params) {
    return sendFetch(`/institutions/${institutionId}/filings/${period}/submissions/${submission}/edits`, {noParse:1, params:params})
  }
  return sendFetch(`/submissions/${submission}/edits`, {params:params})
}

export function getEditsByRow(submission){
  return sendFetch(`/submissions/${submission}/edits/lars`)
}

export function postEdit(submission, data){
  var suffix = '/edits/macro'
  return sendFetch(`/submissions/${submission}${suffix}`, {method: 'POST', body: data})
}

export function getIRS(submission){
  return sendFetch(`/submissions/${submission}/irs`);
}

export function getSummary(submission){
  return sendFetch(`/submissions/${submission}/summary`);
}

export function getSignature(submission){
  return sendFetch(`/submissions/${submission}/sign`);
}

export function postSignature(submission, data){
  return sendFetch(`/submissions/${submission}/sign`, {method: 'POST', body: data});
}

export function postSubmissions(url, cb){
  return sendFetch(url, cb, '/submissions');
}
