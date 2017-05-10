export function getPaginationReceiveAction(target, data) {
  switch(target) {
    case 'parseErrors':
      return receiveParseErrors(data)
    case 'irs':
      return receiveIRS(data)
    default:
      return receiveEdit(data)
  }
}
