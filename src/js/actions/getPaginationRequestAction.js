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
