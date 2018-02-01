import { SET_INSTITUTION } from '../constants'

export default (state = null, action) => {
  let currentSubmission

  switch (action.type) {
    case SET_INSTITUTION:
      return action.id
    default:
      return state
  }
}
