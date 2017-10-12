import * as types from '../../src/js/constants'

const typesArr = Object.keys(types)
  .filter(v => v !== '__esModule')
  .map(v => {
    return { type: v }
  })

export default (...args) => {
  return typesArr.filter(v => {
    return args.indexOf(v.type) === -1
  })
}
