import fetch from 'isomorphic-fetch'

let accessToken

function createQueryString(params) {
  const length = Object.keys(params).length
  let count = 0
  let qs = '?'
  for(let key of Object.keys(params)) {
    qs = `${qs}${key}=${params[key]}`
    count++
    if(count < length) qs = `${qs}&`
  }
  return qs
}

function sendFetch(options = {method: 'GET'}){
  var pathname = options.pathname
  var locationObj = pathname ? {} : parseLocation(location)
  // check if params exist and update pathname to add them

  options = Object.assign({}, locationObj, options)

  if(options.params) {
    options.querystring = createQueryString(options.params)
  }

  var url = makeUrl(options)

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
        return response.text()
      }
      const json = response.json()
      return json
    })
}

export function setAccessToken(token) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken || ''
}

export function makeUrl(obj){
  var url = process.env.HMDA_API
  if(!url) throw new Error('No url provided for API, unable to fetch data. This is most likely a build issue.')
  if(obj.pathname) return url + obj.pathname
  if(obj.id) url += '/institutions/' + obj.id
  if(obj.filing) url += '/filings/' + obj.filing
  if(obj.submission) url += '/submissions/' + obj.submission
  if(obj.suffix) url += obj.suffix
  if(obj.querystring) url += obj.querystring
  return url
}

export function parseLocation(location){
  var pathParts = location.pathname.split('/')
  return {id: pathParts[1], filing: pathParts[2]}
 }

export function getInstitutions(){
  return sendFetch({pathname: '/institutions'})
}

export function getInstitution(id){
  return sendFetch({pathname: `/institutions/${id}`})
}

export function getUploadUrl(id){
  if(id === undefined) throw new Error('Must provide a submission id when data is uploaded.')
  var locationObj = parseLocation(location)
  locationObj.submission = id
  return makeUrl(locationObj)
}

export function getSubmission(id){
  return sendFetch({submission: id})
}

export function createSubmission(id, filing){
  return sendFetch({pathname:`/institutions/${id}/filings/${filing}/submissions`, method:'POST'})
}

export function getFiling(id, filing){
  return sendFetch({pathname: `/institutions/${id}/filings/${filing}`})
}

export function getFilingFromUrl(){
  return sendFetch()
}

export function getLatestSubmission(){
  return sendFetch({suffix: '/submissions/latest'})
}

export function getEdits(pathObj){
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits'
  return sendFetch(pathObj)
}

export function postEdit(submission, data){
  return sendFetch({
    submission: submission,
    suffix: '/edits/macro',
    method: 'POST',
    body: data
  })
}

export function postQuality(){
  //FIXME implement call
  return Promise.resolve()
}

export function getIRS(submission){
  return sendFetch({submission:submission, suffix:'/irs'})
}

export function getSummary(submission){
  return sendFetch({submission: submission, suffix: '/summary'})
}

export function getSignature(submission){
  return sendFetch({submission: submission, suffix: '/sign'})
}

export function getParseErrors(submission){
  return sendFetch({submission: submission, suffix: '/parseErrors'})
}

export function postSignature(submission, data){
  return sendFetch({
    submission: submission,
    suffix: '/sign',
    method: 'POST',
    body: data
  })
}
