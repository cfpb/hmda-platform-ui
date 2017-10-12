import parseLocation from './parseLocation.js'
import makeUrl from './makeUrl.js'

export default function(id) {
  if (id === undefined)
    throw new Error('Must provide a submission id when data is uploaded.')
  const locationObj = parseLocation(location)
  locationObj.submission = id
  return makeUrl(locationObj)
}
