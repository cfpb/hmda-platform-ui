import fetch from 'isomorphic-fetch'

let accessToken

function sendFetch(suffix, options = {method: 'GET'}){
  var location = options.noParse ? {} : parseLocation();
  var url = makeUrl(location, suffix);

  if(typeof options.body === 'object') options.body = JSON.stringify(options.body)

  var headers = {
    'Content-Type': 'application/json'
  }

  if(accessToken) headers.Authorization = 'Bearer ' + accessToken
console.log('requesting with access token: ', accessToken)
  var fetchOptions = {
    method: options.method || 'GET',
    body: options.body,
    headers: headers
  }

console.log(url, fetchOptions)
  return fetch(url, fetchOptions)
    .then(response => response.json())
}

export function setAccessToken(token) {
  accessToken = token
}

export function makeUrl(obj, suffix){
  var url = location.protocol + '//' + location.host + '/hmda'
  if(obj.id) url+= '/institutions/' + obj.id;
  if(obj.filing) url+= '/filings/' + obj.filing;
  if(obj.submission) url+= '/submissions/' + obj.submission;
  if(suffix) url += suffix;
  return url;
}

export function parseLocation(){
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
  return makeUrl(parseLocation(), `/submissions/${id}`)
}

export function getProgress(url, cb){
  return sendFetch(url, cb, '/progress');
}

export function getSubmission(id){
  return sendFetch(`/submissions/${id}`)
}

export function createSubmission(){
  return sendFetch('/submissions', {method: 'POST'})
}

export function getFiling(){
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

export function putEdit(submission, edit, data){
  var suffix = '/edits/' + edit;
  return sendFetch(`/submissions/${submission}${suffix}`, {method: 'PUT', body: data})
}

export function getIRS(submission){
  return sendFetch(`/submissions/${submission}/irs`);
}

export function postIRS(submission, data){
  return sendFetch(`/submissions/${submission}/irs`, {method: 'POST', body: data});
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
