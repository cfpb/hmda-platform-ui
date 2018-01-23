import requestEdit from '../submission/edits/requestEdit.js'
import requestIRS from '../submission/irs/requestIRS.js'
import requestParseErrors from '../submission/parseErrors/requestParseErrors.js'

export default function getPaginationRequestAction(target) {
  switch (target) {
    case 'parseErrors':
      return requestParseErrors()
    case 'irs':
      return requestIRS()
    default:
      return requestEdit(target)
  }
}
