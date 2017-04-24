import fetch from './fetch.js'

export function getInstitutions(){
  return fetch({pathname: '/institutions'})
}

export function getInstitution(id){
  return fetch({pathname: `/institutions/${id}`})
}

export function getSubmission(id){
  return fetch({submission: id})
}

export function createSubmission(id, filing){
  return fetch({pathname:`/institutions/${id}/filings/${filing}/submissions`, method:'POST'})
}

export function getFiling(id, filing){
  return fetch({pathname: `/institutions/${id}/filings/${filing}`})
}

export function getFilingFromUrl(){
  return fetch()
}

export function getLatestSubmission(){
  return fetch({suffix: '/submissions/latest'})
}

export function getEdits(pathObj){
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits'
  return fetch(pathObj)
}

export function getEdit(pathObj){
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : `/edits/${pathObj.edit}`
  return fetch(pathObj)
}

export function getCSV(pathObj){
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits/csv'
  pathObj.params = {format: 'csv'}
  return fetch(pathObj)
}
export function postVerify(submission, type, verified){
  return fetch({
    submission: submission,
    suffix: `/edits/${type}`,
    method: 'POST',
    body: {verified: verified}
  })
}

export function getIRS(submission){
  return fetch({submission:submission, suffix:'/irs'})
}

export function getSummary(submission){
  return fetch({submission: submission, suffix: '/summary'})
}

export function getSignature(submission){
  return fetch({submission: submission, suffix: '/sign'})
}

export function getParseErrors(submission){
  return fetch({submission: submission, suffix: '/parseErrors'})
}

export function postSignature(submission, signed){
  return fetch({
    submission: submission,
    suffix: '/sign',
    method: 'POST',
    body: {signed: signed}
  })
}
