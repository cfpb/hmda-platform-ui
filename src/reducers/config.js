import { SET_CONFIG } from '../constants'

export default (state = null, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return action.config
    default:
      return state
  }
}