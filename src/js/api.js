import fetch from 'isomorphic-fetch'

function sendFetch(suffix, options = {method: 'GET'}){
  var url = makeUrl(parseLocation(), suffix);
  var fetchOptions = {
    method: options.method,
    body: options.body,
    headers: {
      'CFPB-HMDA-Institutions': 'fakeinstitution',
      'CFPB-HMDA-Username': 'fakeuser'
    }
  }

  return fetch(url, fetchOptions)
    .then(response => response.json())
}

export function makeUrl(obj, suffix){
  var url = location.protocol + '//' + location.host + '/api'
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
  return sendFetch('/institutions');
}

export function getInstitution(id){
  return sendFetch('/institutions/' + id);
}

export function getUploadUrl(){
  return makeUrl(parseLocation(), '/submissions/latest')
}

export function getProgress(url, cb){
  return sendFetch(url, cb, '/progress');
}

export function getSubmission(id){
  return sendFetch('/submissions/' + id)
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

export function getIRS(url, cb){
  return sendFetch(url, cb, '/irs');
}

export function postIRS(url, cb, data){
  return sendFetch(url, cb, '/irs', {method: 'POST', body: data});
}

export function getSignature(url, cb){
  return sendFetch(url, cb, '/sign');
}

export function postSignature(url, cb, data){
  return sendFetch(url, cb, '/sign', {method: 'POST', body: data});
}

export function postSubmissions(url, cb){
  return sendFetch(url, cb, '/submissions');
}


