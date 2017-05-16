export default function hasHttpError(json) {
  return !json || json.httpStatus > 399 ?
    true :
    false
}
