import receiveEdit from '../submission/edits/receiveEdit.js'
import receiveIRS from '../submission/irs/receiveIRS.js'
import receiveParseErrors from '../submission/parseErrors/receiveParseErrors.js'

export default function getPaginationReceiveAction(target, data) {
  switch (target) {
    case 'parseErrors':
      return receiveParseErrors(data)
    case 'irs':
      return receiveIRS(data)
    default:
      return receiveEdit(data)
  }
}
