import receiveEdit from './receiveEdit.js'
import receiveIRS from './receiveIRS.js'
import receiveParseErrors from './receiveParseErrors.js'

export default function getPaginationReceiveAction(target, data) {
  switch(target) {
    case 'parseErrors':
      return receiveParseErrors(data)
    case 'irs':
      return receiveIRS(data)
    default:
      return receiveEdit(data)
  }
}
