import fetch from 'isomorphic-fetch'

function sendFetch(suffix, postData){
  var url = makeUrl(parseLocation(), suffix);
  var options = {
    method: postData ? 'POST' : 'GET',
    body: postData,
    headers: {
      'CFPB-HMDA-Institutions': 'fakeinstitution',
      'CFPB-HMDA-Username': 'fakeuser'
    }
  }

  return fetch(url, options)
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

export function getIRS(url, cb){
  return sendFetch(url, cb, '/irs');
}

export function postIRS(url, cb, data){
  return sendFetch(url, cb, '/irs', data);
}

export function getSignature(url, cb){
  return sendFetch(url, cb, '/sign');
}

export function postSignature(url, cb, data){
  return sendFetch(url, cb, '/sign', data);
}

export function postSubmissions(url, cb){
  return sendFetch(url, cb, '/submissions');
}

export function getEditsByType(url, cb){
  return sendFetch(url, cb, '/edits');
}

export function getEditsByRow(url, cb){
  return sendFetch(url, cb, '/edits/lars');
}

export function putEdit(edit, data){
  var suffix = '/edits/' + edit;
  var url = makeUrl(parseLocation(), suffix);

  return fetch(url, {method: 'PUT', body: data});
}
