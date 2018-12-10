import { SET_INSTITUTION } from '../constants'

export default (state = null, action) => {
  switch (action.type) {
    case SET_INSTITUTION:
      return action.lei
    default:
      return state
  }
}
