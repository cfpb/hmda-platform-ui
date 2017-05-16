import requestEdit from './requestEdit.js'
import requestIRS from './requestIRS.js'
import requestParseErrors from './requestParseErrors.js'

export default function getPaginationRequestAction(target) {
  switch(target) {
    case 'parseErrors':
      return requestParseErrors()
    case 'irs':
      return requestIRS()
    default:
      return requestEdit()
  }
}
