export default function(obj) {
  if (!window.HMDA_ENV || !window.HMDA_ENV.HMDA_API) {
    throw new Error(
      'No url provided for API, unable to fetch data. This is most likely a build issue.'
    )
  }

  let url = window.HMDA_ENV.HMDA_API
  if (obj.pathname) return url + obj.pathname
  if (obj.id) url += '/institutions/' + obj.id
  if (obj.filing) url += '/filings/' + obj.filing
  if (obj.submission) url += '/submissions/' + obj.submission
  if (obj.suffix) url += obj.suffix
  if (obj.querystring) url += obj.querystring
  return url
}
