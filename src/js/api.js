import fetch from 'isomorphic-fetch'

let accessToken

function sendFetch(suffix, options = {method: 'GET'}){
  var locationObj = options.noParse ? {} : parseLocation(location);
  var url = makeUrl(locationObj, suffix);
  if(typeof options.body === 'object') options.body = JSON.stringify(options.body)
  var headers = {}

  if (options.method === 'POST') {
    headers = {
      'Content-Type': 'application/json'
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

export function getEditsByType(submission){
  return sendFetch(`/submissions/${submission}/edits`)
}

export function getEditsByRow(submission){
  return sendFetch(`/submissions/${submission}/edits/lars`)
}

export function postEdit(submission, data){
  var suffix = '/edits/macro'
  return sendFetch(`/submissions/${submission}${suffix}`, {method: 'POST', body: data})
}

export function postQuality(){
  //FIXME implement call
  return Promise.resolve()
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
